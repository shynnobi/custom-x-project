import { MutableRefObject } from 'react';
import * as THREE from 'three';

export interface CanvasSize {
  width: number;
  height: number;
}

export interface ExperienceContextType {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  canvasSize: CanvasSize;
  configPanelHeight: number;
  configPanelWidth: number;
  gl: THREE.WebGLRenderer | null;
  isConfigPanelOpen: boolean;
  isScreenPortraitMode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orbitControlsRef?: any;
  size: THREE.Vector2 | null;
  adjustCameraHeight: (deltaY: number) => void;
  resetCamera: () => void;
  setCanvasSize: (size: CanvasSize) => void;
  setConfigPanelHeight: (height: number) => void;
  setGl: (renderer: THREE.WebGLRenderer | null) => void;
  setSize: (size: THREE.Vector2 | null) => void;
  togglePanelConfig: () => void;
}
