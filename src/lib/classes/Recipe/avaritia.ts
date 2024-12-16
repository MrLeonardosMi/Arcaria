import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class AvaritiaExtremeCraftingRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 9,
            columns: 9,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'shaped') this.setShaped(value === 'true');
    }

    generateScript(): string {
        const input = this.getInputs();
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        if (!output) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
            case 'crafttweaker':
                if (this.shaped) {
                    const matrix = [];
                    for (let i = 0; i < 9; i++) {
                        const row = input.slice(i * 9, (i + 1) * 9)
                            .map(item => item ? wrapMineTweakerMeta(item) : null)
                            .join(', ');
                        matrix.push(`[${row}]`);
                    }
                    script = `mods.avaritia.ExtremeCrafting.addShaped(${output},\n[${matrix.join(',\n')}]);`;
                } else {
                    const ingredients = input.filter(Boolean)
                        .map(item => wrapMineTweakerMeta(item as string))
                        .join(', ');
                    script = `mods.avaritia.ExtremeCrafting.addShapeless(${output}, [${ingredients}]);`;
                }
                break;
            
            default:
                throw new Error(`Extreme crafting recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}

export class AvaritiaCompressorRecipe extends Recipe {
    private amount: number = 64;
    private exact: boolean = false;

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'amount') this.amount = parseInt(value) || 64;
        if (name === 'exact') this.exact = value === 'true';
    }

    generateScript(): string {
        const input = this.getInputs()[0];
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        if (!input || !output) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
            case 'crafttweaker':
                script = `mods.avaritia.Compressor.add(${output}, ${this.amount}, ${wrapMineTweakerMeta(input)}${this.exact ? ', true' : ''});`;
                break;
            
            default:
                throw new Error(`Compressor recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}
