import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useWindowSize } from 'react-use';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { CanvasSize, ExperienceContextType } from '@interfaces/experience';

import {
  DEFAULT_CONFIG_PANEL_HEIGHT,
  DEFAULT_CONFIG_PANEL_WIDTH,
} from '../constants/constantsApp';

const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined
);

export const useExperience = (): ExperienceContextType => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};

export const ExperienceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isScreenPortraitMode = windowWidth < windowHeight;

  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width:
      windowWidth - (isScreenPortraitMode ? 0 : DEFAULT_CONFIG_PANEL_WIDTH),
    height:
      windowHeight - (isScreenPortraitMode ? DEFAULT_CONFIG_PANEL_HEIGHT : 0),
  });

  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState<boolean>(false);
  const [configPanelHeight, setConfigPanelHeight] = useState<number>(
    DEFAULT_CONFIG_PANEL_HEIGHT
  );
  const [configPanelWidth] = useState<number>(DEFAULT_CONFIG_PANEL_WIDTH);

  const [gl, setGl] = useState<THREE.WebGLRenderer | null>(null);
  const [size, setSize] = useState<THREE.Vector2 | null>(null);

  // Correct ref type
  const orbitControlsRef = useRef<OrbitControls | null>(null);
  const [targetY, setTargetY] = useState<number>(0);
  const maxOffset = 1.5; // Y-axis travel limit
  const initialCameraPosition = new THREE.Vector3(2, 2, 12);
  const initialTargetY = 0;

  useEffect(() => {
    let newWidth: number, newHeight: number;

    if (isScreenPortraitMode) {
      newWidth = windowWidth;
      newHeight = isConfigPanelOpen
        ? windowHeight - configPanelHeight
        : windowHeight;
    } else {
      newWidth = isConfigPanelOpen
        ? windowWidth - DEFAULT_CONFIG_PANEL_WIDTH
        : windowWidth;
      newHeight = windowHeight;
    }

    setCanvasSize({ width: newWidth, height: newHeight });
  }, [
    windowWidth,
    windowHeight,
    isScreenPortraitMode,
    isConfigPanelOpen,
    configPanelHeight,
  ]);

  const togglePanelConfig = () => setIsConfigPanelOpen((prev) => !prev);

  const adjustCameraHeight = (deltaY: number) => {
    const controls = orbitControlsRef.current;
    if (controls) {
      const newTargetY = THREE.MathUtils.clamp(
        targetY + deltaY,
        initialTargetY - maxOffset,
        initialTargetY + maxOffset
      );
      controls.target.y = newTargetY; // Modify target.y
      controls.update();
      setTargetY(newTargetY);
    }
  };

  const resetCamera = () => {
    const controls = orbitControlsRef.current;
    if (controls) {
      controls.target.set(0, initialTargetY, 0);
      controls.object.position.copy(initialCameraPosition);
      controls.update();
      setTargetY(initialTargetY);
    }
  };

  return (
    <ExperienceContext.Provider
      value={{
        adjustCameraHeight,
        canvasRef,
        canvasSize,
        configPanelHeight,
        configPanelWidth,
        gl,
        isConfigPanelOpen,
        isScreenPortraitMode,
        orbitControlsRef,
        resetCamera,
        setCanvasSize,
        setConfigPanelHeight,
        setGl,
        setSize,
        size,
        togglePanelConfig,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};
