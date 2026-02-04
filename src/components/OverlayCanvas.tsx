import { ReactElement, ReactNode } from 'react';
import { FaWrench } from 'react-icons/fa6';
import { FiMinus, FiPlus } from 'react-icons/fi';
// import { IoIosSave } from 'react-icons/io';
import { IoCameraReverseSharp, IoClose } from 'react-icons/io5';

import { useExperience } from '../contexts/ExperienceContext';
// import useScreenshotCapture from '../hooks/useScreenshotCapture';

interface MenuItemProps {
  children: ReactNode;
}

const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
};

interface OverlayTitleBtnProps {
  title: string;
}

const OverlayTitleBtn = ({ title }: OverlayTitleBtnProps): ReactElement => (
  <span className="text-blue-600 uppercase text-sm mt-1">{title}</span>
);

const OverlayCanvas = (): ReactElement => {
  const {
    adjustCameraHeight,
    canvasSize,
    isConfigPanelOpen,
    isScreenPortraitMode,
    resetCamera,
    togglePanelConfig,
  } = useExperience();

  const handleTogglePanelConfig = () => {
    if (isScreenPortraitMode) {
      togglePanelConfig();
    }
  };

  // const { screenshotCapture } = useScreenshotCapture();

  // const handleCapture = async () => {
  //   screenshotCapture('portrait');
  // };

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      }}
    >
      {isScreenPortraitMode ? (
        <div className="absolute bottom-0 right-0 z-50 p-3">
          <MenuItem>
            <button
              onClick={handleTogglePanelConfig} // Trigger the vertical panel only
              className="p-3 rounded-full bg-blue-800 text-white border-3 border-blue-700 transition-transform active:translate-y-1"
            >
              {isConfigPanelOpen ? (
                <IoClose size={32} />
              ) : (
                <FaWrench size={32} />
              )}
            </button>
          </MenuItem>
        </div>
      ) : null}

      <div className="absolute top-5 right-3 z-50">
        <div className="flex flex-col gap-3 select-none">
          {!isScreenPortraitMode ? (
            <MenuItem>
              <button
                onClick={togglePanelConfig} // Trigger the horizontal panel
                className="p-3 rounded-full bg-blue-800 text-white border-3 border-blue-900 transition-transform active:translate-y-1"
              >
                {isConfigPanelOpen ? (
                  <IoClose size={32} />
                ) : (
                  <FaWrench size={32} />
                )}
              </button>
              <OverlayTitleBtn
                title={isConfigPanelOpen ? 'Close' : 'Customize'}
              />
            </MenuItem>
          ) : null}

          <MenuItem>
            <button
              onClick={() => resetCamera()}
              className="p-3 rounded-full bg-blue-400 bg-opacity-80 border-blue-500 text-white border-3 transition-transform active:translate-y-1"
            >
              <IoCameraReverseSharp size={32} />
            </button>

            <OverlayTitleBtn title="Reset view" />
          </MenuItem>

          <div>
            <MenuItem>
              <button
                onClick={() => adjustCameraHeight(0.3)} // Move the camera up
                className="p-2 rounded-t-full bg-blue-400 bg-opacity-80 text-white border-3 border-blue-500 transition-transform active:bg-opacity-45"
              >
                <FiPlus size={24} />
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => adjustCameraHeight(-0.3)} // Move the camera down
                className="p-2 rounded-b-full bg-blue-400 bg-opacity-80 text-white border-blue-500 border-b-none border-r-3 border-l-3 border-b-3 transition-transform active:bg-opacity-45"
              >
                <FiMinus size={24} />
              </button>
              <span className="text-blue-600 uppercase font-bold text-xs mt-1">
                UP / DOWN
              </span>
            </MenuItem>
          </div>
          {/*
          <div className="flex flex-col gap-3">
            <MenuItem>
              <button
                onClick={handleCapture}
                className="p-3 rounded-full bg-blue-400 bg-opacity-80 text-white border-blue-500 border-3 transition-transform active:translate-y-1"
              >
                <IoIosSave size={24} />
              </button>
              <OverlayTitleBtn title="Save" />
            </MenuItem>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OverlayCanvas;
