import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { list } from '@vercel/blob';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..'); // Solvoka root

const TEXT_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md',
  '.mjs', '.cjs', '.env', '.txt', '.yaml', '.yml', '.svg'
]);

function scanDir(dir) {
  let files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git', 'dist', '.gemini', 'build', '.next', 'uploads'].includes(entry.name)) {
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(scanDir(full));
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (TEXT_EXTS.has(ext)) {
          try {
            const stat = fs.statSync(full);
            if (stat.size < 2 * 1024 * 1024) { // < 2MB
              files.push(full);
            }
          } catch (e) {}
        }
      }
    }
  } catch (e) {}
  return files;
}

async function audit() {
  console.log('=== 1. AUDITING VERCEL BLOBS ===');
  const blobListResult = await list();
  const allBlobs = blobListResult.blobs;
  console.log(`Total blobs in Vercel store: ${allBlobs.length}`);

  const webmBlobs = allBlobs.filter(b => b.pathname.endsWith('.webm'));
  console.log(`WebM blobs in Vercel store: ${webmBlobs.length}`);

  console.log('\n=== 2. AUDITING CODEBASE REFERENCES ===');
  const files = scanDir(rootDir);
  console.log(`Scanning ${files.length} text files...`);
  const webmUrlRegex = /https?:\/\/[^\s"'`)]+\.webm/gi;
  const webmRefs = new Map(); // url -> Array<{ file, line }>

  for (const file of files) {
    const rel = path.relative(rootDir, file).replace(/\\/g, '/');
    if (rel.includes('audit_videos.mjs') || rel.includes('audit_report.json')) continue;

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      let match;
      while ((match = webmUrlRegex.exec(line)) !== null) {
        const rawUrl = match[0];
        const url = rawUrl.replace(/[,;]+$/, '');
        if (!webmRefs.has(url)) {
          webmRefs.set(url, []);
        }
        webmRefs.get(url).push({ file: rel, line: idx + 1 });
      }
    });
  }

  console.log(`Unique WebM URLs referenced in codebase: ${webmRefs.size}`);

  console.log('\n=== 3. MATCHING BLOBS TO CODE REFERENCES ===');
  const matched = [];
  const blobWithoutCodeRef = [];
  const codeRefWithoutBlob = [];

  for (const b of webmBlobs) {
    const decodedUrl = decodeURI(b.url);
    const directUrl = b.url;

    let foundRefs = null;
    let foundKey = null;

    for (const [refUrl, refs] of webmRefs.entries()) {
      if (refUrl === directUrl || decodeURI(refUrl) === decodedUrl || refUrl === encodeURI(decodedUrl)) {
        foundRefs = refs;
        foundKey = refUrl;
        break;
      }
    }

    if (foundRefs) {
      matched.push({ blob: b, refUrl: foundKey, refs: foundRefs });
    } else {
      blobWithoutCodeRef.push(b);
    }
  }

  for (const [refUrl, refs] of webmRefs.entries()) {
    const isBlob = webmBlobs.some(b => b.url === refUrl || decodeURI(b.url) === decodeURI(refUrl));
    if (!isBlob) {
      codeRefWithoutBlob.push({ refUrl, refs });
    }
  }

  console.log(`WebM blobs referenced in code: ${matched.length}`);
  console.log(`WebM blobs NOT referenced in code: ${blobWithoutCodeRef.length}`);
  console.log(`Code references NOT in Vercel blob: ${codeRefWithoutBlob.length}`);

  const report = {
    totalBlobs: allBlobs.length,
    totalWebmBlobs: webmBlobs.length,
    matchedBlobs: matched.map(m => ({
      pathname: m.blob.pathname,
      url: m.blob.url,
      size: m.blob.size,
      refUrl: m.refUrl,
      refCount: m.refs.length,
      files: [...new Set(m.refs.map(r => r.file))]
    })),
    unreferencedBlobs: blobWithoutCodeRef.map(b => ({
      pathname: b.pathname,
      url: b.url,
      size: b.size
    })),
    unmatchedCodeRefs: codeRefWithoutBlob
  };

  fs.writeFileSync(path.resolve(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));
  console.log('\nAudit report written to Frontend/scripts/audit_report.json');

  console.log('\n=== MATCHED BLOBS (Active videos to convert) ===');
  matched.forEach((m, i) => {
    console.log(`${i + 1}. [${m.blob.pathname}] (${(m.blob.size / 1024 / 1024).toFixed(2)} MB)`);
    const uniqueFiles = [...new Set(m.refs.map(r => r.file))];
    console.log(`   Referenced in: ${uniqueFiles.join(', ')}`);
  });

  if (blobWithoutCodeRef.length > 0) {
    console.log('\n=== UNREFERENCED WEBM BLOBS ON VERCEL ===');
    blobWithoutCodeRef.forEach((b, i) => {
      console.log(`${i + 1}. ${b.pathname} (${(b.size / 1024 / 1024).toFixed(2)} MB) - ${b.url}`);
    });
  }

  if (codeRefWithoutBlob.length > 0) {
    console.log('\n=== CODE REFS NOT IN BLOB STORE ===');
    codeRefWithoutBlob.forEach((c, i) => {
      console.log(`${i + 1}. ${c.refUrl} in ${[...new Set(c.refs.map(r => r.file))].join(', ')}`);
    });
  }
}

audit().catch(console.error);
