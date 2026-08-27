# Direction créative — Atelier de Robin Courte

## Référence de vérité

Le rendu Blender fourni est la spécification visuelle prioritaire. La page doit restituer une vue orthographique en plongée sur un établi ancien, décentré bas dans l’image, entouré d’un sol minéral gris chaud. Le plateau présente un bois usé à lames visibles, un cadre et des rivets métalliques patinés. Les quatre projets existent sous forme d’objets déposés sur des cartes de plan bleu : téléphone violet, appareil photo noir, galet d’identité vert-gris et drone blanc. Une lampe articulée noire occupe l’angle supérieur droit et réchauffe localement la table par un faisceau ocre doux.

Cette direction remplace la logique de la capture de l’état actuel : la composition doit retrouver la profondeur, la lisibilité des matériaux, les contacts d’ombre et les contrastes doux visibles dans la référence Blender détaillée, sans ajouter d’éléments décoratifs qui n’y figurent pas.

## Approche choisie — « Établi de prototypage patiné »

### Design Movement

Une transposition web de **visualisation produit cinématographique** : rendus PBR modestes, éclairage de studio à température mixte, et précision d’un plan de fabrication. L’interface demeure volontairement discrète afin que la scène soit l’outil de navigation.

### Core Principles

1. La fidélité de composition prévaut : vue orthographique, proportions des objets et ancrage de l’établi avant tout.
2. Les matériaux racontent l’usage : bois irrégulier, métal sombre, plans bleus mats, plastiques et céramique aux réponses lumineuses distinctes.
3. La lumière est structurante : douce ambiance gris-brun, clé chaude et faisceau local de la lampe avec ombres de contact.
4. Les interactions restent physiques : les objets se soulèvent légèrement au survol et glissent uniquement sur le plateau pendant un glisser-déposer.

### Color Philosophy

La scène s’appuie sur une base neutre et terreuse afin que les plans techniques bleu poudré deviennent la couleur de navigation. Le noir de la lampe et de l’appareil photo crée des masses de contraste. Les reflets chauds ne sont employés qu’à la lampe, pour renforcer la sensation d’atelier réel plutôt qu’une palette décorative.

### Layout Paradigm

La scène est un plein écran sans grille de contenu. Les repères de marque sont posés à la périphérie de la caméra, comme une annotation d’atelier : identité en haut à gauche, instruction basse à droite, titre de projet directement lié à l’objet survolé.

### Signature Elements

1. Le cadre d’établi à rivets et les lames de bois patinées.
2. Les cartes bleues de plans techniques avec traits blancs et légendes.
3. Le cône lumineux subtilement texturé de la lampe dans l’angle supérieur droit.

### Interaction Philosophy

Les projets sont des objets, pas des cartes UI. Le curseur, le soulèvement discret et le tooltip suggèrent leur manipulabilité. Un clic sans déplacement ouvre le projet ; un déplacement perceptible annule la navigation et repositionne l’objet avec des limites de plateau claires.

### Animation

L’arrivée se fait en fondu de lumière et non par une animation décorative. Les objets s’élèvent de quelques millimètres avec une ombre renforcée au survol. Les tooltips apparaissent en 150 ms ; les repères et légendes reposent sur des transitions d’opacité à courbe franche. Toutes les animations sont réduites lorsque l’utilisateur demande une réduction des mouvements.

### Typography System

Le nom utilise **Space Grotesk** en capitales serrées, en écho au langage industriel et aux légendes de plan. Les indications, statuts et tooltips emploient **IBM Plex Mono** à faible corps afin de ressembler à des annotations techniques. Aucun texte ne concurrence la scène.

### Brand Essence

**Un atelier numérique où les prototypes de Robin Courte deviennent une navigation tangible pour découvrir son travail de design et d’ingénierie.**

Les adjectifs de personnalité sont : précis, curieux, tactile.

### Brand Voice

Les textes sont directs, techniques et calmes. Les appels à l’action décrivent une action physique plutôt que de promettre une valeur générique.

> « Saisir un prototype »

> « Faire glisser sur le plateau · cliquer pour ouvrir le dossier »

### Wordmark & Logo

Le mot-symbole « ROBIN COURTE » s’écrit en capitales géométriques, avec un monogramme RC réduit à deux lignes parallèles et un angle de plan technique. L’icône doit rester lisible au-dessus de la scène, sans encadré.

### Signature Brand Color

**Bleu Plan RC — #6C97C2** : le bleu gris légèrement désaturé des planches techniques posées sur l’établi.

## Style Decisions

- La référence Blender détaillée reste le repère de cadrage, lumière, couleurs et densité de détail à chaque itération.
- Les interactions sont écrites pour fonctionner avec les GLB fournis ultérieurement, mais une scène de repli paramétrique doit permettre un rendu complet tant que ces fichiers ne sont pas présents.
- La performance reste compatible avec un navigateur courant : pixel ratio borné, ombres raisonnables et géométrie instanciée lorsque possible.
- Chaque prototype est rattaché à une planche bleu plan RC, jamais traité comme un accessoire libre sans langage de projet.
- Aucun texte ne figure au centre du plateau ; la marque et les instructions restent en périphérie de caméra.
- Le monogramme reprend les deux traits parallèles et l’angle de plan pour conserver une lecture d’atelier même à petite taille.

---

## Extension éditoriale — Pages projets

### Trois pistes envisagées

#### 1. **Catalogue d’atelier**

Une étude de cas pensée comme un dossier de fabrication : matière, annotations, pièces et résultats sont présentés dans une composition chaude et tactile. La lecture évoque une table de travail, sans imiter l’interface d’un logiciel.

**Probabilité : 0,07**

#### 2. **Affiches en série**

Chaque projet devient une affiche éditoriale construite à partir de formes franches, de couleurs d’encre et de typographie architecturée. L’inspiration Bauhaus devient un système de rythme plutôt qu’un décor nostalgique.

**Probabilité : 0,04**

#### 3. **Archives de personnages**

Les projets sont traités comme des cartes de collection, combinant cadre noir, code de référence, emblème, attributs et compositions illustrées. La personnalité de chaque travail passe avant la répétition d’une simple grille.

**Probabilité : 0,09**

### Piste retenue — **Affiches en série**

#### Mouvement de design

Cette extension traduit le **Bauhaus éditorial contemporain** en études de cas numériques : géométrie rationnelle, asymétrie construite, couleurs d’encre et typographie à forte présence. Les références de cartes illustrées inspirent les cartouches, les codes de série et la manière de donner une identité autonome à chaque projet.

#### Principes directeurs

1. Chaque page fonctionne comme une **affiche verticale lisible**, avec une idée graphique forte et une lecture de haut en bas.
2. Les contenus sont structurés en **blocs éditoriaux contrastés** plutôt qu’en cartes UI répétitives.
3. Les grandes formes géométriques guident le regard, encadrent les documents et matérialisent les catégories de projet.
4. Les métadonnées — numéro, type de projet, rôle, année et statut du dossier — forment un vocabulaire de collection discret mais récurrent.

#### Philosophie de la couleur

Le papier chaud (`#F2E9D8`) est la base commune : il relie les études de cas à un carnet d’atelier et rend les couleurs plus matérielles. Chaque projet reçoit ensuite une couleur d’encre dominante : **bleu plan technique** pour Essential Phone, **vert signal** pour l’identité visuelle, **jaune lumière** pour le projet photo et **rouge-orangé** pour le drone. Le noir encre (`#171612`) porte titres et repères techniques ; la couleur oriente sans recouvrir l’ensemble des surfaces.

#### Paradigme de mise en page

Chaque étude de cas est une **colonne d’affiche asymétrique**. Une bande verticale de référence persiste à gauche sur desktop, tandis que le contenu alterne entre un grand panneau manifeste, une planche documentaire, des annotations et une conclusion. Les documents temporaires n’occupent jamais une grille uniforme : certains sont grands, d’autres légèrement décalés, selon le rythme propre au projet.

#### Éléments signatures

1. Un **sceau géométrique numéroté**, propre à chaque projet, relie les pages à l’idée de série.
2. Une **règle d’atelier** à points et graduations accompagne les documents et légendes.
3. Des **formes Bauhaus de découpe** — arcs, demi-disques, bandes, yeux et cibles — s’insèrent derrière le contenu sans nuire à la lecture.

#### Philosophie d’interaction

Les interactions sont nettes et matérielles : les liens se soulignent comme un trait d’encre, les documents se soulèvent très légèrement et les retours à l’atelier se comportent comme l’index d’un dossier. Aucun effet décoratif ne ralentit la lecture ou ne masque les informations.

#### Animation

Les cartouches et documents entrent par échelons de 40 à 70 ms, avec un léger déplacement vertical et une opacité progressive. Les formes décoratives restent statiques. Les transitions de survol durent de 140 à 180 ms et animent uniquement `transform`, `opacity` et les traits. Les préférences de réduction des mouvements désactivent les entrées non essentielles.

#### Système typographique

**Archivo Black** porte titres, numéros et légendes à impact : capitales serrées, lignes courtes, composition quasi-affiche. **Space Grotesk** assure texte courant, métadonnées et boutons : géométrique, lisible, technique sans être froide. Les titres sont très grands mais jamais centrés par défaut ; les paragraphes gardent une mesure courte et respirante.

#### Essence de marque

**Des études de conception pour montrer comment une idée devient une forme, destinées aux personnes curieuses de design matériel et numérique, avec un regard d’atelier plus qu’un portfolio vitrine.**

Personnalité : **curieuse, précise, expressive**.

#### Voix de marque

La voix est directe, concrète et jeune sans être décontractée. Les titres annoncent une intention, les microcopies décrivent une action ou une pièce du dossier, sans remplissage générique.

> « Une interface pensée comme un objet que l’on a envie de retourner. »

> « Ouvrir le dossier — croquis, choix, essais. »

#### Logotype et symbole

Le monogramme de navigation est une **lettre R construite par deux demi-disques et une barre verticale**, imprimée en noir sur papier chaud. Il s’emploie seul dans le retour atelier et les repères de section ; le nom complet reste composé dans la typographie de titre, jamais dans une police par défaut.

#### Couleur signature

**Orange atelier — `#E95A2C`** : une teinte d’encre chaude, énergique et immédiatement reconnaissable, réservée aux accents de navigation, aux mots-clés et aux repères de progression.
