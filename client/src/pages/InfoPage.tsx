/**
 * Style reminder — « Affiches en série » : les pages relationnelles restent
 * des fiches imprimées, avec un parcours tangible et non une interface générique.
 */
import { ArrowUpRight, Check, CornerUpLeft, Mail, MoveUpRight, Phone, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";

type InfoKind = "about" | "contact";
type InfoPageProps = { kind: InfoKind };

const FORM_ENDPOINT = "https://formspree.io/f/xdazzzev";

const PAGE_CONTENT = {
  about: {
    number: "05",
    kicker: "Note personnelle",
    title: ["À", "PROPOS"],
    subtitle: "Découvrir le parcours derrière les objets, les images et les systèmes graphiques.",
    heading: "Apprendre en fabriquant, puis rendre les essais lisibles.",
    text: "Je m’appelle Robin. Je suis actuellement lycéen et j’explore le design ainsi que la conception matérielle et numérique. Chaque étape de ce parcours est une occasion de mieux comprendre un usage, une matière ou un outil.",
    intent: "Choisir une étape du parcours pour ouvrir son contexte : stages, projets, apprentissages et premières réalisations composent une trajectoire en mouvement.",
    rows: [
      ["APPROCHE", "Observer, simplifier, prototyper."],
      ["TERRAINS", "Design produit · image · identité · 3D."],
      ["MÉTHODE", "Une idée devient une suite de tests, puis une pièce à partager."],
    ],
    next: { href: "/contact", label: "Écrire à Robin", title: "CONTACT" },
  },
  contact: {
    number: "06",
    kicker: "Point de contact",
    title: ["PRENDRE", "CONTACT"],
    subtitle: "Une question, une collaboration ou une idée à mettre en mouvement.",
    heading: "Un message peut devenir le premier essai d’un projet.",
    text: "Choisissez le canal le plus simple ou écrivez directement ci-dessous. Le formulaire est traité par Formspree et permet de garder l’échange à l’intérieur du portfolio, sans passer par une page intermédiaire.",
    intent: "Quelques lignes suffisent : contexte, idée, question ou contrainte. Robin répondra dès que possible.",
    rows: [
      ["E-MAIL", "dgn.robin@gmail.com"],
      ["TÉLÉPHONE", "06 70 52 64 68"],
      ["DISPONIBILITÉ", "Projets, apprentissages et collaborations."],
    ],
    next: { href: "/", label: "Revenir à la scène", title: "PORTFOLIO" },
  },
} as const;

const JOURNEY = [
  { date: "2023", title: "Atelier Cub3", type: "Architecture", body: "Premier stage d’observation : découverte de l’architecture et de SketchUp à Liffré." },
  { date: "2024", title: "Orange Atalante", type: "Immersion", body: "Découverte de domaines d’ingénierie, d’informatique et premiers essais dans Blender." },
  { date: "2024—25", title: "Projet Drone", type: "Équipe", body: "Conception d’un drone en équipe au lycée : une première expérience de projet technique collectif." },
  { date: "2025—26", title: "Portfolio", type: "Autonomie", body: "Apprentissage du HTML, du CSS puis de JavaScript à travers près de cinq versions de portfolio." },
  { date: "2026", title: "Essential Phone", type: "Projet personnel", body: "Vision de marque, identité et modèle 3D réunis dans une étude d’objet numérique personnel." },
  { date: "2026", title: "Swift / SwiftUI", type: "Apprentissage", body: "Début de l’exploration d’outils dédiés à la conception d’applications iOS." },
] as const;

function InfoPoster({ kind, number }: { kind: InfoKind; number: string }) {
  return (
    <div className={`info-page__poster project-hero__poster info-page__poster--${kind}`} aria-hidden="true">
      <span className="info-page__poster-number">{number}</span>
      <span className="info-page__poster-seal">RC<br />{kind === "about" ? "NOTE" : "LIGNE"}</span>
      <span className="info-page__shape info-page__shape--one" />
      <span className="info-page__shape info-page__shape--two" />
      <span className="info-page__shape info-page__shape--three" />
      <span className="info-page__poster-meta">RC / {number}<i>{kind === "about" ? "PARCOURS" : "OUVERT"}</i></span>
    </div>
  );
}

function JourneyExplorer() {
  const [activeIndex, setActiveIndex] = useState(3);
  const active = JOURNEY[activeIndex];

  return (
    <section className="journey-explorer" id="parcours" aria-labelledby="journey-title">
      <div className="journey-explorer__intro">
        <div className="project-section-label"><span>03</span><i /> Parcours</div>
        <h2 id="journey-title">Six <em>repères</em>, une pratique qui se construit.</h2>
        <p>Chaque point est une pièce du dossier personnel. Activez une date pour faire apparaître son contexte.</p>
      </div>
      <div className="journey-explorer__board">
        <ol className="journey-explorer__line" aria-label="Étapes du parcours de Robin Courte">
          {JOURNEY.map((step, index) => (
            <li key={`${step.date}-${step.title}`}>
              <button type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)} aria-pressed={index === activeIndex}>
                <time>{step.date}</time><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong>
              </button>
            </li>
          ))}
        </ol>
        <article className="journey-explorer__detail" aria-live="polite">
          <span>Repère actif / {String(activeIndex + 1).padStart(2, "0")}</span>
          <p className="journey-explorer__date">{active.date}</p>
          <h3>{active.title}</h3>
          <em>{active.type}</em>
          <p>{active.body}</p>
        </article>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Formspree response error");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-form" id="formulaire" aria-labelledby="contact-form-title">
      <div className="contact-form__intro">
        <div className="project-section-label"><span>03</span><i /> Message</div>
        <h2 id="contact-form-title">Laisser une<br /><em>trace écrite.</em></h2>
        <p>Les champs marqués d’un astérisque sont nécessaires pour répondre au message.</p>
      </div>
      <form action={FORM_ENDPOINT} method="POST" onSubmit={submitForm}>
        <input type="hidden" name="_subject" value="Nouveau message depuis le portfolio Robin Courte" />
        <label><span>01 / Nom ou organisation *</span><input name="name" autoComplete="name" required placeholder="Votre nom" /></label>
        <label><span>02 / E-mail *</span><input type="email" name="email" autoComplete="email" required placeholder="vous@exemple.fr" /></label>
        <label className="contact-form__message"><span>03 / Message *</span><textarea name="message" required rows={6} placeholder="Décrivez votre idée, votre contexte ou votre question." /></label>
        <div className="contact-form__footer">
          <p>En envoyant ce formulaire, vous acceptez le traitement de vos informations par Formspree pour répondre à votre demande. <Link href="/mentions-legales">Mentions légales</Link></p>
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Transmission…" : <><Send size={17} /> Envoyer le message</>}</button>
        </div>
        {status === "success" ? <p className="contact-form__status contact-form__status--success" role="status"><Check size={18} /> Message transmis. Merci pour votre prise de contact.</p> : null}
        {status === "error" ? <p className="contact-form__status contact-form__status--error" role="alert">La transmission n’a pas abouti. Vous pouvez écrire directement à dgn.robin@gmail.com.</p> : null}
      </form>
    </section>
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
        <Link href="/" className="project-rail__home" aria-label="Retourner à l’atelier"><span className="project-rail__monogram" aria-hidden="true"><i /><i /><b /></span></Link>
        <p className="project-rail__label">Robin Courte<br />Portfolio / 2026</p>
        <Link href="/mentions-legales" className="project-rail__legal">Mentions légales</Link>
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
        <div className="project-intro__text"><p className="project-intro__statement">{page.heading}</p><div className="project-intro__objective"><span>CAP</span><p>{page.intent}</p></div></div>
      </section>
      <section className="info-page__body" id="details">
        <div className="project-section-label"><span>02</span><i /> {kind === "about" ? "Fondations" : "Canaux"}</div>
        <div className="info-page__copy"><p>{page.text}</p></div>
        <div className="info-page__records">
          {page.rows.map(([label, value]) => {
            const isEmail = kind === "contact" && label === "E-MAIL";
            const isPhone = kind === "contact" && label === "TÉLÉPHONE";
            const Icon = isEmail ? Mail : isPhone ? Phone : MoveUpRight;
            const content = <><span>{label}</span><strong>{value}</strong><Icon size={19} /></>;
            return isEmail ? <a className="info-page__record" key={label} href={`mailto:${value}`}>{content}</a>
              : isPhone ? <a className="info-page__record" key={label} href="tel:+33670526468">{content}</a>
                : <article className="info-page__record" key={label}>{content}</article>;
          })}
        </div>
      </section>
      {kind === "about" ? <JourneyExplorer /> : <ContactForm />}
      <nav className="project-next" aria-label="Suite de la navigation">
        <Link href={page.next.href}><span>{page.next.label}</span><strong>{page.next.title}</strong><ArrowUpRight size={35} strokeWidth={2.4} /></Link>
        <Link href="/" className="project-back"><CornerUpLeft size={18} /> Retour à l’atelier</Link>
      </nav>
      <nav className="project-quick-nav" aria-label="Repères rapides">
        <a href="#dossier"><span>01</span> Intention</a><a href="#details"><span>02</span> {kind === "about" ? "Fondations" : "Contacter"}</a><a href={kind === "about" ? "#parcours" : "#formulaire"}><span>03</span> {kind === "about" ? "Parcours" : "Message"}</a>
      </nav>
    </main>
  );
}
