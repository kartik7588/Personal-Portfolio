import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Memoized AnimatedSphere component to prevent unnecessary re-renders
const AnimatedSphere = memo(() => {
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!sphereRef.current) return;
    
    const time = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = time * 0.2;
    sphereRef.current.rotation.y = time * 0.3;
    
    // Add mouse reaction
    const { x, y } = state.mouse;
    sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, x * 2, 0.1);
    sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, y * 2, 0.1);

    // Scroll reaction - scale slightly
    const scroll = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    sphereRef.current.scale.setScalar(2.4 - scroll * 1.5);
    sphereRef.current.position.z = -scroll * 5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
});

AnimatedSphere.displayName = "AnimatedSphere";

// Memoized Particles component
const Particles = memo(({ count = 50 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => Array.from({ length: count }, () => ({
    t: Math.random() * 100,
    factor: 20 + Math.random() * 100,
    speed: 0.01 + Math.random() / 200,
    xFactor: -5 + Math.random() * 10,
    yFactor: -5 + Math.random() * 10,
    zFactor: -5 + Math.random() * 10,
  })), [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.xFactor + Math.cos(t / 10) * factor + (Math.sin(t * 1) * factor) / 10),
        (particle.yFactor + Math.sin(t / 10) * factor + (Math.cos(t * 2) * factor) / 10),
        (particle.zFactor + Math.cos(t / 10) * factor + (Math.sin(t * 3) * factor) / 10)
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={2} />
    </instancedMesh>
  );
});

Particles.displayName = "Particles";

// Memoized Scene component to isolate 3D rendering from theme changes
const Scene = memo(() => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <AnimatedSphere />
      <Particles count={50} />
      
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
});

Scene.displayName = "Scene";

// Loading fallback for Canvas
const CanvasLoader = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Memoized HeroScene - will not re-render when theme changes
export const HeroScene = memo(() => {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<CanvasLoader />}>
        <Canvas 
          shadows 
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
          performance={{ min: 0.5 }} // Enable automatic performance degradation
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
});

HeroScene.displayName = "HeroScene";