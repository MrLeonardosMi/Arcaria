import { replaceItems } from "../item";

export interface CraftingRecipe {
    output: string;
    input: (string | null)[][];
    shaped: boolean;
}

export function generateRecipe(recipe: CraftingRecipe): string {
    if (recipe.shaped) {
        const stringMap: Record<string, string> = {};
        const result = recipe.input.map(row => 
            row.map(el => {
                if (el) {
                    stringMap[el] ||= String.fromCharCode(65 + Object.keys(stringMap).length);
                    return stringMap[el];
                }
                return ' ';
            }).join('')
        );

        const mappedEntries = Object.fromEntries(Object.entries(stringMap).map(([n, v]) => [v, n]));

        return replaceItems(`event.shaped("${recipe.output}",
${JSON.stringify(result)},
${JSON.stringify(mappedEntries, null, 2)});`);
    } else {
        return replaceItems(`event.shapeless("${recipe.output}", [${[...new Set(recipe.input.flat())].map(item => `"${item}"`).join(', ')}]);`);
    }
}