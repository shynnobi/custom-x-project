import { FC } from 'react';
import { IconType } from 'react-icons';

interface FunctionButtonProps {
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: IconType;
  func: () => void;
}

const FunctionButton: FC<FunctionButtonProps> = ({
  title,
  bgColor,
  borderColor,
  icon: Icon,
  textColor,
  func,
}) => {
  // Dynamically generated classes based on the theme

  return (
    <button
      className={`flex gap-2 uppercase justify-center ${bgColor} ${borderColor} border-3 rounded-lg p-2 transition-transform active:translate-y-1 ${textColor}`}
      onClick={func}
    >
      <Icon size={24} />
      {title}
    </button>
  );
};

export default FunctionButton;
