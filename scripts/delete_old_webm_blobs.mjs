import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { del, list } from '@vercel/blob';

dotenv.config({ path: '.env.local' });

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN is not defined in .env.local');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mappingPath = path.resolve(__dirname, 'uploaded_videos_mapping.json');

async function removeOldWebmBlobs() {
  const items = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

  // Safety checks
  const unverified = items.filter(i => !i.verified);
  if (unverified.length > 0) {
    throw new Error(`Cannot delete: ${unverified.length} videos were not verified!`);
  }

  console.log(`Verified that all ${items.length} replacement MP4 videos are live and functional.`);

  // Collect the exact original WebM URLs to delete
  const urlsToDelete = items.map(i => i.originalUrl);
  console.log(`Prepared ${urlsToDelete.length} obsolete WebM URLs for deletion.`);

  console.log('\nQuerying Vercel Blob store before deletion...');
  const { blobs: beforeBlobs } = await list({ token });
  const beforeWebms = beforeBlobs.filter(b => b.pathname.endsWith('.webm'));
  const beforeMp4s = beforeBlobs.filter(b => b.pathname.endsWith('.mp4'));
  const beforeWebps = beforeBlobs.filter(b => b.pathname.endsWith('.webp'));

  console.log(`Store contents before deletion:`);
  console.log(` - Total blobs: ${beforeBlobs.length}`);
  console.log(` - WebM blobs:  ${beforeWebms.length}`);
  console.log(` - MP4 blobs:   ${beforeMp4s.length}`);
  console.log(` - WebP blobs:  ${beforeWebps.length}`);

  console.log('\nDeleting obsolete WebM blobs from Vercel Blob...');
  await del(urlsToDelete, { token });
  console.log('Deletion request completed.');

  console.log('\nQuerying Vercel Blob store after deletion to confirm...');
  const { blobs: afterBlobs } = await list({ token });
  const afterWebms = afterBlobs.filter(b => b.pathname.endsWith('.webm'));
  const afterMp4s = afterBlobs.filter(b => b.pathname.endsWith('.mp4'));
  const afterWebps = afterBlobs.filter(b => b.pathname.endsWith('.webp'));

  console.log(`Store contents after deletion:`);
  console.log(` - Total blobs: ${afterBlobs.length}`);
  console.log(` - WebM blobs:  ${afterWebms.length}`);
  console.log(` - MP4 blobs:   ${afterMp4s.length}`);
  console.log(` - WebP blobs:  ${afterWebps.length}`);

  if (afterWebms.length === 0 && afterMp4s.length === 42 && afterWebps.length === beforeWebps.length) {
    console.log('\n✓ SUCCESS: All 42 obsolete WebM videos removed! All MP4s and WebP images preserved intact.');
  } else {
    console.warn('\nWarning: WebM count is', afterWebms.length);
  }

  const deleteReport = {
    deletedCount: urlsToDelete.length,
    deletedUrls: urlsToDelete,
    remainingBlobsCount: afterBlobs.length,
    remainingWebms: afterWebms.length,
    remainingMp4s: afterMp4s.length,
    remainingWebps: afterWebps.length
  };

  fs.writeFileSync(path.resolve(__dirname, 'deletion_report.json'), JSON.stringify(deleteReport, null, 2));
}

removeOldWebmBlobs().catch(console.error);
