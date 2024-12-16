import { Recipe, ModType } from './base';
import { wrapMineTweakerMeta, toUnicode } from '../../utils';

export class TooltipRecipe extends Recipe {
    private tooltip: string = '';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: false,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'tooltip') this.tooltip = value;
    }

    generateScript(): string {
        const input = this.getInputs()[0];
        if (!input || !this.tooltip) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `${wrapMineTweakerMeta(input)}.addTooltip("${toUnicode(this.tooltip)}");`;
                break;
            
            default:
                throw new Error(`Tooltip recipes are not supported in ${this.config.modType}`);
        }

        return script;
    }
}
