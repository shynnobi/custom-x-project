import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  ALUMINIUM_COLOR,
  BLACK_COLOR,
  GREY_COLOR,
  WHITE_COLOR,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const Helmet = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: {
      secondaryColor,
      primaryColor,
      accentColor,
      armatureColor,
      hairColor,
      secondAccentColor,
    },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected helmet model
  const { nodes, modelName, materials } = useSelectedModelNodes(
    armorConfig.selectedHelmet
  );

  const ZeroHelmetDiamondColor = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: secondAccentColor?.color, // Diamond is generally colorless
      metalness: 0.0, // Diamond is not metallic
      roughness: 0.1, // Very smooth surface
      clearcoat: 1.0, // Full clearcoat for high gloss
      clearcoatRoughness: 0.0, // Smooth clearcoat layer
      transmission: 0, // Fully translucent
      iridescence: 0.4, // Enable iridescence to simulate light dispersion
      iridescenceIOR: 2.4, // High index of refraction, typical for diamonds
      iridescenceThicknessRange: [100, 300], // Thickness range for iridescence
      // Emission properties
      emissive: new THREE.Color(secondAccentColor?.color), // Color of the emission (cyan for a cool glow)
      emissiveIntensity: 0.5, // Intensity of the emission (adjust as needed)
    });
  }, [secondAccentColor]);

  // Define a map of the component with checks for undefined nodes
  const helmetMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_helmet ? (
        <>
          <mesh
            name="skin01_helmet"
            geometry={nodes.skin01_helmet.geometry}
            material={primaryColor.material}
            position={[0, -3.333, 0]}
          />
          <mesh
            name="skin01_helmet_crest"
            geometry={nodes.skin01_helmet_crest.geometry}
            material={secondaryColor.material}
            position={[0, 0.01, -0.006]}
          />
          <mesh
            name="skin01_helmet_ears"
            geometry={nodes.skin01_helmet_ears.geometry}
            material={secondaryColor.material}
            position={[0, -3.333, 0]}
          />
          <mesh
            name="skin01_helmet_ears_lights"
            geometry={nodes.skin01_helmet_ears_lights.geometry}
            material={accentColor.material}
            position={[0, -3.333, 0]}
          />
        </>
      ) : null,
      megaman_x: nodes.skin02_helmet ? (
        <mesh
          name="skin02_helmet"
          geometry={nodes.skin02_helmet.geometry}
          material={primaryColor.material}
          position={[0, -3.333, 0]}
        >
          <mesh
            name="skin02_helmetMshape"
            geometry={nodes.skin02_helmetMshape.geometry}
            material={secondaryColor.material}
          />
          <mesh
            name="skin02_helmet_crest"
            geometry={nodes.skin02_helmet_crest.geometry}
            material={secondaryColor.material}
            position={[0, 3.344, -0.006]}
          />
          <mesh
            name="skin02_helmet_diamond"
            geometry={nodes.skin02_helmet_diamond.geometry}
            material={accentColor.material}
            position={[0, 3.344, -0.006]}
          />
          <mesh
            name="skin02_helmet_ears"
            geometry={nodes.skin02_helmet_ears.geometry}
            material={armatureColor.material}
          />
          <mesh
            name="skin02_helmet_ears_lights"
            geometry={nodes.skin02_helmet_ears_lights.geometry}
            material={accentColor.material}
          />
        </mesh>
      ) : null,
      zero: nodes.skin03_hair_base ? (
        <>
          <mesh
            name="skin03_hair_base"
            geometry={nodes.skin03_hair_base.geometry}
            material={hairColor.material}
            position={[0, -3.333, 0]}
          />
          <mesh
            name="skin03_hair_elastic"
            geometry={nodes.skin03_hair_elastic.geometry}
            material={materials.PaletteMaterial001}
            position={[0, 0.177, -0.449]}
            rotation={[1.395, 0, -Math.PI]}
          />
          <mesh
            name="skin03_hair_tail"
            geometry={nodes.skin03_hair_tail.geometry}
            material={hairColor.material}
            position={[0.011, -0.299, -1.226]}
            rotation={[Math.PI / 2, -1.571, 0]}
          />
          <group name="skin03_helmet" position={[0, -3.333, 0]}>
            <mesh
              name="skin03_helmet_1"
              geometry={nodes.skin03_helmet_1.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin03_helmet_2"
              geometry={nodes.skin03_helmet_2.geometry}
              material={GREY_COLOR}
            />
            <mesh
              name="skin03_helmet_backhole"
              geometry={nodes.skin03_helmet_backhole.geometry}
              material={ALUMINIUM_COLOR}
            />
            <mesh
              name="skin03_helmet_ears"
              geometry={nodes.skin03_helmet_ears.geometry}
              material={WHITE_COLOR}
            >
              <mesh
                name="skin03_helmet_ears_lights"
                geometry={nodes.skin03_helmet_ears_lights.geometry}
                material={accentColor.material}
              />
              <group name="skin03_helmet_thrusters">
                <mesh
                  name="skin03_helmet_thrusters_1"
                  geometry={nodes.skin03_helmet_thrusters_1.geometry}
                  material={ALUMINIUM_COLOR}
                />
                <mesh
                  name="skin03_helmet_thrusters_2"
                  geometry={nodes.skin03_helmet_thrusters_2.geometry}
                  material={BLACK_COLOR}
                />
              </group>
            </mesh>
            <mesh
              name="skin03_helmet_gem"
              geometry={nodes.skin03_helmet_gem.geometry}
              material={ZeroHelmetDiamondColor}
            />
            <mesh
              name="skin03_helmet_main"
              geometry={nodes.skin03_helmet_main.geometry}
              material={primaryColor.material}
            />
          </group>
        </>
      ) : null,
    };
  }, [
    nodes,
    materials,
    primaryColor.material,
    secondaryColor.material,
    accentColor.material,
    ZeroHelmetDiamondColor,
    armatureColor.material,
    hairColor.material,
  ]);

  // Select the helmet based on the model name
  const selectedHelmet = useMemo(() => {
    return helmetMap[modelName] || null;
  }, [modelName, helmetMap]);

  // Update armor configuration for helmets
  useEffect(() => {
    setArmorConfig('totalHelmetTypes', Object.keys(helmetMap).length);
  }, [setArmorConfig, helmetMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.helmet} name="helmet" ref={groupRef}>
      {selectedHelmet}
    </group>
  );
};

export default Helmet;
