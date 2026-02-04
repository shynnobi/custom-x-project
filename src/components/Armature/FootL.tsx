import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { ALUMINIUM_COLOR, WHITE_COLOR } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes'; // Custom hook for loading model nodes
import { VariantsMap } from '@interfaces/variantsMap';

const FootL = (): ReactElement => {
  const groupRef = useRef<THREE.Group>(null);
  const {
    colorStates: { armatureColor, primaryColor, thirdAccentColor },
  } = useColorSchemeStore();
  const { armorConfig, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected foot model
  const { nodes, modelName } = useSelectedModelNodes(armorConfig.selectedFeet);

  // Define a map of foot variants
  const footLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_foot_armatureL ? (
        <group key="feet1">
          <mesh
            name="skin01_foot_armatureL"
            geometry={nodes.skin01_foot_armatureL.geometry}
            material={armatureColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
          <mesh
            name="skin01_foot_meshL"
            geometry={nodes.skin01_foot_meshL.geometry}
            material={primaryColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
        </group>
      ) : null,
      megaman_x: nodes.skin02_foot_armatureL ? (
        <group key="feet2">
          <mesh
            name="skin02_foot_armatureL"
            geometry={nodes.skin02_foot_armatureL.geometry}
            material={armatureColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
          <mesh
            name="skin02_foot_meshL"
            geometry={nodes.skin02_foot_meshL.geometry}
            material={primaryColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
        </group>
      ) : null,
      zero: nodes.skin03_foot_armatureL ? (
        <group key="feet3">
          <mesh
            name="skin03_foot_armatureL"
            geometry={nodes.skin03_foot_armatureL.geometry}
            material={primaryColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
          <mesh
            name="skin03_foot_meshL"
            geometry={nodes.skin03_foot_meshL.geometry}
            material={primaryColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          >
            <mesh
              name="skin03_foot_beamL"
              geometry={nodes.skin03_foot_beamL.geometry}
              material={thirdAccentColor?.material}
              position={[0, -0.421, 0.032]}
              rotation={[0, -0.003, 0]}
            />
            <mesh
              name="skin03_foot_mesh_tipL"
              geometry={nodes.skin03_foot_mesh_tipL.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin03_foot_thrusterL"
              geometry={nodes.skin03_foot_thrusterL.geometry}
              material={ALUMINIUM_COLOR}
              position={[0, -0.421, 0.032]}
              rotation={[0, -0.003, 0]}
            />
          </mesh>
        </group>
      ) : null,
    };
  }, [
    nodes,
    armatureColor.material,
    primaryColor.material,
    thirdAccentColor?.material,
  ]);

  // Select the foot based on the model name
  const selectedFoot = useMemo(() => {
    return footLMap[modelName] || null;
  }, [modelName, footLMap]);

  // Update armor configuration for foot types
  useEffect(() => {
    setArmorConfig('totalFeetTypes', Object.keys(footLMap).length);
  }, [setArmorConfig, footLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group
      ref={groupRef}
      name="footL"
      position={[0, 0.786, 0]}
      rotation={[-1.252, -0.176, 0.067]}
    >
      {selectedFoot}
    </group>
  );
};

export default FootL;
