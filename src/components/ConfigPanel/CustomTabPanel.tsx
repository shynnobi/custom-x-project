import { ReactElement, ReactNode } from 'react';
import { TabPanel } from '@headlessui/react';

import { useExperience } from '@contexts/ExperienceContext';

interface Props {
  children: ReactNode;
}

const CustomTabPanel = ({ children }: Props): ReactElement => {
  const { isScreenPortraitMode } = useExperience();
  return (
    <TabPanel
      className={`flex flex-col gap-4 p-4 md:p-6 overflow-y-auto ${isScreenPortraitMode ? 'h-full max-h-[288px] sm:max-h-[284px] md:max-h-[284px] md:px-52' : 'h-full'}`}
    >
      {children}
    </TabPanel>
  );
};

export default CustomTabPanel;
