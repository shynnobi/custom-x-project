import { ReactElement } from 'react';

import PanelDirectionButton from './PanelDirectionButton';

interface ArmorPartSwitcherProps {
  partName?: string;
  currentValue?: number | string;
  switchPartFunc: (direction: 'next' | 'prev') => void;
  disabled?: boolean;
  isArmorSet?: boolean;
}

const ArmorPartSwitcher = ({
  partName,
  currentValue,
  switchPartFunc,
  disabled,
  isArmorSet,
}: ArmorPartSwitcherProps): ReactElement => (
  <div
    className={`flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <div
      className={`text-xl uppercase flex items-center  ${disabled ? 'text-gray-400' : ''}`}
    >
      {partName}
    </div>

    {!isArmorSet ? (
      <div
        className={`flex-grow border-t mx-2 ${!disabled ? 'border-blue-300' : 'border-gray-400'}`}
      />
    ) : null}

    <div
      className={`h-full flex items-center bg-blue-200 rounded-full ${isArmorSet ? 'w-full' : null}`}
    >
      <PanelDirectionButton
        direction="left"
        onClick={() => switchPartFunc('prev')}
        disabled={disabled}
      />

      <span
        className={`${!disabled ? 'bg-blue-200' : 'bg-gray-200 text-gray-500'} ${isArmorSet ? 'flex-grow text-xl' : 'text-xl'} px-4 py-1 min-w-11 text-center uppercase`}
      >
        {currentValue}
      </span>

      <PanelDirectionButton
        direction="right"
        onClick={() => switchPartFunc('next')}
        disabled={disabled}
      />
    </div>
  </div>
);

export default ArmorPartSwitcher;
