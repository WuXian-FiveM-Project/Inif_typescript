import { DrawText3D } from "./Render";
import { ShowFloatingHelpNotification } from "./Notification"
import { Vector3 } from "./Types";

const playerVec: Vector3 = {x:-2.65, y:527.36, z:174.99};


setTick(() => {
    DrawText3D( "Hello World 繁中 简中 ",playerVec, 0.5, 1);
})