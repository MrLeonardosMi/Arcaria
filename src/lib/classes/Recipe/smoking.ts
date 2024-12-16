import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class SmokingRecipe extends Recipe {
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
    if (!input) return '';

    let script = '';
    switch (this.config.modType) {
      case 'kubejs':
        script = `event.smoking("${this.output}", "${input}");`;
        break;
      
      case 'crafttweaker':
        script = `smoker.addRecipe(${wrapMineTweakerMeta(this.output)}, ${wrapMineTweakerMeta(input)});`;
        break;
      
      case 'minetweaker':
        throw new Error('Smoking recipes are not supported in MineTweaker');
      
      default:
        throw new Error(`Unsupported mod type: ${this.config.modType}`);
    }

    return replaceItems(script);
  }
}
