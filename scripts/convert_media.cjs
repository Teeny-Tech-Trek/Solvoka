const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let ffmpegPath = null;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  ffmpegPath = 'ffmpeg';
}

const PUBLIC_DIR = path.resolve(__dirname, '../public');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png']);
const GIF_EXTS = new Set(['.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.avi', '.mkv']);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function run() {
  console.log('Using ffmpeg binary:', ffmpegPath);
  console.log('Scanning public directory:', PUBLIC_DIR);

  const allFiles = getAllFiles(PUBLIC_DIR);

  const images = [];
  const gifs = [];
  const videos = [];

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXTS.has(ext)) {
      images.push(file);
    } else if (GIF_EXTS.has(ext)) {
      gifs.push(file);
    } else if (VIDEO_EXTS.has(ext)) {
      videos.push(file);
    }
  }

  console.log(`Found: ${images.length} images, ${gifs.length} GIFs, ${videos.length} videos.\n`);

  const results = [];

  // 1. Process Images (.jpg, .jpeg, .png -> .webp)
  console.log('=== CONVERTING IMAGES TO WEBP ===');
  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const relPath = path.relative(PUBLIC_DIR, file);
    const parsed = path.parse(file);
    const outPath = path.join(parsed.dir, parsed.name + '.webp');
    const beforeSize = fs.statSync(file).size;

    console.log(`[Image ${i + 1}/${images.length}] ${relPath} (${formatBytes(beforeSize)})`);

    try {
      execFileSync(
        ffmpegPath,
        [
          '-i', file,
          '-vf', "scale=w='min(1920,trunc(iw/2)*2)':h=-2",
          '-quality', '78',
          '-y',
          outPath
        ],
        { stdio: 'pipe' }
      );

      const afterSize = fs.statSync(outPath).size;
      const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
      console.log(`  -> Converted: ${formatBytes(afterSize)} (${reduction}% reduction)`);
      results.push({
        type: 'image',
        file: relPath,
        beforeSize,
        afterSize,
        newFile: path.relative(PUBLIC_DIR, outPath),
        success: true
      });
    } catch (err) {
      console.error(`  ERROR converting ${relPath}:`, err.message);
      results.push({
        type: 'image',
        file: relPath,
        beforeSize,
        afterSize: beforeSize,
        newFile: null,
        success: false,
        error: err.message
      });
    }
  }

  // 2. Process GIFs (.gif -> .webm)
  console.log('\n=== CONVERTING GIFS TO WEBM ===');
  for (let i = 0; i < gifs.length; i++) {
    const file = gifs[i];
    const relPath = path.relative(PUBLIC_DIR, file);
    const parsed = path.parse(file);
    const outPath = path.join(parsed.dir, parsed.name + '.webm');
    const beforeSize = fs.statSync(file).size;

    console.log(`[GIF ${i + 1}/${gifs.length}] ${relPath} (${formatBytes(beforeSize)})`);

    try {
      execFileSync(
        ffmpegPath,
        [
          '-i', file,
          '-c:v', 'libvpx-vp9',
          '-crf', '35',
          '-b:v', '0',
          '-an',
          '-vf', "scale=w='min(1920,trunc(iw/2)*2)':h=-2",
          '-y',
          outPath
        ],
        { stdio: 'pipe' }
      );

      const afterSize = fs.statSync(outPath).size;
      const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
      console.log(`  -> Converted: ${formatBytes(afterSize)} (${reduction}% reduction)`);
      results.push({
        type: 'gif',
        file: relPath,
        beforeSize,
        afterSize,
        newFile: path.relative(PUBLIC_DIR, outPath),
        success: true
      });
    } catch (err) {
      console.error(`  ERROR converting ${relPath}:`, err.message);
      results.push({
        type: 'gif',
        file: relPath,
        beforeSize,
        afterSize: beforeSize,
        newFile: null,
        success: false,
        error: err.message
      });
    }
  }

  // 3. Process Videos (.mp4, .mov, etc. -> .webm)
  console.log('\n=== CONVERTING VIDEOS TO WEBM ===');
  for (let i = 0; i < videos.length; i++) {
    const file = videos[i];
    const relPath = path.relative(PUBLIC_DIR, file);
    const parsed = path.parse(file);
    const outPath = path.join(parsed.dir, parsed.name + '.webm');
    const beforeSize = fs.statSync(file).size;

    console.log(`[Video ${i + 1}/${videos.length}] ${relPath} (${formatBytes(beforeSize)})`);

    try {
      execFileSync(
        ffmpegPath,
        [
          '-i', file,
          '-map', '0:v',
          '-map', '0:a?',
          '-c:v', 'libvpx-vp9',
          '-crf', '33',
          '-b:v', '0',
          '-c:a', 'libopus',
          '-vf', "scale=w='min(1920,trunc(iw/2)*2)':h=-2",
          '-y',
          outPath
        ],
        { stdio: 'pipe' }
      );

      const afterSize = fs.statSync(outPath).size;
      const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
      console.log(`  -> Converted: ${formatBytes(afterSize)} (${reduction}% reduction)`);
      results.push({
        type: 'video',
        file: relPath,
        beforeSize,
        afterSize,
        newFile: path.relative(PUBLIC_DIR, outPath),
        success: true
      });
    } catch (err) {
      console.error(`  ERROR converting ${relPath}:`, err.message);
      results.push({
        type: 'video',
        file: relPath,
        beforeSize,
        afterSize: beforeSize,
        newFile: null,
        success: false,
        error: err.message
      });
    }
  }

  // Save report
  const reportPath = path.resolve(__dirname, 'conversion_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  // Summary
  console.log('\n========================================');
  console.log('           CONVERSION SUMMARY');
  console.log('========================================');
  const totals = {
    image: { count: 0, before: 0, after: 0 },
    gif: { count: 0, before: 0, after: 0 },
    video: { count: 0, before: 0, after: 0 },
    total: { count: 0, before: 0, after: 0 }
  };

  results.forEach((r) => {
    totals[r.type].count++;
    totals[r.type].before += r.beforeSize;
    totals[r.type].after += r.afterSize;
    totals.total.count++;
    totals.total.before += r.beforeSize;
    totals.total.after += r.afterSize;
  });

  for (const type of ['image', 'gif', 'video']) {
    const t = totals[type];
    const red = t.before > 0 ? (((t.before - t.after) / t.before) * 100).toFixed(1) : 0;
    console.log(`${type.toUpperCase()}S: ${t.count} files | Before: ${formatBytes(t.before)} | After: ${formatBytes(t.after)} | Reduction: ${red}%`);
  }

  const overallRed = totals.total.before > 0 ? (((totals.total.before - totals.total.after) / totals.total.before) * 100).toFixed(1) : 0;
  console.log('----------------------------------------');
  console.log(`TOTAL: ${totals.total.count} files`);
  console.log(`Original Size: ${formatBytes(totals.total.before)}`);
  console.log(`Optimized Size: ${formatBytes(totals.total.after)}`);
  console.log(`Total Saved: ${formatBytes(totals.total.before - totals.total.after)} (${overallRed}%)`);
  console.log('========================================\n');
}

run().catch((err) => {
  console.error('Fatal script error:', err);
  process.exit(1);
});
