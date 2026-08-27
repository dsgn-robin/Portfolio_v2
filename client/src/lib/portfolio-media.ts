/**
 * Les médias restent hors du dépôt pendant le développement Manus. Le workflow
 * GitHub Pages les ajoute à l’artefact statique sous /media, sur le même domaine.
 */
const GITHUB_PAGES_MEDIA: Record<string, string> = {
  "/manus-storage/Brainstorming_18f5122b.webp": "phone-brainstorming.webp",
  "/manus-storage/Conception_produit_d54893c9.webp": "phone-conception-produit.webp",
  "/manus-storage/Interface_2b746d80.webp": "phone-interface.webp",
  "/manus-storage/Phone_Bleu_64f2f08f.webp": "phone-bleu.webp",
  "/manus-storage/Phone_Jaune_c66dbf63.webp": "phone-jaune.webp",
  "/manus-storage/Phone_Orange_baa9c0c5.webp": "phone-orange.webp",
  "/manus-storage/Phone_Vert_f298d798.webp": "phone-vert.webp",
  "/manus-storage/Phone_all_3b29be5b.webp": "phone-all.webp",
  "/manus-storage/Phone_vue_filaire_fdeeede1.webp": "phone-vue-filaire.webp",
  "/manus-storage/grille_photo_45799468.webp": "photo-grille.webp",
  "/manus-storage/moto_j_a_e9ccff93.webp": "photo-moto-traitement.webp",
  "/manus-storage/moto_j_b_e27fde92.webp": "photo-moto-prise.webp",
  "/manus-storage/poteau_j_a_85a0583d.webp": "photo-poteau-traitement.webp",
  "/manus-storage/poteau_j_b_7c1b96e3.webp": "photo-poteau-prise.webp",
  "/manus-storage/velo_j_a_7b8a6040.webp": "photo-velo-traitement.webp",
  "/manus-storage/velo_j_b_e3acdf92.webp": "photo-velo-prise.webp",
  "/manus-storage/Identite_visuelle_sur_Portfolio_bf5985cb.webp": "identite-portfolio.webp",
  "/manus-storage/Logo_decompose_f1d05b0f.webp": "identite-logo-decompose.webp",
  "/manus-storage/Palette_de_couleur_48dbce34.webp": "identite-palette.webp",
  "/manus-storage/Typographie_130b9b2f.webp": "identite-typographie.webp",
  "/manus-storage/Cahier_des_charges_0eb8a6dc.webp": "drone-cahier-des-charges.webp",
  "/manus-storage/Projet_scolaire-1_4b0ec8ec.webp": "drone-projet-scolaire.webp",
  "/manus-storage/mise_en_plan_8088ebb8.webp": "drone-mise-en-plan.webp",
  "/manus-storage/plaque_electronique_48d7d129.webp": "drone-plaque-electronique.webp",
  "/manus-storage/schema_des_exigences_e43b8abb.webp": "drone-schema-exigences.webp",
  "/manus-storage/speedx-logo_ca6dcda9.png": "drone-speedx-logo.png",
  "/manus-storage/Phone_bleu_b4045bcc.glb": "essential-phone.glb",
  "/manus-storage/photo_2b003e1a.glb": "projet-photo.glb",
  "/manus-storage/identite_17dcad1d.glb": "identite-visuelle.glb",
  "/manus-storage/drone-only_8f6c3309.glb": "projet-drone.glb",
  "/manus-storage/Video_drone_seul_2fec9be4.mp4": "speedx-film.mp4",
  "/manus-storage/sous_titres_5f697c02.vtt": "speedx-fr.vtt",
};

export function resolvePortfolioMedia(path: string) {
  const filename = GITHUB_PAGES_MEDIA[path];
  if (!filename || import.meta.env.BASE_URL === "/") return path;
  return `${import.meta.env.BASE_URL}media/${filename}`;
}
