import sharp from "sharp";
import path from "path";

const inputPath = "C:/Users/w.i/.gemini/antigravity/brain/111ef4d0-b9fa-4ed9-82aa-91d3d5253380/.user_uploaded/media_1792963347879.jpg";
const outputDir = path.join(process.cwd(), "public");

async function generateCleanLogos() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  // Exact bounds detected: X=[29, 443] Y=[448, 607]
  const pad = 12;
  const minX = Math.max(0, 29 - pad);
  const maxX = Math.min(width - 1, 443 + pad);
  const minY = Math.max(0, 448 - pad);
  const maxY = Math.min(info.height - 1, 607 + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  console.log(`Refining transparent logos: ${cropW} x ${cropH}...`);

  const bufOriginal = Buffer.alloc(cropW * cropH * 4);
  const bufWhite = Buffer.alloc(cropW * cropH * 4);
  const bufGold = Buffer.alloc(cropW * cropH * 4);

  // Background threshold:
  // Pure ink: avg ~ 50. Edges: avg ~ 70-170.
  // Faint paper/compression artifacts: avg 210-255.
  // We want pure 0 alpha whenever avg >= 215.
  const BG_THRESHOLD = 215;
  const INK_SOLID = 130;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const srcIdx = (y * width + x) * channels;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const outX = x - minX;
      const outY = y - minY;
      const outIdx = (outY * cropW + outX) * 4;

      const avg = (r + g + b) / 3;

      let alpha = 0;
      if (avg < BG_THRESHOLD) {
        if (avg <= INK_SOLID) {
          alpha = 255;
        } else {
          // Linear smooth anti-aliased transition between BG_THRESHOLD and INK_SOLID
          const factor = (BG_THRESHOLD - avg) / (BG_THRESHOLD - INK_SOLID);
          alpha = Math.round(Math.pow(factor, 1.2) * 255);
        }
      }

      if (alpha > 0) {
        // Logo brand colors:
        // Original brand navy/teal blue: #003e6b / rgb(0, 62, 107)
        bufOriginal[outIdx] = 0;
        bufOriginal[outIdx + 1] = 62;
        bufOriginal[outIdx + 2] = 107;
        bufOriginal[outIdx + 3] = alpha;

        // White logo for dark backgrounds
        bufWhite[outIdx] = 255;
        bufWhite[outIdx + 1] = 255;
        bufWhite[outIdx + 2] = 255;
        bufWhite[outIdx + 3] = alpha;

        // Gold logo (#F59E0B)
        bufGold[outIdx] = 245;
        bufGold[outIdx + 1] = 158;
        bufGold[outIdx + 2] = 11;
        bufGold[outIdx + 3] = alpha;
      } else {
        bufOriginal[outIdx] = 0;
        bufOriginal[outIdx + 1] = 0;
        bufOriginal[outIdx + 2] = 0;
        bufOriginal[outIdx + 3] = 0;

        bufWhite[outIdx] = 0;
        bufWhite[outIdx + 1] = 0;
        bufWhite[outIdx + 2] = 0;
        bufWhite[outIdx + 3] = 0;

        bufGold[outIdx] = 0;
        bufGold[outIdx + 1] = 0;
        bufGold[outIdx + 2] = 0;
        bufGold[outIdx + 3] = 0;
      }
    }
  }

  // 1. Original Navy Blue on transparent
  await sharp(bufOriginal, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo.png"));

  // 2. Pure White on transparent (great for dark navbar/footer)
  await sharp(bufWhite, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-white.png"));

  // 3. Gold on transparent
  await sharp(bufGold, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-gold.png"));

  // 4. Mark only (the stylized M emblem with arrow and road)
  const markMinX = Math.max(0, 29 - pad);
  const markMaxX = 215 + pad;
  const markW = markMaxX - markMinX + 1;
  const markH = cropH;

  const bufMarkOriginal = Buffer.alloc(markW * markH * 4);
  const bufMarkWhite = Buffer.alloc(markW * markH * 4);

  for (let y = 0; y < markH; y++) {
    for (let x = 0; x < markW; x++) {
      const srcOutIdx = (y * cropW + x) * 4;
      const targetIdx = (y * markW + x) * 4;

      bufMarkOriginal[targetIdx] = bufOriginal[srcOutIdx];
      bufMarkOriginal[targetIdx + 1] = bufOriginal[srcOutIdx + 1];
      bufMarkOriginal[targetIdx + 2] = bufOriginal[srcOutIdx + 2];
      bufMarkOriginal[targetIdx + 3] = bufOriginal[srcOutIdx + 3];

      bufMarkWhite[targetIdx] = bufWhite[srcOutIdx];
      bufMarkWhite[targetIdx + 1] = bufWhite[srcOutIdx + 1];
      bufMarkWhite[targetIdx + 2] = bufWhite[srcOutIdx + 2];
      bufMarkWhite[targetIdx + 3] = bufWhite[srcOutIdx + 3];
    }
  }

  await sharp(bufMarkOriginal, { raw: { width: markW, height: markH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-mark.png"));

  await sharp(bufMarkWhite, { raw: { width: markW, height: markH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-mark-white.png"));

  console.log("🎉 Successfully generated 100% clean transparent logos in public/!");
}

generateCleanLogos().catch(console.error);
