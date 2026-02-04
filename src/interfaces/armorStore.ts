import { ModelName } from '@constants/constantsModels';

export type ArmorPart =
  | 'Chest'
  | 'Feet'
  | 'Forearms'
  | 'Hair'
  | 'Helmet'
  | 'LowerLegs'
  | 'Shoulders'
  | 'UpperArms'
  | 'UpperLegs'
  | 'Waist'
  | 'Weapon';

// Generate keys for TotalPartTypes based on ArmorPart
type TotalPartTypes = {
  [K in ArmorPart as `total${K}Types`]: number;
};

// Generate keys for selected parts based on ArmorPart
type SelectedArmorParts = {
  [K in ArmorPart as `selected${K}`]: number;
};

// Combine the two generated types into ArmorConfig
export interface ArmorConfig extends TotalPartTypes, SelectedArmorParts {}

// Define the interface for ArmorVisibility
export interface ArmorVisibility {
  chest: boolean;
  footL: boolean;
  footR: boolean;
  forearmL: boolean;
  forearmR: boolean;
  hair: boolean;
  handL: boolean;
  handR: boolean;
  head_1: boolean;
  helmet: boolean;
  lower_legL: boolean;
  lower_legR: boolean;
  shoulders: boolean;
  upper_armL: boolean;
  upper_armR: boolean;
  upper_legL: boolean;
  upper_legR: boolean;
  waist: boolean;
  weaponR: boolean;
}

type ArmorPartActions = 'random' | 'prev' | 'next' | 'reset';

// ArmorStore interface with all methods related to armor management
export interface ArmorStore {
  armorVisibility: ArmorVisibility;
  armorConfig: ArmorConfig;
  tempArmorConfig: ArmorConfig;
  armorParts: ArmorPart[];
  armorSets: Record<ModelName, number>;
  isOriginalArmorSet: boolean;
  selectedArmorSet: ModelName;
  setArmorConfig: (key: keyof TotalPartTypes, value: number) => void;
  toggleArmorVisibility: (key: keyof ArmorVisibility) => void;
  updateArmorPart: (
    part: ArmorPart,
    action: ArmorPartActions | ModelName
  ) => void;
  cycleArmorPart: (part: ArmorPart, direction: ArmorPartActions) => void;
  applyActionToAllParts: (action: ModelName | 'random') => void;
  randomizeArmorParts: () => void;
  cycleArmorSet: (direction: 'next' | 'prev') => void;
  resetArmorVisibility: () => void;
  toggleArmorSet: () => void;
}
