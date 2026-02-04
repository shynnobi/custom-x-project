import { MeshStandardMaterial, MeshStandardMaterialParameters } from 'three';

import { HexadecimalColor } from '@interfaces/colorScheme';

export const createMaterial: (
  color: HexadecimalColor,
  metalness?: number,
  roughness?: number,
  emissive?: number,
  emissiveIntensity?: number
) => MeshStandardMaterial = (
  color,
  metalness = 0.5,
  roughness = 0.3,
  emissiveIntensity = 0
) => {
  const materialParams: MeshStandardMaterialParameters = {
    color,
    metalness,
    roughness,
    emissive: emissiveIntensity > 0 ? color : 0,
    emissiveIntensity,
  };

  return new MeshStandardMaterial(materialParams);
};
