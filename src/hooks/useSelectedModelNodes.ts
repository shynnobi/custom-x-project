import { useGLTF } from '@react-three/drei';

import { MODEL_ORDER, ModelName, MODELS } from '@constants/constantsModels';
import { GLTFMaterials, GLTFNodes, GLTFResult } from '@interfaces/gltfResult';

// Define the type for the return value of the hook
interface SelectedModelNodesResult {
  nodes: GLTFNodes;
  materials: GLTFMaterials;
  modelName: ModelName;
}

export const useSelectedModelNodes = (
  selectedModelId: number
): SelectedModelNodesResult => {
  // Get the model name based on the selected model ID
  const modelName = MODEL_ORDER[selectedModelId - 1];

  // Get the model path based on the model name
  const modelPath = MODELS[modelName].path;

  // Load the GLTF model based on the model path
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  // Return the entire nodes object and model name
  return { nodes, materials, modelName };
};
