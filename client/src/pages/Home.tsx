/**
 * Style reminder — « Établi de prototypage patiné » : l’atelier est la navigation.
 * Toute interface doit rester périphérique, précise et discrète face à la scène.
 */
import WorkshopScene from "@/components/WorkshopScene";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Robin Courte — Atelier 3D";
  }, []);

  return <WorkshopScene />;
}
