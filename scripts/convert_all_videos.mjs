import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.resolve(__dirname, '../temp_videos/source');
const mp4OutputDir = path.resolve(__dirname, '../temp_videos/mp4');
const probeResultsPath = path.resolve(__dirname, 'probe_results.json');

if (!fs.existsSync(mp4OutputDir)) {
  fs.mkdirSync(mp4OutputDir, { recursive: true });
}

function probeVideo(filePath) {
  try {
    execFileSync(ffmpegPath, ['-i', filePath], { stdio: 'pipe' });
    return '';
  } catch (err) {
    return err.stderr ? err.stderr.toString() : '';
  }
}

async function convertAll() {
  const items = JSON.parse(fs.readFileSync(probeResultsPath, 'utf8'));
  console.log(`Starting conversion of ${items.length} videos to H.264 MP4 (CRF 28, preset slow, faststart, -an)...\n`);

  const results = [];
  let totalOrigBytes = 0;
  let totalNewBytes = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const relMp4Path = item.pathname.replace(/\.webm$/i, '.mp4');
    const outFilePath = path.join(mp4OutputDir, relMp4Path);

    // Ensure output directory exists
    const outDir = path.dirname(outFilePath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const sourceFile = item.localPath;
    if (!fs.existsSync(sourceFile)) {
      throw new Error(`Source file missing: ${sourceFile}`);
    }

    const origSize = fs.statSync(sourceFile).size;
    totalOrigBytes += origSize;

    process.stdout.write(`[${i + 1}/${items.length}] Converting ${item.pathname} (${(origSize / 1024 / 1024).toFixed(2)} MB)... `);

    const t0 = Date.now();
    const args = [
      '-i', sourceFile,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '28',
      '-pix_fmt', 'yuv420p',
      '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
      '-an',
      '-movflags', '+faststart',
      '-y',
      outFilePath
    ];

    try {
      execFileSync(ffmpegPath, args, { stdio: 'pipe' });
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      const newSize = fs.statSync(outFilePath).size;
      totalNewBytes += newSize;
      const reduction = (((origSize - newSize) / origSize) * 100).toFixed(1);

      // Validate converted video
      const probeInfo = probeVideo(outFilePath);
      const isValidH264 = probeInfo.includes('h264') || probeInfo.includes('H.264');
      const hasAudio = probeInfo.includes('Audio:');

      console.log(`-> ${(newSize / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction) in ${elapsed}s [Valid H264: ${isValidH264}, Audio: ${hasAudio ? 'YES' : 'NONE'}]`);

      results.push({
        index: i + 1,
        pathname: item.pathname,
        relMp4Path,
        blobPathname: `optimized-videos/${relMp4Path}`,
        originalUrl: item.url,
        sourcePath: sourceFile,
        outFilePath,
        originalSizeBytes: origSize,
        optimizedSizeBytes: newSize,
        savingsPercent: reduction,
        durationSeconds: elapsed,
        isValidH264,
        hasAudio,
        success: true
      });
    } catch (err) {
      console.error(`\n  FAILED ${item.pathname}:`, err.message);
      results.push({
        index: i + 1,
        pathname: item.pathname,
        relMp4Path,
        blobPathname: `optimized-videos/${relMp4Path}`,
        originalUrl: item.url,
        originalSizeBytes: origSize,
        success: false,
        error: err.message
      });
    }
  }

  const overallReduction = (((totalOrigBytes - totalNewBytes) / totalOrigBytes) * 100).toFixed(1);
  console.log('\n========================================');
  console.log('CONVERSION COMPLETED');
  console.log('========================================');
  console.log(`Total videos processed: ${results.length}`);
  console.log(`Successful:             ${results.filter(r => r.success).length}`);
  console.log(`Failed:                 ${results.filter(r => !r.success).length}`);
  console.log(`Original Total Size:    ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized Total Size:   ${(totalNewBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Size Reduction:   ${((totalOrigBytes - totalNewBytes) / 1024 / 1024).toFixed(2)} MB (${overallReduction}%)`);
  console.log('========================================');

  const reportPath = path.resolve(__dirname, 'mp4_conversion_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`Report saved to ${reportPath}`);
}

convertAll().catch(console.error);
