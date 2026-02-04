import { ReactElement } from 'react';
import { useGLTF } from '@react-three/drei';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';

import { BLACK_HAIR } from '@constants/constantsColors';
import { MODEL_ARMATURE } from '@constants/constantsModels';
import { GLTFResult } from '@interfaces/gltfResult';

const Face = (): ReactElement => {
  const { nodes } = useGLTF(MODEL_ARMATURE.path) as GLTFResult;
  const {
    colorStates: { hairColor, skinColor },
  } = useColorSchemeStore();
  const { armorVisibility } = useArmorStore();

  return (
    <group name="head_1" position={[0, -3.333, 0]}>
      <mesh
        name="head_2"
        geometry={nodes.head_2.geometry}
        material={skinColor.material}
      />
      <mesh
        name="head_3"
        geometry={nodes.head_3.geometry}
        material={skinColor.material}
      />

      {!armorVisibility.helmet ? (
        <mesh
          name="ears"
          geometry={nodes.ears.geometry}
          material={skinColor.material}
          position={[0, 3.343, 0]}
        />
      ) : null}

      <mesh
        name="eyebrows"
        geometry={nodes.eyebrows.geometry}
        material={hairColor.material}
        position={[0, 3.343, 0]}
      />
      <mesh
        name="eyelashes"
        geometry={nodes.eyelashes.geometry}
        material={BLACK_HAIR}
        position={[0, 3.343, 0]}
      />
      <mesh
        name="eyes_white_plane"
        geometry={nodes.eyes_white_plane.geometry}
        material={nodes.eyes_white_plane.material}
        position={[0, 3.343, 0]}
      />
      <mesh
        name="teeth"
        geometry={nodes.teeth.geometry}
        material={nodes.teeth.material}
      />
      <mesh
        name="tongue"
        geometry={nodes.tongue.geometry}
        material={nodes.tongue.material}
      />
    </group>
  );
};

export default Face;
