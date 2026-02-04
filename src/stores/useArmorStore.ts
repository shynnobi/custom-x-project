import { create } from 'zustand';

import { ModelData, ModelName, MODELS } from '@constants/constantsModels';
import { ArmorPart, ArmorStore, ArmorVisibility } from '@interfaces/armorStore';

import {
  armorParts,
  armorSets,
  createArmorConfig,
  initialArmorSetNumber,
  initialArmorVisibility,
  initialSelectedArmor,
} from './initialArmorState';
import useColorSchemeStore from './useColorSchemeStore';

// Define a mapping from armor set names to their IDs
const armorSetIds = Object.fromEntries(
  Object.entries(armorSets).map(([name, id]) => [name, id])
);

const useArmorStore = create<ArmorStore>((set, get) => ({
  selectedArmorSet: initialSelectedArmor, // Select Megaman Classic as the starting armor set
  armorConfig: createArmorConfig(initialArmorSetNumber), // Create an armor config based on the initial armor set number.
  tempArmorConfig: createArmorConfig(initialArmorSetNumber), // Save the armor config before toggling from custom to original mode
  armorParts: armorParts,
  armorVisibility: initialArmorVisibility,
  armorSets: armorSets,
  isOriginalArmorSet: true, // Help to init the app to 'Original Mode'

  setArmorConfig: (key, value) => {
    set((state) => ({
      ...state,
      armorConfig: {
        ...state.armorConfig,
        [key]: value,
      },
    }));
  },

  // Toggle between original and custom armor sets
  toggleArmorSet: () => {
    const {
      isOriginalArmorSet,
      selectedArmorSet,
      armorConfig,
      tempArmorConfig,
    } = get();
    const colorSchemeStore = useColorSchemeStore.getState();

    if (isOriginalArmorSet) {
      // Enter custom mode: Save current armorConfig to tempArmorConfig
      console.log('Entering custom mode. Saving current config:', armorConfig);

      // Save custom color states the first time
      if (!colorSchemeStore.tempColorStates) {
        colorSchemeStore.getRandomColorScheme();
        colorSchemeStore.saveTempColorStates();
      } else {
        // Load saved custom colors if they exist
        colorSchemeStore.loadTempColorStates();
      }

      set((state) => ({
        ...state,
        isOriginalArmorSet: false,
        armorConfig: { ...tempArmorConfig },
      }));
    } else {
      // Enter original mode: Revert to original armorConfig
      console.log(
        'Entering original mode. Reverting to original config:',
        createArmorConfig(armorSetIds[selectedArmorSet])
      );

      set((state) => ({
        ...state,
        isOriginalArmorSet: true,
        tempArmorConfig: { ...state.armorConfig }, // Save current custom config
        armorConfig: createArmorConfig(armorSetIds[selectedArmorSet]), // Revert to the original configuration
      }));

      const model: ModelData = MODELS[selectedArmorSet];
      Object.entries(model.colorScheme).forEach(([key, color]) => {
        colorSchemeStore.updateColor(
          key as keyof typeof model.colorScheme,
          color
        );
      });
    }
  },

  toggleArmorVisibility: (key) => {
    set((state) => ({
      ...state,
      armorVisibility: {
        ...state.armorVisibility,
        [key]: !state.armorVisibility[key as keyof ArmorVisibility],
      },
    }));
  },

  updateArmorPart: (part, action) => {
    const { armorConfig, armorSets } = get();

    const selectedPart = `selected${part}`;
    const totalPartTypes = `total${part}Types`;
    const currentPart = armorConfig[selectedPart as keyof typeof armorConfig];
    let newId: number;

    switch (action) {
      case 'random':
        newId =
          Math.floor(
            Math.random() *
              armorConfig[totalPartTypes as keyof typeof armorConfig]
          ) + 1;
        break;
      case 'prev':
        newId =
          ((currentPart -
            2 +
            armorConfig[totalPartTypes as keyof typeof armorConfig]) %
            armorConfig[totalPartTypes as keyof typeof armorConfig]) +
          1;
        break;
      case 'next':
        newId =
          (currentPart %
            armorConfig[totalPartTypes as keyof typeof armorConfig]) +
          1;
        break;
      case 'reset':
        newId = 1;
        break;
      default:
        newId = armorSets[action as keyof typeof armorSets];
        if (newId === undefined) {
          console.warn(`Unknown armor set: ${action}`);
          return;
        }
        break;
    }

    set((state) => ({
      ...state,
      armorConfig: {
        ...state.armorConfig,
        [selectedPart]: newId,
      },
    }));
  },

  cycleArmorPart: (part, direction) => {
    get().updateArmorPart(part, direction);
  },

  applyActionToAllParts: (action) => {
    const { armorParts, armorSets, updateArmorPart } = get();
    if (action !== 'random' && !(action in armorSets)) {
      console.error(`Invalid armor set: ${action}`);
      return;
    }
    armorParts.forEach((part) => updateArmorPart(part, action));
  },

  randomizeArmorParts: () => {
    get().applyActionToAllParts('random');
  },

  cycleArmorSet: (direction) => {
    const { armorSets, selectedArmorSet, updateArmorPart, armorParts } = get();
    const armorSetNames = Object.keys(armorSets) as ModelName[];
    const colorSchemeStore = useColorSchemeStore.getState();

    const currentSetIndex = armorSetNames.indexOf(selectedArmorSet);

    if (currentSetIndex === -1) {
      console.error(
        `Selected armor set name ${selectedArmorSet} is not valid.`
      );
      return;
    }

    // Calculate the new set index
    const newSetIndex =
      (currentSetIndex +
        (direction === 'next' ? 1 : -1) +
        armorSetNames.length) %
      armorSetNames.length;
    const newSetName = armorSetNames[newSetIndex];

    // Update the store with the new selected armor set
    set((state) => ({
      ...state,
      selectedArmorSet: newSetName,
    }));

    // Update armor parts based on the new set
    armorParts.forEach((part: ArmorPart) => updateArmorPart(part, newSetName));

    // Apply the color scheme for the new armor set
    const model: ModelData = MODELS[newSetName];
    Object.entries(model.colorScheme).forEach(([key, color]) => {
      colorSchemeStore.updateColor(
        key as keyof typeof model.colorScheme,
        color
      );
    });
  },

  resetArmorVisibility: () => {
    set({ armorVisibility: initialArmorVisibility });
  },
}));

export default useArmorStore;
