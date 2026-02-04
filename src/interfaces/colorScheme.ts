// types/colorUtils.ts
import * as THREE from 'three';

// Type for colors
export type HexadecimalColor = number;

// Define the type for the color categories
export type ColorCategoryName =
  | 'primaryColor'
  | 'secondaryColor'
  | 'tertiaryColor'
  | 'accentColor'
  | 'armatureColor'
  | 'hairColor'
  | 'skinColor'
  | 'eyesColor'
  | 'secondAccentColor'
  | 'thirdAccentColor';

export interface ModelColorScheme {
  primaryColor: HexadecimalColor;
  secondaryColor: HexadecimalColor;
  tertiaryColor?: HexadecimalColor; // Optional color
  armatureColor: HexadecimalColor;
  accentColor: HexadecimalColor;
  skinColor: HexadecimalColor;
  hairColor: HexadecimalColor;
  eyesColor: HexadecimalColor;
  secondAccentColor?: HexadecimalColor; // Optional color
  thirdAccentColor?: HexadecimalColor; // Optional color
}

export interface MaterialParams {
  color: HexadecimalColor;
  metalness?: number;
  roughness?: number;
  emissiveIntensity?: number;
}

export type ColorStates = {
  [K in keyof ModelColorScheme]: {
    color: ModelColorScheme[K];
    material: THREE.Material;
  };
};

export interface ColorSchemeStore {
  colorStates: ColorStates;
  tempColorStates: ColorStates | null;
  updateColor: (
    key: keyof ModelColorScheme,
    newColor: HexadecimalColor
  ) => void;
  getRandomColor: (category: ColorCategoryName) => HexadecimalColor;
  getRandomColorScheme: () => void;
  saveTempColorStates: () => void;
  loadTempColorStates: () => void;
}
