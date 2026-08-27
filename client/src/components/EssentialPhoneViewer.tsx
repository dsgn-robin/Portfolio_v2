/**
 * Style reminder — « Affiches en série » : une vitrine d’objet tangible,
 * encre sombre et bleu plan RC, qui préserve le GLB et ses matériaux d’origine.
 */
import { Maximize2, MousePointer2, Rotate3D, RotateCcw, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const PHONE_MODEL = "/manus-storage/Phone_bleu_b4045bcc.glb";

export default function EssentialPhoneViewer() {
  const canvasHost = useRef<HTMLDivElement>(null);
  const resetView = useRef<() => void>(() => undefined);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const host = canvasHost.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(2.7, 2.05, 3.35);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", "Modèle 3D manipulable d’Essential Phone");
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.minDistance = 2.3;
    controls.maxDistance = 5.3;
    controls.target.set(0, 0.1, 0);

    const resetCamera = () => {
      camera.position.set(2.7, 2.05, 3.35);
      controls.target.set(0, 0.1, 0);
      controls.update();
    };
    resetView.current = resetCamera;

    scene.add(new THREE.HemisphereLight(0xdce8f4, 0x1d2130, 2.1));

    const keyLight = new THREE.DirectionalLight(0xffddb2, 3.2);
    keyLight.position.set(3.5, 5.2, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const blueFill = new THREE.PointLight(0x6c97c2, 16, 8, 2);
    blueFill.position.set(-2.8, 0.6, 2.5);
    scene.add(blueFill);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 64),
      new THREE.MeshStandardMaterial({ color: 0x14181d, roughness: 0.9, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.76;
    floor.receiveShadow = true;
    scene.add(floor);

    let loadedModel: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      PHONE_MODEL,
      (gltf) => {
        loadedModel = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(loadedModel);
        const center = bounds.getCenter(new THREE.Vector3());
        const longestSide = Math.max(bounds.getSize(new THREE.Vector3()).x, bounds.getSize(new THREE.Vector3()).y, bounds.getSize(new THREE.Vector3()).z);
        const scale = longestSide > 0 ? 2.25 / longestSide : 1;
        loadedModel.scale.setScalar(scale);
        loadedModel.position.copy(center).multiplyScalar(-scale);
        loadedModel.rotation.set(-0.09, -0.55, 0.02);
        loadedModel.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        scene.add(loadedModel);
        setStatus("ready");
      },
      undefined,
      () => setStatus("error"),
    );

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      resizeObserver.disconnect();
      resetView.current = () => undefined;
      renderer.setAnimationLoop(null);
      controls.dispose();
      if (loadedModel) {
        loadedModel.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.geometry.dispose();
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            materials.forEach((material) => material.dispose());
          }
        });
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section className="phone-viewer" id="prototype" aria-labelledby="phone-viewer-title">
      <div className="phone-viewer__intro">
        <div className="project-section-label"><span>04</span><i /> Modèle 3D</div>
        <h2 id="phone-viewer-title">Retourner<br />l’objet.</h2>
        <p>Ce modèle est le GLB bleu fourni pour Essential Phone. Faites-le tourner, zoomez et observez ses volumes sous une lumière d’atelier neutre.</p>
        <div className="phone-viewer__instructions" aria-label="Instructions de manipulation">
          <span><MousePointer2 size={15} /> Glisser pour tourner</span>
          <span><ZoomIn size={15} /> Molette pour zoomer</span>
          <span><Rotate3D size={15} /> Rotation libre</span>
        </div>
      </div>
      <div className="phone-viewer__stage">
        <div className="phone-viewer__canvas" ref={canvasHost} />
        {status === "loading" ? <span className="phone-viewer__status">Chargement du prototype…</span> : null}
        {status === "error" ? <span className="phone-viewer__status phone-viewer__status--error">Le modèle 3D n’a pas pu être chargé.</span> : null}
        <span className="phone-viewer__frame" aria-hidden="true"><Maximize2 size={16} /></span>
        <button className="phone-viewer__reset" type="button" onClick={() => resetView.current()} aria-label="Réinitialiser la vue du modèle">
          <RotateCcw size={15} /> Réinitialiser
        </button>
      </div>
    </section>
  );
}
