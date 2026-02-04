import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import { ZERO_HAIR_ELASTIC } from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

const Hair = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { hairColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig } = useArmorStore();

  // Get the nodes and model name based on the selected hair model
  const { nodes, modelName } = useSelectedModelNodes(armorConfig.selectedHair);

  // Define a map of hair variants with checks for undefined nodes
  const hairMap: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_hair_new ? (
        <mesh
          geometry={nodes.skin01_hair_new.geometry}
          material={hairColor.material}
          position={[0, -3.333, 0]}
        >
          <mesh
            geometry={nodes.skin01_hair_new_front.geometry}
            material={hairColor.material}
            position={[0, 3.903, 1.449]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          />
          <mesh
            geometry={nodes.skin01_hair_new_top.geometry}
            material={hairColor.material}
            position={[0, 3.903, 1.449]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          />
        </mesh>
      ) : null,
      megaman_x: nodes.skin02_hair ? (
        <mesh
          geometry={nodes.skin02_hair.geometry}
          material={hairColor.material}
          position={[0, -3.333, 0]}
        />
      ) : null,
      zero: nodes.skin03_hair_backhead ? (
        <>
          <mesh
            name="skin03_hair_backhead"
            geometry={nodes.skin03_hair_backhead.geometry}
            material={hairColor.material}
            position={[0, 0.177, -0.449]}
            rotation={[1.395, 0, -Math.PI]}
          />
          <mesh
            name="skin03_hair_base"
            geometry={nodes.skin03_hair_base.geometry}
            material={hairColor.material}
            position={[0, -3.333, 0]}
          />
          <mesh
            name="skin03_hair_elastic"
            geometry={nodes.skin03_hair_elastic.geometry}
            material={ZERO_HAIR_ELASTIC}
            position={[0, 0.177, -0.449]}
            rotation={[1.395, 0, -Math.PI]}
          />
          {!armorVisibility.helmet && (
            <mesh
              name="skin03_hair_front"
              geometry={nodes.skin03_hair_front.geometry}
              material={hairColor.material}
              position={[0.011, -0.299, -1.226]}
              rotation={[Math.PI / 2, -1.571, 0]}
            />
          )}
          <mesh
            name="skin03_hair_tail"
            geometry={nodes.skin03_hair_tail.geometry}
            material={hairColor.material}
            position={[0.011, -0.299, -1.226]}
            rotation={[Math.PI / 2, -1.571, 0]}
          />
        </>
      ) : null,
    };
  }, [nodes, hairColor.material, armorVisibility.helmet]);

  // Select the hair based on the model name
  const selectedHair = useMemo(() => {
    return hairMap[modelName] || null;
  }, [modelName, hairMap]);

  // Update armor configuration for hair types
  useEffect(() => {
    setArmorConfig('totalHairTypes', Object.keys(hairMap).length);
  }, [setArmorConfig, hairMap]);

  // Clean up resources when the component unmounts
  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.hair} name="hair" ref={groupRef}>
      {selectedHair}
    </group>
  );
};

export default Hair;
