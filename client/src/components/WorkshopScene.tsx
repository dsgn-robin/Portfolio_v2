/**
 * Style reminder — « Établi de prototypage patiné » : composition orthographique,
 * matériaux PBR terreux, plans bleu poudré et lumière chaude locale de la lampe.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const ASSETS = {
  wood: "/manus-storage/aged-workbench-wood_09a1b4f7.png",
  floor: "/manus-storage/warm-concrete-floor_a97d68bd.png",
  blueprint: "/manus-storage/blueprint-surface_d8f50f64.png",
};

const GLB_PATHS = {
  floor: "/manus-storage/floor_f200454f.glb",
  table: "/manus-storage/etabli_c00d06ce.glb",
  lamp: "/manus-storage/lamp_b12c8ce7.glb",
  phone: "/manus-storage/phone_0fd05b3c.glb",
  photo: "/manus-storage/photo_2b003e1a.glb",
  identity: "/manus-storage/identite_17dcad1d.glb",
  drone: "/manus-storage/drone_fbc0d7ed.glb",
} as const;

type ProjectKey = "phone" | "photo" | "identity" | "drone";

type ProjectSpec = {
  key: ProjectKey;
  title: string;
  eyebrow: string;
  url: string;
  fallbackSize: number;
  position: [number, number, number];
};

const PROJECTS: ProjectSpec[] = [
  {
    key: "phone",
    title: "Essential Phone",
    eyebrow: "Objet · 01",
    url: "/projets/essential-phone",
    fallbackSize: 1.35,
    position: [3.0766, 1.0002, -0.3527],
  },
  {
    key: "photo",
    title: "Projet Photo",
    eyebrow: "Image · 02",
    url: "/projets/projet-photo",
    fallbackSize: 1.25,
    position: [3.601, 1.0025, -0.4527],
  },
  {
    key: "identity",
    title: "Identité visuelle",
    eyebrow: "Système · 03",
    url: "/projets/identite-visuelle",
    fallbackSize: 1.2,
    position: [3.0266, 1.0051, -1.3136],
  },
  {
    key: "drone",
    title: "Projet Drone",
    eyebrow: "Mobilité · 04",
    url: "/projets/projet-drone",
    fallbackSize: 1.8,
    position: [3.4498, 0.9999, -1.5563],
  },
];

const TABLE = {
  width: 1.1196,
  depth: 2.1911,
  topY: 1.0003,
  projectY: 1.012,
  minX: 2.74,
  maxX: 3.75,
  minZ: -2.03,
  maxZ: 0.03,
};

function setShadow(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

function cylinderBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, direction.length(), 12),
    material,
  );
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function shadowDisc(width: number, depth: number, opacity: number) {
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 48),
    new THREE.MeshBasicMaterial({
      color: "#17110d",
      transparent: true,
      opacity,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(width, depth, 1);
  shadow.renderOrder = 2;
  return shadow;
}

function blueprintTexture(loader: THREE.TextureLoader) {
  const texture = loader.load(ASSETS.blueprint);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.25, 1.25);
  return texture;
}

function makeBlueprint(
  texture: THREE.Texture,
  width: number,
  height: number,
  position: THREE.Vector3,
  rotation: number,
) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.rotation.y = rotation;
  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.026, height),
    new THREE.MeshStandardMaterial({
      color: "#8396a3",
      map: texture,
      roughness: 0.86,
      metalness: 0,
      emissive: "#254766",
      emissiveIntensity: 0.18,
    }),
  );
  paper.position.y = 0.015;
  paper.castShadow = true;
  paper.receiveShadow = true;
  group.add(paper);
  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(width, 0.032, height)),
    new THREE.LineBasicMaterial({ color: "#c7d9e3", transparent: true, opacity: 0.42 }),
  );
  border.position.y = 0.018;
  group.add(border);
  return group;
}

function makePhone() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(0.78, 0.13, 1.04, 5, 0.09),
    new THREE.MeshPhysicalMaterial({
      color: "#6b70c5",
      roughness: 0.31,
      metalness: 0.12,
      clearcoat: 0.28,
    }),
  );
  body.rotation.x = Math.PI / 2;
  body.position.y = 0.1;
  group.add(body);
  const screen = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.025, 0.44, 4, 0.045),
    new THREE.MeshPhysicalMaterial({ color: "#151a22", roughness: 0.2, metalness: 0.18, clearcoat: 0.68 }),
  );
  screen.rotation.x = Math.PI / 2;
  screen.position.set(0.08, 0.176, 0.08);
  group.add(screen);
  const lensMaterial = new THREE.MeshPhysicalMaterial({ color: "#151414", metalness: 0.42, roughness: 0.12 });
  [-0.23, -0.04].forEach((x, index) => {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.073 - index * 0.008, 0.073 - index * 0.008, 0.02, 24), lensMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(x, 0.18, -0.29 + index * 0.012);
    group.add(lens);
  });
  const flash = new THREE.Mesh(new THREE.CircleGeometry(0.036, 16), new THREE.MeshBasicMaterial({ color: "#d9d4b6" }));
  flash.rotation.x = -Math.PI / 2;
  flash.position.set(-0.25, 0.181, -0.43);
  group.add(flash);
  setShadow(group);
  return group;
}

function makeCamera() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(0.96, 0.56, 0.7, 5, 0.08),
    new THREE.MeshPhysicalMaterial({ color: "#151515", roughness: 0.33, metalness: 0.26 }),
  );
  body.position.y = 0.34;
  group.add(body);
  const grip = new THREE.Mesh(new RoundedBoxGeometry(0.24, 0.52, 0.57, 4, 0.05), new THREE.MeshStandardMaterial({ color: "#121212", roughness: 0.48 }));
  grip.position.set(-0.54, 0.26, 0.04);
  group.add(grip);
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.32, 0.47, 36),
    new THREE.MeshPhysicalMaterial({ color: "#101112", roughness: 0.16, metalness: 0.58, clearcoat: 0.25 }),
  );
  lens.rotation.z = Math.PI / 2;
  lens.position.set(0.62, 0.36, 0);
  group.add(lens);
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.02, 36), new THREE.MeshPhysicalMaterial({ color: "#26333b", roughness: 0.04, metalness: 0.3, clearcoat: 0.95 }));
  glass.rotation.z = Math.PI / 2;
  glass.position.set(0.865, 0.36, 0);
  group.add(glass);
  const shutter = new THREE.Mesh(new THREE.CylinderGeometry(0.097, 0.097, 0.03, 20), new THREE.MeshStandardMaterial({ color: "#b9b4aa", roughness: 0.34, metalness: 0.7 }));
  shutter.rotation.x = Math.PI / 2;
  shutter.position.set(-0.18, 0.64, -0.15);
  group.add(shutter);
  const ridgeMaterial = new THREE.MeshStandardMaterial({ color: "#292929", roughness: 0.37, metalness: 0.48 });
  for (let index = 0; index < 7; index += 1) {
    const ridge = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.012, 8, 32), ridgeMaterial);
    ridge.rotation.y = Math.PI / 2;
    ridge.position.set(0.44 + index * 0.056, 0.36, 0);
    group.add(ridge);
  }
  setShadow(group);
  return group;
}

function makeIdentity() {
  const group = new THREE.Group();
  const base = new THREE.Mesh(
    new RoundedBoxGeometry(0.92, 0.19, 0.84, 7, 0.18),
    new THREE.MeshPhysicalMaterial({ color: "#879486", roughness: 0.5, metalness: 0.04, clearcoat: 0.1 }),
  );
  base.position.y = 0.13;
  group.add(base);
  const inset = new THREE.Mesh(
    new RoundedBoxGeometry(0.77, 0.017, 0.67, 7, 0.16),
    new THREE.MeshStandardMaterial({ color: "#d4d2bf", roughness: 0.78, emissive: "#474536", emissiveIntensity: 0.12 }),
  );
  inset.position.y = 0.235;
  group.add(inset);
  const emblem = new THREE.Group();
  const emblemMaterial = new THREE.MeshStandardMaterial({ color: "#8d9280", roughness: 0.62 });
  [[-0.19, 0.12, 0.18, 0.12], [0.11, 0.12, 0.18, 0.12], [-0.19, -0.11, 0.18, 0.12], [0.11, -0.11, 0.18, 0.12]].forEach(([x, z, width, depth]) => {
    const tile = new THREE.Mesh(new RoundedBoxGeometry(width, 0.016, depth, 3, 0.04), emblemMaterial);
    tile.position.set(x, 0.255, z);
    emblem.add(tile);
  });
  group.add(emblem);
  setShadow(group);
  return group;
}

function makeDrone() {
  const group = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({ color: "#e6e7df", roughness: 0.39, metalness: 0.06, clearcoat: 0.22 });
  const dark = new THREE.MeshStandardMaterial({ color: "#536062", roughness: 0.46, metalness: 0.54 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 28, 20), white);
  body.scale.set(1.3, 0.43, 0.78);
  body.position.y = 0.25;
  group.add(body);
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshPhysicalMaterial({ color: "#bfc6c3", roughness: 0.13, metalness: 0.18, clearcoat: 0.74 }));
  canopy.scale.set(1.1, 0.35, 0.83);
  canopy.position.set(-0.12, 0.38, -0.01);
  group.add(canopy);
  const arms: [number, number][] = [[-0.58, -0.47], [0.58, -0.47], [-0.58, 0.47], [0.58, 0.47]];
  arms.forEach(([x, z], index) => {
    const arm = cylinderBetween(new THREE.Vector3(x * 0.28, 0.24, z * 0.28), new THREE.Vector3(x, 0.2, z), 0.065, white);
    group.add(arm);
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.09, 24), dark);
    motor.position.set(x, 0.22, z);
    group.add(motor);
    const propeller = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.01, 0.075), new THREE.MeshPhysicalMaterial({ color: "#f1f0e8", roughness: 0.2, transparent: true, opacity: 0.82 }));
    propeller.position.set(x, 0.29, z);
    propeller.rotation.y = index % 2 === 0 ? 0.48 : -0.48;
    group.add(propeller);
  });
  for (const x of [-0.25, 0.25]) {
    const strut = cylinderBetween(new THREE.Vector3(x, 0.14, 0.22), new THREE.Vector3(x, -0.1, 0.31), 0.025, dark);
    group.add(strut);
  }
  const feet = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.022, 8, 28, Math.PI), dark);
  feet.rotation.x = Math.PI / 2;
  feet.position.set(0, -0.1, 0.3);
  group.add(feet);
  setShadow(group);
  return group;
}

function makeLamp() {
  const group = new THREE.Group();
  const black = new THREE.MeshPhysicalMaterial({ color: "#121210", roughness: 0.31, metalness: 0.44, clearcoat: 0.14 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: "#272623", roughness: 0.32, metalness: 0.64 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.72, 0.16, 48), black);
  base.position.y = 0.12;
  group.add(base);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.49, 0.042, 12, 48), darkMetal);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.207;
  group.add(baseRing);
  const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), darkMetal);
  pivot.position.set(0.16, 0.4, 0);
  group.add(pivot);
  const elbow = new THREE.Vector3(0.38, 1.75, 0.04);
  const end = new THREE.Vector3(-0.55, 2.52, -0.08);
  group.add(cylinderBetween(new THREE.Vector3(0.16, 0.43, 0), elbow, 0.065, darkMetal));
  group.add(cylinderBetween(elbow, end, 0.065, darkMetal));
  [new THREE.Vector3(0.16, 0.43, 0), elbow, end].forEach((point) => {
    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), black);
    joint.position.copy(point);
    group.add(joint);
  });
  const springA = cylinderBetween(new THREE.Vector3(0.23, 0.57, 0.075), new THREE.Vector3(0.45, 1.59, 0.075), 0.018, black);
  const springB = cylinderBetween(new THREE.Vector3(0.47, 1.78, 0.075), new THREE.Vector3(-0.42, 2.42, 0.075), 0.018, black);
  group.add(springA, springB);
  const neck = cylinderBetween(end, new THREE.Vector3(-0.88, 2.25, -0.11), 0.11, black);
  group.add(neck);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.76, 40, 1, true), black);
  shade.position.set(-1.08, 1.95, -0.13);
  shade.rotation.z = -0.62;
  group.add(shade);
  const shadeLip = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.024, 12, 40), darkMetal);
  shadeLip.position.set(-1.29, 1.78, -0.13);
  shadeLip.rotation.set(0, 1.08, 0.62);
  group.add(shadeLip);
  setShadow(group);
  return group;
}

function makeWorkbench(wood: THREE.Texture) {
  const group = new THREE.Group();
  const woodMaterial = new THREE.MeshStandardMaterial({ color: "#75553a", map: wood, roughness: 0.79, metalness: 0.02 });
  const edgeMaterial = new THREE.MeshStandardMaterial({ color: "#5d442e", map: wood, roughness: 0.84 });
  const metal = new THREE.MeshStandardMaterial({ color: "#5d5044", roughness: 0.55, metalness: 0.64 });
  const rust = new THREE.MeshStandardMaterial({ color: "#714935", roughness: 0.76, metalness: 0.38 });
  for (let index = 0; index < 5; index += 1) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(8.08, 0.15, 0.82), woodMaterial);
    plank.position.set(0, TABLE.topY, -1.64 + index * 0.82);
    plank.rotation.y = (index - 2) * 0.0025;
    group.add(plank);
  }
  const framePieces: [number, number, number, number, number, number][] = [
    [8.7, 0.26, 0.24, 0, 1.05, -2.18],
    [8.7, 0.26, 0.24, 0, 1.05, 2.18],
    [0.26, 0.26, 4.56, -4.23, 1.05, 0],
    [0.26, 0.26, 4.56, 4.23, 1.05, 0],
    [8.38, 0.32, 0.38, 0, 0.62, 2.16],
    [8.38, 0.3, 0.3, 0, 0.35, -2.15],
  ];
  framePieces.forEach(([x, y, z, px, py, pz], index) => {
    const piece = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), index < 4 ? edgeMaterial : new THREE.MeshStandardMaterial({ color: "#4e3523", roughness: 0.86 }));
    piece.position.set(px, py, pz);
    group.add(piece);
  });
  [[-3.95, -1.93], [3.95, -1.93], [-3.95, 1.93], [3.95, 1.93]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.8, 0.36), edgeMaterial);
    leg.position.set(x, -0.05, z);
    group.add(leg);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.52), metal);
    foot.position.set(x, -0.94, z);
    group.add(foot);
  });
  for (const x of [-3.97, 3.97]) {
    for (const z of [-1.62, -0.78, 0.06, 0.9, 1.63]) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.05, 16), rust);
      bolt.position.set(x, 1.2, z);
      group.add(bolt);
      const inset = new THREE.Mesh(new THREE.CircleGeometry(0.032, 12), new THREE.MeshBasicMaterial({ color: "#3a2820" }));
      inset.rotation.x = -Math.PI / 2;
      inset.position.set(x, 1.227, z);
      group.add(inset);
    }
  }
  for (let index = 0; index < 18; index += 1) {
    const scratch = new THREE.Mesh(new THREE.BoxGeometry(0.22 + (index % 4) * 0.09, 0.006, 0.008), new THREE.MeshBasicMaterial({ color: "#b09a79", transparent: true, opacity: 0.16 }));
    scratch.position.set(-3.45 + (index * 0.87) % 6.8, 1.128, -1.5 + (index * 0.57) % 3.0);
    scratch.rotation.y = (index % 5 - 2) * 0.12;
    group.add(scratch);
  }
  setShadow(group);
  return group;
}

type GLBLoadOptions = {
  normalizeAsProject?: boolean;
  onLoaded?: (model: THREE.Group) => void;
};

async function loadOptionalGLB(
  loader: GLTFLoader,
  path: string,
  host: THREE.Object3D,
  fallback: THREE.Object3D,
  name: string,
  options: GLBLoadOptions = {},
) {
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || contentType.includes("text/html")) {
      fallback.visible = true;
      console.info(`[Atelier 3D] ${name} reste en version procédurale : ${path} n’est pas encore disponible.`);
      return false;
    }
  } catch (error) {
    fallback.visible = true;
    console.info(`[Atelier 3D] ${name} reste en version procédurale : la disponibilité de ${path} n’a pas pu être vérifiée.`, error);
    return false;
  }
  return new Promise<boolean>((resolve) => {
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        if (options.normalizeAsProject) {
          const bounds = new THREE.Box3().setFromObject(model);
          const center = bounds.getCenter(new THREE.Vector3());
          model.position.sub(center);
          const centeredBounds = new THREE.Box3().setFromObject(model);
          model.position.y -= centeredBounds.min.y;
        }
        fallback.visible = false;
        setShadow(model);
        host.add(model);
        options.onLoaded?.(model);
        console.info(`[Atelier 3D] ${name} chargé depuis ${path}.`);
        resolve(true);
      },
      undefined,
      (error) => {
        fallback.visible = true;
        console.error(`[Atelier 3D] Impossible de charger ${name} (${path}). Le modèle procédural de repli reste affiché.`, error);
        resolve(false);
      },
    );
  });
}

export default function WorkshopScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState({ done: 0, total: 7 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const viewport: HTMLDivElement = mount;
    setReady(false);
    setLoadProgress({ done: 0, total: 7 });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#6d685e");
    scene.fog = new THREE.Fog("#6d685e", 16, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, viewport.clientWidth < 740 ? 1.25 : 1.5));
    renderer.setSize(viewport.clientWidth, viewport.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-label", "Atelier 3D interactif de Robin Courte");
    renderer.domElement.style.touchAction = "none";
    viewport.appendChild(renderer.domElement);

    const tooltipElement = document.createElement("div");
    tooltipElement.className = "workshop__tooltip";
    tooltipElement.setAttribute("aria-live", "polite");
    const tooltipEyebrow = document.createElement("span");
    const tooltipTitle = document.createElement("strong");
    tooltipElement.append(tooltipEyebrow, tooltipTitle);
    viewport.appendChild(tooltipElement);

    function updateTooltip(next: { title: string; eyebrow: string; x: number; y: number } | null) {
      if (!next) {
        tooltipElement.classList.remove("workshop__tooltip--visible");
        return;
      }
      tooltipEyebrow.textContent = next.eyebrow;
      tooltipTitle.textContent = next.title;
      tooltipElement.style.transform = `translate3d(${next.x + 16}px, ${next.y - 48}px, 0)`;
      tooltipElement.classList.add("workshop__tooltip--visible");
    }

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.32;
    pmremGenerator.dispose();

    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 80);
    const cameraTarget = new THREE.Vector3(3.22, 0.42, -1.0);
    camera.up.set(0, 1, 0);
    camera.position.set(6.7, 9.2, -1.0);
    camera.zoom = 1.12;
    camera.lookAt(cameraTarget);
    camera.updateProjectionMatrix();

    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(ASSETS.floor);
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4.5, 4.5);
    const woodTexture = textureLoader.load(ASSETS.wood);
    woodTexture.colorSpace = THREE.SRGBColorSpace;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2.2, 1.65);
    const plansTexture = blueprintTexture(textureLoader);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: "#70685e", map: floorTexture, roughness: 1, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.96;
    floor.receiveShadow = true;
    scene.add(floor);

    const floorVignette = new THREE.Mesh(
      new THREE.CircleGeometry(8.6, 72),
      new THREE.MeshBasicMaterial({ color: "#221b15", transparent: true, opacity: 0.1, depthWrite: false }),
    );
    floorVignette.rotation.x = -Math.PI / 2;
    floorVignette.position.y = -0.948;
    floorVignette.scale.set(1.55, 1, 1);
    scene.add(floorVignette);

    const tableHost = new THREE.Group();
    const tableFallback = makeWorkbench(woodTexture);
    tableHost.add(tableFallback);
    scene.add(tableHost);

    const lampHost = new THREE.Group();
    const lampFallback = makeLamp();
    lampHost.add(lampFallback);
    scene.add(lampHost);

    const leftPlan = makeBlueprint(plansTexture, 0.77, 0.75, new THREE.Vector3(3.08, TABLE.projectY - 0.025, -0.35), 0.42);
    const rightPlan = makeBlueprint(plansTexture, 0.62, 0.88, new THREE.Vector3(3.45, TABLE.projectY - 0.024, -1.56), -0.18);
    scene.add(leftPlan, rightPlan);

    const projectWrappers: THREE.Group[] = [];
    const projectFallbacks: Record<ProjectKey, THREE.Object3D> = {
      phone: makePhone(),
      photo: makeCamera(),
      identity: makeIdentity(),
      drone: makeDrone(),
    };
    const projectRotations: Record<ProjectKey, number> = { phone: 0, photo: 0, identity: 0, drone: 0 };

    PROJECTS.forEach((spec) => {
      const wrapper = new THREE.Group();
      wrapper.name = spec.key;
      wrapper.position.set(...spec.position);
      wrapper.rotation.y = projectRotations[spec.key];
      wrapper.userData = { project: spec, baseY: spec.position[1], rotationTargetY: wrapper.rotation.y, drag: false };
      const contact = shadowDisc(spec.key === "drone" ? 1.7 : 1.16, spec.key === "drone" ? 0.88 : 0.68, spec.key === "drone" ? 0.19 : 0.27);
      contact.position.y = TABLE.projectY + 0.005;
      wrapper.add(contact);
      wrapper.userData.contactShadow = contact;
      const fallback = projectFallbacks[spec.key];
      fallback.position.y = TABLE.projectY - spec.position[1] + 0.02;
      wrapper.add(fallback);
      projectWrappers.push(wrapper);
      scene.add(wrapper);
    });

    // Rig de référence : une ambiance minérale, une clé très douce et le cône chaud de la lampe.
    const ambient = new THREE.HemisphereLight("#d8e1e4", "#675b52", 0.82);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight("#fff0da", 2.15);
    keyLight.position.set(-1.6, 8.5, 4.3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -1.8;
    keyLight.shadow.camera.right = 1.8;
    keyLight.shadow.camera.top = 1.8;
    keyLight.shadow.camera.bottom = -1.8;
    keyLight.shadow.camera.near = 0.2;
    keyLight.shadow.camera.far = 11;
    keyLight.shadow.bias = -0.00006;
    keyLight.shadow.normalBias = 0.014;
    keyLight.shadow.radius = 3;
    scene.add(keyLight);
    scene.add(keyLight.target);
    keyLight.target.position.set(3.15, 0.34, -1.0);

    const fillLight = new THREE.DirectionalLight("#f1dfc8", 0.56);
    fillLight.position.set(8.2, 4.9, -1.65);
    scene.add(fillLight);
    scene.add(fillLight.target);
    fillLight.target.position.set(3.38, 0.26, -1.0);

    const blueprintFill = new THREE.DirectionalLight("#d8e8f3", 0.38);
    blueprintFill.position.set(2.7, 6.4, -0.8);
    scene.add(blueprintFill, blueprintFill.target);
    blueprintFill.target.position.set(3.25, TABLE.projectY, -1.05);

    const rotationFill = new THREE.DirectionalLight("#c9ddeb", 0.3);
    rotationFill.position.set(-3.5, 5.7, -3.2);
    scene.add(rotationFill, rotationFill.target);
    rotationFill.target.position.set(3.25, TABLE.projectY, -1.05);

    const lampSpot = new THREE.SpotLight("#ffd0a0", 28, 4.4, THREE.MathUtils.degToRad(60), 0.98, 2);
    lampSpot.position.set(2.95, 2.35, -1.75);
    lampSpot.castShadow = false;
    scene.add(lampSpot, lampSpot.target);
    lampSpot.target.position.set(3.25, TABLE.projectY, -1.05);

    const loader = new GLTFLoader();
    const selectableMeshes: THREE.Mesh[] = [];
    const loadJobs = [
      loadOptionalGLB(loader, GLB_PATHS.floor, scene, floor, "le sol"),
      loadOptionalGLB(loader, GLB_PATHS.table, tableHost, tableFallback, "l’établi"),
      loadOptionalGLB(loader, GLB_PATHS.lamp, lampHost, lampFallback, "la lampe"),
      ...PROJECTS.map((spec, index) => {
      const fallback = projectFallbacks[spec.key];
        return loadOptionalGLB(loader, GLB_PATHS[spec.key], projectWrappers[index], fallback, spec.title, {
          normalizeAsProject: true,
          onLoaded: (model) => {
            const contactShadow = projectWrappers[index].userData.contactShadow as THREE.Object3D;
            contactShadow.visible = false;
            if (spec.key === "phone") leftPlan.visible = false;
            if (spec.key === "drone") rightPlan.visible = false;
            model.traverse((child) => {
              if (child instanceof THREE.Mesh && child.visible) {
                child.userData.projectWrapper = projectWrappers[index];
                selectableMeshes.push(child);
              }
            });
          },
        });
      }),
    ];
    let completedJobs = 0;
    setLoadProgress({ done: 0, total: loadJobs.length });
    void Promise.all(
      loadJobs.map((job) => job.finally(() => {
        completedJobs += 1;
        setLoadProgress({ done: completedJobs, total: loadJobs.length });
      })),
    ).finally(() => setReady(true));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -TABLE.projectY);
    const intersection = new THREE.Vector3();
    let hovered: THREE.Group | null = null;
    let active: THREE.Group | null = null;
    let downPoint = new THREE.Vector2();
    let dragOffset = new THREE.Vector3();
    let didDrag = false;
    let didRotate = false;
    let previousFrameTime = performance.now();

    function resize() {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      const aspect = width / height;
      const vertical = aspect < 0.75 ? 3.3 / aspect : 1.9;
      camera.left = (-vertical * aspect) / 2;
      camera.right = (vertical * aspect) / 2;
      camera.top = vertical / 2;
      camera.bottom = -vertical / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 740 ? 1.25 : 1.5));
    }

    function setPointer(event: PointerEvent) {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
    }

    function getProjectFromObject(object: THREE.Object3D | null) {
      let current: THREE.Object3D | null = object;
      while (current) {
        const projectWrapper = current.userData.projectWrapper as THREE.Group | undefined;
        if (projectWrapper) return projectWrapper;
        if (current.userData.project) return current as THREE.Group;
        current = current.parent;
      }
      return null;
    }

    function pickProject(event: PointerEvent) {
      setPointer(event);
      const hits = raycaster.intersectObjects(selectableMeshes.filter((mesh) => mesh.visible), false);
      return hits.length ? getProjectFromObject(hits[0].object) : null;
    }

    function updateHover(event: PointerEvent) {
      const hit = pickProject(event);
      if (hit === hovered) {
        if (hit) {
          const project = hit.userData.project as ProjectSpec;
          updateTooltip({ title: project.title, eyebrow: project.eyebrow, x: event.clientX, y: event.clientY });
        }
        return;
      }
      hovered = hit;
      viewport.style.cursor = hit ? "grab" : "default";
      if (hit) {
        const project = hit.userData.project as ProjectSpec;
        updateTooltip({ title: project.title, eyebrow: project.eyebrow, x: event.clientX, y: event.clientY });
      } else {
        updateTooltip(null);
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (!active) {
        updateHover(event);
        return;
      }
      setPointer(event);
      if (raycaster.ray.intersectPlane(dragPlane, intersection)) {
        const next = intersection.clone().sub(dragOffset);
        active.position.x = THREE.MathUtils.clamp(next.x, TABLE.minX, TABLE.maxX);
        active.position.z = THREE.MathUtils.clamp(next.z, TABLE.minZ, TABLE.maxZ);
        didDrag ||= event.clientX !== downPoint.x || event.clientY !== downPoint.y;
        const project = active.userData.project as ProjectSpec;
        updateTooltip({ title: project.title, eyebrow: "Positionnement", x: event.clientX, y: event.clientY });
      }
    }

    function onPointerDown(event: PointerEvent) {
      const hit = pickProject(event);
      if (!hit) return;
      active = hit;
      downPoint = new THREE.Vector2(event.clientX, event.clientY);
      didDrag = false;
      didRotate = false;
      setPointer(event);
      if (raycaster.ray.intersectPlane(dragPlane, intersection)) dragOffset.copy(intersection).sub(active.position);
      viewport.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(event.pointerId);
    }

    function onPointerUp(event: PointerEvent) {
      if (!active) return;
      const project = active.userData.project as ProjectSpec;
      const travel = downPoint.distanceTo(new THREE.Vector2(event.clientX, event.clientY));
      const clicked = !didDrag && !didRotate && travel < 8;
      const finished = active;
      active = null;
      viewport.style.cursor = "grab";
      if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
      if (clicked) window.open(project.url, "_blank", "noopener,noreferrer");
      else {
        updateTooltip({ title: project.title, eyebrow: "Position enregistrée", x: event.clientX, y: event.clientY });
        window.setTimeout(() => {
          if (hovered === finished) {
            updateTooltip({ title: project.title, eyebrow: project.eyebrow, x: event.clientX, y: event.clientY });
          }
        }, 700);
      }
    }

    function onPointerLeave() {
      if (!active) {
        hovered = null;
        viewport.style.cursor = "default";
        updateTooltip(null);
      }
    }

    function onWheel(event: WheelEvent) {
      const rotatingProject = active ?? hovered;
      if (!rotatingProject) return;
      event.preventDefault();
      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      const currentTarget = rotatingProject.userData.rotationTargetY as number;
      rotatingProject.userData.rotationTargetY = currentTarget + direction * 0.18;
      didRotate = true;
      const project = rotatingProject.userData.project as ProjectSpec;
      updateTooltip({ title: project.title, eyebrow: active ? "Positionnement · rotation" : "Rotation", x: event.clientX, y: event.clientY });
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", resize);
    resize();

    let frame = 0;
    function animate() {
      frame = window.requestAnimationFrame(animate);
      const frameTime = performance.now();
      const delta = Math.min((frameTime - previousFrameTime) / 1000, 0.05);
      previousFrameTime = frameTime;
      projectWrappers.forEach((project) => {
        const targetY = (project.userData.baseY as number) + (project === hovered || project === active ? 0.11 : 0);
        project.position.y = THREE.MathUtils.damp(project.position.y, targetY, 15, delta);
        const rotationBefore = project.rotation.y;
        project.rotation.y = THREE.MathUtils.damp(project.rotation.y, project.userData.rotationTargetY as number, 14, delta);
        if (project === active || Math.abs(project.rotation.y - rotationBefore) > 0.0001) renderer.shadowMap.needsUpdate = true;
      });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("wheel", onWheel);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      environment.dispose();
      viewport.replaceChildren();
    };
  }, []);

  return (
    <section className="workshop" aria-label="Portfolio 3D Robin Courte">
      <div ref={mountRef} className="workshop__viewport" />
      <div className={`workshop__loader ${ready ? "workshop__loader--hidden" : ""}`} aria-live="polite">
        <div className="workshop__loading-content">
          <span>Robin Courte</span>
          <i style={{ "--loading-progress": `${Math.max(9, (loadProgress.done / loadProgress.total) * 100)}%` } as React.CSSProperties} />
          <small>Chargement de l’atelier · {loadProgress.done}/{loadProgress.total}</small>
        </div>
      </div>
      <header className="workshop__brand">
        <span className="workshop__mark" aria-hidden="true">
          <img src="/manus-storage/robin-atelier-mark_d0067f16.png" alt="" />
        </span>
        <div>
          <p>Robin Courte</p>
          <span>Design × Engineering</span>
        </div>
      </header>
      <aside className="workshop__instruction" aria-hidden="true">
        <span className="workshop__instruction-dot" />
        <p>Glisser les prototypes · molette pour tourner · cliquer pour ouvrir</p>
      </aside>
      <div className="workshop__legend" aria-hidden="true">
        <span>Atelier numérique</span>
        <strong>04</strong>
      </div>
    </section>
  );
}
