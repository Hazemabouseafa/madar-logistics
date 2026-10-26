import sharp from "sharp";

const inputPath = "C:/Users/w.i/.gemini/antigravity/brain/111ef4d0-b9fa-4ed9-82aa-91d3d5253380/.user_uploaded/media_1792963347879.jpg";

async function inspect() {
  const metadata = await sharp(inputPath).metadata();
  console.log("Image dimensions:", metadata.width, "x", metadata.height, "format:", metadata.format);
}

inspect().catch(console.error);
