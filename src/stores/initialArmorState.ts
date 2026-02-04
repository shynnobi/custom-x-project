import { ModelName, MODELS } from '@constants/constantsModels';
import { ArmorConfig, ArmorPart } from '@interfaces/armorStore';

// Dynamically generate the armorSets object
export const armorSets: Record<ModelName, number> = Object.keys(MODELS).reduce(
  (acc, key, index) => {
    acc[key as ModelName] = index + 1; // Assigning the index+1 as value
    return acc;
  },
  {} as Record<ModelName, number>
);

// Select Megaman Classic as initial selected armor
export const initialSelectedArmor = Object.keys(MODELS)[0] as ModelName;

// Get the corresponding index number for megaman_classic from armorSets
export const initialArmorSetNumber = armorSets[initialSelectedArmor];

export const armorParts: ArmorPart[] = [
  'Chest',
  'Feet',
  'Forearms',
  'Hair',
  'Helmet',
  'LowerLegs',
  'Shoulders',
  'UpperArms',
  'UpperLegs',
  'Waist',
  'Weapon',
];

// Function to generate the initial armorConfig
export const createArmorConfig = (initialValue: number): ArmorConfig => {
  const config: Partial<ArmorConfig> = {};

  for (const part of armorParts) {
    config[`selected${part}`] = initialValue;
    config[`total${part}Types`] = 1;
  }

  return config as ArmorConfig;
};

export const initialArmorVisibility = {
  chest: true,
  head_1: true,
  footL: true,
  footR: true,
  forearmL: true,
  forearmR: true,
  handL: false,
  handR: true,
  hair: false,
  helmet: true,
  lower_legL: true,
  lower_legR: true,
  shoulders: true,
  upper_armL: true,
  upper_armR: true,
  upper_legL: true,
  upper_legR: true,
  waist: true,
  weaponR: true,
};
