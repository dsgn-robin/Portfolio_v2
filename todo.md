# Intégration des modèles Blender

- [x] Inspecter les dimensions, les origines et les matériaux des sept fichiers GLB reçus.
- [x] Préparer et référencer les GLB comme assets de production du projet.
- [x] Recaler l’établi, le sol, la lampe et les quatre prototypes à partir de leurs dimensions réelles.
- [x] Vérifier les interactions de survol, clic et glisser-déposer avec les vrais meshes.
- [x] Ajuster la caméra et l’éclairage après intégration, puis valider le chargement et la compilation de la scène sur desktop et mobile.

## Correction lumière et interactions

- [x] Cartographier les sources lumineuses de référence et supprimer les éclairages qui dénaturent l’ambiance Blender.
- [x] Recomposer une lumière générale diffuse, une clé douce et un faisceau de lampe cohérent avec les ombres de référence.
- [x] Construire une liste de meshes sélectionnables ne comprenant ni wrappers, ni plans, ni géométrie invisible.
- [x] Vérifier les zones de survol, clic et glisser-déposer sur les quatre modèles réels.

## Rééquilibrage de luminance

- [x] Augmenter l’exposition et la lumière générale sans écraser les détails du bois.
- [x] Renforcer la clé chaude et le remplissage afin que les projets restent lisibles hors du faisceau de la lampe.
- [x] Vérifier que le faisceau de lampe conserve une hiérarchie locale sans brûler le plateau.

## Recalage renforcé de composition

- [x] Reprendre l’angle, le zoom et l’offset vertical de la caméra contre la référence Blender.
- [x] Augmenter franchement la luminance globale du plateau et du sol.
- [x] Conserver des ombres lisibles tout en évitant une lumière localement surexposée.

## Vue orthographique inclinée

- [x] Incliner la caméra orthographique vers la face avant de l’établi pour faire apparaître le chant et les pieds.
- [x] Recaler le zoom et le cadrage sans perdre les objets des projets.
- [x] Réorienter les lumières pour révéler les volumes du plateau et des pieds visibles.

## Audit des textures GLB

- [x] Extraire l’inventaire des images, maps PBR et paramètres de matériaux présents dans les GLB.
- [x] Identifier les matériaux qui peuvent être améliorés directement dans Three.js.
- [x] Appliquer des améliorations PBR non destructives lorsque les maps existantes le permettent.

## Matériaux distinctifs

- [x] Restaurer la couleur bleue et les cartes de détail des plans techniques du téléphone et du drone.
- [x] Définir le corps de l’identité visuelle comme un verre translucide.
- [x] Conserver le logo vert comme élément interne, opaque et lisible.

## Restitution fidèle des GLB

- [x] Extraire les vraies images et définitions de matériaux embarquées dans les GLB originaux.
- [x] Retirer les profils PBR artificiels ajoutés côté Three.js.
- [x] Recharger les matériaux, extensions glTF et textures d’origine sans les remplacer.

## Rotation des prototypes

- [x] Ajouter la rotation de l’objet survolé à la molette.
- [x] Préserver le clic, le glisser-déposer et le comportement de scroll hors objet.
- [x] Vérifier la rotation sur les quatre modèles interactifs.

## Éclairage des blueprints réels

- [x] Élargir le cône de la lampe afin de couvrir les deux plans techniques sur l’établi.
- [x] Rééquilibrer l’intensité et la pénombre sans modifier les textures GLB de blueprint.
- [x] Vérifier la lisibilité du bleu et des tracés sous la lumière élargie.

## Lampe et blueprints rotatifs

- [x] Analyser exclusivement les 20 premières secondes de la vidéo fournie.
- [x] Réduire l’ombre portée de la lampe sur le plateau sans réduire la lisibilité des blueprints.
- [x] Ajuster le comportement lumineux des blueprints lorsqu’ils tournent.

## Stabilité lumineuse des blueprints

- [x] Analyser la vidéo fournie afin d’identifier la face ou le matériau qui passe au noir à la rotation.
- [x] Corriger l’éclairage général sans remplacer les textures GLB d’origine.
- [x] Vérifier une luminosité stable des blueprints sur 360 degrés de rotation.

## Réduction de surexposition

- [x] Réduire l’environnement PBR et les remplissages responsables du voile lumineux.
- [x] Préserver une lumière minimale sur les blueprints pendant leur rotation.
- [x] Vérifier le contraste des matières bois, béton, verre et plans techniques.

## Manipulation combinée

- [x] Autoriser la molette sur l’objet activement déplacé.
- [x] Préserver simultanément le déplacement, la rotation et la capture du pointeur.
- [x] Vérifier le clic simple et l’ouverture de lien après manipulation combinée.

## Passe globale de finition

- [x] Auditer le cycle de rendu, les chargements GLB et les gestionnaires d’interaction.
- [x] Fluidifier le déplacement, la rotation et les retours de survol des prototypes.
- [x] Stabiliser le rendu et réduire le coût de rendu sur les écrans modestes.
- [x] Clarifier les repères d’usage et l’état de chargement de la scène.

## Tooltip de projet

- [x] Identifier pourquoi les changements de tooltip cadencés ne s’affichent plus au survol.
- [x] Restaurer le nom et la catégorie au survol de chaque mesh interactif.
- [x] Vérifier que le tooltip suit le pointeur sans perte de fluidité.

## Tooltip visible

- [x] Vérifier la transmission du projet sélectionné entre le raycaster et l’interface React.
- [x] Rendre le tooltip visible au-dessus du canvas avec une superposition stable.
- [x] Confirmer l’apparition du nom et de la catégorie au survol de chaque prototype.

## Diagnostic tooltip définitif

- [x] Enregistrer les hits du raycaster et les changements de survol pour isoler la rupture.
- [x] Réparer le chemin qui empêchait le texte projet de recevoir une position visible.
- [x] Vérifier le chemin d’affichage du libellé au-dessus du canvas pour les quatre prototypes.

## Pages projets éditoriales

- [x] Relever l’architecture et le ton du portfolio existant pour la déclinaison éditoriale.
- [x] Définir le système visuel commun inspiré des affiches Bauhaus et des cartes illustrées.
- [x] Écrire les contenus documentaires temporaires et la structure partagée des études de cas.
- [x] Concevoir les pages dédiées aux projets et leurs compositions graphiques.
- [x] Relier les objets de l’atelier aux routes projets et contrôler l’expérience mobile.
- [x] Vérifier les pages, ajuster les contrastes et enregistrer une version testée.

## Correction de navigation des dossiers

- [x] Ouvrir les dossiers internes dans l’onglet actuel plutôt que dans une nouvelle fenêtre.
- [x] Autoriser le défilement vertical uniquement sur les pages projets, sans perturber l’atelier 3D plein écran.
- [x] Mettre à jour le titre du navigateur selon le dossier actuellement affiché.
- [x] Vérifier le parcours atelier, changement de dossier et retour sur desktop et mobile.

## Intégration des documents projets

- [x] Décompresser et inventorier les documents du drone, de l’identité, du téléphone et du projet photo.
- [x] Sélectionner les visuels les plus adaptés aux sections de chaque dossier.
- [x] Préparer des versions web légères sans rogner les documents importants.
- [x] Remplacer les archives temporaires par les documents réels et enrichir les galeries.
- [x] Vérifier les quatre dossiers sur desktop et mobile, puis enregistrer une version testée.

## Médias interactifs des dossiers

- [x] Relever les proportions des documents et préparer le rendu de chaque cadre selon son contenu.
- [x] Extraire et publier la vidéo sous-titrée du Drone sans alourdir le code du projet.
- [x] Préparer le GLB Essential Phone pour une visionneuse 3D autonome et manipulable.
- [x] Adapter les modules d’archives, la vidéo et la visionneuse au langage éditorial des dossiers.
- [x] Vérifier sur desktop et mobile le cadrage, la lecture vidéo et la manipulation 3D.

## Passe d’utilité et de finition

- [x] Auditer les actions essentielles disponibles dans l’atelier et les dossiers.
- [x] Ajouter une navigation de dossier plus rapide et des repères de progression lisibles.
- [x] Enrichir la consultation des images, de la vidéo et du modèle 3D avec des retours utiles.
- [x] Ajouter des améliorations d’accessibilité et de confort responsive sans altérer les assets source.
- [x] Vérifier les parcours principaux puis enregistrer une version testée.

## Nouvel accueil scène-dossier

- [x] Mettre l’atelier 3D actuel de côté dans un composant de réserve non destructif.
- [x] Formaliser la scène d’accueil comme un atelier Bauhaus cohérent avec les dossiers.
- [x] Recomposer le sol, les supports, l’éclairage et les repères de la nouvelle scène.
- [x] Reprendre la sélection précise, le déplacement, la rotation et l’ouverture des dossiers.
- [x] Vérifier la nouvelle scène sur desktop et mobile, puis enregistrer une version testée.

## Ajustements précis accueil et dossiers

- [x] Corriger la taille, l’orientation et les supports visuels des quatre objets de l’accueil.
- [x] Remplacer le duo blueprint+téléphone par le téléphone seul sur le support Essential Phone.
- [x] Étendre les zones de clic aux socles, la zone de déplacement à la scène et organiser l’index par catégories.
- [x] Simplifier le rail des dossiers, uniformiser les hovers et inverser la comparaison photo demandée.
- [x] Remplacer la piste de sous-titres Drone et rectifier la visionneuse Essential Phone.
- [x] Vérifier les interactions desktop/mobile puis enregistrer une version testée.

## Correction des interactions signalées

- [x] Distinguer la zone de prise initiale de la zone de déplacement étendue sur l’accueil.
- [x] Réduire le téléphone de l’accueil sans modifier son GLB ou ses matériaux.
- [x] Faire démarrer le film Drone directement et rendre ses sous-titres visibles dans ses réglages.
- [x] Rendre opérationnelle l’action d’agrandissement de la visionneuse Essential Phone.
- [x] Vérifier les quatre comportements dans le navigateur et enregistrer une version testée.

## Réglage final accueil et vidéo

- [x] Réduire et orienter Essential Phone face à la caméra sur l’accueil.
- [x] Étendre les limites de déplacement jusqu’aux marges utiles de la scène.
- [x] Rendre les sous-titres Drone immédiatement actifs à la lecture de la vidéo.
- [x] Vérifier visuellement l’accueil et le lecteur, puis enregistrer une version testée.
