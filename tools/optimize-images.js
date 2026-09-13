// tools/optimize-images.js
// One-off dev script: re-encodes every JPEG in assets/img/ at a sane max
// width and JPEG quality to cut file size for faster page loads. Uses
// jimp (installed as a build-time-only devDependency, see .gitignore /
// .vercelignore — node_modules is never shipped).
'use strict';

const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const MAX_DIMENSION = 1400; // longest side — catches tall portrait photos too, not just wide ones
const QUALITY = 78;

(async function main() {
  const files = fs.readdirSync(IMG_DIR).filter(function (f) { return /\.(jpe?g)$/i.test(f); });
  let totalBefore = 0, totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(IMG_DIR, file);
    const before = fs.statSync(filePath).size;
    totalBefore += before;

    const img = await Jimp.read(filePath);
    const longest = Math.max(img.bitmap.width, img.bitmap.height);
    if (longest > MAX_DIMENSION) {
      if (img.bitmap.width >= img.bitmap.height) img.resize({ w: MAX_DIMENSION });
      else img.resize({ h: MAX_DIMENSION });
    }
    const buffer = await img.getBuffer('image/jpeg', { quality: QUALITY });
    fs.writeFileSync(filePath, buffer);

    const after = buffer.length;
    totalAfter += after;
    const pct = (100 * (1 - after / before)).toFixed(0);
    console.log(file.padEnd(20), (before / 1024 | 0) + ' KB -> ' + (after / 1024 | 0) + ' KB  (-' + pct + '%)');
  }

  console.log('\nTotal: ' + (totalBefore / 1024 / 1024).toFixed(1) + ' MB -> ' + (totalAfter / 1024 / 1024).toFixed(1) + ' MB');
})();
