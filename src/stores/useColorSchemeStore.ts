// src/store/useColorSchemeStore.ts

import * as THREE from 'three';
import { create } from 'zustand';

import { COLOR_CATEGORIES_MAP } from '@constants/constantsColors';
import {
  ColorCategoryName,
  ColorSchemeStore,
  ColorStates,
  HexadecimalColor,
  MaterialParams,
} from '@interfaces/colorScheme';
import { createMaterial } from '@utils/materialUtils';

import { initialColorSchemeState } from './initialColorSchemeState';
import useArmorStore from './useArmorStore';

// Create a utility function to handle material creation
const createMaterialWithParams = (params: MaterialParams): THREE.Material => {
  const { color, metalness, roughness, emissiveIntensity } = params;
  return createMaterial(color, metalness, roughness, emissiveIntensity);
};

const useColorSchemeStore = create<ColorSchemeStore>((set, get) => ({
  colorStates: Object.keys(initialColorSchemeState).reduce((acc, key) => {
    const params =
      initialColorSchemeState[key as keyof typeof initialColorSchemeState];
    acc[key as keyof ColorStates] = {
      color: params.color,
      material: createMaterialWithParams(params),
    };
    return acc;
  }, {} as ColorStates),

  tempColorStates: null, // Temporary storage for custom colors

  saveTempColorStates: () => {
    set((state) => ({
      tempColorStates: { ...state.colorStates },
    }));
  },

  loadTempColorStates: () => {
    const tempColors = get().tempColorStates;
    if (tempColors) {
      set(() => ({
        colorStates: { ...tempColors },
      }));
    }
  },

  updateColor: (key: keyof ColorStates, newColor: HexadecimalColor) => {
    const params = initialColorSchemeState[key];
    const newMaterial = createMaterialWithParams({
      ...params,
      color: newColor,
    });

    const armorStore = useArmorStore.getState();

    set((state) => {
      const updatedColorStates = {
        ...state.colorStates,
        [key]: {
          color: newColor,
          material: newMaterial,
        },
      };

      // Update tempColorStates only if in custom mode
      if (!armorStore.isOriginalArmorSet) {
        return {
          colorStates: updatedColorStates,
          tempColorStates: updatedColorStates,
        };
      }

      return {
        colorStates: updatedColorStates,
      };
    });
  },

  getRandomColor: (category: ColorCategoryName): HexadecimalColor => {
    const colorArray: HexadecimalColor[] = COLOR_CATEGORIES_MAP[category];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  },

  getRandomColorScheme: () => {
    const newColors = {
      primaryColor: get().getRandomColor('primaryColor'),
      secondaryColor: get().getRandomColor('secondaryColor'),
      accentColor: get().getRandomColor('accentColor'),
      armatureColor: get().getRandomColor('armatureColor'),
      hairColor: get().getRandomColor('hairColor'),
      skinColor: get().getRandomColor('skinColor'),
      eyesColor: get().getRandomColor('eyesColor'),
      secondAccentColor: get().getRandomColor('secondAccentColor'), // Optional color
      thirdAccentColor: get().getRandomColor('thirdAccentColor'), // Optional color
    };

    Object.entries(newColors).forEach(([key, color]) =>
      get().updateColor(key as keyof ColorStates, color)
    );
  },
}));

export default useColorSchemeStore;
