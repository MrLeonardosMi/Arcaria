import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class OreDictAddRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    generateScript(): string {
        const input = this.getInputs()[0];
        if (!input || !this.output) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `<ore:${this.output}>.add(${wrapMineTweakerMeta(input)});`;
                break;
            
            default:
                throw new Error(`OreDictionary add recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}

export class OreDictMirrorRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    generateScript(): string {
        const input = this.getInputs()[0];
        if (!input || !this.output) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `<ore:${this.output}>.mirror(<ore:${input}>)`;
                break;
            
            default:
                throw new Error(`OreDictionary mirror recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}
