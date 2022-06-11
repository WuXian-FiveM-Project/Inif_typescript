export type Vector1 = {
    x: number;
};
export type Vector2 =
    | {
          y: number;
      }
    | Vector1;
export type Vector3 =
    | {
          z: number;
      }
    | Vector2;
export type Vector4 =
    | {
          w: number;
      }
    | Vector3;
