import { ReactElement, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { ALUMINIUM_COLOR, WHITE_COLOR } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes'; // Custom hook for loading model nodes
import { VariantsMap } from '@interfaces/variantsMap';

const FootR = (): ReactElement => {
  const groupRef = useRef<THREE.Group>(null);
  const {
    colorStates: { armatureColor, primaryColor, thirdAccentColor },
  } = useColorSchemeStore();
  const { armorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected foot model
  const { nodes, modelName } = useSelectedModelNodes(armorConfig.selectedFeet);

  // Define a map of foot variants
  const footRMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_foot_armatureR ? (
        <group key="feet1">
          <mesh
            name="skin01_foot_armatureR"
            geometry={nodes.skin01_foot_armatureR.geometry}
            material={armatureColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
          <mesh
            name="skin01_foot_meshR"
            geometry={nodes.skin01_foot_meshR.geometry}
            material={primaryColor.material}
            rotation={[-1.915, 0.003, -0.01]}
          />
        </group>
      ) : null,
      megaman_x: nodes.skin02_foot_armatureR ? (
        <group key="feet2">
          <mesh
            name="skin02_foot_armatureR"
            geometry={nodes.skin02_foot_armatureR.geometry}
            material={armatureColor.material}
            rotation={[1.227, 0.003, -0.01]}
            scale={-1}
          />
          <mesh
            name="skin02_foot_meshR"
            geometry={nodes.skin02_foot_meshR.geometry}
            material={primaryColor.material}
            rotation={[1.227, 0.003, -0.01]}
            scale={-1}
          />
        </group>
      ) : null,
      zero: nodes.skin03_foot_armatureR ? (
        <group key="feet3">
          <mesh
            name="skin03_foot_armatureR"
            geometry={nodes.skin03_foot_armatureR.geometry}
            material={primaryColor.material}
            rotation={[1.227, 0.003, -0.01]}
            scale={-1}
          />
          <mesh
            name="skin03_foot_meshR"
            geometry={nodes.skin03_foot_meshR.geometry}
            material={primaryColor.material}
            rotation={[1.227, 0.003, -0.01]}
            scale={-1}
          >
            <mesh
              name="skin03_foot_beamR"
              geometry={nodes.skin03_foot_beamR.geometry}
              material={thirdAccentColor?.material}
              position={[0, -0.421, 0.032]}
              rotation={[0, -0.003, 0]}
            />
            <mesh
              name="skin03_foot_mesh_tipR"
              geometry={nodes.skin03_foot_mesh_tipR.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin03_foot_thrusterR"
              geometry={nodes.skin03_foot_thrusterR.geometry}
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
    return footRMap[modelName] || null;
  }, [modelName, footRMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group
      ref={groupRef}
      name="footR"
      position={[0, 0.786, 0]}
      rotation={[-1.252, -0.176, 0.067]}
    >
      {selectedFoot}
    </group>
  );
};

export default FootR;
