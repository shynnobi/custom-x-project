import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  ALUMINIUM_COLOR,
  ALUMINIUM_WHITE_COLOR,
  BRONZE_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes'; // Custom hook for loading model nodes
import { VariantsMap } from '@interfaces/variantsMap';

const Forearm_WeaponR = (): ReactElement | null => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { armatureColor, primaryColor, accentColor, thirdAccentColor },
  } = useColorSchemeStore();
  const { armorConfig, setArmorConfig, armorVisibility } = useArmorStore();

  // Get the nodes and model name based on the selected weapon model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedWeapon
  );

  // Define a map of weapon variants
  const weaponMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_forearm_weapon ? (
        <group key="weapon1">
          <group
            name="weaponR"
            position={[-3.041, -0.742, 0.017]}
            rotation={[-0.013, 0, -Math.PI / 2]}
            visible={armorVisibility.weaponR}
          >
            <mesh
              name="skin01_forearm_weapon"
              geometry={nodes.skin01_forearm_weapon.geometry}
              material={armatureColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_1"
              geometry={nodes.skin01_forearm_weapon_1.geometry}
              material={primaryColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_2"
              geometry={nodes.skin01_forearm_weapon_2.geometry}
              material={accentColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_3"
              geometry={nodes.skin01_forearm_weapon_3.geometry}
              material={armatureColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_beam"
              geometry={nodes.skin01_forearm_weapon_beam.geometry}
              material={accentColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_cannon"
              geometry={nodes.skin01_forearm_weapon_cannon.geometry}
              material={armatureColor.material}
            />
            <mesh
              name="skin01_forearm_weapon_plane"
              geometry={nodes.skin01_forearm_weapon_plane.geometry}
              material={armatureColor.material}
            />
          </group>
        </group>
      ) : null,
      megaman_x: nodes.skin02_forearm_weaponR ? (
        <group key="weapon2">
          <mesh
            name="weaponR"
            geometry={nodes.skin02_forearm_weaponR.geometry}
            material={primaryColor.material}
            position={[-3.041, -0.742, 0.017]}
            rotation={[3.129, 0, Math.PI / 2]}
            scale={-1}
          >
            <mesh
              name="skin02_forearm_weapon_beamR"
              geometry={nodes.skin02_forearm_weapon_beamR.geometry}
              material={accentColor.material}
            />
            <mesh
              name="skin02_forearm_weapon_cannonR"
              geometry={nodes.skin02_forearm_weapon_cannonR.geometry}
              material={armatureColor.material}
            />
          </mesh>
        </group>
      ) : null,
      zero: nodes.skin03_forearm_weapon_mainR ? (
        <group key="weapon3">
          <mesh
            name="weaponR"
            geometry={nodes.skin03_forearm_weapon_mainR.geometry}
            material={WHITE_COLOR}
            position={[0, 0.523, 0.001]}
            rotation={[3.129, 1.568, -3.142]}
          >
            <mesh
              name="skin03_forearm_insideR001"
              geometry={nodes.skin03_forearm_insideR001.geometry}
              material={ALUMINIUM_COLOR}
              position={[0.007, -1.265, -3.041]}
              rotation={[-0.001, 1.569, -1.57]}
              scale={-1}
            />
            <mesh
              name="skin03_forearm_weapon_alu"
              geometry={nodes.skin03_forearm_weapon_alu.geometry}
              material={ALUMINIUM_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_beam"
              geometry={nodes.skin03_forearm_weapon_beam.geometry}
              material={accentColor.material}
              rotation={[-0.001, 1.568, -1.57]}
              scale={-1}
            />
            <mesh
              name="skin03_forearm_weapon_beams"
              geometry={nodes.skin03_forearm_weapon_beams.geometry}
              material={thirdAccentColor?.material}
            />
            <mesh
              name="skin03_forearm_weapon_circle01"
              geometry={nodes.skin03_forearm_weapon_circle01.geometry}
              material={BRONZE_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_circle_02"
              geometry={nodes.skin03_forearm_weapon_circle_02.geometry}
              material={ALUMINIUM_WHITE_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_energy"
              geometry={nodes.skin03_forearm_weapon_energy.geometry}
              material={YELLOW_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_reclights"
              geometry={nodes.skin03_forearm_weapon_reclights.geometry}
              material={YELLOW_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_rings"
              geometry={nodes.skin03_forearm_weapon_rings.geometry}
              material={ALUMINIUM_COLOR}
            />
            <mesh
              name="skin03_forearm_weapon_shape"
              geometry={nodes.skin03_forearm_weapon_shape.geometry}
              material={primaryColor.material}
            />
            <mesh
              name="skin03_forearm_weapon_triangle"
              geometry={nodes.skin03_forearm_weapon_triangle.geometry}
              material={thirdAccentColor?.material}
            />
          </mesh>
        </group>
      ) : null,
    };
  }, [
    nodes,
    armorVisibility.weaponR,
    armatureColor.material,
    primaryColor.material,
    accentColor.material,
    thirdAccentColor?.material,
  ]);

  // Select the weapon based on the model name
  const selectedWeapon = useMemo(() => {
    return weaponMap[modelName] || null;
  }, [modelName, weaponMap]);

  // Update armor configuration for weapon types
  useEffect(() => {
    setArmorConfig('totalWeaponTypes', Object.keys(weaponMap).length);
  }, [setArmorConfig, weaponMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  if (!armorVisibility.weaponR) {
    return null;
  }

  return (
    <group visible={armorVisibility.weaponR} ref={groupRef}>
      {selectedWeapon}
    </group>
  );
};

export default Forearm_WeaponR;
