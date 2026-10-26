import sharp from "sharp";
import path from "path";

const inputPath = "C:/Users/w.i/.gemini/antigravity/brain/111ef4d0-b9fa-4ed9-82aa-91d3d5253380/.user_uploaded/media_1792963347879.jpg";
const outputDir = path.join(process.cwd(), "public");

async function generateTransparentLogos() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  // Exact bounds detected: X=[29, 443] Y=[448, 607]
  // Add a neat 10px margin around the logo
  const pad = 12;
  const minX = Math.max(0, 29 - pad);
  const maxX = Math.min(width - 1, 443 + pad);
  const minY = Math.max(0, 448 - pad);
  const maxY = Math.min(info.height - 1, 607 + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  console.log(`Cropping logo to: ${cropW} x ${cropH}`);

  // Create RGBA buffers for:
  // 1. Original Deep Blue logo on transparent
  // 2. Pure White logo on transparent (for dark corporate backgrounds)
  // 3. Mark only (the stylized M emblem)
  const bufOriginal = Buffer.alloc(cropW * cropH * 4);
  const bufWhite = Buffer.alloc(cropW * cropH * 4);

  // Background white reference is around 250-255
  // Deep blue ink reference: R is ~0-10, G is ~45-60, B is ~90-110
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const srcIdx = (y * width + x) * channels;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const outX = x - minX;
      const outY = y - minY;
      const outIdx = (outY * cropW + outX) * 4;

      // Calculate darkness / ink opacity (0 = white background, 255 = solid ink)
      // Pure white is ~255.
      // Logo pixels have significantly lower R and G.
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);
      const avg = (r + g + b) / 3;

      let alpha = 0;
      if (avg < 248) {
        // Smoothly map from 248 (transparent) to 180 (full solid)
        alpha = Math.min(255, Math.max(0, Math.round(((248 - avg) / (248 - 140)) * 255)));
      }

      if (alpha > 0) {
        // Original colors: keep the rich deep blue (#013668)
        // Normalize color to remove white halo
        const normR = Math.min(r, 15);
        const normG = Math.min(g, 65);
        const normB = Math.max(b, 90);

        bufOriginal[outIdx] = normR;
        bufOriginal[outIdx + 1] = normG;
        bufOriginal[outIdx + 2] = normB;
        bufOriginal[outIdx + 3] = alpha;

        // White logo: pure white (255, 255, 255) with the same alpha
        bufWhite[outIdx] = 255;
        bufWhite[outIdx + 1] = 255;
        bufWhite[outIdx + 2] = 255;
        bufWhite[outIdx + 3] = alpha;
      } else {
        bufOriginal[outIdx] = 0;
        bufOriginal[outIdx + 1] = 0;
        bufOriginal[outIdx + 2] = 0;
        bufOriginal[outIdx + 3] = 0;

        bufWhite[outIdx] = 0;
        bufWhite[outIdx + 1] = 0;
        bufWhite[outIdx + 2] = 0;
        bufWhite[outIdx + 3] = 0;
      }
    }
  }

  // 1. Save original transparent logo
  await sharp(bufOriginal, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo.png"));

  console.log("✅ Saved public/logo.png (Transparent Original Blue)");

  // 2. Save crisp white transparent logo for dark backgrounds
  await sharp(bufWhite, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-white.png"));

  console.log("✅ Saved public/logo-white.png (Transparent White for Dark theme)");

  // 3. Save M emblem mark only (X from 29 to 215)
  const markPad = 8;
  const markMinX = Math.max(0, 29 - markPad);
  const markMaxX = 215 + markPad;
  const markW = markMaxX - markMinX + 1;
  const markH = cropH;

  const bufMark = Buffer.alloc(markW * markH * 4);
  const bufMarkWhite = Buffer.alloc(markW * markH * 4);

  for (let y = 0; y < markH; y++) {
    for (let x = 0; x < markW; x++) {
      const srcOutIdx = (y * cropW + x) * 4;
      const targetIdx = (y * markW + x) * 4;

      bufMark[targetIdx] = bufOriginal[srcOutIdx];
      bufMark[targetIdx + 1] = bufOriginal[srcOutIdx + 1];
      bufMark[targetIdx + 2] = bufOriginal[srcOutIdx + 2];
      bufMark[targetIdx + 3] = bufOriginal[srcOutIdx + 3];

      bufMarkWhite[targetIdx] = 255;
      bufMarkWhite[targetIdx + 1] = 255;
      bufMarkWhite[targetIdx + 2] = 255;
      bufMarkWhite[targetIdx + 3] = bufOriginal[srcOutIdx + 3];
    }
  }

  await sharp(bufMark, { raw: { width: markW, height: markH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-mark.png"));

  await sharp(bufMarkWhite, { raw: { width: markW, height: markH, channels: 4 } })
    .png()
    .toFile(path.join(outputDir, "logo-mark-white.png"));

  console.log("✅ Saved public/logo-mark.png & public/logo-mark-white.png");
}

generateTransparentLogos().catch(console.error);
