import {
  ScreenshotFormatName,
  ScreenshotFormatProps,
  screenshotImageFormats,
} from '../constants/constantsApp';
import { useExperience } from '../contexts/ExperienceContext';

interface UseScreenshotCapture {
  screenshotCapture: (format: ScreenshotFormatName) => Promise<void>;
}

const useScreenshotCapture = (): UseScreenshotCapture => {
  const { gl } = useExperience();

  const screenshotCapture = async (
    format: ScreenshotFormatName = 'portrait'
  ): Promise<void> => {
    if (!gl) {
      console.error('WebGL context is not available');
      return;
    }

    // Find the selected format dimensions and file format
    const selectedFormat: ScreenshotFormatProps | undefined =
      screenshotImageFormats.find((f) => f.format === format);

    if (!selectedFormat) {
      console.error('Invalid format selected');
      return;
    }

    const { dimensions } = selectedFormat;
    const [targetWidth, targetHeight] = dimensions.split('x').map(Number);

    const { width: glWidth, height: glHeight } = gl.domElement;
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas 2D context');
      return;
    }

    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = glWidth;
    let sourceHeight = glHeight;

    // Adjust source dimensions and coordinates based on target aspect ratio
    if (glWidth / glHeight > targetWidth / targetHeight) {
      sourceWidth = glHeight * (targetWidth / targetHeight);
      sourceX = (glWidth - sourceWidth) / 2;
    } else {
      sourceHeight = glWidth * (targetHeight / targetWidth);
      sourceY = (glHeight - sourceHeight) / 2;
    }

    context.drawImage(
      gl.domElement,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    const link = document.createElement('a');
    const filename = `megaman-${format}.jpg`; // Use '.jpg' for JPEG format
    link.setAttribute('download', filename);
    link.setAttribute('href', canvas.toDataURL('image/jpeg')); // You might want to use 'image/png' based on your formats
    link.click();
  };

  return { screenshotCapture };
};

export default useScreenshotCapture;
