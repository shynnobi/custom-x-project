import { ReactElement, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { WHITE_COLOR } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const ShoulderR = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility } = useArmorStore();

  // Get the nodes and model name based on the selected shoulder model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedShoulders
  );

  // Define a map of the component with checks for undefined nodes
  const shoulderRMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: null, // Assuming no data for this variant as per your original code
      megaman_x: nodes.skin02_shoulderR ? (
        <mesh
          name="skin02_shoulderR"
          geometry={nodes.skin02_shoulderR.geometry}
          material={primaryColor.material}
          position={[-0.012, 0.02, 0]}
          rotation={[3.122, -0.019, Math.PI / 3]}
          scale={-1}
        />
      ) : null,
      zero: nodes.skin03_shoulderR ? (
        <>
          <mesh
            geometry={nodes.skin03_shoulderR.geometry}
            material={primaryColor.material}
            position={[-0.012, 0.02, 0]}
            rotation={[3.122, -0.019, Math.PI / 3]}
            scale={-1}
          >
            <mesh
              geometry={nodes.skin03_shoulder_whiteR.geometry}
              material={WHITE_COLOR}
            />
          </mesh>
        </>
      ) : null,
    };
  }, [nodes, primaryColor.material]);

  // Select the variant based on the model name
  const selectedShoulderR = useMemo(() => {
    return shoulderRMap[modelName] || null;
  }, [modelName, shoulderRMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group
      name="shoulderR"
      position={[-0.349, 0.423, 0]}
      rotation={[0, 0, Math.PI / 2]}
      ref={groupRef}
      visible={armorVisibility.shoulders}
    >
      {selectedShoulderR}
    </group>
  );
};

export default ShoulderR;
