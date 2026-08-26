import fs from "node:fs";

const audit = JSON.parse(fs.readFileSync("glb-texture-audit.json", "utf8"));
const summary = audit.map((asset) => {
  const mappedMaterials = asset.materialMaps.filter((material) =>
    [material.baseColor, material.metallicRoughness, material.normal, material.occlusion, material.emissive]
      .some((map) => map !== null),
  );
  return {
    file: asset.file,
    embeddedImages: asset.images.length,
    imageMegabytes: Number((asset.images.reduce((total, image) => total + (image.bytes ?? 0), 0) / 1024 / 1024).toFixed(2)),
    mappedMaterials: mappedMaterials.length,
    totalMaterials: asset.materialMaps.length,
    maps: mappedMaterials.map((material) => ({
      material: material.name,
      baseColor: material.baseColor !== null,
      metallicRoughness: material.metallicRoughness !== null,
      normal: material.normal !== null,
      occlusion: material.occlusion !== null,
      emissive: material.emissive !== null,
    })),
  };
});

console.log(JSON.stringify(summary, null, 2));
