import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  ALUMINIUM_COLOR,
  BLACK_COLOR,
  GOLD_COLOR,
  WHITE_COLOR,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const LowerLegL = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor, thirdAccentColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected lower leg model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedLowerLegs
  );

  // Define a map of the component with checks for undefined nodes
  const lowerLegLMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_lower_legL ? (
        <mesh
          name="skin01_lower_legL"
          geometry={nodes.skin01_lower_legL.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[3.11, -0.014, -0.001]}
        />
      ) : null,
      megaman_x: nodes.skin02_lower_legL ? (
        <mesh
          name="skin02_lower_legL"
          geometry={nodes.skin02_lower_legL.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[3.11, -0.014, -0.001]}
        />
      ) : null,
      zero: nodes.skin03_lower_leg_mainL ? (
        <mesh
          name="skin03_lower_leg_mainL"
          geometry={nodes.skin03_lower_leg_mainL.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[3.11, -0.014, -0.001]}
        >
          <mesh
            name="skin03_knee_protectL"
            geometry={nodes.skin03_knee_protectL.geometry}
            material={ALUMINIUM_COLOR}
          />
          <mesh
            name="skin03_lower_leg_beamL"
            geometry={nodes.skin03_lower_leg_beamL.geometry}
            material={thirdAccentColor?.material}
          />
          <mesh
            name="skin03_lower_leg_borderL"
            geometry={nodes.skin03_lower_leg_borderL.geometry}
            material={GOLD_COLOR}
          />
          <mesh
            name="skin03_lower_leg_hornL"
            geometry={nodes.skin03_lower_leg_hornL.geometry}
            material={WHITE_COLOR}
          />
          <mesh
            name="skin03_lower_leg_thrusterL"
            geometry={nodes.skin03_lower_leg_thrusterL.geometry}
            material={WHITE_COLOR}
          />
          <group name="skin03_lower_leg_thruster_insideL">
            <mesh
              name="skin03_lower_leg_thruster_inside"
              geometry={nodes.skin03_lower_leg_thruster_inside.geometry}
              material={ALUMINIUM_COLOR}
            />
            <mesh
              name="skin03_lower_leg_thruster_inside_1"
              geometry={nodes.skin03_lower_leg_thruster_inside_1.geometry}
              material={BLACK_COLOR}
            />
          </group>
        </mesh>
      ) : null,
    };
  }, [nodes, primaryColor.material, thirdAccentColor?.material]);

  // Select the skin based on the model name
  const selectedLowerLegL = useMemo(() => {
    return lowerLegLMap[modelName] || null;
  }, [modelName, lowerLegLMap]);

  // Update armor configuration for lower legs
  useEffect(() => {
    setArmorConfig('totalLowerLegsTypes', Object.keys(lowerLegLMap).length);
  }, [setArmorConfig, lowerLegLMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.lower_legL} ref={groupRef}>
      {selectedLowerLegL}
    </group>
  );
};

export default LowerLegL;
