import { ModelColorScheme } from '@interfaces/colorScheme';

// Define the armor set to use
export type ModelName = 'megaman_classic' | 'megaman_x' | 'zero';

export interface ModelData {
  label: string;
  path: string;
  colorScheme: ModelColorScheme;
}

type Model = Record<ModelName, ModelData>;

export const MODEL_ARMATURE = {
  path: '/models/megaman_base_optim-transformed.glb',
};

export const MODELS: Model = {
  megaman_classic: {
    label: 'Megaman Classic',
    path: '/models/megaman_classic_optim-transformed.glb',
    colorScheme: {
      primaryColor: 0x3663bd,
      secondaryColor: 0x5fb4df,
      accentColor: 0xe70017,
      armatureColor: 0x283f67,
      hairColor: 0x0c0c0c,
      skinColor: 0xffc792,
      eyesColor: 0x0875d8,
    },
  },
  megaman_x: {
    label: 'Megaman X',
    path: '/models/megaman_x_optim-transformed.glb',
    colorScheme: {
      primaryColor: 0x0875d8,
      secondaryColor: 0x08c5ff,
      accentColor: 0xe70017,
      armatureColor: 0x1e2026,
      hairColor: 0x0c0c0c,
      skinColor: 0xffc792,
      eyesColor: 0x48c900,
    },
  },
  zero: {
    label: 'Zero',
    path: '/models/zero_optim-transformed.glb',
    colorScheme: {
      primaryColor: 0xd80808,
      secondaryColor: 0x1b1b24,
      accentColor: 0xe70017,
      armatureColor: 0x1b1b24,
      hairColor: 0xd1ab1a,
      skinColor: 0xffddc1,
      eyesColor: 0x48c900,
      secondAccentColor: 0x005eff, // Zero Diamond Helmet
      thirdAccentColor: 0x00e746, // Accent color for chest, lower legs, weapon and feet
    },
  },
};

export const MODEL_ORDER: ModelName[] = Object.keys(MODELS) as ModelName[];
