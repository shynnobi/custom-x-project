import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  ALUMINIUM_COLOR,
  GOLD_COLOR,
  GREY_COLOR,
  WHITE_COLOR,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes'; // Custom hook for loading model nodes
import { VariantsMap } from '@interfaces/variantsMap';
import { adjustColor } from '@utils/colorUtils';
import { createMaterial } from '@utils/materialUtils';

const Chest = (): ReactElement => {
  const groupRef = useRef<THREE.Group>(null);
  const {
    colorStates: {
      armatureColor,
      primaryColor,
      secondaryColor,
      thirdAccentColor,
    },
  } = useColorSchemeStore();
  const { armorConfig, setArmorConfig, armorVisibility } = useArmorStore();

  // Get the nodes and model name based on the selected chest model
  const { nodes, modelName } = useSelectedModelNodes(armorConfig.selectedChest);

  // Create a custom material for the chest side color
  const chestSideColor = useMemo(
    () =>
      createMaterial(
        adjustColor(primaryColor.color, 100, { r: 50, g: 30, b: 10 })
      ),
    [primaryColor.color]
  );

  const ZeroHelmetDiamondColor = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: thirdAccentColor?.color, // Diamond is generally colorless
      metalness: 0.0, // Diamond is not metallic
      roughness: 0.1, // Very smooth surface
      clearcoat: 1.0, // Full clearcoat for high gloss
      clearcoatRoughness: 0.0, // Smooth clearcoat layer
      transmission: 0, // Fully translucent
      iridescence: 0.4, // Enable iridescence to simulate light dispersion
      iridescenceIOR: 2.4, // High index of refraction, typical for diamonds
      iridescenceThicknessRange: [100, 300], // Thickness range for iridescence
      // Emission properties
      emissive: new THREE.Color(thirdAccentColor?.color), // Color of the emission (cyan for a cool glow)
      emissiveIntensity: 0.5, // Intensity of the emission (adjust as needed)
    });
  }, [thirdAccentColor]);

  // Define a map of chest variants
  const chestMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_chest ? (
        <group>
          <mesh
            name="skin01_chest"
            geometry={nodes.skin01_chest.geometry}
            material={secondaryColor.material}
            position={[0, -2.617, 0]}
          />
          <mesh
            name="skin01_collar"
            geometry={nodes.skin01_collar.geometry}
            material={primaryColor.material}
            position={[0, -2.617, 0]}
          />
        </group>
      ) : null,
      megaman_x: nodes.skin02_chest ? (
        <mesh
          name="skin02_chest"
          geometry={nodes.skin02_chest.geometry}
          material={primaryColor.material}
          position={[0, -2.129, 0]}
        >
          <mesh
            name="skin02_chest_bottom"
            geometry={nodes.skin02_chest_bottom.geometry}
            material={secondaryColor.material}
          />
          <mesh
            name="skin02_chest_side"
            geometry={nodes.skin02_chest_side.geometry}
            material={chestSideColor}
          />
          <mesh
            name="skin02_collar"
            geometry={nodes.skin02_collar.geometry}
            material={armatureColor.material}
            position={[0, -0.488, 0]}
          />
        </mesh>
      ) : null,
      zero: nodes.skin03_chest ? (
        <mesh
          name="skin03_chest"
          geometry={nodes.skin03_chest.geometry}
          material={primaryColor.material}
          position={[0, -2.129, 0]}
        >
          <group name="skin03_chest_backpack">
            <mesh
              name="skin03_chest_backpack_1"
              geometry={nodes.skin03_chest_backpack_1.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin03_chest_backpack_2"
              geometry={nodes.skin03_chest_backpack_2.geometry}
              material={GREY_COLOR}
            />
          </group>
          <mesh
            name="skin03_chest_beams"
            geometry={nodes.skin03_chest_beams.geometry}
            material={ZeroHelmetDiamondColor}
          >
            <mesh
              name="skin03_chest_beam_outlines"
              geometry={nodes.skin03_chest_beam_outlines.geometry}
              material={ALUMINIUM_COLOR}
            />
          </mesh>
          <mesh
            name="skin03_chest_body"
            geometry={nodes.skin03_chest_body.geometry}
            material={GREY_COLOR}
          />
          <mesh
            name="skin03_chest_collar01"
            geometry={nodes.skin03_chest_collar01.geometry}
            material={ALUMINIUM_COLOR}
          />
          <mesh
            name="skin03_chest_collar02"
            geometry={nodes.skin03_chest_collar02.geometry}
            material={GOLD_COLOR}
          />
          <mesh
            name="skin03_chest_front_part"
            geometry={nodes.skin03_chest_front_part.geometry}
            material={primaryColor.material}
          >
            <mesh
              name="skin03_chest_blades"
              geometry={nodes.skin03_chest_blades.geometry}
              material={GOLD_COLOR}
            />
          </mesh>
        </mesh>
      ) : null,
    };
  }, [
    nodes,
    chestSideColor,
    armatureColor.material,
    primaryColor.material,
    secondaryColor.material,
    ZeroHelmetDiamondColor,
  ]);

  // Select the chest based on the model name
  const selectedChest = useMemo(() => {
    return chestMap[modelName] || null;
  }, [modelName, chestMap]);

  // Update armor configuration for chest types
  useEffect(() => {
    setArmorConfig('totalChestTypes', Object.keys(chestMap).length);
  }, [setArmorConfig, chestMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group ref={groupRef} visible={armorVisibility.chest}>
      {selectedChest}
    </group>
  );
};

export default Chest;
