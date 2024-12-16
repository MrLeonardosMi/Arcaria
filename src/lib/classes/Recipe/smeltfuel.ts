import { Recipe, ModType } from './base';
import { wrapMineTweakerMeta } from '../../utils';

export class SmeltFuelRecipe extends Recipe {
    private smeltFuel: string = '';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: false,
            modType
        });
    }

    setAdditionalInput(name: string, value: string): void {
        if (name === 'smelt_fuel') {
            this.smeltFuel = value;
        }
    }

    generateScript(): string {
        const input = this.inputs[0];
        if (!input || !this.smeltFuel) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `furnace.setFuel(${wrapMineTweakerMeta(input)}, ${this.smeltFuel});`;
                break;
            
            default:
                throw new Error(`Smelt fuel recipes are not supported in ${this.config.modType}`);
        }

        return script;
    }
}
