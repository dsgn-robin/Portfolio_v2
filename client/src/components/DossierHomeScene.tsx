/**
 * Style reminder — « Scène-dossier interactive » : papier chaud, noir encre,
 * Orange atelier et socles colorés ; les GLB réels restent les pièces centrales.
 */
import { Eye, Grip, RotateCw, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type ProjectKey = "phone" | "photo" | "identity" | "drone";

type ProjectSpec = {
  key: ProjectKey;
  number: string;
  title: string;
  category: string;
  collection: "Projets perso" | "Projets scolaires";
  color: number;
  colorCss: string;
  path: string;
  position: [number, number];
  baseRotation: number;
  presentationRotation?: [number, number, number];
  scale: number;
  shape: "rounded" | "circle";
};

type ProjectRuntime = {
  spec: ProjectSpec;
  group: THREE.Group;
  initialPosition: THREE.Vector3;
  initialRotation: number;
};

const PROJECTS: ProjectSpec[] = [
  { key: "phone", number: "01", title: "Essential Phone", category: "Objet numérique", collection: "Projets perso", color: 0x6c97c2, colorCss: "#6c97c2", path: "/manus-storage/Phone_bleu_b4045bcc.glb", position: [-2.02, 1.28], baseRotation: 0, scale: 0.98, shape: "rounded" },
  { key: "photo", number: "02", title: "Projet Photo", category: "Image & regard", collection: "Projets perso", color: 0xe0a51d, colorCss: "#e0a51d", path: "/manus-storage/photo_2b003e1a.glb", position: [1.5, 1.45], baseRotation: 0, scale: 0.86, shape: "circle" },
  { key: "identity", number: "03", title: "Identité visuelle", category: "Système graphique", collection: "Projets perso", color: 0x397c5d, colorCss: "#397c5d", path: "/manus-storage/identite_17dcad1d.glb", position: [-1.48, -1.35], baseRotation: 0, scale: 0.76, shape: "rounded" },
  { key: "drone", number: "04", title: "Projet Drone", category: "Mobilité & ingénierie", collection: "Projets scolaires", color: 0xe95a2c, colorCss: "#e95a2c", path: "/manus-storage/drone_fbc0d7ed.glb", position: [1.75, -1.18], baseRotation: 0, scale: 1.72, shape: "circle" },
];

const COLLECTIONS: ProjectSpec["collection"][] = ["Projets perso", "Projets scolaires"];

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

function makePlatformLabel(spec: ProjectSpec) {
  const canvas = document.createElement("canvas");
  canvas.width = 560;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Group();
  context.fillStyle = "#f2e9d8";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#171612";
  context.font = "700 34px Arial, sans-serif";
  context.fillText(spec.number, 24, 59);
  context.font = "700 24px Arial, sans-serif";
  context.fillText(spec.title.toUpperCase(), 96, 58);
  context.fillStyle = "#e95a2c";
  context.fillRect(24, 73, 512, 5);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1.05, 0.18),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }),
  );
  label.rotation.x = -Math.PI / 2;
  label.position.set(0, 0.125, spec.shape === "circle" ? 0.36 : 0.42);
  return label;
}

function makePlatform(spec: ProjectSpec) {
  const holder = new THREE.Group();
  const shadow = new THREE.Mesh(
    new RoundedBoxGeometry(1.78, 0.16, 1.18, 0.08, 4),
    new THREE.MeshStandardMaterial({ color: 0x171612, roughness: 0.78 }),
  );
  shadow.position.set(0.14, -0.08, 0.13);
  shadow.castShadow = true;
  shadow.receiveShadow = true;
  holder.add(shadow);

  const material = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.74, metalness: 0.02 });
  const top = spec.shape === "circle"
    ? new THREE.Mesh(new THREE.CylinderGeometry(0.83, 0.83, 0.13, 64), material)
    : new THREE.Mesh(new RoundedBoxGeometry(1.78, 0.13, 1.18, 0.08, 4), material);
  top.position.y = 0.03;
  top.castShadow = true;
  top.receiveShadow = true;
  holder.add(top);

  holder.add(makePlatformLabel(spec));
  return holder;
}

function makeBackdrop(scene: THREE.Scene) {
  const orange = new THREE.MeshStandardMaterial({ color: 0xe95a2c, roughness: 0.88 });
  const paper = new THREE.MeshStandardMaterial({ color: 0xf2e9d8, roughness: 0.96 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), paper);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.25;
  floor.receiveShadow = true;
  scene.add(floor);

  const disc = new THREE.Mesh(new THREE.CircleGeometry(2.65, 80), orange);
  disc.rotation.x = -Math.PI / 2;
  disc.position.set(2.65, -0.235, 2.05);
  scene.add(disc);

  [-1.4, -0.98, -0.56, -0.14, 0.28, 0.7].forEach((offset) => {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.022, 0.08), new THREE.MeshStandardMaterial({ color: 0x171612, roughness: 0.92 }));
    marker.position.set(-3.96, -0.22, offset);
    scene.add(marker);
  });
}

export default function DossierHomeScene() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const runtimesRef = useRef<ProjectRuntime[]>([]);
  const hoveredRef = useRef<ProjectSpec | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [hovered, setHovered] = useState<ProjectSpec | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4.8, 4.8, 3.15, -3.15, 0.1, 100);
    camera.position.set(6.8, 7.8, 8.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    viewport.appendChild(renderer.domElement);

    makeBackdrop(scene);
    scene.add(new THREE.HemisphereLight(0xfff2de, 0x362d27, 2.5));
    const key = new THREE.DirectionalLight(0xffcf9f, 3.2);
    key.position.set(-3.5, 7.2, 4.8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 5;
    key.shadow.camera.bottom = -5;
    scene.add(key);
    const inkFill = new THREE.PointLight(0x6c97c2, 8, 11, 2);
    inkFill.position.set(4.1, 3.2, -4);
    scene.add(inkFill);

    const platforms = new Map<ProjectKey, THREE.Group>();
    PROJECTS.forEach((spec) => platforms.set(spec.key, makePlatform(spec)));

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const point = new THREE.Vector3();
    const dragging = { runtime: null as ProjectRuntime | null, startX: 0, startY: 0, moved: false };
    let animationFrame = 0;
    let cancelled = false;

    const getNdc = (event: PointerEvent | WheelEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointerNdc, camera);
    };

    const resolveRuntime = (object: THREE.Object3D) => {
      let cursor: THREE.Object3D | null = object;
      while (cursor) {
        const projectKey = cursor.userData.projectKey as ProjectKey | undefined;
        if (projectKey) return runtimesRef.current.find((runtime) => runtime.spec.key === projectKey) ?? null;
        cursor = cursor.parent;
      }
      return null;
    };

    const pick = (event: PointerEvent | WheelEvent) => {
      getNdc(event);
      const intersections = raycaster.intersectObjects(runtimesRef.current.map((runtime) => runtime.group), true);
      for (const intersection of intersections) {
        const runtime = resolveRuntime(intersection.object);
        if (runtime) return runtime;
      }
      return null;
    };

    const resetComposition = () => {
      runtimesRef.current.forEach((runtime) => {
        runtime.group.position.copy(runtime.initialPosition);
        runtime.group.rotation.y = runtime.initialRotation;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      setPointer({ x: event.clientX, y: event.clientY });
      if (dragging.runtime) {
        if (Math.hypot(event.clientX - dragging.startX, event.clientY - dragging.startY) > 6) dragging.moved = true;
        getNdc(event);
        if (raycaster.ray.intersectPlane(dragPlane, point)) {
          dragging.runtime.group.position.x = clamp(point.x, -5.25, 5.25);
          dragging.runtime.group.position.z = clamp(point.z, -3.05, 3.05);
        }
        return;
      }
      const nextRuntime = pick(event);
      const nextProject = nextRuntime?.spec ?? null;
      if (hoveredRef.current?.key !== nextProject?.key) {
        hoveredRef.current = nextProject;
        setHovered(nextProject);
      }
      renderer.domElement.style.cursor = nextRuntime ? "grab" : "default";
    };

    const onPointerDown = (event: PointerEvent) => {
      const runtime = pick(event);
      if (!runtime) return;
      dragging.runtime = runtime;
      dragging.startX = event.clientX;
      dragging.startY = event.clientY;
      dragging.moved = false;
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = "grabbing";
      setIsDragging(true);
    };

    const onPointerUp = (event: PointerEvent) => {
      const runtime = dragging.runtime;
      if (!runtime) return;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
      dragging.runtime = null;
      renderer.domElement.style.cursor = "grab";
      setIsDragging(false);
      if (!dragging.moved) window.location.assign(`/projets/${runtime.spec.key === "phone" ? "essential-phone" : runtime.spec.key === "photo" ? "projet-photo" : runtime.spec.key === "identity" ? "identite-visuelle" : "projet-drone"}`);
    };

    const onWheel = (event: WheelEvent) => {
      const runtime = dragging.runtime ?? pick(event);
      if (!runtime) return;
      event.preventDefault();
      runtime.group.rotation.y += event.deltaY * 0.006;
      hoveredRef.current = runtime.spec;
      setHovered(runtime.spec);
      setPointer({ x: event.clientX, y: event.clientY });
    };

    const onKeyDown = (event: KeyboardEvent) => { if (event.key.toLowerCase() === "r") resetComposition(); };
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    const onPointerLeave = () => {
      if (!dragging.runtime) {
        hoveredRef.current = null;
        setHovered(null);
      }
    };
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    const loader = new GLTFLoader();
    PROJECTS.forEach((spec) => {
      loader.load(spec.path, (gltf) => {
        if (cancelled) return;
        const group = new THREE.Group();
        group.userData.projectKey = spec.key;
        const model = gltf.scene;
        if (spec.key === "drone") {
          model.traverse((child) => {
            if (child.name === "Blueprint-drone") child.rotation.set(0, 0, 0);
          });
        }
        if (spec.presentationRotation) model.rotation.set(...spec.presentationRotation);
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const longestEdge = Math.max(size.x, size.y, size.z) || 1;
        const scale = spec.scale / longestEdge;
        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -box.min.y * scale + 0.18, -center.z * scale);
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.projectKey = spec.key;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        const platform = platforms.get(spec.key);
        if (platform) group.add(platform);
        group.add(model);
        group.position.set(spec.position[0], 0, spec.position[1]);
        group.rotation.y = spec.baseRotation;
        scene.add(group);
        runtimesRef.current.push({ spec, group, initialPosition: group.position.clone(), initialRotation: group.rotation.y });
        setLoaded((count) => count + 1);
      }, undefined, () => setLoaded((count) => count + 1));
    });

    const resize = () => {
      const { width, height } = viewport.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const zoom = width < 640 ? 1.26 : 1;
      const halfWidth = Math.max(4.8 * aspect * zoom, 4.45);
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = 3.15 * zoom;
      camera.bottom = -3.15 * zoom;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    resize();

    const render = () => {
      animationFrame = requestAnimationFrame(render);
      runtimesRef.current.forEach((runtime) => {
        const isActive = hoveredRef.current?.key === runtime.spec.key;
        const targetY = runtime.initialPosition.y + (isActive ? 0.11 : 0);
        runtime.group.position.y += (targetY - runtime.group.position.y) * 0.14;
      });
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      runtimesRef.current = [];
    };
  }, []);

  const openProject = (key: ProjectKey) => {
    const slug = key === "phone" ? "essential-phone" : key === "photo" ? "projet-photo" : key === "identity" ? "identite-visuelle" : "projet-drone";
    window.location.assign(`/projets/${slug}`);
  };

  return (
    <main className="dossier-home">
      <div className="dossier-home__viewport" ref={viewportRef} />
      <div className="dossier-home__paper-grain" aria-hidden="true" />
      <header className="dossier-home__brand">
        <span className="dossier-home__monogram" aria-hidden="true"><i /><i /><b /></span>
        <div><strong>Robin Courte</strong><small>Atelier / index de projets</small></div>
      </header>
      <aside className="dossier-home__index" aria-label="Index des dossiers">
        <span className="dossier-home__index-title">Index des projets</span>
        {COLLECTIONS.map((collection) => (
          <div className="dossier-home__collection" key={collection}>
            <span>{collection}</span>
            {PROJECTS.filter((project) => project.collection === collection).map((project) => (
              <button key={project.key} type="button" onClick={() => openProject(project.key)} style={{ "--project-color": project.colorCss } as React.CSSProperties}>
                <span>{project.number}</span><strong>{project.title}</strong><Eye size={15} />
              </button>
            ))}
          </div>
        ))}
      </aside>
      <section className="dossier-home__cartouche">
        <div className="dossier-home__statement">
          <p>Portfolio<br /><em>en pièces.</em></p>
          <span>RC / INDEX 01—04 · MANIPULER / EXAMINER / OUVRIR</span>
        </div>
        <footer className="dossier-home__controls">
          <div><Grip size={15} /><span>Glisser pour déplacer</span></div>
          <div><RotateCw size={15} /><span>Molette pour tourner</span></div>
          <button type="button" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }))}><RotateCcw size={15} /> Réinitialiser</button>
        </footer>
      </section>
      <div className={`dossier-home__loader ${loaded >= PROJECTS.length ? "dossier-home__loader--hidden" : ""}`} aria-live="polite">
        <strong>Robin Courte</strong><i><b style={{ width: `${(loaded / PROJECTS.length) * 100}%` }} /></i><span>Composition des pièces / {loaded} — {PROJECTS.length}</span>
      </div>
      {hovered ? (
        <div className={`dossier-home__tooltip ${isDragging ? "dossier-home__tooltip--dragging" : ""}`} style={{ transform: `translate3d(${pointer.x + 18}px, ${pointer.y - 54}px, 0)` }}>
          <span>Pièce / {hovered.number}</span><strong>{hovered.title}</strong><small>{hovered.category}</small>
        </div>
      ) : null}
    </main>
  );
}
