import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const UpperLegL = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { secondaryColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected upper leg model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedUpperLegs
  );

  // Define a map of the component with checks for undefined nodes
  const upperLegLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_upper_legL ? (
        <mesh
          name="skin01_upper_legL"
          geometry={nodes.skin01_upper_legL.geometry}
          material={secondaryColor.material}
          position={[0.001, 0, 0]}
          rotation={[3.141, -0.982, 1.565]}
        />
      ) : null,
      megaman_x: nodes.skin02_upper_legL ? (
        <mesh
          name="skin02_upper_legL"
          geometry={nodes.skin02_upper_legL.geometry}
          material={secondaryColor.material}
          position={[0.001, 0, 0]}
          rotation={[3.141, -0.982, 1.565]}
        />
      ) : null,
      zero: nodes.skin03_upper_legL ? (
        <mesh
          name="skin03_upper_legL"
          geometry={nodes.skin03_upper_legL.geometry}
          material={secondaryColor.material}
          position={[0.001, 0, 0]}
          rotation={[3.141, -0.982, 1.565]}
        />
      ) : null,
    };
  }, [nodes, secondaryColor.material]);

  // Select the variant based on the model name
  const selectedUpperLegL = useMemo(() => {
    return upperLegLMap[modelName] || null;
  }, [modelName, upperLegLMap]);

  // Update armor configuration for lower legs
  useEffect(() => {
    setArmorConfig('totalUpperLegsTypes', Object.keys(upperLegLMap).length);
  }, [setArmorConfig, upperLegLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.upper_legL} ref={groupRef}>
      {selectedUpperLegL}
    </group>
  );
};

export default UpperLegL;
