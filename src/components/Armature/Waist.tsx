import { ReactElement, useEffect, useMemo, useRef } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import * as THREE from 'three';

import {
  ALUMINIUM_COLOR,
  GOLD_COLOR,
  WHITE_COLOR,
} from '@constants/constantsColors';
import { useCleanupMeshResourcesOnUnmount } from '@hooks/useCleanupMeshOnUnmount';
import { useSelectedModelNodes } from '@hooks/useSelectedModelNodes';
import { VariantsMap } from '@interfaces/variantsMap';

export const Waist = (): ReactElement => {
  const groupRef = useRef<THREE.Group | null>(null);
  const {
    colorStates: { primaryColor },
  } = useColorSchemeStore();
  const { armorConfig, armorVisibility, setArmorConfig, isOriginalArmorSet } =
    useArmorStore();

  const { nodes, modelName } = useSelectedModelNodes(armorConfig.selectedWaist);

  // Define a map of the waist components with checks for undefined nodes
  const waistComponents: VariantsMap = useMemo(() => {
    return {
      megaman_classic: nodes.skin01_waist ? (
        <mesh
          name="skin01_waist"
          geometry={nodes.skin01_waist.geometry}
          material={primaryColor.material}
          position={[0, 0.222, -0.009]}
        />
      ) : null,
      megaman_x: nodes.skin02_waist ? (
        <mesh
          name="skin02_waist"
          geometry={nodes.skin02_waist.geometry}
          material={primaryColor.material}
          position={[0, 0.222, -0.009]}
        />
      ) : null,
      zero: nodes.skin03_waist ? (
        <>
          <mesh
            name="skin03_waist"
            geometry={nodes.skin03_waist.geometry}
            material={isOriginalArmorSet ? WHITE_COLOR : primaryColor.material}
            position={[0, 0.222, -0.009]}
          >
            <mesh
              name="skin02_waist003"
              geometry={nodes.skin02_waist003.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin02_waist005"
              geometry={nodes.skin02_waist005.geometry}
              material={GOLD_COLOR}
            />
            <mesh
              name="skin02_waist006"
              geometry={nodes.skin02_waist006.geometry}
              material={WHITE_COLOR}
            />
            <mesh
              name="skin03_waist001"
              geometry={nodes.skin03_waist001.geometry}
              material={ALUMINIUM_COLOR}
            />
          </mesh>
        </>
      ) : null,
    };
  }, [nodes, primaryColor.material, isOriginalArmorSet]);

  // Select the waist component based on the model name
  const selectedWaist = useMemo(() => {
    return waistComponents[modelName] || null;
  }, [modelName, waistComponents]);

  useEffect(() => {
    setArmorConfig('totalWaistTypes', Object.keys(waistComponents).length);
  }, [setArmorConfig, waistComponents]);

  useCleanupMeshResourcesOnUnmount(groupRef);

  return (
    <group visible={armorVisibility.waist} ref={groupRef}>
      {selectedWaist}
    </group>
  );
};

export default Waist;
