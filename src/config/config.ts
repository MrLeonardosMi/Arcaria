import { ModType } from '../lib/classes/Recipe/base';

interface AdditionalInputConfig {
    name: string;
    type: 'text' | 'checkbox' | 'number';
    default?: string | boolean | number;
}

export interface RecipeTypeConfig {
    rows: number;
    columns: number;
    requiresOutput: boolean;
    additionalInputs?: AdditionalInputConfig[];
    title?: string;
    supportedMods: ModType[];
}

export const RecipeTypes: Record<string, RecipeTypeConfig> = {
    "workbench": {
        rows: 3,
        columns: 3,
        requiresOutput: true,
        additionalInputs: [
            { name: 'shaped', type: 'checkbox', default: true }
        ],
        supportedMods: ['kubejs', 'crafttweaker', 'minetweaker']
    },
    "smelting": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['kubejs', 'crafttweaker', 'minetweaker']
    },
    "blasting": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['kubejs', 'crafttweaker']
    },
    "smoking": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['kubejs', 'crafttweaker']
    },
    "campfirecooking": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['kubejs', 'crafttweaker']
    },
    "stonecutting": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['kubejs', 'crafttweaker']
    },
    "smelt_fuel": {
        rows: 1,
        columns: 1,
        requiresOutput: false,
        additionalInputs: [
            { name: 'smelt_fuel', type: 'text' }
        ],
        supportedMods: ['minetweaker']
    },
    "oredict_add": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "oredict_mirror": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "tooltip": {
        rows: 1,
        columns: 1,
        requiresOutput: false,
        additionalInputs: [
            { name: 'tooltip', type: 'text' }
        ],
        supportedMods: ['minetweaker']
    },
    "bloodmagic_altar": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'blood_tier', type: 'number' },
            { name: 'blood_lp', type: 'number' },
            { name: 'blood_usage_rate', type: 'number' },
            { name: 'blood_drain_rate', type: 'number' }
        ],
        supportedMods: ['minetweaker']
    },
    "bloodmagic_orb": {
        rows: 3,
        columns: 3,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "bloodmagic_alchemy": {
        rows: 3,
        columns: 3,
        requiresOutput: true,
        additionalInputs: [
            { name: 'blood_tier', type: 'number' },
            { name: 'blood_lp', type: 'number' }
        ],
        supportedMods: ['minetweaker']
    },
    "ic2_canner_bottle": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'ic2_container', type: 'text' },
            { name: 'ic2_fill_ingredient', type: 'text' }
        ],
        supportedMods: ['minetweaker']
    },
    "ic2_canner_enrich": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'ic2_additive', type: 'text' }
        ],
        supportedMods: ['minetweaker']
    },
    "ic2_compressor": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_extractor": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_macerator": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_metal_former_cutting": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_metal_former_extruding": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_metal_former_rolling": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        supportedMods: ['minetweaker']
    },
    "ic2_ore_washer": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'ic2_water_usage', type: 'number' }
        ],
        supportedMods: ['minetweaker']
    },
    "ic2_thermal_centrifuge": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'ic2_min_temperature', type: 'number' }
        ],
        supportedMods: ['minetweaker']
    },
    "ic2_recycler_blacklist": {
        rows: 1,
        columns: 1,
        requiresOutput: false,
        supportedMods: ['minetweaker']
    },
    "ic2_scrapbox": {
        rows: 0,
        columns: 0,
        requiresOutput: true,
        additionalInputs: [
            { name: 'ic2_weight', type: 'number' }
        ],
        supportedMods: ['minetweaker']
    },
    "nei_hide": {
        rows: 1,
        columns: 1,
        requiresOutput: false,
        supportedMods: ['minetweaker']
    },
    "nei_addentry": {
        rows: 1,
        columns: 1,
        requiresOutput: false,
        additionalInputs: [
            { name: 'nei_name', type: 'text' },
            { name: 'nei_lore', type: 'text' }
        ],
        supportedMods: ['minetweaker']
    },
    "avaritia_extreme": {
        rows: 9,
        columns: 9,
        requiresOutput: true,
        additionalInputs: [
            { name: 'shaped', type: 'checkbox', default: true }
        ],
        supportedMods: ['minetweaker', 'crafttweaker']
    },
    "avaritia_compressor": {
        rows: 1,
        columns: 1,
        requiresOutput: true,
        additionalInputs: [
            { name: 'amount', type: 'number', default: 64 },
            { name: 'exact', type: 'checkbox', default: false }
        ],
        supportedMods: ['minetweaker', 'crafttweaker']
    }
};

export const DeleteFields: Record<ModType, string[]> = {
    "kubejs": ["output", "input", "mod", "type", "id"],
    "crafttweaker": ["output"],
    "minetweaker": ["output"]
};
