import { ReactElement, useMemo, useState } from 'react';
import useArmorStore from '@stores/useArmorStore';
import useColorSchemeStore from '@stores/useColorSchemeStore';
import { motion } from 'framer-motion';
import { HiColorSwatch } from 'react-icons/hi';
import { IoChevronDown, IoChevronUp, IoWarning } from 'react-icons/io5';

import CustomTabButton from '@components/ConfigPanel/CustomTabButton';
import {
  COLOR_CATEGORIES_MAP,
  colorCategoriesName,
} from '@constants/constantsColors';
import { useExperience } from '@contexts/ExperienceContext';
import { ColorCategoryName, HexadecimalColor } from '@interfaces/colorScheme';
import { convert0xToHex } from '@utils/colorUtils';
import { formatStringToTitle } from '@utils/stringUtils';

import CustomTabPanel from './CustomTabPanel';
import FunctionButton from './FunctionButton';

export const TabPanelColors = (): ReactElement => {
  const { isOriginalArmorSet, armorConfig, armorVisibility } = useArmorStore();
  const { colorStates, updateColor, getRandomColorScheme } =
    useColorSchemeStore();
  const { isScreenPortraitMode } = useExperience();

  // Determine whether accent colors 2 and 3 are used
  const issecondAccentColorUsed = armorConfig.selectedHelmet === 3;
  const isthirdAccentColorUsed =
    armorConfig.selectedFeet === 3 ||
    armorConfig.selectedChest === 3 ||
    armorConfig.selectedLowerLegs === 3 ||
    armorConfig.selectedWeapon === 3;

  const isTertiaryColorUsed = false;
  const isHairColorUsed = armorVisibility.hair;

  // Filter categories based on additional color usage
  const filteredColorCategories = useMemo(() => {
    return colorCategoriesName.filter((category) => {
      if (category === 'secondAccentColor' && !issecondAccentColorUsed)
        return false;
      if (category === 'thirdAccentColor' && !isthirdAccentColorUsed)
        return false;
      if (category === 'tertiaryColor' && !isTertiaryColorUsed) return false;
      if (category === 'hairColor' && !isHairColorUsed) return false;
      return true;
    });
  }, [
    issecondAccentColorUsed,
    isthirdAccentColorUsed,
    isTertiaryColorUsed,
    isHairColorUsed,
  ]);

  // Initialize selectedTabIndex directly if 'primaryColor' is present
  const initialSelectedIndex = filteredColorCategories.indexOf('primaryColor');
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(
    initialSelectedIndex !== -1 ? initialSelectedIndex : null
  );

  const handleColorSelection = (
    category: ColorCategoryName,
    color: HexadecimalColor
  ) => {
    updateColor(category, color);
  };

  const renderColorButton = (
    category: ColorCategoryName,
    color: HexadecimalColor,
    isSelected: boolean,
    index: number
  ) => (
    <button
      key={`${category}-${color}-${index}`}
      className={`min-h-12 rounded-lg
      ${isSelected ? 'border-3 border-black' : color === 0xffffff ? 'border border-gray-300' : 'border border-white'}
      hover:border-3 hover:border-blue-500 transition-transform active:translate-y-1`}
      style={{ background: convert0xToHex(color) }}
      onClick={() => handleColorSelection(category, color)}
    />
  );

  return (
    <CustomTabPanel>
      {!isOriginalArmorSet ? (
        <>
          <div className="flex flex-col gap-2">
            {filteredColorCategories.map((category, index) => {
              const categoryColor = colorStates[category]?.color || 0xffffff;
              const updatedColorName = formatStringToTitle(category);
              console.log(category);

              const colorList = COLOR_CATEGORIES_MAP[category] || [];

              return (
                <motion.div
                  key={index} // Use index as key for each tab
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className={`w-full flex justify-between items-center ${selectedTabIndex === index ? '' : ''}`}
                    onClick={() => {
                      setSelectedTabIndex((prevIndex) =>
                        prevIndex === index ? null : index
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-full ${categoryColor === 0xffffff ? 'border border-gray-300' : ''}`}
                        style={{
                          backgroundColor: convert0xToHex(categoryColor),
                        }}
                      />
                      <span className="text-xl uppercase">
                        {updatedColorName}
                      </span>
                    </div>

                    {selectedTabIndex === index ? (
                      <IoChevronUp size={20} />
                    ) : (
                      <IoChevronDown size={20} />
                    )}
                  </button>

                  {selectedTabIndex === index && (
                    <motion.div
                      className="pt-3 grid gap-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        gridTemplateColumns: isScreenPortraitMode
                          ? 'repeat(8, minmax(0, 1fr))'
                          : 'repeat(5, minmax(0, 1fr))',
                      }}
                    >
                      {colorList.map((color, index) =>
                        renderColorButton(
                          category,
                          color,
                          colorStates[category]?.color === color,
                          index
                        )
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <FunctionButton
            func={getRandomColorScheme}
            title="Random Color Scheme"
            icon={HiColorSwatch}
            bgColor="bg-sky-200"
            borderColor="border-sky-300"
            textColor="text-sky-800"
          />
        </>
      ) : (
        <div className="flex flex-col items-center p-5 rounded-lg border-3">
          <IoWarning size={36} className="text-yellow-500" />
          <p className="text-center text-gray-700 w-full text-xl leading-6">
            ORIGINAL models are not customizable.
            <br />
            <span>
              Please switch to <span className="underline">Custom Mode</span> in
              the Armor tab.
            </span>
          </p>
        </div>
      )}
    </CustomTabPanel>
  );
};

export const TabButtonColors = (): ReactElement => {
  return <CustomTabButton title="Colors" icon={HiColorSwatch} />;
};
