import fs from "node:fs";
import path from "node:path";

const outputRoot = process.argv[2];
const inputFiles = process.argv.slice(3);

if (!outputRoot || inputFiles.length === 0) {
  throw new Error("Usage: node scripts/extract-glb-materials.mjs <output-dir> <file.glb> [...]");
}

const chunkTypes = { JSON: 0x4e4f534a, BIN: 0x004e4942 };
const extensions = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };

function parseGlb(filePath) {
  const source = fs.readFileSync(filePath);
  if (source.readUInt32LE(0) !== 0x46546c67) throw new Error(`${filePath} n’est pas un GLB.`);
  let cursor = 12;
  let json;
  let binary;
  while (cursor < source.length) {
    const chunkLength = source.readUInt32LE(cursor);
    const chunkType = source.readUInt32LE(cursor + 4);
    const chunk = source.subarray(cursor + 8, cursor + 8 + chunkLength);
    if (chunkType === chunkTypes.JSON) json = JSON.parse(chunk.toString("utf8").trim());
    if (chunkType === chunkTypes.BIN) binary = chunk;
    cursor += 8 + chunkLength;
  }
  return { json, binary };
}

for (const filePath of inputFiles) {
  const { json, binary } = parseGlb(filePath);
  const name = path.basename(filePath, ".glb");
  const destination = path.join(outputRoot, name);
  fs.mkdirSync(destination, { recursive: true });

  const images = (json.images ?? []).map((image, index) => {
    const bufferView = image.bufferView === undefined ? null : json.bufferViews?.[image.bufferView];
    const mimeType = image.mimeType ?? "image/png";
    const extension = extensions[mimeType] ?? "bin";
    const filename = `${String(index).padStart(2, "0")}-${(image.name ?? "image").replace(/[^a-z0-9_-]/gi, "_")}.${extension}`;
    if (bufferView && binary) {
      const start = bufferView.byteOffset ?? 0;
      fs.writeFileSync(path.join(destination, filename), binary.subarray(start, start + bufferView.byteLength));
    }
    return { index, name: image.name ?? "image", mimeType, filename, textureReferences: (json.textures ?? []).flatMap((texture, textureIndex) => texture.source === index ? [textureIndex] : []) };
  });

  fs.writeFileSync(
    path.join(destination, "material-manifest.json"),
    JSON.stringify({
      source: path.basename(filePath),
      materials: json.materials ?? [],
      textures: json.textures ?? [],
      images,
      extensionsUsed: json.extensionsUsed ?? [],
    }, null, 2),
  );
  console.log(`${name}: ${images.length} image(s) et ${(json.materials ?? []).length} matériau(x) extraits.`);
}
