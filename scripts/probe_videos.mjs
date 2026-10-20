import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.resolve(__dirname, '../temp_videos/source');
const auditReportPath = path.resolve(__dirname, 'audit_report.json');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`HTTP status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function probeVideo(filePath) {
  try {
    // ffmpeg -i <file> prints info to stderr and exits with error if no output file
    execFileSync(ffmpegPath, ['-i', filePath], { stdio: 'pipe' });
    return '';
  } catch (err) {
    return err.stderr ? err.stderr.toString() : '';
  }
}

async function main() {
  const report = JSON.parse(fs.readFileSync(auditReportPath, 'utf8'));
  const blobs = report.matchedBlobs;

  console.log(`Starting download and probe of ${blobs.length} WebM files...`);

  const probeResults = [];

  for (let i = 0; i < blobs.length; i++) {
    const item = blobs[i];
    const safeName = item.pathname.replace(/[\/\\ ]/g, '_');
    const localPath = path.join(tempDir, safeName);

    process.stdout.write(`[${i + 1}/${blobs.length}] Downloading ${item.pathname}... `);

    if (!fs.existsSync(localPath) || fs.statSync(localPath).size === 0) {
      await downloadFile(item.url, localPath);
    }
    const downloadedSize = fs.statSync(localPath).size;
    console.log(`(${(downloadedSize / 1024 / 1024).toFixed(2)} MB)`);

    const info = probeVideo(localPath);

    // Extract stream details
    const videoStreamMatch = info.match(/Stream #0:\d.*Video: (.+)/);
    const videoStream = videoStreamMatch ? videoStreamMatch[1] : 'Unknown';

    const audioStreamMatch = info.match(/Stream #0:\d.*Audio: (.+)/);
    const hasAudio = !!audioStreamMatch;

    const durationMatch = info.match(/Duration: (\d{2}:\d{2}:\d{2}\.\d+)/);
    const duration = durationMatch ? durationMatch[1] : 'Unknown';

    const hasAlpha = videoStream.includes('yuva') || videoStream.toLowerCase().includes('alpha');

    probeResults.push({
      index: i + 1,
      pathname: item.pathname,
      url: item.url,
      localPath,
      size: downloadedSize,
      duration,
      videoStream,
      hasAudio,
      hasAlpha
    });

    if (hasAlpha) {
      console.log(`  >>> WARNING: ${item.pathname} HAS ALPHA/TRANSPARENCY: ${videoStream}`);
    }
  }

  const resultPath = path.resolve(__dirname, 'probe_results.json');
  fs.writeFileSync(resultPath, JSON.stringify(probeResults, null, 2));
  console.log(`\nProbe results saved to ${resultPath}`);

  const alphaCount = probeResults.filter(p => p.hasAlpha).length;
  const audioCount = probeResults.filter(p => p.hasAudio).length;
  console.log(`Summary:`);
  console.log(`- Total videos downloaded & probed: ${probeResults.length}`);
  console.log(`- Videos with alpha channel: ${alphaCount}`);
  console.log(`- Videos with audio track: ${audioCount}`);
}

main().catch(console.error);
