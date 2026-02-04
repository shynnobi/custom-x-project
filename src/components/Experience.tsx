import { ReactElement, useEffect } from 'react';
import {
  Environment,
  Grid,
  Loader,
  OrbitControls,
  Stage,
  Stats,
  useProgress,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Selection } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import * as THREE from 'three';

import { useExperience } from '../contexts/ExperienceContext';
import ConfigPanel from './ConfigPanel/ConfigPanel';
import { MegamanBase } from './MegamanBase';
import RaycasterController from './RaycasterController';

// Background for the scene
const BackgroundCube = () => {
  const { gl, size } = useThree();
  const { setGl, setSize } = useExperience();

  useEffect(() => {
    if (setGl && setSize) {
      setGl(gl);
      const vectorSize = new THREE.Vector2(size.width, size.height);
      setSize(vectorSize);
    }
  }, [gl, size, setGl, setSize]);

  return (
    <mesh>
      <boxGeometry args={[200, 200, 200]} />
      <meshBasicMaterial color="#9BCDFF" side={THREE.BackSide} />
    </mesh>
  );
};

const Experience = (): ReactElement => {
  const { progress } = useProgress();
  const { canvasRef, canvasSize, orbitControlsRef } = useExperience();

  return (
    <>
      <Canvas
        ref={canvasRef}
        flat
        shadows
        camera={{ position: [2, 2, 12], fov: 25 }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: false,
          powerPreference: 'default',
        }}
        frameloop="demand"
        style={{
          height: canvasSize.height,
          width: canvasSize.width,
        }}
        className="select-none pointer-events-none"
        dpr={[1, 2]}
      >
        <BackgroundCube />
        <Stage
          preset="portrait"
          shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }}
          adjustCamera={false}
        >
          <MegamanBase />
        </Stage>

        <Grid
          cellSize={1}
          cellThickness={1}
          fadeDistance={30}
          infiniteGrid
          position={[0, -2.3, 0]}
          renderOrder={-1}
          sectionColor={new THREE.Color(1, 1, 1)}
          cellColor={new THREE.Color(1, 1, 0.8)}
          sectionSize={2}
          sectionThickness={1.5}
        />

        <OrbitControls
          ref={orbitControlsRef}
          enableDamping
          dampingFactor={0.03}
          enableZoom={true}
          zoomSpeed={2}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
          minDistance={3}
          maxDistance={20}
        />

        <Selection>
          <EffectComposer>
            <Bloom
              intensity={0.1}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.025}
              mipmapBlur={false}
              resolutionX={Resolution.AUTO_SIZE}
              resolutionY={Resolution.AUTO_SIZE}
            />
          </EffectComposer>
        </Selection>

        <Environment files="/hdri/citrus_orchard_road_1k_LOW.exr" />
        <RaycasterController />
        <Stats />
      </Canvas>
      <ConfigPanel />
      {progress < 100 && <Loader />}
    </>
  );
};

export default Experience;
