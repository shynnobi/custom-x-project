import { ReactElement, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const UpperArmR = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);

  const {
    colorStates: { secondaryColor, primaryColor, armatureColor },
  } = useColorSchemeStore();

  const { armorConfig, armorVisibility } = useArmorStore();
  const { nodes, modelName, materials } = useSelectedModelNodes(
    armorConfig.selectedUpperArms
  );

  const upperArmRMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_upper_armR ? (
        <mesh
          name="skin01_upper_armR"
          geometry={nodes.skin01_upper_armR.geometry}
          material={secondaryColor.material}
          position={[0, 0.024, 0]}
          rotation={[-3.122, 0, Math.PI / 2]}
          scale={-1}
        />
      ) : null,
      megaman_x: nodes.skin02_upper_armR ? (
        <group
          name="skin02_upper_armR"
          position={[0, 0.024, 0]}
          rotation={[-3.122, 0, Math.PI / 2]}
          scale={-1}
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
            name="skin02_upper_arm_ringR"
            geometry={nodes.skin02_upper_arm_ringR.geometry}
            material={armatureColor.material}
          />
        </group>
      ) : null,
      zero: nodes.skin03_upper_armR ? (
        <group
          name="skin03_upper_armR"
          position={[0, 0.024, 0]}
          rotation={[-3.122, 0, Math.PI / 2]}
          scale={-1}
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

  const selectedUpperArmR = useMemo(
    () => upperArmRMap[modelName] || null,
    [modelName, upperArmRMap]
  );

  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.upper_armR} ref={groupRef}>
      {selectedUpperArmR}
    </group>
  );
};

export default UpperArmR;
