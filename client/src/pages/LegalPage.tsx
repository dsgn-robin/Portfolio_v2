/** Style reminder — mentions légales comme une pièce archivistique, lisible et sans ornement superflu. */
import { ArrowUpRight, CornerUpLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

const SECTIONS = [
  { number: "01", title: "Édition", body: "Le présent site est édité par Robin Courte, particulier et étudiant localisé en France. Directeur de la publication : Robin Courte. Contact : dgn.robin@gmail.com." },
  { number: "02", title: "Propriété intellectuelle", body: "Sauf mention contraire, la structure, les textes, photographies, rendus 3D, animations et codes sources sont la propriété de Robin Courte. Toute reproduction, représentation, modification, publication ou adaptation nécessite une autorisation écrite préalable." },
  { number: "03", title: "Données personnelles", body: "Les données saisies dans le formulaire de contact — nom ou organisation, adresse e-mail et contenu du message — servent uniquement à répondre aux demandes. Elles sont traitées par Formspree, ne sont ni vendues ni louées, et sont conservées au maximum trois ans après le dernier contact. Pour exercer vos droits d’accès, rectification, portabilité ou suppression : dgn.robin@gmail.com." },
  { number: "04", title: "Cookies et mesure", body: "Le site peut utiliser des cookies ou outils de mesure d’audience afin d’améliorer l’expérience et d’observer la fréquentation. Vous pouvez les refuser ou les gérer depuis les réglages de votre navigateur." },
  { number: "05", title: "Responsabilité", body: "L’éditeur s’efforce de maintenir des informations exactes, sans garantir l’absence totale d’erreur, d’indisponibilité ou d’incident technique. Les projets présentés ont une valeur illustrative et pédagogique." },
] as const;

export default function LegalPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.documentElement.classList.add("project-document-open");
    document.body.classList.add("project-document-open");
    document.title = "Mentions légales — Robin Courte";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => { document.documentElement.classList.remove("project-document-open"); document.body.classList.remove("project-document-open"); document.title = previousTitle; };
  }, []);

  return (
    <main className="project-page legal-page" style={{ "--project-accent": "#e95a2c", "--project-accent-dark": "#9e321d", "--project-accent-soft": "#f1d0bd" } as React.CSSProperties}>
      <aside className="project-rail" aria-label="Navigation principale"><Link href="/" className="project-rail__home" aria-label="Retourner à l’atelier"><span className="project-rail__monogram" aria-hidden="true"><i /><i /><b /></span></Link><p className="project-rail__label">Robin Courte<br />Portfolio / 2026</p></aside>
      <header className="legal-page__hero"><span>RC / DOCUMENT 07</span><h1>Mentions<br /><em>légales.</em></h1><p>Informations d’édition, de propriété intellectuelle, de protection des données et de responsabilité liées au portfolio.</p></header>
      <section className="legal-page__register" aria-label="Mentions légales">
        {SECTIONS.map((section) => <article key={section.number}><span>{section.number}</span><h2>{section.title}</h2><p>{section.body}</p></article>)}
      </section>
      <footer className="legal-page__footer"><p>Dernière mise à jour : août 2026.</p><Link href="/contact">Contacter Robin <ArrowUpRight size={18} /></Link><Link href="/" className="project-back"><CornerUpLeft size={18} /> Retour à l’atelier</Link></footer>
    </main>
  );
}
