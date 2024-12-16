import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class DeleteRecipe extends Recipe {
    private filters: {
        output?: string;
        input?: string;
        mod?: string;
        type?: string;
        id?: string;
    } = {};

    constructor(modType: ModType) {
        super({
            rows: 0,
            columns: 0,
            requiresOutput: false,
            modType
        });
    }

    setAdditionalInput(name: string, value: string): void {
        if (['output', 'input', 'mod', 'type', 'id'].includes(name)) {
            this.filters[name as keyof typeof this.filters] = value;
        }
    }

    generateScript(): string {
        const conditions = Object.fromEntries(Object.entries(this.filters)
            .filter(([_, value]) => value));

        let script = '';
        switch (this.config.modType) {
            case 'kubejs':
                script = `event.remove(${JSON.stringify(conditions)})`;
                break;
            case "minetweaker":
            case "crafttweaker":
                script = `recipes.remove(${wrapMineTweakerMeta(conditions.output!)})`;
                break;
        }

        return replaceItems(script);
    }
}
