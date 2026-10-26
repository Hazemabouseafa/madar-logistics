import sharp from "sharp";
import fs from "fs";

const inputPath = "C:/Users/w.i/.gemini/antigravity/brain/111ef4d0-b9fa-4ed9-82aa-91d3d5253380/.user_uploaded/media_1792963347879.jpg";

async function findLogoBounds() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  console.log(`Analyzing ${width}x${height} with ${channels} channels...`);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  // We are looking for the dark blue logo pixels in the middle white card
  // Logo color is deep blue: R is low (~0-60), G is moderate (~60-120), B is high (~100-180), or overall brightness < 200
  // Note: the top and bottom of the screenshot are black (R<30, G<30, B<30).
  // The white card is roughly around Y: 250 to 750, X: 0 to width.
  for (let y = 200; y < 800; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Logo pixels are dark blue: not white (brightness < 220) and not black background
      const brightness = (r + g + b) / 3;
      if (brightness < 200 && (b > 60 || g > 40 || r > 20)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Detected logo bounding box: X=[${minX}, ${maxX}] Y=[${minY}, ${maxY}]`);
  console.log(`Logo width: ${maxX - minX + 1}, height: ${maxY - minY + 1}`);

  return { minX, minY, maxX, maxY };
}

findLogoBounds().catch(console.error);
