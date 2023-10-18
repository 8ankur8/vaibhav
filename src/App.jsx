import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, Image as ImageImpl , Scroll , ScrollControls , useScroll } from '@react-three/drei'


function Image(props) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 2, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 10000), 4, delta)
  })
  
  // console.log(w)
  return (
    <group ref={group}>
      <ImageImpl toneMapped transparent opacity={2} ref={ref} {...props} />
    </group>
  )
}

function Page({ m = 0.3, urls, ...props }) {
  const { width,height } = useThree((state) => state.viewport)
  const w = width < 10 ?  0.6: 0.5
  return (
    <group {...props}>
      <Image position={[-width * w *1.5, 0, -2]} scale={[width * w,w* width *0.7, 1]} url={urls[0]} />
      <Image position={[0, 0, -1]}  scale={[width * w,w* width * 0.7, 1]} url={urls[1]} />
      <Image position={[width *w*1.5, 0, 0.75]}  scale={[width * w,w* width * 0.7, 1]} url={urls[2]} />
    </group>
  )
}

function Pages() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[0, 0, 0]} urls={['/img7.jpg', '/img9.jpg', '/img8.jpg']} />
      <Page position={[width * 1.25, 0, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
      <Page position={[width * 2.5, 0, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} />
      <Page position={[width * 3.75, 0, 0]} urls={['/img7.jpg', '/img9.jpg', '/img8.jpg']} />
      <Page position={[width * 5, 0, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
      <Page position={[width * 6.25, 0, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} /> 
    </>
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} >
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={3} pages={5} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}