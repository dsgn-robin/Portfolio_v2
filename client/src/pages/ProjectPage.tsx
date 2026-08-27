/**
 * Style reminder — « Affiches en série » : papier chaud, encre noire,
 * géométrie Bauhaus, asymétrie éditoriale et documents d’atelier temporaires.
 */
import { ArrowDown, ArrowUpRight, CornerUpLeft, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";

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
  documents: { label: string; type: string; note: string; shape: "tall" | "wide" | "square" }[];
};

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
    year: "2023 — 2026",
    context:
      "Parti d’une question personnelle : comment rester disponible sans laisser son téléphone décider de son attention ? Le projet prend la forme d’un objet minimal et volontairement précis.",
    objective: "Réduire l’interface à des usages utiles : communiquer, se repérer, écouter, photographier — puis laisser le reste hors champ.",
    process: ["Recherche d’usages", "Interface et signe", "Objet & rendu 3D"],
    learning: ["Construire un système cohérent", "Donner du sens à une interface", "Mettre en lumière un objet 3D"],
    tools: ["Blender", "Figma", "Canva"],
    documents: [
      { label: "A", type: "Recherche", note: "Notes d’usage et intentions", shape: "tall" },
      { label: "B", type: "Interface", note: "Fonctions gardées à l’écran", shape: "wide" },
      { label: "C", type: "Forme", note: "Volume et proportions de l’objet", shape: "square" },
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
    year: "2025 — 2026",
    context:
      "Un exercice de regard réalisé en ville : chercher dans l’ordinaire des sujets qui s’assemblent par leur lumière, leur teinte et leur cadrage.",
    objective: "Composer une série où le jaune agit comme un fil conducteur, avant et après retouche, sans faire disparaître la ville qui l’entoure.",
    process: ["Contrainte couleur", "Prise de vue", "Retouche & séquence"],
    learning: ["Cadrer avec une contrainte", "Faire émerger un sujet", "Construire une série"],
    tools: ["Lightroom", "LiveCollage", "iPhone"],
    documents: [
      { label: "A", type: "Sélection", note: "Planche-contact de la sortie", shape: "wide" },
      { label: "B", type: "Avant / après", note: "Jeu de contrastes et de teintes", shape: "tall" },
      { label: "C", type: "Série", note: "Séquence jaune, rythme et cadrage", shape: "square" },
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
    year: "2025 — 2026",
    context:
      "Pour la première édition du portfolio, l’enjeu était de rendre visible une manière de travailler : précise, curieuse et ouverte à plusieurs domaines de conception.",
    objective: "Composer un signe, une palette et une typographie capables d’unifier les projets sans leur enlever leur propre caractère.",
    process: ["Signe & structure", "Couleurs & lettres", "Déclinaisons"],
    learning: ["Hiérarchiser un système", "Associer formes et usages", "Décliner sans diluer"],
    tools: ["Figma", "Milanote", "Canva"],
    documents: [
      { label: "A", type: "Signe", note: "Construction, axe et contre-forme", shape: "square" },
      { label: "B", type: "Palette", note: "Couleurs d’usage et contrastes", shape: "tall" },
      { label: "C", type: "Usage", note: "Déclinaisons du système graphique", shape: "wide" },
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
      "Un projet mené à quatre, dans le cadre de Sciences de l’ingénieur, pour imaginer, fabriquer et faire voler un drone doté de sa propre identité.",
    objective: "Passer d’une intention de mobilité à un prototype : définir les contraintes, modéliser les pièces, intégrer l’électronique et apprendre du test.",
    process: ["Contraintes & équipe", "Prototype 3D", "Montage & essais"],
    learning: ["Piloter un projet collectif", "Itérer sur un objet complexe", "Relier forme et technique"],
    tools: ["SolidWorks", "Blender", "Word"],
    documents: [
      { label: "A", type: "Contraintes", note: "Autonomie, masse et commandes", shape: "tall" },
      { label: "B", type: "Prototype", note: "Implantation des pièces et volumes", shape: "wide" },
      { label: "C", type: "Essais", note: "Observations de montage et de test", shape: "square" },
    ],
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

function ProjectDocument({ document, accent, motif, index }: { document: Project["documents"][number]; accent: string; motif: Project["motif"]; index: number }) {
  return (
    <article className={`project-document project-document--${document.shape} project-document--${motif} project-document--${index + 1}`} style={{ "--project-accent": accent } as React.CSSProperties}>
      <header className="project-document__head">
        <span>{document.label}</span>
        <span>DOC. / TEMP.</span>
      </header>
      <div className="project-document__visual" aria-hidden="true">
        <span className="project-document__disc" />
        <span className="project-document__bar" />
        <span className="project-document__line project-document__line--one" />
        <span className="project-document__line project-document__line--two" />
        <span className="project-document__grid" />
      </div>
      <footer>
        <strong>{document.type}</strong>
        <p>{document.note}</p>
      </footer>
    </article>
  );
}

export default function ProjectPage() {
  const [location] = useLocation();
  const project = getProject(location);
  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

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

  const projectStyle = {
    "--project-accent": `#${project.accent}`,
    "--project-accent-dark": `#${project.accentDark}`,
    "--project-accent-soft": `#${project.accentSoft}`,
  } as React.CSSProperties;

  return (
    <main className="project-page" style={projectStyle}>
      <aside className="project-rail" aria-label="Navigation de projet">
        <Link href="/" className="project-rail__home" aria-label="Retourner à l’atelier">
          <span className="project-rail__monogram" aria-hidden="true">R</span>
          <span className="project-rail__home-label">Atelier</span>
        </Link>
        <div className="project-rail__index" aria-hidden="true">
          <span>0{project.number}</span>
          <i />
          <span>04</span>
        </div>
        <p className="project-rail__label">Robin Courte<br />Portfolio / 2026</p>
      </aside>

      <section className="project-hero">
        <div className="project-hero__topline">
          <p>{project.category}</p>
          <p>{project.year}</p>
        </div>

        <div className="project-hero__copy">
          <p className="project-kicker">Dossier / {project.number}</p>
          <h1>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="project-hero__subtitle">{project.subtitle}</p>
          <a className="project-jump" href="#dossier">
            Lire le dossier <ArrowDown size={18} strokeWidth={2.6} />
          </a>
        </div>

        <div className="project-hero__poster">
          <div className="project-hero__poster-number">{project.number}</div>
          <div className="project-hero__seal" aria-hidden="true"><span>RC</span><span>{project.number}</span></div>
          <ProjectMark motif={project.motif} />
          <div className="project-hero__poster-meta">
            <span>RC / {project.number}</span>
            <span>ÉTUDE EN COURS</span>
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

      <section className="project-process">
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

      <section className="project-archive">
        <div className="project-archive__heading">
          <div className="project-section-label"><span>03</span><i /> Archives</div>
          <p>Une planche de dossier construite comme une archive : relevés, essais et indices de fabrication donnent un rythme visuel à chaque étape.</p>
        </div>
        <div className="project-documents">
          {project.documents.map((document, documentIndex) => <ProjectDocument key={document.label} document={document} accent={`#${project.accent}`} motif={project.motif} index={documentIndex} />)}
        </div>
      </section>

      <section className="project-closing">
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
          <span>Dossier suivant / {nextProject.number}</span>
          <strong>{nextProject.title.replace("\n", " ")}</strong>
          <ArrowUpRight size={35} strokeWidth={2.4} />
        </Link>
        <Link href="/" className="project-back"><CornerUpLeft size={18} /> Retour à l’atelier</Link>
      </nav>
    </main>
  );
}
