import { ReactElement } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PanelDirectionButtonProps {
  direction?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
}

const PanelDirectionButton = ({
  direction,
  onClick,
  disabled,
}: PanelDirectionButtonProps): ReactElement => {
  const Icon = direction === 'left' ? FaAngleLeft : FaAngleRight;

  return (
    <button
      onClick={onClick}
      className={`transition-transform bg-blue-500 h-full text-white px-2 ${direction === 'left' ? 'notched-corner-small-left active:-translate-x-1' : 'notched-corner-small-right active:translate-x-1'} ${disabled ? 'cursor-not-allowed bg-gray-400' : ''}`}
      disabled={disabled}
    >
      <Icon size={24} className="text-white" />
    </button>
  );
};

export default PanelDirectionButton;
