import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.resolve(__dirname, '../temp_videos/source');
const testOutDir = path.resolve(__dirname, '../temp_videos/test_out');

if (!fs.existsSync(testOutDir)) {
  fs.mkdirSync(testOutDir, { recursive: true });
}

const testFiles = [
  'HeroPage-Video.webm',
  'Automotive-videos_Red_tractor_on_white_background_20261019184449.webm',
  'Gif-Assets_CNC_Milling_Machine_Video_Ready.webm',
  'Chatbot-Icon-Video.webm'
];

for (const f of testFiles) {
  const inPath = path.join(sourceDir, f);
  if (!fs.existsSync(inPath)) {
    console.log(`Missing ${f}`);
    continue;
  }
  const inSize = fs.statSync(inPath).size;

  for (const crf of [26, 28, 30]) {
    const outName = `${path.parse(f).name}_crf${crf}.mp4`;
    const outPath = path.join(testOutDir, outName);

    const args = [
      '-i', inPath,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', String(crf),
      '-pix_fmt', 'yuv420p',
      '-vf', "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-an',
      '-movflags', '+faststart',
      '-y',
      outPath
    ];

    const t0 = Date.now();
    execFileSync(ffmpegPath, args, { stdio: 'pipe' });
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const outSize = fs.statSync(outPath).size;
    const savings = (((inSize - outSize) / inSize) * 100).toFixed(1);

    console.log(`${f} (CRF ${crf}) [${elapsed}s]: ${(inSize/1024).toFixed(0)}KB -> ${(outSize/1024).toFixed(0)}KB (${savings}% savings)`);
  }
}
