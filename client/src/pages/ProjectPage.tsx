/**
 * Style reminder — « Affiches en série » : papier chaud, encre noire,
 * géométrie Bauhaus, asymétrie éditoriale et documents d’atelier temporaires.
 */
import { ArrowDown, ArrowUp, ArrowUpRight, CornerUpLeft, MoveUpRight, Share2, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link, useLocation } from "wouter";
import EssentialPhoneViewer from "@/components/EssentialPhoneViewer";
import { resolvePortfolioMedia } from "@/lib/portfolio-media";

type Project = {
  slug: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  accent: string;
  accentDark: string;
  accentSoft: string;
  motif: "phone" | "photo" | "identity" | "drone";
  year: string;
  context: string;
  objective: string;
  process: string[];
  learning: string[];
  tools: string[];
  documents: { label: string; type: string; note: string; image: string; alt: string; shape: "tall" | "wide" | "square"; ratio?: string }[];
  gallery?: { image: string; alt: string; label: string }[];
  comparisons?: { subject: string; treatment: string; original: string; treatmentAlt: string; originalAlt: string }[];
  archiveVideo?: { type: string; note: string; src: string };
  video?: { src: string; captions: string; title: string; description: string };
};

type LightboxAsset =
  | { kind: "image"; source: string; alt: string; label: string }
  | { kind: "video"; source: string; label: string; note: string };

const PROJECTS: Project[] = [
  {
    slug: "essential-phone",
    number: "01",
    category: "Objet numérique",
    title: "Essential\nPhone",
    subtitle: "Un téléphone pensé pour garder l’essentiel, sans les distractions.",
    accent: "6C97C2",
    accentDark: "315A97",
    accentSoft: "B8D1E3",
    motif: "phone",
    year: "2026",
    context:
      "Conscient de l’impact nocif possible des smartphones sur notre vie dès mon entrée au lycée en 2023, j’ai cherché à m’en libérer. Pour concilier déconnexion et accès aux outils de messagerie essentiels, j’ai conçu mon propre téléphone minimaliste adapté à mes besoins.",
    objective: "Réduire l’interface à des usages essentiels : communiquer, se repérer, écouter, photographier — puis laisser le reste hors champ.",
    process: ["Recherche d’identité", "Interface et logo", "Objet et rendu 3D"],
    learning: ["Réfléchir à l’identité et l’impact d’un projet", "Concevoir un logo significatif", "Concevoir un objet 3D plus complexe", "Réaliser une scène d’éclairage 3D"],
    tools: ["Blender", "Figma", "Canva"],
    documents: [
      { label: "", type: "Recherche", note: "Clarification des objectifs", image: "/manus-storage/Brainstorming_18f5122b.webp", alt: "Planche de brainstorming pour Essential Phone", shape: "tall" },
      { label: "", type: "Croquis", note: "Volume et proportions de l’objet", image: "/manus-storage/Conception_produit_d54893c9.webp", alt: "Croquis de conception du téléphone Essential", shape: "wide" },
      { label: "", type: "Interface", note: "Fonctions gardées à l’écran", image: "/manus-storage/Interface_2b746d80.webp", alt: "Interface minimaliste d’Essential Phone", shape: "square" },
    ],
    gallery: [
      { image: "/manus-storage/Phone_vue_filaire_fdeeede1.webp", alt: "Vue filaire du téléphone Essential", label: "Vue filaire" },
      { image: "/manus-storage/Phone_all_3b29be5b.webp", alt: "Quatre variantes colorées d’Essential Phone", label: "Déclinaisons" },
      { image: "/manus-storage/Phone_Bleu_64f2f08f.webp", alt: "Rendu bleu d’Essential Phone", label: "Bleu" },
      { image: "/manus-storage/Phone_Orange_baa9c0c5.webp", alt: "Rendu orange d’Essential Phone", label: "Orange" },
      { image: "/manus-storage/Phone_Vert_f298d798.webp", alt: "Rendu vert d’Essential Phone", label: "Vert" },
      { image: "/manus-storage/Phone_Jaune_c66dbf63.webp", alt: "Rendu jaune d’Essential Phone", label: "Jaune" },
    ],
  },
  {
    slug: "projet-photo",
    number: "02",
    category: "Image & regard",
    title: "Projet\nPhoto",
    subtitle: "Une promenade photographique construite autour d’une seule couleur : le jaune.",
    accent: "E0A51D",
    accentDark: "8D4A12",
    accentSoft: "F5D36D",
    motif: "photo",
    year: "2026",
    context:
      "En classe de Terminale, j’ai souhaité m’investir dans plus de projets. Comme j’aime également la photographie et la retouche photo, j’ai pris l’initiative, avec un ami, de sortir en ville pour prendre des photos autour d’un thème particulier.",
    objective: "Composer une série où le jaune agit comme un fil conducteur, avant et après retouche, tout en mettant en valeur le sujet.",
    process: ["Contrainte couleur", "Prise de vue", "Retouche et rendu"],
    learning: ["Observer l’environnement pour trouver des potentiels sujets", "Composer des photos avec des contraintes", "Mettre en valeur des sujets ordinaires"],
    tools: ["Lightroom", "LiveCollage", "iPhone"],
    documents: [
      { label: "", type: "Sélection", note: "Planche-photo de rendu", image: "/manus-storage/grille_photo_45799468.webp", alt: "Grille de photographies à dominante jaune", shape: "square", ratio: "1 / 1" },
      { label: "", type: "Sujet", note: "La moto, étude de contraste", image: "/manus-storage/moto_j_a_e9ccff93.webp", alt: "Photo traitée d’une moto jaune", shape: "tall", ratio: "4 / 5" },
      { label: "", type: "Sujet", note: "Le vélo, couleur de l’enfance", image: "/manus-storage/velo_j_b_e3acdf92.webp", alt: "Photo d’un vélo jaune en ville", shape: "wide", ratio: "4 / 3" },
    ],
    comparisons: [
      { subject: "Moto", treatment: "/manus-storage/moto_j_a_e9ccff93.webp", original: "/manus-storage/moto_j_b_e27fde92.webp", treatmentAlt: "Photographie de moto jaune avec traitement", originalAlt: "Photographie de moto jaune avant traitement" },
      { subject: "Poteau", treatment: "/manus-storage/poteau_j_a_85a0583d.webp", original: "/manus-storage/poteau_j_b_7c1b96e3.webp", treatmentAlt: "Photographie de poteau jaune avec traitement", originalAlt: "Photographie de poteau jaune avant traitement" },
      { subject: "Vélo", treatment: "/manus-storage/velo_j_a_7b8a6040.webp", original: "/manus-storage/velo_j_b_e3acdf92.webp", treatmentAlt: "Photographie de vélo jaune avec traitement", originalAlt: "Photographie de vélo jaune avant traitement" },
    ],
  },
  {
    slug: "identite-visuelle",
    number: "03",
    category: "Système graphique",
    title: "Identité\nVisuelle",
    subtitle: "Une identité personnelle conçue comme une boîte à outils, pas comme un simple logo.",
    accent: "397c5d",
    accentDark: "1e503d",
    accentSoft: "a8ceb5",
    motif: "identity",
    year: "2025",
    context:
      "Pour la création de mon premier portfolio au format PDF en fin 2025, j’ai souhaité créer une identité visuelle qui me représente au mieux.",
    objective: "Composer un logo, une palette et une typographie capables de me représenter et d’unifier les projets.",
    process: ["Logo", "Couleurs et typographie", "Déclinaisons"],
    learning: ["Comprendre l’importance et les enjeux des couleurs et typographies", "Créer un logo sur Figma", "Associer les éléments de manière cohérente"],
    tools: ["Figma", "Milanote", "Canva"],
    documents: [
      { label: "", type: "Logo", note: "Représenter le R géométriquement", image: "/manus-storage/Logo_decompose_f1d05b0f.webp", alt: "Décomposition du logo de l’identité visuelle", shape: "wide" },
      { label: "", type: "Palette", note: "Couleurs d’usage", image: "/manus-storage/Palette_de_couleur_48dbce34.webp", alt: "Palette de couleur de l’identité visuelle", shape: "tall" },
      { label: "", type: "Typographie", note: "Un système typographique lisible", image: "/manus-storage/Typographie_130b9b2f.webp", alt: "Étude typographique de l’identité visuelle", shape: "square" },
    ],
    gallery: [
      { image: "/manus-storage/Identite_visuelle_sur_Portfolio_bf5985cb.webp", alt: "Identité visuelle appliquée au portfolio", label: "Application portfolio" },
    ],
  },
  {
    slug: "projet-drone",
    number: "04",
    category: "Mobilité & ingénierie",
    title: "Projet\nDrone",
    subtitle: "Du cahier des charges au prototype : une expérience collective de conception et de test.",
    accent: "e95a2c",
    accentDark: "9e321d",
    accentSoft: "f1a083",
    motif: "drone",
    year: "2024 — 2025",
    context:
      "Durant mon année en classe de Première, en 2024–2025, j’ai réalisé un projet au sein d’un groupe de quatre personnes, en tant que chef de projet, dans le cadre de ma spécialité Sciences de l’ingénieur. Ce projet consistait en la réalisation d’un drone.",
    objective: "Passer d’une idée à un prototype : définir les contraintes, modéliser les pièces, intégrer l’électronique et apprendre du test.",
    process: ["Contrainte et structure", "Prototype et identité", "Montage et essais"],
    learning: ["Travailler en équipe en étant chef de projet", "Réaliser un projet dans son ensemble", "Concevoir des objets 3D complexes", "Créer une identité"],
    tools: ["SolidWorks", "Blender", "Word"],
    documents: [
      { label: "", type: "Cahier des charges", note: "Contraintes et définitions du projet", image: "/manus-storage/Cahier_des_charges_0eb8a6dc.webp", alt: "Cahier des charges fonctionnel du projet Drone", shape: "tall" },
      { label: "", type: "Schéma des exigences", note: "Organisation des usages", image: "/manus-storage/schema_des_exigences_e43b8abb.webp", alt: "Schéma des exigences du projet Drone", shape: "wide" },
      { label: "", type: "Mise en plan", note: "Création des pièces et des mesures", image: "/manus-storage/mise_en_plan_8088ebb8.webp", alt: "Mise en plan du drone", shape: "wide" },
      { label: "", type: "Prototype 3D", note: "Organisation dans l’espace et préparation à l’impression 3D", image: "/manus-storage/Projet_scolaire-1_4b0ec8ec.webp", alt: "Rendu 3D du prototype de drone", shape: "wide" },
      { label: "", type: "SPEED X", note: "Logo du projet", image: "/manus-storage/speedx-logo_ca6dcda9.png", alt: "Logo SPEED X du projet Drone", shape: "square" },
      { label: "", type: "Électronique", note: "Montage des composants", image: "/manus-storage/plaque_electronique_48d7d129.webp", alt: "Plaque électronique du drone", shape: "square" },
    ],
    archiveVideo: { type: "Test", note: "Vidéo d’essai", src: "/manus-storage/drone-test-vertical_425e9a92.mp4" },
    video: {
      src: "/manus-storage/Video_drone_seul_2fec9be4.mp4",
      captions: "/manus-storage/sous_titres_5f697c02.vtt",
      title: "SPEED X · Vidéo de présentation",
      description: "Rendu final de présentation du prototype.",
    },
  },
];

function getProject(pathname: string) {
  const slug = pathname.split("/").filter(Boolean).at(-1);
  return PROJECTS.find((project) => project.slug === slug) ?? PROJECTS[0];
}

function ProjectMark({ motif }: { motif: Project["motif"] }) {
  return (
    <div className={`project-mark project-mark--${motif}`} aria-hidden="true">
      <span className="project-mark__shape project-mark__shape--one" />
      <span className="project-mark__shape project-mark__shape--two" />
      <span className="project-mark__shape project-mark__shape--three" />
      <span className="project-mark__shape project-mark__shape--four" />
    </div>
  );
}

function ProjectDocument({ document, accent, motif, index, onOpen }: { document: Project["documents"][number]; accent: string; motif: Project["motif"]; index: number; onOpen: (asset: LightboxAsset) => void }) {
  const [assetRatio, setAssetRatio] = useState(document.ratio ?? "1 / 1");
  const documentStyle = {
    "--project-accent": accent,
    "--asset-ratio": assetRatio,
  } as React.CSSProperties;

  return (
    <button className={`project-document project-document--${document.shape} project-document--${motif} project-document--${index + 1}`} style={documentStyle} type="button" onClick={() => onOpen({ kind: "image", source: document.image, alt: document.alt, label: document.type })} aria-label={`Examiner le document ${document.type} : ${document.note}`}>
      <header className="project-document__head">
        <span>DOC. / {String(index + 1).padStart(2, "0")}</span>
      </header>
      <figure className="project-document__visual">
        <img src={resolvePortfolioMedia(document.image)} alt={document.alt} onLoad={(event) => {
          const { naturalHeight, naturalWidth } = event.currentTarget;
          if (naturalWidth && naturalHeight) setAssetRatio(`${naturalWidth} / ${naturalHeight}`);
        }} />
      </figure>
      <footer>
        <strong>{document.type}</strong>
        <p>{document.note}</p>
      </footer>
    </button>
  );
}

function ProjectGallery({ gallery, onOpen, accent, motif }: { gallery: NonNullable<Project["gallery"]>; onOpen: (asset: LightboxAsset) => void; accent: string; motif: Project["motif"] }) {
  return (
    <div className={`project-gallery project-gallery--${gallery.length}`}>
      {gallery.map((item, itemIndex) => (
        <ProjectDocument
          key={item.image}
          document={{ label: String(itemIndex + 4).padStart(2, "0"), type: item.label, note: "Planche de présentation", image: item.image, alt: item.alt, shape: itemIndex < 2 ? "wide" : "tall" }}
          accent={accent}
          motif={motif}
          index={itemIndex + 3}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function ProjectComparisonPair({ comparison, index, onOpen }: { comparison: NonNullable<Project["comparisons"]>[number]; index: number; onOpen: (asset: LightboxAsset) => void }) {
  const fallbackRatio = comparison.subject === "Moto" ? "4 / 5" : comparison.subject === "Poteau" ? "3 / 4" : "4 / 3";
  const [assetRatio, setAssetRatio] = useState(fallbackRatio);
  const pairStyle = { "--asset-ratio": assetRatio } as React.CSSProperties;
  const updateRatio = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = event.currentTarget;
    if (naturalWidth && naturalHeight) setAssetRatio(`${naturalWidth} / ${naturalHeight}`);
  };

  return (
    <article className="project-comparison-pair" style={pairStyle}>
      <header className="project-comparison-pair__head">
        <span>{String(index + 1).padStart(2, "0")} / {comparison.subject}</span>
        <span>AVANT · APRÈS</span>
      </header>
      <div className="project-comparison-pair__images">
        <button type="button" onClick={() => onOpen({ kind: "image", source: comparison.original, alt: comparison.originalAlt, label: `${comparison.subject} / prise` })} aria-label={`Examiner ${comparison.subject} avant traitement`}>
          <img src={resolvePortfolioMedia(comparison.original)} alt={comparison.originalAlt} onLoad={updateRatio} />
          <span>PRISE</span>
        </button>
        <button type="button" onClick={() => onOpen({ kind: "image", source: comparison.treatment, alt: comparison.treatmentAlt, label: `${comparison.subject} / traitement` })} aria-label={`Examiner ${comparison.subject} après traitement`}>
          <img src={resolvePortfolioMedia(comparison.treatment)} alt={comparison.treatmentAlt} onLoad={updateRatio} />
          <span>TRAITEMENT</span>
        </button>
      </div>
      <footer><strong>{comparison.subject}</strong></footer>
    </article>
  );
}

function ProjectComparisons({ comparisons, onOpen }: { comparisons: NonNullable<Project["comparisons"]>; onOpen: (asset: LightboxAsset) => void }) {
  return (
    <div className="project-comparisons">
      <div className="project-comparisons__heading">
        <span>Traitement couleur</span>
        <p>Trois scènes, observées selon la même contrainte chromatique.</p>
      </div>
      <div className="project-comparisons__grid">
        {comparisons.map((comparison, index) => <ProjectComparisonPair key={comparison.subject} comparison={comparison} index={index} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

function ProjectArchiveVideo({ archiveVideo, onOpen }: { archiveVideo: NonNullable<Project["archiveVideo"]>; onOpen: (asset: LightboxAsset) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const keepMuted = (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const enforcePlayback = () => {
      keepMuted(video);
      void video.play().catch(() => undefined);
    };

    enforcePlayback();
    const deferredStart = window.setTimeout(enforcePlayback, 180);
    document.addEventListener("visibilitychange", enforcePlayback);

    return () => {
      window.clearTimeout(deferredStart);
      document.removeEventListener("visibilitychange", enforcePlayback);
    };
  }, []);

  return (
    <article className="project-archive-video" aria-label={`Document 07 : ${archiveVideo.type}`}>
      <header className="project-archive-video__head">
        <span>DOC. / 07</span>
        <span>BOUCLE MUETTE</span>
      </header>
      <button className="project-archive-video__open" type="button" onClick={() => onOpen({ kind: "video", source: archiveVideo.src, label: archiveVideo.type, note: archiveVideo.note })} aria-label="Agrandir la vidéo d’essai du Drone">
        <div className="project-archive-video__visual">
          <video ref={videoRef} autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" onCanPlay={(event) => { keepMuted(event.currentTarget); void event.currentTarget.play().catch(() => undefined); }} onLoadedMetadata={(event) => keepMuted(event.currentTarget)} onVolumeChange={(event) => keepMuted(event.currentTarget)} aria-label="Vidéo verticale d’essai du Drone, diffusée sans son">
            <source src={resolvePortfolioMedia(archiveVideo.src)} type="video/mp4" />
          </video>
        </div>
      </button>
      <footer>
        <strong>{archiveVideo.type}</strong>
        <p>{archiveVideo.note}</p>
      </footer>
    </article>
  );
}

function ProjectVideo({ video }: { video: NonNullable<Project["video"]> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [caption, setCaption] = useState("SPEED X — Drone de prototypage");
  const captions = [
    { start: 0, end: 10.68, text: "SPEED X — Drone de prototypage" },
    { start: 10.68, end: 15, text: "Un moteur innovant de 3,7 V\nqui révolutionne le monde" },
    { start: 15, end: 18.92, text: "Un support solide et clipsable" },
    { start: 18.92, end: 21.56, text: "Une puissance jamais vue" },
    { start: 21.56, end: 24.92, text: "Un design incomparable" },
    { start: 24.92, end: 26.72, text: "Voici Speedx" },
  ];
  const activateCaptions = () => {
    const tracks = videoRef.current?.textTracks;
    if (!tracks) return;
    for (let index = 0; index < tracks.length; index += 1) tracks[index].mode = "showing";
  };
  const updateCaption = () => {
    const time = videoRef.current?.currentTime ?? 0;
    setCaption(captions.find((item) => time >= item.start && time < item.end)?.text ?? "");
  };

  useEffect(() => {
    activateCaptions();
  }, []);

  return (
    <section className="project-video" aria-labelledby="project-video-title">
      <div className="project-video__intro">
        <h2 id="project-video-title">{video.title}</h2>
        <p>{video.description.replace("activables directement dans le lecteur", "affichés pendant la lecture et disponibles dans les réglages")}</p>
      </div>
      <figure className="project-video__frame">
        <video ref={videoRef} controls playsInline preload="metadata" onLoadedMetadata={() => { activateCaptions(); updateCaption(); }} onPlay={() => { activateCaptions(); updateCaption(); }} onTimeUpdate={updateCaption} onSeeked={updateCaption}>
          <source src={resolvePortfolioMedia(video.src)} type="video/mp4" />
          <track kind="captions" src={resolvePortfolioMedia(video.captions)} srcLang="fr" label="Français" default />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
        {caption ? <p className="project-video__caption" aria-live="polite">{caption}</p> : null}
        <figcaption>Prototype Drone / SPEED X / 2025</figcaption>
      </figure>
    </section>
  );
}

function ProjectLightbox({ asset, onClose }: { asset: LightboxAsset; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const enforceMutedPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      void video.play().catch(() => undefined);
    };
    enforceMutedPlayback();
    video.addEventListener("volumechange", enforceMutedPlayback);
    return () => video.removeEventListener("volumechange", enforceMutedPlayback);
  }, [asset]);

  return (
    <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`Examen du document ${asset.label}`} onClick={onClose}>
      <div className={`project-lightbox__frame${asset.kind === "video" ? " project-lightbox__frame--video" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className="project-lightbox__topline"><span>Projet / examen</span><span>{asset.label}</span></div>
        {asset.kind === "image" ? <img src={resolvePortfolioMedia(asset.source)} alt={asset.alt} /> : <video ref={videoRef} autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" onVolumeChange={(event) => { event.currentTarget.muted = true; event.currentTarget.defaultMuted = true; event.currentTarget.volume = 0; }} aria-label={`Vidéo d’essai : ${asset.note}`}><source src={resolvePortfolioMedia(asset.source)} type="video/mp4" /></video>}
        <button type="button" className="project-lightbox__close" onClick={onClose} aria-label="Fermer l’examen"><X size={20} /></button>
      </div>
    </div>
  );
}

function ProjectShareDialog({ title, onClose }: { title: string; onClose: () => void }) {
  const [copyStatus, setCopyStatus] = useState("Copier le lien");
  const emailHref = `mailto:?subject=${encodeURIComponent(`${title} — Robin Courte`)}&body=${encodeURIComponent(`Je te partage ce dossier : ${window.location.href}`)}`;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("Lien copié");
    } catch {
      setCopyStatus("Copie indisponible");
    }
  };

  return (
    <div className="project-share-dialog" role="dialog" aria-modal="true" aria-labelledby="project-share-title" onClick={onClose}>
      <section className="project-share-dialog__frame" onClick={(event) => event.stopPropagation()}>
        <div className="project-share-dialog__topline"><span>RC / PARTAGE</span></div>
        <h2 id="project-share-title">Faire circuler<br /><em>la pièce.</em></h2>
        <p>Partagez le dossier « {title} » par lien direct ou préparez un message e-mail.</p>
        <output className="project-share-dialog__url">{window.location.href}</output>
        <div className="project-share-dialog__actions">
          <button type="button" onClick={copyLink}>{copyStatus}</button>
          <a href={emailHref}>Envoyer par e-mail <ArrowUpRight size={17} /></a>
        </div>
        <button type="button" className="project-share-dialog__close" onClick={onClose} aria-label="Fermer la fenêtre de partage"><X size={19} /></button>
      </section>
    </div>
  );
}

export default function ProjectPage() {
  const [location] = useLocation();
  const project = getProject(location);
  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];
  const [activeAsset, setActiveAsset] = useState<LightboxAsset | null>(null);
  const [progress, setProgress] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.documentElement.classList.add("project-document-open");
    document.body.classList.add("project-document-open");
    document.title = `${project.title.replace("\n", " ")} — Robin Courte`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      document.documentElement.classList.remove("project-document-open");
      document.body.classList.remove("project-document-open");
      document.title = previousTitle;
    };
  }, [project]);

  useEffect(() => {
    const updateProgress = () => {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      setProgress(maximum ? Math.min(window.scrollY / maximum, 1) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [project]);

  useEffect(() => {
    if (!activeAsset) return;
    document.body.classList.add("project-modal-open");
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveAsset(null); };
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.classList.remove("project-modal-open");
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [activeAsset]);

  useEffect(() => {
    if (!isShareOpen) return;
    document.body.classList.add("project-modal-open");
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsShareOpen(false); };
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.classList.remove("project-modal-open");
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isShareOpen]);

  const handleSectionJump = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const selector = event.currentTarget.getAttribute("href");
    if (!selector?.startsWith("#")) return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  const projectStyle = {
    "--project-accent": `#${project.accent}`,
    "--project-accent-dark": `#${project.accentDark}`,
    "--project-accent-soft": `#${project.accentSoft}`,
  } as React.CSSProperties;

  return (
    <main className={`project-page project-page--${project.motif}`} style={projectStyle}>
      <div className="project-reading-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <aside className="project-rail" aria-label="Navigation de projet">
        <Link href="/" className="project-rail__home" aria-label="Retourner à l’atelier">
          <span className="project-rail__monogram" aria-hidden="true"><i /><i /><b /></span>
        </Link>
        <p className="project-rail__label">Robin Courte<br />Portfolio / 2026</p>
        <Link href="/mentions-legales" className="project-rail__legal">Mentions légales</Link>
      </aside>

      <section className="project-hero">
        <div className="project-hero__topline">
          <p>{project.category}</p>
          <p>{project.year}</p>
        </div>

        <div className="project-hero__copy">
          <p className="project-kicker">Projet / {project.number}</p>
          <h1>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="project-hero__subtitle">{project.subtitle}</p>
          <a className="project-jump" href="#dossier" onClick={handleSectionJump}>
            Ouvrir le dossier <ArrowDown size={18} strokeWidth={2.6} />
          </a>
        </div>

        <div className="project-hero__poster">
          <div className="project-hero__poster-number">{project.number}</div>
          <div className="project-hero__seal" aria-hidden="true"><span>RC</span><span>{project.number}</span></div>
          <ProjectMark motif={project.motif} />
          <div className="project-hero__poster-meta">
            <span>RC / {project.number}</span>
            <span>FICHE D’ATELIER</span>
          </div>
        </div>
      </section>

      <section className="project-intro" id="dossier">
        <div className="project-section-label"><span>01</span><i /> Contexte</div>
        <div className="project-intro__text">
          <p className="project-intro__statement">{project.context}</p>
          <div className="project-intro__objective">
            <span>INTENTION</span>
            <p>{project.objective}</p>
          </div>
        </div>
      </section>

      <section className="project-process" id="processus">
        <div className="project-section-label"><span>02</span><i /> Processus</div>
        <div className="project-process__steps">
          {project.process.map((step, stepIndex) => (
            <article key={step} className="project-step">
              <span>0{stepIndex + 1}</span>
              <h2>{step}</h2>
              <div className="project-step__glyph" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="project-archive" id="archives">
        <div className="project-archive__heading">
          <div className="project-section-label"><span>03</span><i /> Archives</div>
        </div>
        <div className="project-documents">
          {project.documents.map((document, documentIndex) => <ProjectDocument key={`${documentIndex}-${document.image}`} document={document} accent={`#${project.accent}`} motif={project.motif} index={documentIndex} onOpen={setActiveAsset} />)}
        </div>
        {project.gallery ? <ProjectGallery gallery={project.gallery} onOpen={setActiveAsset} accent={`#${project.accent}`} motif={project.motif} /> : null}
        {project.comparisons ? <ProjectComparisons comparisons={project.comparisons} onOpen={setActiveAsset} /> : null}
        {project.archiveVideo ? <ProjectArchiveVideo archiveVideo={project.archiveVideo} onOpen={setActiveAsset} /> : null}
      </section>

      {project.slug === "essential-phone" ? <EssentialPhoneViewer /> : null}
      {project.video ? <ProjectVideo video={project.video} /> : null}

      <section className="project-closing" id="bilan">
        <div className="project-closing__learning">
          <div className="project-section-label"><span>04</span><i /> Ce que j’ai appris</div>
          <ul>
            {project.learning.map((item) => <li key={item}><MoveUpRight size={16} /> {item}</li>)}
          </ul>
        </div>
        <div className="project-closing__tools">
          <span>OUTILS UTILISÉS</span>
          <p>{project.tools.join("  ·  ")}</p>
        </div>
      </section>

      <nav className="project-next" aria-label="Dossier suivant">
        <Link href={`/projets/${nextProject.slug}`}>
          <span>Classer puis ouvrir / {nextProject.number}</span>
          <strong>{nextProject.title.replace("\n", " ")}</strong>
          <ArrowUpRight size={35} strokeWidth={2.4} />
        </Link>
        <Link href="/" className="project-back"><CornerUpLeft size={18} /> Retour à l’atelier</Link>
      </nav>
      <nav className="project-quick-nav" aria-label="Repères rapides du dossier">
        <a href="#dossier" onClick={handleSectionJump}><span>01</span> Contexte</a>
        <a href="#processus" onClick={handleSectionJump}><span>02</span> Processus</a>
        <a href="#archives" onClick={handleSectionJump}><span>03</span> Archives</a>
        <a href="#bilan" onClick={handleSectionJump}><span>04</span> Bilan</a>
      </nav>
      <div className="project-utility" aria-label="Outils de lecture">
        <button type="button" onClick={() => setIsShareOpen(true)}><Share2 size={17} /> Partager</button>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retourner en haut du dossier"><ArrowUp size={19} /></button>
      </div>
      {activeAsset ? <ProjectLightbox asset={activeAsset} onClose={() => setActiveAsset(null)} /> : null}
      {isShareOpen ? <ProjectShareDialog title={project.title.replace("\n", " ")} onClose={() => setIsShareOpen(false)} /> : null}
    </main>
  );
}
