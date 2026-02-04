import { useGLTF } from '@react-three/drei';

import { MODELS } from '../constants/constantsModels';

// Preload models
export const preloadModels = (): void => {
  const paths = Object.values(MODELS).map((set) => set.path);
  paths.forEach((path) => useGLTF.preload(path));
};

// Call preloadModels function where appropriate, e.g., in your main component or App
