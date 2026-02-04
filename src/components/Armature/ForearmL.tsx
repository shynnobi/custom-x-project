import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { ALUMINIUM_COLOR } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes'; // Custom hook for loading model nodes
import { VariantsMap } from '@interfaces/variantsMap';

const ForearmL = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor, armatureColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected forearm model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedForearms
  );

  // Define a map of forearm variants
  const forearmLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_forearmL ? (
        <group key="forearmL1">
          <mesh
            name="skin01_forearmL"
            geometry={nodes.skin01_forearmL.geometry}
            material={primaryColor.material}
            position={[3.041, -0.742, 0.017]}
            rotation={[-0.013, 0, Math.PI / 2]}
          />
        </group>
      ) : null,
      megaman_x: nodes.skin02_forearmL ? (
        <group key="forearmL2">
          <mesh
            name="skin02_forearmL"
            geometry={nodes.skin02_forearmL.geometry}
            material={primaryColor.material}
            position={[3.041, -0.742, 0.017]}
            rotation={[-0.013, 0, Math.PI / 2]}
          >
            <mesh
              name="skin02_forearm_ringL"
              geometry={nodes.skin02_forearm_ringL.geometry}
              material={armatureColor.material}
            />
          </mesh>
        </group>
      ) : null,
      zero: nodes.skin03_forearmL ? (
        <group key="forearmL3">
          <mesh
            name="skin03_forearmL"
            geometry={nodes.skin03_forearmL.geometry}
            material={primaryColor.material}
            position={[3.041, -0.742, 0.017]}
            rotation={[-0.013, 0, Math.PI / 2]}
          >
            <mesh
              name="skin03_forearm_insideL"
              geometry={nodes.skin03_forearm_insideL.geometry}
              material={ALUMINIUM_COLOR}
            />
            <mesh
              name="skin03_forearm_ringL"
              geometry={nodes.skin03_forearm_ringL.geometry}
              material={ALUMINIUM_COLOR}
            />
          </mesh>
        </group>
      ) : null,
    };
  }, [nodes, primaryColor.material, armatureColor.material]);

  // Select the forearm based on the model name
  const selectedForearm = useMemo(() => {
    return forearmLMap[modelName] || null;
  }, [modelName, forearmLMap]);

  // Update armor configuration for forearm types
  useEffect(() => {
    setArmorConfig('totalForearmsTypes', Object.keys(forearmLMap).length);
  }, [setArmorConfig, forearmLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.forearmL} ref={groupRef}>
      {selectedForearm}
    </group>
  );
};

export default ForearmL;
