"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * INTERACTIVE 3D INTELLIGENCE GLOBE
 *
 * Sophisticated 3D representation of connected digital capability.
 * Built in South Africa. Designed for everywhere.
 */

export function InteractiveGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current || reduce) return;

    // Dynamic import of Three.js
    import("three").then((THREE) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scene setup
      const sceneObj = new THREE.Scene();
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Create globe
      const globe = new THREE.Group();
      sceneObj.add(globe);

      // Sphere geometry
      const geometry = new THREE.IcosahedronGeometry(1.2, 32);

      // Main sphere - subtle
      const material = new THREE.MeshPhongMaterial({
        color: 0x1f2937,
        emissive: 0x0a0a0a,
        specular: 0x111111,
        shininess: 10,
        wireframe: false,
        opacity: 0.2,
        transparent: true,
      });
      const sphere = new THREE.Mesh(geometry, material);
      globe.add(sphere);

      // Wireframe
      const wireGeometry = new THREE.IcosahedronGeometry(1.2, 16);
      const wireMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x000000,
        wireframe: true,
        opacity: 0.3,
        transparent: true,
      });
      const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
      globe.add(wireframe);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      sceneObj.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 3, 5);
      sceneObj.add(directionalLight);

      // Network nodes
      const nodes = [
        { pos: new THREE.Vector3(2, 1, 1).normalize().multiplyScalar(1.5) },
        { pos: new THREE.Vector3(1, 0.5, -1).normalize().multiplyScalar(1.5) },
        { pos: new THREE.Vector3(-1.5, 0.3, -0.5).normalize().multiplyScalar(1.5) },
        { pos: new THREE.Vector3(1, -0.5, 1.5).normalize().multiplyScalar(1.5) },
      ];

      nodes.forEach((node) => {
        const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const nodeMat = new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          emissive: 0x3b82f6,
          opacity: 0.7,
          transparent: true,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(node.pos);
        globe.add(nodeMesh);
      });

      // Connections
      const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ];

      const connGeo = new THREE.BufferGeometry();
      const positions: number[] = [];

      connections.forEach((conn) => {
        const from = nodes[conn[0]].pos;
        const to = nodes[conn[1]].pos;
        positions.push(from.x, from.y, from.z, to.x, to.y, to.z);
      });

      connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
      const connMat = new THREE.LineBasicMaterial({
        color: 0x1f2937,
        opacity: 0.3,
        transparent: true,
      });
      const connLines = new THREE.LineSegments(connGeo, connMat);
      globe.add(connLines);

      // Signal particles
      const signalGeo = new THREE.BufferGeometry();
      const signalPos = new Float32Array(connections.length * 3);
      signalPos.fill(0);
      signalGeo.setAttribute("position", new THREE.BufferAttribute(signalPos, 3));

      const signalMat = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.15,
        opacity: 0.8,
        transparent: true,
      });
      const signals = new THREE.Points(signalGeo, signalMat);
      globe.add(signals);

      let frameCount = 0;
      const signalProgress: number[] = Array(connections.length).fill(0);
      let targetRotX = 0;
      let targetRotY = 0;

      const animate = () => {
        requestAnimationFrame(animate);
        frameCount++;

        if (inView && !reduce) {
          // Auto-rotate
          if (!hovered) {
            globe.rotation.y += 0.0002;
          }

          // Mouse interaction
          if (hovered) {
            targetRotY = mouseXRef.current * 0.01;
            targetRotX = mouseYRef.current * 0.01;
          } else {
            targetRotX *= 0.95;
            targetRotY *= 0.95;
          }

          globe.rotation.x += (targetRotX - globe.rotation.x) * 0.1;
          globe.rotation.y += (targetRotY - globe.rotation.y) * 0.1;

          // Update signals
          const signalPositions = signalGeo.attributes.position.array as Float32Array;

          connections.forEach((conn, idx) => {
            signalProgress[idx] = (signalProgress[idx] + 0.005) % 1;
            const progress = signalProgress[idx];

            const from = nodes[conn[0]].pos;
            const to = nodes[conn[1]].pos;

            const x = from.x + (to.x - from.x) * progress;
            const y = from.y + (to.y - from.y) * progress;
            const z = from.z + (to.z - from.z) * progress;

            signalPositions[idx * 3] = x;
            signalPositions[idx * 3 + 1] = y;
            signalPositions[idx * 3 + 2] = z;
          });

          signalGeo.attributes.position.needsUpdate = true;
        }

        renderer.render(sceneObj, camera);
      };

      animate();

      // Mouse events
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseXRef.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseYRef.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      containerRef.current?.addEventListener("mousemove", handleMouseMove);
      containerRef.current?.addEventListener("mouseenter", () => setHovered(true));
      containerRef.current?.addEventListener("mouseleave", () => setHovered(false));

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      setScene(sceneObj);

      return () => {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        wireGeometry.dispose();
        wireMaterial.dispose();
        connGeo.dispose();
        connMat.dispose();
        signalGeo.dispose();
        signalMat.dispose();
      };
    });
  }, [mounted, inView, hovered, reduce]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "1" }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ cursor: hovered ? "grab" : "default" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
