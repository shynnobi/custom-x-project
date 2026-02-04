import { ReactElement, useState } from 'react';
import { IoIosSave } from 'react-icons/io';

import { screenshotImageFormats } from '../../constants/constantsApp';
import useScreenshotCapture from '../../hooks/useScreenshotCapture';
import CustomTabButton from './CustomTabButton';
import CustomTabPanel from './CustomTabPanel';

export const TabPanelExport = (): ReactElement => {
  const { screenshotCapture } = useScreenshotCapture();
  const [selectedFormat, setSelectedFormat] = useState(
    screenshotImageFormats[0]
  );

  return (
    <CustomTabPanel>
      <div className="w-full max-w-72 mx-auto">
        <div className="flex flex-col ">
          <div className="text-center mb-1 text-xl font-black uppercase text-blue-700">
            Select a format
          </div>
          <div className="flex flex-col gap-1">
            {screenshotImageFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format)}
                className={`px-3 py-2 rounded-md text-left w-full border-3 ${
                  selectedFormat.id === format.id
                    ? 'bg-blue-200 text-blue-900 border-blue-300'
                    : 'bg-gray-200 text-gray-900'
                } hover:bg-blue-100 hover:border-blue-200 transition-colors`}
              >
                <div className="flex gap-2 items-center text-lg">
                  <format.icon size={20} />
                  {format.name}{' '}
                  <span className="font-sans text-sm">
                    ({format.dimensions})
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col mt-2">
            <button
              onClick={() => screenshotCapture(selectedFormat.format)}
              className="p-3 flex rounded-lg w-full bg-blue-700 text-white transition-transform active:translate-y-1 justify-center items-center"
            >
              <IoIosSave size={24} />
              <span className="uppercase ml-2 text-lg">Save image (JPG)</span>
            </button>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export const TabButtonExport = (): ReactElement => {
  return <CustomTabButton title="Export" icon={IoIosSave} />;
};
