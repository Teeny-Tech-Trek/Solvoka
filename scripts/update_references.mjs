import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..'); // Solvoka root
const mappingPath = path.resolve(__dirname, 'uploaded_videos_mapping.json');
const blobMappingPath = path.resolve(__dirname, '../blob-mapping.json');

const items = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Build dictionary of old URL -> new URL (both encoded and decoded variants)
const urlReplacements = new Map();

for (const item of items) {
  const oldUrl = item.originalUrl;
  const newUrl = item.newMp4Url;

  urlReplacements.set(oldUrl, newUrl);
  urlReplacements.set(decodeURI(oldUrl), newUrl);
  urlReplacements.set(encodeURI(decodeURI(oldUrl)), newUrl);
}

console.log(`Loaded ${urlReplacements.size} URL replacement variants.`);

const TEXT_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md',
  '.mjs', '.cjs'
]);

function scanDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', '.gemini', 'build', '.next', 'uploads', 'temp_videos'].includes(entry.name)) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(scanDir(full));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTS.has(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

const files = scanDir(rootDir);
const changedFiles = [];

for (const file of files) {
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  // Skip report files and this script itself
  if (rel.startsWith('Frontend/scripts/') || rel.includes('unused-media-report.md')) {
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let fileReplacementsCount = 0;

  for (const [oldUrl, newUrl] of urlReplacements.entries()) {
    if (content.includes(oldUrl)) {
      const count = content.split(oldUrl).length - 1;
      content = content.replaceAll(oldUrl, newUrl);
      fileReplacementsCount += count;
    }
  }

  // Also replace any type="video/webm" with type="video/mp4" if adjacent to an updated video
  if (content.includes('type="video/webm"')) {
    content = content.replaceAll('type="video/webm"', 'type="video/mp4"');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles.push({ file: rel, count: fileReplacementsCount });
    console.log(`Updated ${rel} (${fileReplacementsCount} URL replacements)`);
  }
}

// Update Frontend/blob-mapping.json
if (fs.existsSync(blobMappingPath)) {
  const blobMapping = JSON.parse(fs.readFileSync(blobMappingPath, 'utf8'));
  for (const item of items) {
    const relMp4 = item.relMp4Path.replace(/\\/g, '/');
    const blobPathname = item.blobPathname.replace(/\\/g, '/');
    const newUrl = item.newMp4Url;

    blobMapping[`/${relMp4}`] = newUrl;
    blobMapping[`/${encodeURI(relMp4)}`] = newUrl;
    blobMapping[`/${blobPathname}`] = newUrl;
    blobMapping[`/${encodeURI(blobPathname)}`] = newUrl;
  }
  fs.writeFileSync(blobMappingPath, JSON.stringify(blobMapping, null, 2), 'utf8');
  console.log(`Updated Frontend/blob-mapping.json with new MP4 entries.`);
}

console.log('\n========================================');
console.log('REFERENCE UPDATE COMPLETE');
console.log('========================================');
console.log(`Total files updated: ${changedFiles.length}`);
changedFiles.forEach(c => console.log(` - ${c.file}: ${c.count} replacements`));
console.log('========================================');
