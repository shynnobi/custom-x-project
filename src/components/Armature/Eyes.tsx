import { ReactElement, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

import { MODEL_ARMATURE } from '@constants/constantsModels';
import { GLTFResult } from '@interfaces/gltfResult';
import { adjustColor, darkenColor } from '@utils/colorUtils';
import { createMaterial } from '@utils/materialUtils';

const Eyes = (): ReactElement => {
  const { nodes } = useGLTF(MODEL_ARMATURE.path) as GLTFResult;

  const {
    colorStates: { eyesColor },
  } = useColorSchemeStore();

  const eyeGlassMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.2,
        opacity: 0.4,
        transparent: true,
        reflectivity: 1,
        envMapIntensity: 1,
        transmission: 1,
      }),
    []
  );

  const eyePrimaryColor = useMemo(
    () => createMaterial(eyesColor.color, 0.3),
    [eyesColor.color]
  );

  const eyeSecondaryColor = useMemo(
    () =>
      createMaterial(
        adjustColor(eyesColor.color, 0, { r: 50, g: 50, b: 50 }),
        0
      ),
    [eyesColor.color]
  );

  const eyeThirdColor = useMemo(
    () =>
      createMaterial(
        adjustColor(eyesColor.color, 20, { r: 50, g: 50, b: 50 }),
        0.3
      ),
    [eyesColor.color]
  );

  const eyeBlackColor = useMemo(
    () =>
      new MeshStandardMaterial({
        color: darkenColor(eyesColor.color ?? 0x000000, 40),
        roughness: 0.9,
      }),
    [eyesColor.color]
  );

  return (
    <>
      <group
        name="eyeR"
        position={[-0.141, 0.266, 0.255]}
        rotation={[0, 1.236, Math.PI / 2]}
      >
        <mesh
          name="eye_bowlR"
          geometry={nodes.eye_bowlR.geometry}
          material={eyeGlassMaterial}
          rotation={[-1.236, 0, -Math.PI / 2]}
        >
          <mesh
            name="eye_contourR"
            geometry={nodes.eye_contourR.geometry}
            material={eyeBlackColor}
            position={[0.141, -3.6, -0.255]}
          />
          <mesh
            name="eye_irisR"
            geometry={nodes.eye_irisR.geometry}
            material={eyePrimaryColor}
            position={[0.141, -3.6, -0.255]}
          />
          <group name="eye_mainR" position={[0.141, -3.6, -0.255]}>
            <mesh
              name="eye_mainR_1"
              geometry={nodes.eye_mainR_1.geometry}
              material={eyeThirdColor}
            />
            <mesh
              name="eye_mainR_2"
              geometry={nodes.eye_mainR_2.geometry}
              material={eyeBlackColor}
            />
          </group>
          <mesh
            name="eye_pupilR"
            geometry={nodes.eye_pupilR.geometry}
            material={eyeBlackColor}
            position={[0.141, -3.6, -0.255]}
          />
          <mesh
            name="eye_pupil_accentR"
            geometry={nodes.eye_pupil_accentR.geometry}
            material={eyeSecondaryColor}
            position={[0.141, -3.6, -0.255]}
          />
          <mesh
            name="eye_white_reflectionR"
            geometry={nodes.eye_white_reflectionR.geometry}
            material={nodes.eye_white_reflectionL.material}
            position={[0.141, -3.6, -0.255]}
          />
        </mesh>
      </group>

      <group
        name="eyeL"
        position={[0.141, 0.266, 0.255]}
        rotation={[0, -1.236, -Math.PI / 2]}
      >
        <mesh
          name="eye_bowlL"
          geometry={nodes.eye_bowlL.geometry}
          material={eyeGlassMaterial}
          position={[3.6, -0.287, 0.05]}
          rotation={[-1.236, 0, Math.PI / 2]}
        >
          <mesh
            name="eye_contourL"
            geometry={nodes.eye_contourL.geometry}
            material={eyeBlackColor}
          />
          <mesh
            name="eye_irisL"
            geometry={nodes.eye_irisL.geometry}
            material={eyePrimaryColor}
          />
          <group name="eye_mainL">
            <mesh
              name="eye_mainL_1"
              geometry={nodes.eye_mainL_1.geometry}
              material={eyeThirdColor}
            />
            <mesh
              name="eye_mainL_2"
              geometry={nodes.eye_mainL_2.geometry}
              material={nodes.eye_mainL_2.material}
            />
          </group>
          <mesh
            name="eye_pupilL"
            geometry={nodes.eye_pupilL.geometry}
            material={eyeBlackColor}
          />
          <mesh
            name="eye_pupil_accentL"
            geometry={nodes.eye_pupil_accentL.geometry}
            material={eyeSecondaryColor}
          />
          <mesh
            name="eye_white_reflectionL"
            geometry={nodes.eye_white_reflectionL.geometry}
            material={nodes.eye_white_reflectionL.material}
          />
        </mesh>
      </group>
    </>
  );
};

export default Eyes;
