import { ReactElement } from 'react';
import { Switch } from '@headlessui/react';
import useArmorStore from '@stores/useArmorStore';
import { FaRandom, FaRobot } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';

import ToggleSwitch from '@components/ToggleSwitch';
import { formatStringToTitle } from '@utils/stringUtils';

import ArmorPartSwitcher from './ArmorPartSwitcher';
import CustomTabButton from './CustomTabButton';
import CustomTabPanel from './CustomTabPanel';
import FunctionButton from './FunctionButton';

const Spacer = () => <div className="border-t border-white my-1" />;

export const TabPanelArmor = (): ReactElement => {
  const {
    armorConfig,
    armorVisibility,
    cycleArmorPart,
    cycleArmorSet,
    randomizeArmorParts,
    resetArmorVisibility,
    selectedArmorSet,
    toggleArmorVisibility,
  } = useArmorStore();

  const { isOriginalArmorSet, toggleArmorSet } = useArmorStore((state) => ({
    isOriginalArmorSet: state.isOriginalArmorSet,
    toggleArmorSet: state.toggleArmorSet,
  }));

  const updatedArmorSetName = formatStringToTitle(selectedArmorSet);

  const RenderArmorVisibilityBtn = () => (
    <FunctionButton
      title="Reset Armor Visibility"
      icon={MdVisibility}
      func={resetArmorVisibility}
      bgColor="bg-teal-100"
      borderColor="border-teal-300"
      textColor="text-teal-800"
    />
  );

  const RenderRandomArmorSet = () => (
    <FunctionButton
      func={randomizeArmorParts}
      title="Random Armor Set"
      icon={FaRandom}
      bgColor="bg-pink-100"
      borderColor="border-pink-300"
      textColor="text-pink-800"
    />
  );

  const RenderToggleWeaponR = () => (
    <ToggleSwitch
      label="Display Weapon"
      checked={armorVisibility.weaponR}
      onChange={() => {
        toggleArmorVisibility('weaponR');
      }}
    />
  );

  const RenderToggleHelmet = () => (
    <ToggleSwitch
      label="Display Helmet"
      checked={armorVisibility.helmet}
      onChange={() => {
        toggleArmorVisibility('helmet');
        toggleArmorVisibility('hair');
      }}
    />
  );

  return (
    <CustomTabPanel>
      {/* <div className="notched-corner bg-blue-800 flex justify-center items-center text-white font-jersey text-2xl uppercase">
        - Armor Set -
      </div> */}
      <div className="flex items-center space-x-4 justify-center rounded-lg p-2 border-3 border-blue-300">
        <span
          className={`${isOriginalArmorSet ? 'text-blue-700 ' : 'text-gray-600'} uppercase text-xl`}
        >
          Original
        </span>

        <Switch
          checked={!isOriginalArmorSet}
          onChange={toggleArmorSet}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 bg-blue-600`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200
            ${isOriginalArmorSet ? 'translate-x-1' : 'translate-x-6'}`}
          />
        </Switch>

        <span
          className={`${!isOriginalArmorSet ? 'text-blue-700' : 'text-gray-600'} uppercase text-xl`}
        >
          Custom
        </span>
      </div>

      {isOriginalArmorSet ? (
        <>
          <div className="gap-4 flex flex-col">
            {/* <SectionTitle title="Original Characters" /> */}

            <ArmorPartSwitcher
              currentValue={updatedArmorSetName}
              switchPartFunc={cycleArmorSet}
              isArmorSet={true}
            />

            <div className="flex flex-col gap-1 mb-2">
              {RenderToggleHelmet()}
              {RenderToggleWeaponR()}
            </div>
          </div>

          {RenderArmorVisibilityBtn()}
        </>
      ) : null}

      {!isOriginalArmorSet ? (
        <div className="flex flex-col gap-4">
          {/* <SectionTitle title="Customize character" /> */}

          <div className="flex flex-col gap-1">
            {RenderToggleHelmet()}
            <ToggleSwitch
              label="Display Shoulders"
              checked={armorVisibility.shoulders}
              onChange={() => {
                toggleArmorVisibility('shoulders');
              }}
            />
            {RenderToggleWeaponR()}
          </div>

          <div className="flex flex-col gap-2">
            <ArmorPartSwitcher
              partName="Helmet"
              currentValue={armorConfig.selectedHelmet}
              switchPartFunc={(direction) =>
                cycleArmorPart('Helmet', direction)
              }
              disabled={armorVisibility.hair}
            />
            <ArmorPartSwitcher
              partName="Hair"
              currentValue={armorConfig.selectedHair}
              switchPartFunc={(direction) => cycleArmorPart('Hair', direction)}
              disabled={armorVisibility.helmet}
            />
            <ArmorPartSwitcher
              partName="Chest"
              currentValue={armorConfig.selectedChest}
              switchPartFunc={(direction) => cycleArmorPart('Chest', direction)}
            />
            <ArmorPartSwitcher
              partName="Waist"
              currentValue={armorConfig.selectedWaist}
              switchPartFunc={(direction) => cycleArmorPart('Waist', direction)}
            />
            <Spacer />
            <ArmorPartSwitcher
              partName="Shoulder Pads"
              currentValue={armorConfig.selectedShoulders}
              switchPartFunc={(direction) =>
                cycleArmorPart('Shoulders', direction)
              }
              disabled={armorVisibility.shoulders ? false : true}
            />
            <ArmorPartSwitcher
              partName="Upper Arms"
              currentValue={armorConfig.selectedUpperArms}
              switchPartFunc={(direction) =>
                cycleArmorPart('UpperArms', direction)
              }
            />
            <ArmorPartSwitcher
              partName="Forearms"
              currentValue={armorConfig.selectedForearms}
              switchPartFunc={(direction) =>
                cycleArmorPart('Forearms', direction)
              }
            />
            <div className="gap-2 flex flex-col">
              <ArmorPartSwitcher
                partName="Weapon"
                currentValue={armorConfig.selectedWeapon}
                switchPartFunc={(direction) =>
                  cycleArmorPart('Weapon', direction)
                }
                disabled={!armorVisibility.weaponR}
              />
            </div>
            <Spacer />
            <ArmorPartSwitcher
              partName="Upper Legs"
              currentValue={armorConfig.selectedUpperLegs}
              switchPartFunc={(direction) =>
                cycleArmorPart('UpperLegs', direction)
              }
            />
            <ArmorPartSwitcher
              partName="Lower Legs"
              currentValue={armorConfig.selectedLowerLegs}
              switchPartFunc={(direction) =>
                cycleArmorPart('LowerLegs', direction)
              }
            />
            <ArmorPartSwitcher
              partName="Feet"
              currentValue={armorConfig.selectedFeet}
              switchPartFunc={(direction) => cycleArmorPart('Feet', direction)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {RenderRandomArmorSet()}
            {RenderArmorVisibilityBtn()}
          </div>
        </div>
      ) : null}
    </CustomTabPanel>
  );
};

export const TabButtonArmor = (): ReactElement => {
  return <CustomTabButton title="Armor" icon={FaRobot} />;
};
