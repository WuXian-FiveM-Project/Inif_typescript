import { Hash } from '../Types';
import { Entity } from '../Entity';
import { EntityTypeIsNotPed } from '../Ped';

export class Ped extends Entity {
    constructor(id: number) {
        if (GetEntityType(id) != 1) {
            throw new EntityTypeIsNotPed('Ped ID: ' + id + ' is not a ped');
        }
        super(id);
    }

    //#region ped methods
    

    //#endregion

    //#region ped properties getters and setters

    public get health(): number {
        return GetEntityHealth(this.entity);
    }

    public get maxHealth(): number {
        return GetEntityMaxHealth(this.entity);
    }

    public get armour(): number {
        return GetPedArmour(this.entity);
    }
    public set armour(value: number) {
        SetPedArmour(this.entity, value);
    }

    public get deathReason(): number {
        return GetPedCauseOfDeath(this.entity);
    }

    public get sourceOfDamage(): Entity {
        return new Entity(GetPedSourceOfDamage(this.entity));
    }

    public get sourceOfDeath(): Entity {
        return new Entity(GetPedSourceOfDeath(this.entity));
    }

    public set currentWeapon(value: Hash) {
        SetCurrentPedWeapon(this.entity, value, true);
    }
    public get currentWeapon(): Hash {
        return GetSelectedPedWeapon(this.entity);
    }

    public set canRagdoll(value: boolean) {
        SetPedCanRagdoll(this.entity, value);
    }

    public set eyeColor(value: number) {
        /*
            1. black
            2. very light blue/green
            3. dark blue
            4. brown
            5. darker brown
            6. light brown
            7. blue
            8. light blue
            9. pink
            10. yellow
            11. purple
            12. black
            13. dark green
            14. light brown
            15. yellow/black pattern
            16. light colored spiral pattern
            17. shiny red
            18. shiny half blue/half red
            19. half black/half light blue
            20. white/red perimter
            21. green snake
            22. red snake
            23. dark blue snake
            24. dark yellow
            25. bright yellow
            26. all black
            27. red small pupil
            28. devil blue/black
            29. white small pupil
            30. glossed over
        */
        SetPedEyeColor(this.entity, value);
    }

    public get inVehicle(): Entity {
        return new Entity(GetVehiclePedIsIn(this.entity, false));
    }

    public get lastVehicle(): Entity {
        return new Entity(GetVehiclePedIsIn(this.entity, true));
    }
    //#endregion
}
