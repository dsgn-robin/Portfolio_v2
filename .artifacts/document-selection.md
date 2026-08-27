# Sélection de documents — dossiers projets

## Projet Drone

Le dossier offre une séquence complète : contraintes, prototype 3D, mise en plan, carte électronique et schéma des exigences. La page intégrera la **mise en plan** dans la section prototype, le **schéma des exigences** dans la partie contraintes et la **plaque électronique** comme détail de fabrication. Le rendu du drone et le logo SPEED X pourront soutenir la conclusion visuelle.

## Identité visuelle

Le dossier réunit la construction du signe, une palette, une planche typographique et une application portfolio. La page intégrera le **logo décomposé** pour expliquer le système, la **palette de couleur** et la **typographie** comme documents de règles, puis la mise en situation sur le portfolio comme résultat.

## Essential Phone

Le dossier comprend un brainstorming, des croquis de logo et de produit, une interface, une vue filaire et plusieurs rendus couleur. La page intégrera le **brainstorming** et le **croquis produit** dans le processus, l’**interface** comme pièce centrale d’usage, la **vue filaire** comme document de forme et les rendus bleu, orange, vert et jaune dans une galerie de déclinaisons.

## Projet Photo

La série contient une grille de contact ainsi que trois paires avant/après pour la moto, le poteau et le vélo. La page intégrera la **grille photo** en point d’entrée visuel et les paires avant/après dans un module de comparaison : traitement sombre à gauche, photographie d’origine à droite. Ces documents seront montrés sans recadrage destructif.

## Vérification d’intégration

Le dossier Essential Phone expose les URLs de documents attendues dans son contenu accessible et son défilement vertical atteint bien les sections de processus et d’archives. Les images sont chargées de manière différée afin de préserver la fluidité de la première lecture ; une vérification visuelle de leur zone de page est nécessaire après les avoir fait entrer dans le viewport.

Le dossier Projet Photo expose la grille de sélection, les documents de sujets et les trois comparaisons de traitement. La structure permet de rapprocher les versions d’une même scène sans modifier les photographies originales.

## Médias interactifs

La visionneuse Essential Phone est bien créée avec un canvas accessible et les contrôles de manipulation annoncés. Le contrôleur de navigateur détecte la page comme plus longue que le viewport mais n’a pas pu forcer son défilement global dans cette session ; la structure de page reste cependant documentée avec les sections 3D et média attendues. L’audit du GLB a révélé un recentrage appliqué avant l’échelle ; il a été corrigé pour placer le modèle effectivement au centre de sa visionneuse. Le modèle bleu est à présent visible, correctement cadré et prêt à être manipulé dans le canvas.

Le lecteur SPEED X est présent dans le dossier Drone, ses métadonnées sont chargées (durée détectée : 27,07 s) et une piste WebVTT française est associée comme sous-titrage par défaut. Le poster reprend le rendu de prototype fourni.

La passe d’utilité ajoute un mode d’examen accessible pour les documents. La planche de brainstorming Essential Phone s’ouvre en grand dans une boîte de dialogue identifiée, puis peut être fermée avec son bouton dédié ou avec la touche Échap.

Les repères rapides permettent d’atteindre directement la section de manipulation Essential Phone. La fermeture au clavier du mode d’examen a été vérifiée, et la commande de réinitialisation reste disponible au-dessus de la visionneuse.

La nouvelle scène-dossier ouvre Essential Phone via son index dans l’onglet courant. Après le chargement du dossier, le titre est bien synchronisé sur « Essential Phone — Robin Courte ».

La scène-dossier d’accueil présente désormais les quatre modèles source sur des podiums colorés, avec leurs étiquettes imprimées, un index correspondant et un cartouche d’atelier unifié. Le contrôle de survol automatisé est resté dépendant du navigateur de prévisualisation ; la sélection est donc aussi couverte par le test des routes d’index et la logique de raycasting limitée aux meshes GLB.

Le lecteur Drone utilise désormais la vidéo source « Video_drone_seul » et la piste fournie « sous_titres.vtt ». Le navigateur confirme une piste de sous-titres disponible et active dans les réglages du lecteur.

La visionneuse Essential Phone expose désormais un bouton « Agrandir la visionneuse » distinct de la réinitialisation ; son activation utilise l’API plein écran de la scène afin de préserver les contrôles 3D dans une surface étendue.

La commande d’agrandissement a été exécutée dans le navigateur : lorsque le plein écran natif n’est pas disponible, la visionneuse passe bien dans son mode de secours plein viewport et le bouton devient « Réduire la visionneuse ».

Le lecteur Drone a été contrôlé après suppression du poster : il charge directement la vidéo source « Video_drone_seul », ne possède aucun attribut poster, et conserve une piste WebVTT séparée « sous_titres.vtt » dans ses réglages.

La visionneuse est accessible depuis le dossier Essential Phone et le lecteur SPEED X est présenté dans une section dédiée au film du Drone. Les deux modules s’insèrent dans le rythme des dossiers, après les archives et avant les apprentissages.

La zone de manipulation Essential Phone est dimensionnée à 577 × 556 px sur la vérification desktop. Un déplacement de pointeur a été émis dans son canvas de contrôle ; le module reste rendu et réactif sans erreur console, tandis que la manipulation manuelle directe demeure le comportement de référence.
