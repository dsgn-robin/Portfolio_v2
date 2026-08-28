/** Réduit les textures des GLB de l’artefact Pages, jamais dans le dépôt source. */
import { execFileSync } from "node:child_process";
import { readdir, rename, stat, unlink } from "node:fs/promises";
import { resolve } from "node:path";

const media = resolve("dist/public/media");
const cli = resolve("node_modules/.bin/gltf-transform");
const maxTextureSize = 1024;

const models = (await readdir(media)).filter((file) => file.endsWith(".glb"));

for (const model of models) {
  const source = resolve(media, model);
  const resized = source.replace(/\.glb$/, ".resized.glb");
  const compressed = source.replace(/\.glb$/, ".compressed.glb");
  const before = (await stat(source)).size;

  execFileSync(cli, ["resize", source, resized, "--width", String(maxTextureSize), "--height", String(maxTextureSize)], { stdio: "inherit" });
  execFileSync(cli, ["webp", resized, compressed, "--slots", "*"], { stdio: "inherit" });
  await unlink(resized);
  await rename(compressed, source);

  const after = (await stat(source)).size;
  console.log(`${model} : ${(before / 1e6).toFixed(2)} Mo → ${(after / 1e6).toFixed(2)} Mo`);
}
