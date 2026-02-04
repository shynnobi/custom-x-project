import { ReactElement, useState } from 'react';
import { TabGroup, TabList, TabPanels } from '@headlessui/react';

import {
  TabButtonArmor,
  TabPanelArmor,
} from '@components/ConfigPanel/TabArmor';
import {
  TabButtonColors,
  TabPanelColors,
} from '@components/ConfigPanel/TabColors';
import {
  TabButtonExport,
  TabPanelExport,
} from '@components/ConfigPanel/TabExport';
import { TabButtonInfo, TabPanelInfo } from '@components/ConfigPanel/TabInfo';
import { TabButtonPose, TabPanelPose } from '@components/ConfigPanel/TabPose';
import { DEFAULT_CONFIG_PANEL_WIDTH } from '@constants/constantsApp';
import { useExperience } from '@contexts/ExperienceContext';

const ConfigPanel = (): ReactElement => {
  const { isConfigPanelOpen, configPanelHeight, isScreenPortraitMode } =
    useExperience();

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to determine the styles for the panel
  const getPanelStyles = () => {
    if (isScreenPortraitMode) {
      // Mobile view
      return {
        height: isConfigPanelOpen ? configPanelHeight : 0, // Set height based on visibility
        width: '100%', // Full width for mobile
      };
    } else {
      // Desktop view
      return {
        height: '100%', // Full height for desktop
        width: isConfigPanelOpen ? DEFAULT_CONFIG_PANEL_WIDTH : 0, // Set width based on visibility
      };
    }
  };

  const panelStyles = getPanelStyles();

  return (
    <div
      className={`fixed ${isScreenPortraitMode ? 'bottom-0 left-0 right-0' : 'top-0 right-0 bottom-0'} bg-white shadow-lg z-40 touch-pan-y`}
      style={{
        ...panelStyles,
      }}
    >
      {isConfigPanelOpen && (
        <TabGroup
          className={`w-full h-full flex ${isScreenPortraitMode ? 'flex-col-reverse' : 'flex-row'}`}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <TabPanels
            className={`${
              isScreenPortraitMode
                ? 'order-2 h-full' // Take all space except for the MENU in mobile
                : 'order-1 flex-grow h-full' // Take all space except for the MENU in desktop
            }`}
          >
            <TabPanelArmor />
            <TabPanelColors />
            <TabPanelPose />
            <TabPanelExport />
            <TabPanelInfo />
          </TabPanels>

          <TabList
            className={`${
              isScreenPortraitMode
                ? 'order-1 w-full flex' // Align at the bottom on mobile, full width
                : 'order-2 flex flex-col max-w-20 h-full' // Align to the left on desktop, fixed width
            } bg-gray-200`}
          >
            <TabButtonArmor />
            <TabButtonColors />
            <TabButtonPose />
            <TabButtonExport />
            <div
              className={`flex-grow ${isScreenPortraitMode ? 'hidden' : ''}`}
            />
            <TabButtonInfo />
          </TabList>
        </TabGroup>
      )}
    </div>
  );
};

export default ConfigPanel;
