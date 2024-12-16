import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta, toUnicode } from '../../utils';

export class NEIHideRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: false,
            modType
        });
    }

    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        return replaceItems(`NEI.hide(${input})`);
    }
}

export class NEIAddEntryRecipe extends Recipe {
    private name: string = '';
    private lore: string[] = [];

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: false,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'nei_name') this.name = value;
        if (name === 'nei_lore') this.lore = value.split('\n');
    }

    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const loreStr = this.lore.length > 0 ? `, Lore: [${this.lore.map(l => `"${toUnicode(l)}"`).join(', ')}]` : '';
        return replaceItems(`NEI.addEntry(${input}.withTag({display: {Name: "${toUnicode(this.name)}"${loreStr}}}))`);
    }
}