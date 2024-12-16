import { Recipe, ModType } from './base';
import { replaceItems } from '../../utils';

export class WorkbenchRecipe extends Recipe {
  constructor(modType: ModType) {
    super({
      rows: 3,
      columns: 3,
      requiresOutput: true,
      modType
    });
  }

  generateScript(): string {
    const input = this.getInputs();
    const matrix = [
      input.slice(0, 3),
      input.slice(3, 6),
      input.slice(6, 9)
    ];

    let script = '';
    switch (this.config.modType) {
      case 'kubejs':
        if (this.shaped) {
          const stringMap: Record<string, string> = {};
          const result = matrix.map(row => 
            row.map(el => {
              if (el) {
                stringMap[el] ||= String.fromCharCode(65 + Object.keys(stringMap).length);
                return stringMap[el];
              }
              return ' ';
            }).join('')
          );
          const mappedEntries = Object.fromEntries(Object.entries(stringMap).map(([n, v]) => [v, n]));
          script = `event.shaped("${this.output}",\n${JSON.stringify(result)},\n${JSON.stringify(mappedEntries, null, 2)});`;
        } else {
          script = `event.shapeless("${this.output}", [${[...new Set(matrix.flat())].map(item => `"${item}"`).join(', ')}]);`;
        }
        break;
      
      case 'crafttweaker':
        if (this.shaped) {
          const craftMatrix = matrix.map(row => 
            `[${row.map(item => item ? `<${item}>` : null).join(', ')}]`
          ).join(',\n');
          script = `recipes.addShaped("${this.output}", <${this.output}>,\n${craftMatrix});`;
        } else {
          const inputs = [...new Set(matrix.flat())].filter(Boolean);
          script = `recipes.addShapeless("${this.output}", <${this.output}>, [${inputs.map(item => `<${item}>`).join(', ')}]);`;
        }
        break;
      
      case 'minetweaker':
        if (this.shaped) {
          const craftMatrix = matrix.map(row => 
            `[${row.map(item => item ? `<${item}>` : null).join(', ')}]`
          ).join(',\n');
          script = `recipes.addShaped(<${this.output}>,\n${craftMatrix});`;
        } else {
          const inputs = [...new Set(matrix.flat())].filter(Boolean);
          script = `recipes.addShapeless(<${this.output}>, [${inputs.map(item => `<${item}>`).join(', ')}]);`;
        }
        break;
      
      default:
        throw new Error(`Unsupported mod type: ${this.config.modType}`);
    }

    return replaceItems(script);
  }
}
