import { FC, SVGProps } from 'react';
import { Tab } from '@headlessui/react';

interface CustomTabButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>; // Typing the icon as a React component that takes SVG props
  title: string; // Typing the title as a string
}

const CustomTabButton: FC<CustomTabButtonProps> = ({ icon: Icon, title }) => (
  <Tab
    className={`text-sm md:text-md uppercase text-slate-500 data-[selected]:bg-white data-[selected]:text-blue-600 w-full max-h-24`}
  >
    <div className="flex flex-col items-center p-4">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      {title}
    </div>
  </Tab>
);

export default CustomTabButton;
