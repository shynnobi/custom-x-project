import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  BLACK_COLOR,
  WHITE_COLOR,
  ZLOGO_RED,
  ZLOGO_YELLOW,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const ShoulderL = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor },
  } = useColorSchemeStore();
  const { armorConfig, setArmorConfig, armorVisibility } = useArmorStore();

  // Get the nodes and model name based on the selected shoulder model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedShoulders
  );

  // Define a map of the component with checks for undefined nodes
  const shoulderLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: null, // Assuming no data for this variant as per your original code
      megaman_x: nodes.skin02_shoulderL ? (
        <mesh
          name="skin02_shoulderL"
          geometry={nodes.skin02_shoulderL.geometry}
          material={primaryColor.material}
          position={[0.012, 0.02, 0]}
          rotation={[-0.019, -0.019, Math.PI / 3]}
        />
      ) : null,
      zero: nodes.skin03_shoulderL ? (
        <mesh
          geometry={nodes.skin03_shoulderL.geometry}
          material={primaryColor.material}
          position={[0.012, 0.02, 0]}
          rotation={[-0.019, -0.019, Math.PI / 3]}
        >
          <mesh
            geometry={nodes.skin03_shoulder_whiteL.geometry}
            material={WHITE_COLOR}
          />
          <group
            position={[0.007, 0.166, 0.1733]}
            scale={[0.881, 1.043, 1.043]}
          >
            <mesh
              geometry={nodes.skin03_Zlogo_1.geometry}
              position={[0, 0, 0.0002]}
              material={ZLOGO_RED}
            />
            <mesh
              geometry={nodes.skin03_Zlogo_2.geometry}
              material={ZLOGO_YELLOW}
              position={[0, 0, 0.001]}
            />
            <mesh
              position={[0, 0, 0.0005]}
              geometry={nodes.skin03_Zlogo_3.geometry}
              material={BLACK_COLOR}
            />
          </group>
        </mesh>
      ) : null,
    };
  }, [nodes, primaryColor.material]);

  // Select the variant based on the model name
  const selectedShoulderL = useMemo(() => {
    return shoulderLMap[modelName] || null;
  }, [modelName, shoulderLMap]);

  // Update the total shoulder types when the component is rendered
  useEffect(() => {
    setArmorConfig('totalShouldersTypes', Object.keys(shoulderLMap).length);
  }, [setArmorConfig, shoulderLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group
      name="shoulderL"
      position={[0.349, 0.423, 0]}
      rotation={[0, 0, -Math.PI / 2]}
      ref={groupRef}
      visible={armorVisibility.shoulders}
    >
      {selectedShoulderL}
    </group>
  );
};

export default ShoulderL;
