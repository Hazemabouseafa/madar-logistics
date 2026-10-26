import sharp from "sharp";

const inputPath = "C:/Users/w.i/.gemini/antigravity/brain/111ef4d0-b9fa-4ed9-82aa-91d3d5253380/.user_uploaded/media_1792963347879.jpg";

async function analyzeWhiteCard() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  // Let's sample colors in the center of the card: Y=500
  console.log("Analyzing pixels around the logo area (Y=350 to 650, X=20 to 450):");

  let logoMinX = width, logoMaxX = 0, logoMinY = 1000, logoMaxY = 0;
  const colorSamples = [];

  for (let y = 320; y < 700; y++) {
    for (let x = 20; x < 450; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // If this is a logo pixel (blue/dark ink on white background)
      // On white background: r,g,b > 240
      // Logo blue: r is low (<100), g is medium (<120), b is darker blue
      if (r < 180 && g < 180) {
        if (x < logoMinX) logoMinX = x;
        if (x > logoMaxX) logoMaxX = x;
        if (y < logoMinY) logoMinY = y;
        if (y > logoMaxY) logoMaxY = y;

        if (colorSamples.length < 5 && y === 510) {
          colorSamples.push({ x, y, r, g, b });
        }
      }
    }
  }

  console.log("Sample logo pixel colors:", colorSamples);
  console.log(`Exact logo text/icon bounds: X=[${logoMinX}, ${logoMaxX}] Y=[${logoMinY}, ${logoMaxY}]`);
  console.log(`Width: ${logoMaxX - logoMinX + 1}, Height: ${logoMaxY - logoMinY + 1}`);
}

analyzeWhiteCard().catch(console.error);
