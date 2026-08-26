import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";

const files = process.argv.slice(2);

function readGlbJson(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.readUInt32LE(0) !== 0x46546c67) throw new Error(`${filePath} is not a GLB file.`);
  let offset = 12;
  while (offset < buffer.length) {
    const length = buffer.readUInt32LE(offset);
    const type = buffer.readUInt32LE(offset + 4);
    offset += 8;
    if (type === 0x4e4f534a) return JSON.parse(buffer.subarray(offset, offset + length).toString("utf8"));
    offset += length;
  }
  throw new Error(`No JSON chunk found in ${filePath}.`);
}

function accessBox(gltf, accessorIndex) {
  const accessor = gltf.accessors?.[accessorIndex];
  if (!accessor?.min || !accessor?.max) return null;
  return new THREE.Box3(
    new THREE.Vector3(...accessor.min),
    new THREE.Vector3(...accessor.max),
  );
}

function meshBox(gltf, meshIndex) {
  const mesh = gltf.meshes?.[meshIndex];
  const result = new THREE.Box3();
  let hasBounds = false;
  mesh?.primitives?.forEach((primitive) => {
    const box = accessBox(gltf, primitive.attributes?.POSITION);
    if (box) {
      result.union(box);
      hasBounds = true;
    }
  });
  return hasBounds ? result : null;
}

function nodeMatrix(node) {
  if (node.matrix) return new THREE.Matrix4().fromArray(node.matrix);
  return new THREE.Matrix4().compose(
    new THREE.Vector3(...(node.translation ?? [0, 0, 0])),
    new THREE.Quaternion(...(node.rotation ?? [0, 0, 0, 1])),
    new THREE.Vector3(...(node.scale ?? [1, 1, 1])),
  );
}

function transformedBox(box, matrix) {
  const corners = [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ];
  return corners.reduce((result, point) => result.expandByPoint(point.applyMatrix4(matrix)), new THREE.Box3());
}

function inspect(filePath) {
  const gltf = readGlbJson(filePath);
  const bounds = new THREE.Box3();
  const nodes = gltf.nodes ?? [];
  const scenes = gltf.scenes ?? [];
  const rootNodes = scenes[gltf.scene ?? 0]?.nodes ?? nodes.map((_, index) => index);
  const visited = new Set();

  function visit(index, parentMatrix) {
    if (visited.has(index)) return;
    visited.add(index);
    const node = nodes[index] ?? {};
    const matrix = parentMatrix.clone().multiply(nodeMatrix(node));
    if (node.mesh !== undefined) {
      const box = meshBox(gltf, node.mesh);
      if (box) bounds.union(transformedBox(box, matrix));
    }
    node.children?.forEach((childIndex) => visit(childIndex, matrix));
  }

  rootNodes.forEach((index) => visit(index, new THREE.Matrix4()));
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const materials = (gltf.materials ?? []).map((material) => material.name || "sans nom");
  const images = (gltf.images ?? []).map((image, index) => ({
    index,
    mimeType: image.mimeType ?? "externe",
    bytes: image.bufferView === undefined ? null : gltf.bufferViews?.[image.bufferView]?.byteLength ?? null,
    name: image.name ?? "sans nom",
  }));
  const materialMaps = (gltf.materials ?? []).map((material, index) => ({
    index,
    name: material.name || "sans nom",
    baseColor: material.pbrMetallicRoughness?.baseColorTexture?.index ?? null,
    metallicRoughness: material.pbrMetallicRoughness?.metallicRoughnessTexture?.index ?? null,
    normal: material.normalTexture?.index ?? null,
    occlusion: material.occlusionTexture?.index ?? null,
    emissive: material.emissiveTexture?.index ?? null,
    roughnessFactor: material.pbrMetallicRoughness?.roughnessFactor ?? 1,
    metallicFactor: material.pbrMetallicRoughness?.metallicFactor ?? 1,
  }));
  return {
    file: path.basename(filePath),
    meshCount: gltf.meshes?.length ?? 0,
    nodeCount: nodes.length,
    materialCount: materials.length,
    materials: materials.slice(0, 12),
    images,
    materialMaps,
    extensions: gltf.extensionsUsed ?? [],
    bounds: {
      min: bounds.min.toArray().map((value) => Number(value.toFixed(4))),
      max: bounds.max.toArray().map((value) => Number(value.toFixed(4))),
      size: size.toArray().map((value) => Number(value.toFixed(4))),
      center: center.toArray().map((value) => Number(value.toFixed(4))),
    },
  };
}

console.log(JSON.stringify(files.map(inspect), null, 2));
