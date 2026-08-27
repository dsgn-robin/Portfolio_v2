/** Télécharge les médias dans l’artefact Pages, jamais dans le dépôt source. */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve("dist/public/media");
const assets = [
  ["phone-brainstorming.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/vUYYcrJIViItEGdw.webp"],
  ["phone-conception-produit.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/fBHkXYXvcseVfJxi.webp"],
  ["phone-interface.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/KhnryqTvCuTXSCQj.webp"],
  ["phone-bleu.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/DkghsOPKJvuKIzKs.webp"],
  ["phone-jaune.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/fpoNdmYaVPQRPynZ.webp"],
  ["phone-orange.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/JjiyJiEQAYZKVblJ.webp"],
  ["phone-vert.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/VqzktopHWsFmmXjP.webp"],
  ["phone-all.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/MFLFKpMsnmxvJpGV.webp"],
  ["phone-vue-filaire.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/enbQetrwZcPGdjAH.webp"],
  ["photo-grille.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/GxksQutsvsZJdAuj.webp"],
  ["photo-moto-traitement.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/DGwVotROtByeDKQk.webp"],
  ["photo-moto-prise.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/UFVWgkkYtXUINJiJ.webp"],
  ["photo-poteau-traitement.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/MIaGoyHNZDAWKMre.webp"],
  ["photo-poteau-prise.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/zbDkxpUHBNwDbtHa.webp"],
  ["photo-velo-traitement.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/sPLxmsHSnSXpFBtK.webp"],
  ["photo-velo-prise.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/CfbqGEjifYpyEQAd.webp"],
  ["identite-portfolio.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/XkABpzjSlaqZnOAg.webp"],
  ["identite-logo-decompose.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/swDFrCWswMSvrWnM.webp"],
  ["identite-palette.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/uRqGJxDqXvaCvznl.webp"],
  ["identite-typographie.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/AxDBpIdAjROCqjEe.webp"],
  ["drone-cahier-des-charges.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/IxPNaIZGoPCeDYwo.webp"],
  ["drone-projet-scolaire.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/eLaMpDzoQvzEsPYM.webp"],
  ["drone-mise-en-plan.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/SlHpiGjngzDnutNY.webp"],
  ["drone-plaque-electronique.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/MgXBrNqWduApjRwS.webp"],
  ["drone-schema-exigences.webp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/CdIPPlQCgyJIqFPq.webp"],
  ["drone-speedx-logo.png", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/GXvmyYSmbMhvzwHO.png"],
  ["essential-phone.glb", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/UlJzjKyUwwEBwsne.glb"],
  ["projet-photo.glb", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/oVFYXzpluwWlCWmK.glb"],
  ["identite-visuelle.glb", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/JLortpdObdplTIHx.glb"],
  ["projet-drone.glb", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/DqSmbYBdhVLZcAmu.glb"],
  ["speedx-film.mp4", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/stpBuoyiYCfWmKed.mp4"],
  ["speedx-fr.vtt", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/hJcwwXwQLOkcJyTD.vtt"],
  ["drone-test-vertical.mp4", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919012215/oTuvqSUbAiAMzixH.mp4"],
];

await mkdir(output, { recursive: true });
await Promise.all(assets.map(async ([filename, url]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Téléchargement impossible (${response.status}) : ${filename}`);
  await writeFile(resolve(output, filename), Buffer.from(await response.arrayBuffer()));
}));
console.log(`${assets.length} médias ajoutés à l’artefact GitHub Pages.`);
