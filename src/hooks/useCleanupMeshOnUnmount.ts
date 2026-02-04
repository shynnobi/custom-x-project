import { RefObject, useEffect } from 'react';
import * as THREE from 'three';

// Cleanup function
const cleanUpMeshResources = (ref: THREE.Group | THREE.Object3D) => {
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

// Custom hook
export function useCleanupMeshResourcesOnUnmount(
  ref: RefObject<THREE.Group>
): void {
  useEffect(() => {
    // Create a local variable to hold the ref value
    const currentRef = ref.current;

    // Clean up resources when the component unmounts
    return () => {
      if (currentRef) {
        cleanUpMeshResources(currentRef);
      }
    };
  }, [ref]);
}
