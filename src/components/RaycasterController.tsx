import React, { useCallback, useEffect, useRef, useState } from 'react';
import { invalidate, useThree } from '@react-three/fiber';
import useArmorStore from '@stores/useArmorStore';
import { Object3D, Raycaster, Vector2 } from 'three';

import { ArmorVisibility } from '@interfaces/armorStore';

const excludedComponents: string[] = [
  'head_1',
  'head_2',
  'head_3',
  'hair',
  'helmet',
  'eye_bowlR',
  'eye_bowlL',
  'neck',
  'tongue',
  'teeth',
  'eyes_white_plane',
  'shoulderL',
  'shoulderR',
];

const RaycasterController: React.FC = () => {
  const { camera, scene, gl } = useThree();
  const { armorVisibility, toggleArmorVisibility } = useArmorStore();

  const raycaster = useRef<Raycaster>(new Raycaster()).current;

  const [mouseDownPosition, setMouseDownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();

      if (event.clientY > rect.bottom) {
        return;
      }

      const mouse = new Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.ray.origin.copy(camera.position);
      raycaster.ray.direction
        .set(mouse.x, mouse.y, 1)
        .unproject(camera)
        .sub(camera.position)
        .normalize();

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersected = intersects[0].object as Object3D;
        const intersectedName = intersected.name as keyof ArmorVisibility; // Type assertion here

        if (
          Object.prototype.hasOwnProperty.call(armorVisibility, intersectedName)
        ) {
          toggleArmorVisibility(intersectedName);
        } else {
          let parent: Object3D | null = intersected.parent;
          while (parent && parent !== scene) {
            if (excludedComponents.includes(parent.name)) {
              break;
            }
            if (
              parent.name &&
              Object.prototype.hasOwnProperty.call(armorVisibility, parent.name)
            ) {
              toggleArmorVisibility(parent.name as keyof ArmorVisibility); // Type assertion here
              break;
            }
            parent = parent.parent;
          }
        }
      }
      invalidate();
    },
    [camera, gl, raycaster, scene, armorVisibility, toggleArmorVisibility]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!mouseMoved) {
        handleClick(event);
      }
      setMouseDownPosition(null);
    },
    [handleClick, mouseMoved]
  );

  const handleMouseDown = useCallback((event: MouseEvent) => {
    setMouseDownPosition({ x: event.clientX, y: event.clientY });
    setMouseMoved(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (mouseDownPosition) {
        const dx = event.clientX - mouseDownPosition.x;
        const dy = event.clientY - mouseDownPosition.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
          setMouseMoved(true);
        }
      }
    },
    [mouseDownPosition]
  );

  useEffect(() => {
    // Add event listeners
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return null;
};

export default RaycasterController;
