import { replaceItems } from "../item";

export enum SCType {
    smelting,
    blasting,
    smoking,
    campfireCooking,
    stonecutting
}

export interface SCRecipe {
    output: string;
    input: string;
    type: SCType
}

export function generateRecipe(recipe: SCRecipe): string {
    return replaceItems(`event.${recipe.type}("${recipe.output}", "${recipe.input}");`);
}