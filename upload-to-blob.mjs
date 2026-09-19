import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { put } from '@vercel/blob';

// Load .env.local
dotenv.config({ path: '.env.local' });

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN is not defined in .env.local');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, 'public');
const mappingFile = path.resolve(__dirname, 'blob-mapping.json');

// Allowed extensions
const TARGET_EXTS = new Set(['.webp', '.webm']);

// 1. Recursively find all target media files
function findFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findFiles(fullPath));
    } else {
      const ext = path.extname(entry.name).lowerCase ? path.extname(entry.name).toLowerCase() : path.extname(entry.name).toLowerCase();
      if (TARGET_EXTS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const files = findFiles(publicDir);
console.log(`Found ${files.length} target media files (.webp / .webm) in public folder.\n`);

// 2. Load existing mapping if exists
let mapping = {};
if (fs.existsSync(mappingFile)) {
  try {
    mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
    console.log(`Loaded existing mapping with ${Object.keys(mapping).length} entries.`);
  } catch (err) {
    console.warn('Could not parse existing blob-mapping.json, starting fresh.');
  }
}

// 3. Upload files
let uploadedCount = 0;
let skippedCount = 0;
let totalUploadedBytes = 0;
let webpUploaded = 0;
let webmUploaded = 0;

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const mappingKey = `/${relPath}`;
  const encodedMappingKey = `/${relPath.replace(/ /g, '%20')}`;
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);

  // Check if already uploaded
  if (mapping[mappingKey] || mapping[encodedMappingKey]) {
    console.log(`[${i + 1}/${files.length}] (SKIPPED - Already mapped) ${relPath}`);
    skippedCount++;
    continue;
  }

  const remaining = files.length - (i + 1);
  console.log(`[${i + 1}/${files.length}] Uploading: ${relPath} (${sizeMB} MB) | Remaining: ${remaining}...`);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = ext === '.webp' ? 'image/webp' : 'video/webm';

    const blob = await put(relPath, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: token,
      contentType: contentType,
    });

    // Save both direct path and encoded path if spaces exist
    mapping[mappingKey] = blob.url;
    if (mappingKey !== encodedMappingKey) {
      mapping[encodedMappingKey] = blob.url;
    }

    uploadedCount++;
    totalUploadedBytes += stat.size;
    if (ext === '.webp') webpUploaded++;
    if (ext === '.webm') webmUploaded++;

    console.log(`       ✓ Done: ${blob.url}\n`);

    // Incrementally save mapping
    fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2), 'utf-8');
  } catch (error) {
    console.error(`       ✗ FAILED: ${relPath} -> ${error.message}\n`);
  }
}

console.log('========================================');
console.log('UPLOAD COMPLETE SUMMARY');
console.log('========================================');
console.log(`Total files inspected: ${files.length}`);
console.log(`Newly uploaded:        ${uploadedCount}`);
console.log(`  - WebP uploaded:     ${webpUploaded}`);
console.log(`  - WebM uploaded:     ${webmUploaded}`);
console.log(`Already mapped/skip:   ${skippedCount}`);
console.log(`Total size uploaded:   ${(totalUploadedBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Mapping saved to:      ${mappingFile}`);
console.log('========================================');
