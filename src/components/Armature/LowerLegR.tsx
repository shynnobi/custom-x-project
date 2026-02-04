import { ReactElement, useMemo, useRef } from 'react';
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

export const LowerLegR = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor, thirdAccentColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility } = useArmorStore();

  // Get the nodes and model name based on the selected lower leg model
  const { nodes, modelName } = useSelectedModelNodes(
    armorConfig.selectedLowerLegs
  );

  // Define a map of the component with checks for undefined nodes
  const lowerLegRMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_lower_legR ? (
        <mesh
          name="skin01_lower_legR"
          geometry={nodes.skin01_lower_legR.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[-0.032, -0.014, -0.001]}
          scale={-1}
        />
      ) : null,
      megaman_x: nodes.skin02_lower_legR ? (
        <mesh
          name="skin02_lower_legR"
          geometry={nodes.skin02_lower_legR.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[-0.032, -0.014, -0.001]}
          scale={-1}
        />
      ) : null,
      zero: nodes.skin03_lower_leg_mainR ? (
        <mesh
          name="skin03_lower_leg_mainR"
          geometry={nodes.skin03_lower_leg_mainR.geometry}
          material={primaryColor.material}
          position={[0, 0.305, -0.018]}
          rotation={[-0.032, -0.014, -0.001]}
          scale={-1}
        >
          <mesh
            name="skin03_knee_protectR"
            geometry={nodes.skin03_knee_protectR.geometry}
            material={ALUMINIUM_COLOR}
          />
          <mesh
            name="skin03_lower_leg_beamR"
            geometry={nodes.skin03_lower_leg_beamR.geometry}
            material={thirdAccentColor?.material}
          />
          <mesh
            name="skin03_lower_leg_borderR"
            geometry={nodes.skin03_lower_leg_borderR.geometry}
            material={GOLD_COLOR}
          />
          <mesh
            name="skin03_lower_leg_hornR"
            geometry={nodes.skin03_lower_leg_hornR.geometry}
            material={WHITE_COLOR}
          />
          <mesh
            name="skin03_lower_leg_thrusterR"
            geometry={nodes.skin03_lower_leg_thrusterR.geometry}
            material={WHITE_COLOR}
          />
          <group name="skin03_lower_leg_thruster_insideR">
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

  // Select the variant based on the model name
  const selectedLowerLegR = useMemo(() => {
    return lowerLegRMap[modelName] || null;
  }, [modelName, lowerLegRMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.lower_legR} ref={groupRef}>
      {selectedLowerLegR}
    </group>
  );
};

export default LowerLegR;
