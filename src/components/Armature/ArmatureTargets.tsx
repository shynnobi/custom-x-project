import { ReactElement } from 'react';

const ArmatureTargets = (): ReactElement => {
  return (
    <>
      <group
        name="knee_targetL"
        position={[0.386, 1.372, -1.194]}
        rotation={[-Math.PI, 0, Math.PI]}
      />
      <group
        name="knee_targetR"
        position={[-0.386, 1.372, -1.194]}
        rotation={[-Math.PI, 0, Math.PI]}
      />
      <group
        name="foot_parentL"
        position={[0.537, -0.511, -0.045]}
        rotation={[0, 1.571, 0]}
      >
        <group
          name="foot_targetL"
          position={[0, 1.536, 0]}
          rotation={[-1.567, 0, -Math.PI / 2]}
        />
        <group
          name="foot_tip_rotatorL"
          position={[0, 1.536, 0]}
          rotation={[-Math.PI / 2, 1.012, -Math.PI / 2]}
        >
          <group
            name="ankle_targetL"
            position={[-0.004, 1.093, -0.238]}
            rotation={[-0.559, 0, 0]}
          />
        </group>
        <group
          name="foot_target_2L"
          position={[0, 1.897, 0]}
          rotation={[-1.567, 0, -Math.PI / 2]}
        />
      </group>
      <group
        name="foot_parentR"
        position={[-0.537, -0.511, -0.045]}
        rotation={[0, -1.571, 0]}
      >
        <group
          name="foot_targetR"
          position={[0, 1.536, 0]}
          rotation={[-1.567, 0, Math.PI / 2]}
        />
        <group
          name="foot_tip_rotatorR"
          position={[0, 1.536, 0]}
          rotation={[-Math.PI / 2, -1.012, Math.PI / 2]}
        >
          <group
            name="ankle_targetR"
            position={[0.004, 1.093, -0.238]}
            rotation={[-0.559, 0, 0]}
          />
        </group>
        <group
          name="foot_target_2R"
          position={[0, 1.897, 0]}
          rotation={[-1.567, 0, Math.PI / 2]}
        />
      </group>
      <group
        name="arm_selectorL"
        position={[1.333, 0, -3.041]}
        rotation={[-Math.PI, 1.571, 0]}
      />
      <group
        name="arm_selectorR"
        position={[-1.333, 0, -3.041]}
        rotation={[Math.PI, -1.571, 0]}
      />
      <group
        name="elbow_targetL"
        position={[0.742, -0.77, -3.041]}
        rotation={[-Math.PI, 1.571, 0]}
      />
      <group
        name="elbow_targetR"
        position={[-0.742, -0.77, -3.041]}
        rotation={[-Math.PI, -1.571, 0]}
      />
    </>
  );
};

export default ArmatureTargets;
