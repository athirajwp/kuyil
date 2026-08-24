const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, 'public', 'kuyil-bird-frames.png');

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    const width = this.width;
    const height = this.height;

    // Process all pixels: set dark bird pixels to black, all background to 100% transparent!
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Is dark bird pixel?
        const isDark = r < 80 && g < 80 && b < 80;

        if (isDark) {
          this.data[idx] = 0;
          this.data[idx + 1] = 0;
          this.data[idx + 2] = 0;
          this.data[idx + 3] = 255;
        } else {
          // Transparent background for ALL non-bird pixels!
          this.data[idx] = 0;
          this.data[idx + 1] = 0;
          this.data[idx + 2] = 0;
          this.data[idx + 3] = 0;
        }
      }
    }

    const halfW = Math.floor(width / 2);
    const halfH = Math.floor(height / 2);

    const frames = [
      { name: 'kuyil-frame-1.png', x0: 0, y0: 0, w: halfW, h: halfH },     // Top Left: Resting
      { name: 'kuyil-frame-2.png', x0: halfW, y0: 0, w: halfW, h: halfH }, // Top Right: Wings UP
      { name: 'kuyil-frame-3.png', x0: 0, y0: halfH, w: halfW, h: halfH }, // Bottom Left: Wings MID
      { name: 'kuyil-frame-4.png', x0: halfW, y0: halfH, w: halfW, h: halfH } // Bottom Right: Wings LOW
    ];

    frames.forEach(f => {
      const framePng = new PNG({ width: f.w, height: f.h });
      for (let y = 0; y < f.h; y++) {
        for (let x = 0; x < f.w; x++) {
          const srcIdx = (width * (f.y0 + y) + (f.x0 + x)) << 2;
          const dstIdx = (f.w * y + x) << 2;
          framePng.data[dstIdx] = this.data[srcIdx];
          framePng.data[dstIdx + 1] = this.data[srcIdx + 1];
          framePng.data[dstIdx + 2] = this.data[srcIdx + 2];
          framePng.data[dstIdx + 3] = this.data[srcIdx + 3];
        }
      }
      const framePath = path.join(__dirname, 'public', f.name);
      framePng.pack().pipe(fs.createWriteStream(framePath)).on('finish', () => {
        console.log('Saved 100% transparent frame:', f.name);
      });
    });
  });
