# Audit des sources reçues

| Élément | Constat | Incidence sur la reconstruction |
|---|---|---|
| Référence Blender détaillée | Établi occupant presque toute la largeur, palette gris chaud et bleu poussiéreux, lumière directionnelle douce plus lampe chaude | Cadrage, balance de lumière et matériaux doivent s’aligner sur ce rendu. |
| Capture de l’état actuel | Scène trop sombre, plateau moins détaillé, plans presque blancs, contraste des objets insuffisant | La reconstruction doit prioriser l’exposition, la couleur des plans, la finesse du bois et les ombres de contact. |
| Portfolio existant | Navigation par projets de design, ton calme et technique | Les quatre projets historiques restent les entrées principales. |
| Code fourni | Three.js avec GLTFLoader, OrthographicCamera, raycaster, hover et drag déjà amorcés ; multiplication de la position caméra incohérente entre les réglages | L’architecture sera remplacée par une scène React/Three.js modulaire avec caméra orthographique réglée par `camera.zoom` et chargement résilient. |
| Modèles GLB et textures | Aucun fichier GLB, GLTF ou texture source n’est présent dans les pièces reçues / l’espace de travail | Une scène paramétrique de secours est nécessaire ; les chemins de chargement des GLB seront centralisés afin d’intégrer les vrais assets sans réécriture. |
