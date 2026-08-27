import fs from "node:fs";
import path from "node:path";

function readGlbJson(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 12;
  while (offset < buffer.length) {
    const length = buffer.readUInt32LE(offset);
    const type = buffer.readUInt32LE(offset + 4);
    offset += 8;
    if (type === 0x4e4f534a) return JSON.parse(buffer.subarray(offset, offset + length).toString("utf8"));
    offset += length;
  }
  throw new Error("No JSON chunk found");
}

for (const filePath of process.argv.slice(2)) {
  const gltf = readGlbJson(filePath);
  console.log(`\n${path.basename(filePath)}`);
  (gltf.nodes ?? []).forEach((node, index) => {
    const mesh = node.mesh === undefined ? "" : ` mesh=${node.mesh}(${gltf.meshes?.[node.mesh]?.name ?? "sans nom"})`;
    const transform = ` translation=${JSON.stringify(node.translation ?? [0, 0, 0])} rotation=${JSON.stringify(node.rotation ?? [0, 0, 0, 1])} scale=${JSON.stringify(node.scale ?? [1, 1, 1])}`;
    console.log(`${index}: ${node.name ?? "sans nom"}${mesh}${transform}`);
  });
}
