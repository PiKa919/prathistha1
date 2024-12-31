"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { useEffect } from "react"

function ParallaxImage() {
  const mesh = useRef<THREE.Mesh>(null)
  const texture = useLoader(TextureLoader, '/assets/banner/bg-image.webp')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mesh.current) {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        mesh.current.rotation.x = y * 0.1
        mesh.current.rotation.y = x * 0.1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export function Background3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ParallaxImage />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}