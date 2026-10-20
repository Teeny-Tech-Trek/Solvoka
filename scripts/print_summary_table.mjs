import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mapping = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'uploaded_videos_mapping.json'), 'utf8'));

let totalOrig = 0;
let totalOpt = 0;

console.log('| # | Video Filename | Original Size | Optimized MP4 Size | Reduction (%) | Verification Status |');
console.log('|---|---|---|---|---|---|');

mapping.forEach((m, i) => {
  totalOrig += m.originalSizeBytes;
  totalOpt += m.optimizedSizeBytes;
  const origMB = (m.originalSizeBytes / (1024 * 1024)).toFixed(2) + ' MB';
  const optMB = (m.optimizedSizeBytes / (1024 * 1024)).toFixed(2) + ' MB';
  const status = m.verified ? 'Verified (HTTP 200, H.264, -an)' : 'Failed';
  console.log(`| ${i + 1} | \`${m.pathname}\` | ${origMB} | ${optMB} | ${m.savingsPercent}% | ${status} |`);
});

const totalSavingsMB = ((totalOrig - totalOpt) / (1024 * 1024)).toFixed(2);
const totalSavingsPct = (((totalOrig - totalOpt) / totalOrig) * 100).toFixed(1);
console.log('\nTotal Original:', (totalOrig / (1024 * 1024)).toFixed(2), 'MB');
console.log('Total Optimized:', (totalOpt / (1024 * 1024)).toFixed(2), 'MB');
console.log('Total Saved:', totalSavingsMB, 'MB (' + totalSavingsPct + '%)');
