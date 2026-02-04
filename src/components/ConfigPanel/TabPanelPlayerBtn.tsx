import { ReactElement } from 'react';
import { IconType } from 'react-icons';

interface TabPanelPlayerBtnProps {
  icon: IconType;
  func: () => void;
  direction?: 'left' | 'right';
}

const TabPanelPlayerBtn = ({
  icon: Icon,
  func,
  direction,
}: TabPanelPlayerBtnProps): ReactElement => {
  return (
    <button
      onClick={func}
      className={`p-3 transition-transform bg-blue-600 ${direction === 'left' ? 'active:translate-x-1' : 'active:-translate-x-1'} rounded-full text-white`}
    >
      <Icon className="w-full" size={36} />
    </button>
  );
};

export default TabPanelPlayerBtn;
