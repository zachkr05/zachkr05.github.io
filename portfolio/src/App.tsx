import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import './styles.css'

type Vec3 = [number, number, number]

const navItems = [
  { label: 'LinkedIn', symbol: 'in', href: 'https://linkedin.com/in/YOUR_USERNAME' },
  { label: 'Projects', symbol: '{}', href: '#projects' },
  { label: 'Socials', symbol: '@', href: '#socials' },
  { label: 'Resume', symbol: 'CV', href: '/resume.pdf' },
  { label: 'Experience', symbol: 'XP', href: '#experience' },
  { label: 'Bio', symbol: 'ME', href: '#bio' },
]

const faceConfigs = [
  {
    name: 'front',
    closedPosition: [0, 0, 0.51] as Vec3,
    closedRotation: [0, 0, 0] as Vec3,
    openPosition: [-1.15, 0.65, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#ff9f1c',
  },
  {
    name: 'right',
    closedPosition: [0.51, 0, 0] as Vec3,
    closedRotation: [0, Math.PI / 2, 0] as Vec3,
    openPosition: [0, 0.65, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#2ec4b6',
  },
  {
    name: 'back',
    closedPosition: [0, 0, -0.51] as Vec3,
    closedRotation: [0, Math.PI, 0] as Vec3,
    openPosition: [1.15, 0.65, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#e71d36',
  },
  {
    name: 'left',
    closedPosition: [-0.51, 0, 0] as Vec3,
    closedRotation: [0, -Math.PI / 2, 0] as Vec3,
    openPosition: [-1.15, -0.5, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#5f6caf',
  },
  {
    name: 'top',
    closedPosition: [0, 0.51, 0] as Vec3,
    closedRotation: [-Math.PI / 2, 0, 0] as Vec3,
    openPosition: [0, -0.5, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#f15bb5',
  },
  {
    name: 'bottom',
    closedPosition: [0, -0.51, 0] as Vec3,
    closedRotation: [Math.PI / 2, 0, 0] as Vec3,
    openPosition: [1.15, -0.5, 0] as Vec3,
    openRotation: [0, 0, 0] as Vec3,
    color: '#00bbf9',
  },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    THREE.MathUtils.lerp(a[0], b[0], t),
    THREE.MathUtils.lerp(a[1], b[1], t),
    THREE.MathUtils.lerp(a[2], b[2], t),
  ]
}

function makeOrbTexture(symbol: string, label: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  ctx.clearRect(0, 0, 256, 256)

  ctx.beginPath()
  ctx.arc(128, 128, 112, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
  ctx.fill()

  ctx.lineWidth = 6
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(128, 128, 88, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(135, 206, 235, 0.18)'
  ctx.fill()

  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 64px system-ui, sans-serif'
  ctx.fillText(symbol, 128, 102)

  ctx.font = 'bold 24px system-ui, sans-serif'
  ctx.fillText(label, 128, 170)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  return texture
}

function CubeFace({
  config,
  progress,
  onClick,
}: {
  config: (typeof faceConfigs)[number]
  progress: number
  onClick: () => void
}) {
  const t = easeOutCubic(progress)

  const position = lerpVec3(config.closedPosition, config.openPosition, t)
  const rotation = lerpVec3(config.closedRotation, config.openRotation, t)
  const scale = THREE.MathUtils.lerp(1, 1.08, t)

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={config.color}
        side={THREE.DoubleSide}
        transparent
        opacity={THREE.MathUtils.lerp(1, 0.85, t)}
      />
    </mesh>
  )
}

function UnfoldingCube({
  opened,
  setOpened,
  setPageReady,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  setPageReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useFrame((_, delta) => {
    const target = opened ? 1 : 0

    progressRef.current = THREE.MathUtils.damp(
      progressRef.current,
      target,
      3.2,
      delta,
    )

    setProgress(progressRef.current)

    if (progressRef.current > 0.94) {
      setPageReady(true)
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += opened ? 0 : delta * 0.6
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(1, 1.6, easeOutCubic(progressRef.current)),
      )
      groupRef.current.position.z = THREE.MathUtils.lerp(
        0,
        0.75,
        easeOutCubic(progressRef.current),
      )
    }
  })

  return (
    <group ref={groupRef}>
      {faceConfigs.map((config) => (
        <CubeFace
          key={config.name}
          config={config}
          progress={progress}
          onClick={() => {
            setOpened(true)
          }}
        />
      ))}
    </group>
  )
}

function OrbitRing({ hidden }: { hidden: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ringRef.current) return

    ringRef.current.rotation.z += delta * 0.15
    ringRef.current.scale.setScalar(
      THREE.MathUtils.damp(ringRef.current.scale.x, hidden ? 0.01 : 1, 4, delta),
    )
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.5, 0.01, 16, 128]} />
      <meshBasicMaterial color="white" transparent opacity={0.25} />
    </mesh>
  )
}

function OrbitingOrb({
  index,
  count,
  radius,
  speed,
  symbol,
  label,
  href,
  hidden,
}: {
  index: number
  count: number
  radius: number
  speed: number
  symbol: string
  label: string
  href: string
  hidden: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHover] = useState(false)

  const texture = useMemo(() => {
    return makeOrbTexture(symbol, label)
  }, [symbol, label])

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return

    const startAngle = (index / count) * Math.PI * 2
    const angle = startAngle - clock.getElapsedTime() * speed

    groupRef.current.position.x = Math.cos(angle) * radius
    groupRef.current.position.z = Math.sin(angle) * radius
    groupRef.current.position.y = 0

    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, hidden ? 0.01 : 1, 4, delta),
    )
  })

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation()
        if (!hidden) {
          window.location.href = href
        }
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        if (!hidden) {
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
      }}
      onPointerOut={() => {
        setHover(false)
        document.body.style.cursor = 'default'
      }}
    >
      <mesh scale={hovered ? 0.55 : 0.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? 'hotpink' : 'skyblue'}
          transparent
          opacity={hidden ? 0 : 0.35}
          depthWrite={false}
        />
      </mesh>

      <sprite scale={hovered ? 1.1 : 0.9}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={hidden ? 0 : 1}
          depthWrite={false}
          depthTest={false}
        />
      </sprite>
    </group>
  )
}

function OrbitingOrbs({ hidden }: { hidden: boolean }) {
  return (
    <>
      {navItems.map((item, index) => (
        <OrbitingOrb
          key={item.label}
          index={index}
          count={navItems.length}
          radius={2.5}
          speed={0.7}
          symbol={item.symbol}
          label={item.label}
          href={item.href}
          hidden={hidden}
        />
      ))}
    </>
  )
}

function PortfolioPage({
  visible,
  onBack,
}: {
  visible: boolean
  onBack: () => void
}) {
  return (
    <main className={visible ? 'portfolio-page visible' : 'portfolio-page'}>
      <button className="back-button" onClick={onBack}>
        Back to cube
      </button>

      <section className="hero-section">
        <p className="eyebrow">Portfolio</p>
        <h1>Zach</h1>
        <p>
          Software developer building interactive web experiences, 3D interfaces,
          and fast frontend projects.
        </p>

        <div className="hero-links">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="/resume.pdf">Resume</a>
          <a href="https://linkedin.com/in/YOUR_USERNAME">LinkedIn</a>
        </div>
      </section>

      <section id="projects" className="content-grid">
        <article>
          <h2>Projects</h2>
          <p>
            Add your best projects here. Each card can link to GitHub, a live demo,
            or a case study.
          </p>
        </article>

        <article id="experience">
          <h2>Experience</h2>
          <p>
            Add internships, jobs, research, freelance work, or major technical
            experience.
          </p>
        </article>

        <article id="bio">
          <h2>Bio</h2>
          <p>
            Write a short intro about who you are, what you build, and what you are
            looking for next.
          </p>
        </article>
      </section>
    </main>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [pageReady, setPageReady] = useState(false)

  return (
    <div className="app-shell">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 50 }}
        style={{
          width: '100vw',
          height: '100vh',
          background: '#111',
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={5} />
        <pointLight position={[-10, -10, -10]} intensity={2} />

        <UnfoldingCube
          opened={opened}
          setOpened={setOpened}
          setPageReady={setPageReady}
        />

        <OrbitRing hidden={opened} />
        <OrbitingOrbs hidden={opened} />
      </Canvas>

      <PortfolioPage
        visible={pageReady}
        onBack={() => {
          setOpened(false)
          setPageReady(false)
        }}
      />
    </div>
  )
}
