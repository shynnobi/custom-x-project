import { ReactElement } from 'react';
import { TabPanel } from '@headlessui/react';
import { FaRunning } from 'react-icons/fa';

import { useAnimation } from '@contexts/AnimationContext';

import { useExperience } from '../../contexts/ExperienceContext';
import CustomTabButton from './CustomTabButton';

export const TabPanelPose = (): ReactElement => {
  const { currentAnimationIndex, animationNames, changeAnimationIndex } =
    useAnimation();
  const { isScreenPortraitMode } = useExperience();

  // Function to format animation names
  const formatAnimationName = (name: string): string =>
    name.replace(/00_/g, '').replace(/_/g, ' ');

  return (
    <TabPanel className="flex flex-col justify-center p-4 md:p-6">
      <span className="text-center mb-1 text-xl font-black uppercase text-blue-700">
        Select a pose
      </span>
      <div
        className={`text-center w-full flex ${isScreenPortraitMode ? 'justify-center flex-wrap' : 'flex-col'} gap-1`}
      >
        {animationNames.map((item, index) => {
          const isSelected = index === currentAnimationIndex;

          return (
            <button
              key={index}
              onClick={() => changeAnimationIndex(index)}
              className={`px-3 py-2 text-lg uppercase rounded-md border-3 cursor-pointer transition-transform active:translate-y-1 ${
                isSelected
                  ? 'bg-blue-200 text-blue-900 border-blue-300'
                  : 'bg-gray-200 text-gray-900'
              } hover:bg-blue-100 hover:border-blue-200 transition-colors ${isScreenPortraitMode ? 'min-w-24' : ''}`}
            >
              {formatAnimationName(item)}
            </button>
          );
        })}

        {/* <button
          className="flex gap-2 justify-center items-center bg-blue-300 border-3 border-blue-400 rounded-lg p-1 transition-transform active:translate-y-1 text-blue-900 uppercase"
          onClick={() => randomizeAnimation()}
        >
          <FaRandom size={20} />
          Random
        </button> */}
      </div>
    </TabPanel>
  );
};

export const TabButtonPose = (): ReactElement => {
  return <CustomTabButton title="Pose" icon={FaRunning} />;
};
