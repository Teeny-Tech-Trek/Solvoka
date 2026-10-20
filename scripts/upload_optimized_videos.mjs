import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dotenv from 'dotenv';
import { put, list } from '@vercel/blob';

dotenv.config({ path: '.env.local' });

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN is not defined in .env.local');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportPath = path.resolve(__dirname, 'mp4_conversion_report.json');
const uploadResultPath = path.resolve(__dirname, 'uploaded_videos_mapping.json');

function verifyUrl(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        statusCode: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length']
      });
    }).on('error', (err) => {
      resolve({ statusCode: 0, error: err.message });
    }).end();
  });
}

async function uploadAll() {
  const items = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  console.log('Querying existing blobs on Vercel Blob...');
  const { blobs: existingBlobs } = await list();
  const existingMap = new Map();
  for (const b of existingBlobs) {
    existingMap.set(b.pathname, b);
  }

  console.log(`Starting upload/verification of ${items.length} optimized MP4 videos...\n`);

  const uploadResults = [];
  let newlyUploaded = 0;
  let alreadyUploaded = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const blobPathname = item.blobPathname; // e.g. "optimized-videos/..."
    const localFilePath = item.outFilePath;

    process.stdout.write(`[${i + 1}/${items.length}] Processing ${blobPathname}... `);

    let blobUrl = null;
    let uploadStatus = '';

    // Check if already uploaded on Vercel
    if (existingMap.has(blobPathname)) {
      const existing = existingMap.get(blobPathname);
      blobUrl = existing.url;
      uploadStatus = 'ALREADY_EXISTS';
      alreadyUploaded++;
      process.stdout.write(`(already uploaded: ${blobUrl}) `);
    } else {
      const buffer = fs.readFileSync(localFilePath);
      const blob = await put(blobPathname, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'video/mp4',
        token: token,
      });
      blobUrl = blob.url;
      uploadStatus = 'UPLOADED';
      newlyUploaded++;
      process.stdout.write(`(uploaded: ${blobUrl}) `);
    }

    // Verify live URL directly
    const verification = await verifyUrl(blobUrl);
    const isValid = verification.statusCode === 200 && (verification.contentType || '').includes('video/mp4');

    if (isValid) {
      console.log(`✓ Verified HTTP 200 [${verification.contentType}]`);
    } else {
      console.error(`✗ VERIFICATION FAILED: HTTP ${verification.statusCode}, ${verification.contentType}`);
    }

    uploadResults.push({
      ...item,
      uploadStatus,
      newMp4Url: blobUrl,
      verified: isValid,
      verificationDetails: verification
    });

    // Save mapping incrementally
    fs.writeFileSync(uploadResultPath, JSON.stringify(uploadResults, null, 2));
  }

  console.log('\n========================================');
  console.log('UPLOAD & VERIFICATION SUMMARY');
  console.log('========================================');
  console.log(`Total processed:   ${uploadResults.length}`);
  console.log(`Newly uploaded:    ${newlyUploaded}`);
  console.log(`Already existed:   ${alreadyUploaded}`);
  console.log(`Verified live 200: ${uploadResults.filter(u => u.verified).length}`);
  console.log(`Failed verify:     ${uploadResults.filter(u => !u.verified).length}`);
  console.log(`Results saved to:  ${uploadResultPath}`);
  console.log('========================================');
}

uploadAll().catch(console.error);
