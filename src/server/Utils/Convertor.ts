import { Vector3 } from '../Types';

export function FiveMCoordsToVector3(coords: number[]): Vector3 {
    return { x: coords[0], y: coords[1], z: coords[2] };
}
export function Vector3ToFiveMCoords(coords: Vector3): number[] {
    return [coords.x, coords.y, coords.z];
}

