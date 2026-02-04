import { MODELS } from '@constants/constantsModels';
import { MaterialParams, ModelColorScheme } from '@interfaces/colorScheme';

const defaultColor = 0xffffff; // Default color if none is provided

const {
  colorScheme: {
    primaryColor,
    secondaryColor,
    tertiaryColor = defaultColor,
    accentColor,
    armatureColor,
    skinColor,
    hairColor,
    eyesColor,
    secondAccentColor = defaultColor,
    thirdAccentColor = defaultColor,
  },
} = MODELS.megaman_classic;

export const initialColorSchemeState: Record<
  keyof ModelColorScheme,
  MaterialParams
> = {
  primaryColor: {
    color: primaryColor,
    metalness: 0.8,
    roughness: 0.4,
  },
  secondaryColor: {
    color: secondaryColor,
    metalness: 0.4,
  },
  tertiaryColor: {
    // Optional color
    color: tertiaryColor,
    metalness: 0.4,
  },
  accentColor: {
    color: accentColor,
    metalness: 0,
    roughness: 0.3,
    emissiveIntensity: 1,
  },
  armatureColor: {
    color: armatureColor,
    metalness: 0.5,
    roughness: 0.7,
  },
  hairColor: {
    color: hairColor,
    metalness: 0.2,
    roughness: 0.7,
  },
  skinColor: {
    color: skinColor,
    metalness: 0,
    roughness: 0.6,
  },
  eyesColor: {
    color: eyesColor,
  },
  secondAccentColor: {
    // Optional color
    color: secondAccentColor,
    metalness: 0,
    roughness: 0.3,
    emissiveIntensity: 1,
  },
  thirdAccentColor: {
    // Optional color
    color: thirdAccentColor,
    metalness: 0,
    roughness: 0.3,
    emissiveIntensity: 1,
  },
};
