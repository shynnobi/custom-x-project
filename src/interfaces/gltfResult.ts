// src/@interfaces/gltfResult.d.ts

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { ActionName } from './animation';

export interface GLTFNodes {
  [key: string]: THREE.Mesh;
}

export interface GLTFMaterials {
  [key: string]: THREE.Material;
}

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export type GLTFResult = GLTF & {
  nodes: GLTFNodes;
  materials: GLTFMaterials;
  animations: GLTFAction[];
};
