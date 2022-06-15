import { FiveMCoordsToVector3, Vector3ToFiveMCoords } from '../Utils/Convertor';
import { Hash, Vector3 } from '../Types';
import { EntityNotFoundError } from './EntityError';

export class Entity {
    entity: number;
    readonly model: Hash;

    constructor(entity: number) {
        if (!DoesEntityExist(entity)) {
            throw new EntityNotFoundError(`Entity ID:${entity} not found`);
        }
        this.entity = entity;
        this.model = GetEntityModel(entity);
    }

    public static create(model: Hash, coords: Vector3): Entity {
        return new Entity(
            CreateObject(
                model,
                coords.x,
                coords.y,
                coords.z,
                true,
                true,
                true
            )
        );
    }

    //#region entity getters and setters
    public get position(): Vector3 {
        return FiveMCoordsToVector3(GetEntityCoords(this.entity));
    }
    public set position(value: Vector3) {
        var coords = Vector3ToFiveMCoords(value);
        SetEntityCoords(this.entity, coords[0], coords[1], coords[2], false, false, false, false);
    }

    public get heading(): number {
        return GetEntityHeading(this.entity);
    }
    public set heading(value: number) {
        SetEntityHeading(this.entity, value);
    }

    public get rotation(): Vector3 {
        return FiveMCoordsToVector3(GetEntityRotation(this.entity));
    }
    public set rotation(value: Vector3) {
        var coords = Vector3ToFiveMCoords(value);
        SetEntityRotation(this.entity, coords[0], coords[1], coords[2], 2, true);
    }

    public get rotationVelocity(): Vector3 {
        return FiveMCoordsToVector3(GetEntityRotationVelocity(this.entity));
    }

    public get routingBucket(): number {
        return GetEntityRoutingBucket(this.entity);
    }
    public set routingBucket(value: number) {
        SetEntityRoutingBucket(this.entity, value);
    }

    public get kmh(): number {
        return GetEntitySpeed(this.entity) * 3.6;
    }

    public get mph(): number {
        return GetEntitySpeed(this.entity) * 2.236936;
    }

    public get velocity(): Vector3 {
        return FiveMCoordsToVector3(GetEntityVelocity(this.entity));
    }
    public set velocity(value: Vector3) {
        var coords = Vector3ToFiveMCoords(value);
        SetEntityVelocity(this.entity, coords[0], coords[1], coords[2]);
    }

    public set outline(value: boolean) {
        SetEntityDrawOutline(this.entity, value);
    }
    //#endregion
}
