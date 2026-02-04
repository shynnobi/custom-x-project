import { FC } from 'react';
import { IconType } from 'react-icons';

import { useExperience } from '@contexts/ExperienceContext';

interface PanelButtonProps {
  title: string;
  func: () => void;
  icon: IconType;
  iconColor: string;
}

const PanelButton: FC<PanelButtonProps> = ({
  title,
  func,
  icon: Icon,
  iconColor,
}) => {
  const { isScreenPortraitMode } = useExperience();

  return (
    <button
      onClick={func}
      className={`flex flex-col transition-transform ${iconColor} active:translate-y-1 items-center justify-center ${isScreenPortraitMode ? 'p-2 rounded-lg' : 'p-3 rounded-xl'}`}
    >
      <Icon size={isScreenPortraitMode ? 24 : 30} className="mb-1" />
      {title}
    </button>
  );
};

export default PanelButton;
