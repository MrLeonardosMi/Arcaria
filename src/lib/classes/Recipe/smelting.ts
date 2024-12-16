import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class SmeltingRecipe extends Recipe {
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
        script = `event.smelting("${this.output}", "${input}");`;
        break;
      
      case 'crafttweaker':
        script = `furnace.addRecipe(${wrapMineTweakerMeta(this.output)}, ${wrapMineTweakerMeta(input)});`;
        break;
      
      case 'minetweaker':
        script = `furnace.addRecipe(${wrapMineTweakerMeta(this.output)}, ${wrapMineTweakerMeta(input)});`;
        break;
      
      default:
        throw new Error(`Unsupported mod type: ${this.config.modType}`);
    }

    return replaceItems(script);
  }
}
