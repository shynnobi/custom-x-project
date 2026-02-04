import { IconType } from 'react-icons';
import { FaDesktop, FaMobileAlt, FaRegSquare } from 'react-icons/fa';

export const DEFAULT_CONFIG_PANEL_HEIGHT: number = 360;
export const DEFAULT_CONFIG_PANEL_WIDTH: number = 400;

export type ScreenshotFormatName = 'portrait' | 'square' | 'landscape';

export interface ScreenshotFormatProps {
  id: number;
  name: string;
  dimensions: string;
  format: ScreenshotFormatName;
  icon: IconType;
}

export const screenshotImageFormats: ScreenshotFormatProps[] = [
  {
    id: 1,
    name: 'Phone 9/19',
    dimensions: '1284x2778',
    format: 'portrait',
    icon: FaMobileAlt,
  },
  {
    id: 2,
    name: 'Avatar 1/1',
    dimensions: '1024x1024',
    format: 'square',
    icon: FaRegSquare,
  },
  {
    id: 3,
    name: 'Wallpaper 4/3',
    dimensions: '1440x1080',
    format: 'landscape',
    icon: FaDesktop,
  },
];
