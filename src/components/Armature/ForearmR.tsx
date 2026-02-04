import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { ALUMINIUM_COLOR } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

const ForearmR = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor, armatureColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected forearm model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedForearms
  );

  // Define a map of forearm variants with checks for undefined nodes
  const forearmMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_forearmR ? (
        <mesh
          name="skin01_forearmR"
          geometry={nodes.skin01_forearmR.geometry}
          material={primaryColor.material}
          position={[-3.041, -0.742, 0.017]}
          rotation={[3.129, 0, Math.PI / 2]}
          scale={-1}
        />
      ) : null,
      megaman_x: nodes.skin02_forearmR ? (
        <mesh
          name="skin02_forearmR"
          geometry={nodes.skin02_forearmR.geometry}
          material={primaryColor.material}
          position={[-3.041, -0.742, 0.017]}
          rotation={[3.129, 0, Math.PI / 2]}
          scale={-1}
        >
          <mesh
            name="skin02_forearm_ringR"
            geometry={nodes.skin02_forearm_ringR.geometry}
            material={armatureColor.material}
          />
        </mesh>
      ) : null,
      zero: nodes.skin03_forearmR ? (
        <mesh
          name="skin03_forearmR"
          geometry={nodes.skin03_forearmR.geometry}
          material={primaryColor.material}
          position={[-3.041, -0.742, 0.017]}
          rotation={[3.129, 0, Math.PI / 2]}
          scale={-1}
        >
          <mesh
            name="skin03_forearm_insideR"
            geometry={nodes.skin03_forearm_insideR.geometry}
            material={ALUMINIUM_COLOR}
          />
          <mesh
            name="skin03_forearm_ringR"
            geometry={nodes.skin03_forearm_ringR.geometry}
            material={ALUMINIUM_COLOR}
          />
        </mesh>
      ) : null,
    };
  }, [nodes, primaryColor.material, armatureColor.material]);

  // Select the forearm based on the model name
  const selectedForearm = useMemo(() => {
    return forearmMap[modelName] || null;
  }, [modelName, forearmMap]);

  // Update armor configuration for forearm types
  useEffect(() => {
    setArmorConfig('totalForearmsTypes', Object.keys(forearmMap).length);
  }, [setArmorConfig, forearmMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.forearmR} name="forearmR" ref={groupRef}>
      {selectedForearm}
    </group>
  );
};

export default ForearmR;
