import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const UpperArmL = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { secondaryColor, primaryColor, armatureColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected upper arm model
  const { nodes, modelName, materials } = useSelectedModelNodes(
    armorConfig.selectedUpperArms
  );

  // Define a map of the component with checks for undefined nodes
  const upperArmLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_upper_armL ? (
        <mesh
          name="skin01_upper_armL"
          geometry={nodes.skin01_upper_armL.geometry}
          material={secondaryColor.material}
          position={[0, 0.024, 0]}
          rotation={[0.019, 0, Math.PI / 2]}
        />
      ) : null,
      megaman_x: nodes.skin02_upper_armL ? (
        <group
          name="skin02_upper_armL"
          position={[0, 0.024, 0]}
          rotation={[0.019, 0, Math.PI / 2]}
        >
          <mesh
            name="skin02_upper_arm"
            geometry={nodes.skin02_upper_arm.geometry}
            material={secondaryColor.material}
          />
          <mesh
            name="skin02_upper_arm_1"
            geometry={nodes.skin02_upper_arm_1.geometry}
            material={primaryColor.material}
          />
          <mesh
            name="skin02_upper_arm_ringL"
            geometry={nodes.skin02_upper_arm_ringL.geometry}
            material={armatureColor.material}
          />
        </group>
      ) : null,
      zero: nodes.skin03_upper_armL ? (
        <group
          name="skin03_upper_armL"
          position={[0, 0.024, 0]}
          rotation={[0.019, 0, Math.PI / 2]}
        >
          <mesh
            name="skin03_upper_arm"
            geometry={nodes.skin03_upper_arm.geometry}
            material={materials.PaletteMaterial001}
          />
          <mesh
            name="skin03_upper_arm_1"
            geometry={nodes.skin03_upper_arm_1.geometry}
            material={secondaryColor.material}
          />
          <mesh
            name="skin03_upper_arm_2"
            geometry={nodes.skin03_upper_arm_2.geometry}
            material={materials.PaletteMaterial001}
          />
        </group>
      ) : null,
    };
  }, [
    nodes,
    materials,
    secondaryColor.material,
    primaryColor.material,
    armatureColor.material,
  ]);

  // Select the variant based on the model name
  const selectedUpperArmL = useMemo(() => {
    return upperArmLMap[modelName] || null;
  }, [modelName, upperArmLMap]);

  // Update armor configuration for lower legs
  useEffect(() => {
    setArmorConfig('totalUpperArmsTypes', Object.keys(upperArmLMap).length);
  }, [setArmorConfig, upperArmLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.upper_armL} ref={groupRef}>
      {selectedUpperArmL}
    </group>
  );
};

export default UpperArmL;
