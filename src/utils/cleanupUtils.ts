import * as THREE from 'three';

export const cleanUpMeshResources = (
  ref: THREE.Group | THREE.Object3D
): void => {
  if (ref) {
    ref.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Dispose geometry
        child.geometry.dispose();

        // Check if the material is an array or a single material
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            material.dispose();
            if (material.map) material.map.dispose();
          });
        } else {
          child.material.dispose();
          if (child.material.map) child.material.map.dispose();
        }
      }
    });
  }
};
