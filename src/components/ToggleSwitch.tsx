import { ReactElement } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

const ToggleSwitch = ({
  label,
  checked,
  onChange,
}: ToggleSwitchProps): ReactElement => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700 text-md uppercase">{label}</span>
    <div className="flex items-center">
      <span
        className={`mr-2 ${checked ? 'bg-green-400' : 'bg-red-400'} rounded-full w-3 h-3`}
      />
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? 'bg-blue-600' : 'bg-gray-200'}
        relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
      >
        <span
          className={`${checked ? 'translate-x-6' : 'translate-x-1'}
          inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  </div>
);

export default ToggleSwitch;
