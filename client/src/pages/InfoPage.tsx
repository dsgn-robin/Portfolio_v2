/**
 * Style reminder — « Affiches en série » : une page relationnelle est une
 * fiche Bauhaus en papier chaud, avec une hiérarchie d’atelier claire.
 */
import { ArrowUpRight, AtSign, CornerUpLeft, Mail, MoveUpRight, Phone, Send } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

type InfoKind = "about" | "contact";

type InfoPageProps = { kind: InfoKind };

const PAGE_CONTENT = {
  about: {
    number: "05",
    kicker: "Note personnelle",
    title: ["À", "PROPOS"],
    subtitle: "Une manière de faire, entre objets, images et systèmes graphiques.",
    heading: "De l’idée au prototype, apprendre en fabriquant.",
    text: "Je m’appelle Robin. J’explore le design et la conception matérielle comme numérique avec la même envie : comprendre un usage, prendre le temps d’un essai, puis rendre l’intention lisible. Ce portfolio rassemble les pièces qui jalonnent ce travail.",
    intent: "Construire une pratique transversale, où l’objet, l’image et l’interface deviennent des supports d’attention et de récit.",
    rows: [
      ["APPROCHE", "Observer, simplifier, prototyper."],
      ["TERRAINS", "Design produit · image · identité · 3D."],
      ["MÉTHODE", "Une idée devient une série de tests, puis une pièce à partager."],
    ],
    next: { href: "/contact", label: "Écrire à Robin", title: "CONTACT" },
  },
  contact: {
    number: "06",
    kicker: "Point de contact",
    title: ["PRENDRE", "CONTACT"],
    subtitle: "Pour parler d’un projet, d’une piste de collaboration ou simplement échanger.",
    heading: "Une idée à mettre en mouvement ?", 
    text: "Je reste disponible pour échanger autour d’un projet de design, d’une image ou d’un prototype. Choisissez le canal le plus simple : chaque message commence par une conversation, pas par un formulaire impersonnel.",
    intent: "Décrire en quelques lignes le contexte, l’idée ou la question : je répondrai avec plaisir.",
    rows: [
      ["E-MAIL", "dgn.robin@gmail.com"],
      ["TÉLÉPHONE", "06 70 52 64 68"],
      ["DISPONIBILITÉ", "Échanges autour de projets, d’apprentissages et de collaborations."],
    ],
    next: { href: "/", label: "Revenir à la scène", title: "PORTFOLIO" },
  },
} as const;

function InfoPoster({ kind, number }: { kind: InfoKind; number: string }) {
  return (
    <div className={`info-page__poster project-hero__poster info-page__poster--${kind}`} aria-hidden="true">
      <span className="info-page__poster-number">{number}</span>
      <span className="info-page__poster-seal">RC<br />{kind === "about" ? "NOTE" : "LIGNE"}</span>
      <span className="info-page__shape info-page__shape--one" />
      <span className="info-page__shape info-page__shape--two" />
      <span className="info-page__shape info-page__shape--three" />
      <span className="info-page__poster-meta">RC / {number}<i>{kind === "about" ? "POSITION" : "OUVERT"}</i></span>
    </div>
  );
}

export default function InfoPage({ kind }: InfoPageProps) {
  const page = PAGE_CONTENT[kind];
  const accent = kind === "about" ? "#397c5d" : "#e95a2c";
  const accentDark = kind === "about" ? "#1e503d" : "#9e321d";
  const accentSoft = kind === "about" ? "#a8ceb5" : "#f1a083";

  useEffect(() => {
    const previousTitle = document.title;
    document.documentElement.classList.add("project-document-open");
    document.body.classList.add("project-document-open");
    document.title = `${page.title.join(" ")} — Robin Courte`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => {
      document.documentElement.classList.remove("project-document-open");
      document.body.classList.remove("project-document-open");
      document.title = previousTitle;
    };
  }, [page]);

  return (
    <main className={`project-page info-page info-page--${kind}`} style={{ "--project-accent": accent, "--project-accent-dark": accentDark, "--project-accent-soft": accentSoft } as React.CSSProperties}>
      <aside className="project-rail" aria-label="Navigation principale">
        <Link href="/" className="project-rail__home" aria-label="Retourner à l’atelier">
          <span className="project-rail__monogram" aria-hidden="true"><i /><i /><b /></span>
        </Link>
        <p className="project-rail__label">Robin Courte<br />Portfolio / 2026</p>
      </aside>

      <section className="project-hero info-page__hero">
        <div className="project-hero__topline"><p>{page.kicker}</p><p>Fiche / {page.number}</p></div>
        <div className="project-hero__copy">
          <p className="project-kicker">Repère / {page.number}</p>
          <h1>{page.title.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="project-hero__subtitle">{page.subtitle}</p>
          <a className="project-jump" href="#dossier">Lire la fiche <ArrowUpRight size={18} strokeWidth={2.6} /></a>
        </div>
        <InfoPoster kind={kind} number={page.number} />
      </section>

      <section className="project-intro" id="dossier">
        <div className="project-section-label"><span>01</span><i /> Intention</div>
        <div className="project-intro__text">
          <p className="project-intro__statement">{page.heading}</p>
          <div className="project-intro__objective"><span>CAP</span><p>{page.intent}</p></div>
        </div>
      </section>

      <section className="info-page__body" id="details">
        <div className="project-section-label"><span>02</span><i /> {kind === "about" ? "Repères" : "Canaux"}</div>
        <div className="info-page__copy"><p>{page.text}</p></div>
        <div className="info-page__records">
          {page.rows.map(([label, value]) => {
            const isEmail = kind === "contact" && label === "E-MAIL";
            const isPhone = kind === "contact" && label === "TÉLÉPHONE";
            const Icon = isEmail ? Mail : isPhone ? Phone : MoveUpRight;
            const content = <><span>{label}</span><strong>{value}</strong><Icon size={19} /></>;
            return isEmail ? <a className="info-page__record" key={label} href={`mailto:${value}`}><>{content}</></a>
              : isPhone ? <a className="info-page__record" key={label} href="tel:+33670526468"><>{content}</></a>
                : <article className="info-page__record" key={label}>{content}</article>;
          })}
        </div>
        {kind === "contact" ? <a className="info-page__write" href="mailto:dgn.robin@gmail.com?subject=Projet%20%2F%20Robin%20Courte"><Send size={18} /> Écrire un message</a> : null}
      </section>

      <nav className="project-next" aria-label="Suite de la navigation">
        <Link href={page.next.href}>
          <span>{page.next.label}</span><strong>{page.next.title}</strong><ArrowUpRight size={35} strokeWidth={2.4} />
        </Link>
        <Link href="/" className="project-back"><CornerUpLeft size={18} /> Retour à l’atelier</Link>
      </nav>
      <nav className="project-quick-nav" aria-label="Repères rapides">
        <a href="#dossier"><span>01</span> Intention</a>
        <a href="#details"><span>02</span> {kind === "about" ? "Repères" : "Contacter"}</a>
      </nav>
    </main>
  );
}
