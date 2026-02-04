import { ReactElement } from 'react';
import { useGLTF } from '@react-three/drei';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';

import { WHITE_COLOR } from '@constants/constantsColors';
import { MODEL_ARMATURE } from '@constants/constantsModels';
import { GLTFResult } from '@interfaces/gltfResult';

const HandL = (): ReactElement => {
  const { nodes } = useGLTF(MODEL_ARMATURE.path) as GLTFResult;
  const {
    colorStates: { armatureColor, primaryColor },
  } = useColorSchemeStore();
  const { isOriginalArmorSet, selectedArmorSet } = useArmorStore();

  return (
    <group name="handL" position={[0, 0.591, 0]} rotation={[-0.013, 0, 0]}>
      <mesh
        name="armature_handL"
        geometry={nodes.armature_handL.geometry}
        material={armatureColor.material}
        position={[3.041, -1.333, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      <mesh
        name="hand_natural_offL"
        geometry={nodes.hand_natural_offL.geometry}
        material={
          isOriginalArmorSet && selectedArmorSet === 'megaman_classic'
            ? primaryColor.material
            : WHITE_COLOR
        }
        position={[3.041, -1.333, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {/* <mesh
        name="hand_fist_offL"
        geometry={nodes.hand_fist_offL.geometry}
        material={primaryColor.material}
        position={[3.041, -1.333, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        name="hand_natural_offL"
        geometry={nodes.hand_natural_offL.geometry}
        material={nodes.hand_natural_offL.material}
        position={[3.041, -1.333, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        name="hand_straight_offL"
        geometry={nodes.hand_straight_offL.geometry}
        material={nodes.hand_straight_offL.material}
        position={[3.041, -1.333, 0]}
        rotation={[0, 0, Math.PI / 2]}
      /> */}
    </group>
  );
};

export default HandL;
