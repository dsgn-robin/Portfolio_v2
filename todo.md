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
