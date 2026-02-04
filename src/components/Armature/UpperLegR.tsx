import { ReactElement, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const UpperLegR = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { secondaryColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility } = useArmorStore();

  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedUpperLegs
  );

  // Define a map of the component with checks for undefined nodes
  const upperLegRMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_upper_legR ? (
        <mesh
          name="skin01_upper_legR"
          geometry={nodes.skin01_upper_legR.geometry}
          material={secondaryColor.material}
          position={[-0.001, 0, 0]}
          rotation={[-0.001, -0.982, 1.565]}
          scale={-1}
        />
      ) : null,
      megaman_x: nodes.skin02_upper_legR ? (
        <mesh
          name="skin02_upper_legR"
          geometry={nodes.skin02_upper_legR.geometry}
          material={secondaryColor.material}
          position={[-0.001, 0, 0]}
          rotation={[-0.001, -0.982, 1.565]}
          scale={-1}
        />
      ) : null,
      zero: nodes.skin03_upper_legR ? (
        <mesh
          name="skin03_upper_legR"
          geometry={nodes.skin03_upper_legR.geometry}
          material={secondaryColor.material}
          position={[-0.001, 0, 0]}
          rotation={[-0.001, -0.982, 1.565]}
          scale={-1}
        />
      ) : null,
    };
  }, [nodes, secondaryColor.material]);

  // Select the variant based on the model name
  const selectedUpperLegR = useMemo(() => {
    return upperLegRMap[modelName] || null;
  }, [modelName, upperLegRMap]);

  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.upper_legR} ref={groupRef}>
      {selectedUpperLegR}
    </group>
  );
};

export default UpperLegR;
