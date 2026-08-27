/**
 * Style reminder — « Établi de prototypage patiné » : l’atelier est la navigation.
 * Toute interface doit rester périphérique, précise et discrète face à la scène.
 */
/** Style reminder — « Scène-dossier interactive » : l’accueil est l’index Bauhaus en volume des dossiers. */
import DossierHomeScene from "@/components/DossierHomeScene";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Robin Courte — Portfolio en pièces";
  }, []);

  return <DossierHomeScene />;
}
