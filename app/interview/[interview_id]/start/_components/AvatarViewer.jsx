"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function AvatarViewer({ url, src = "/ai_recruiter.png", alt = "AI Recruiter", className }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url || hasError) return;
    if (!mountRef.current) return;

    let animationId;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 2, 3);
    scene.add(ambientLight, directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale properly
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 1.5 / size;
        model.scale.setScalar(scale * 4);

        scene.add(model);

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.warn('Avatar 3D model failed to load, falling back to image:', error);
        setHasError(true);
      }
    );

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (rendererRef.current && mountRef.current?.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [url, hasError]);

  if (hasError || !url) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover object-top ${className || ''}`}
        />
      </div>
    );
  }

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
}