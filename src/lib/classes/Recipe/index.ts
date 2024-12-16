export * from './base';
export * from './workbench';
export * from './smelting';
export * from './blasting';
export * from './smoking';
export * from './campfire';
export * from './stonecutting';
export * from './smeltfuel';
export * from './oredict';
export * from './tooltip';
export * from './bloodmagic';
export * from './ic2';
export * from './nei';
export * from './avaritia';
export { DeleteRecipe } from './delete';

import { ModType } from './base';
import { WorkbenchRecipe } from './workbench';
import { SmeltingRecipe } from './smelting';
import { BlastingRecipe } from './blasting';
import { SmokingRecipe } from './smoking';
import { CampfireRecipe } from './campfire';
import { StonecuttingRecipe } from './stonecutting';
import { SmeltFuelRecipe } from './smeltfuel';
import { OreDictAddRecipe, OreDictMirrorRecipe } from './oredict';
import { TooltipRecipe } from './tooltip';
import { BloodMagicAltarRecipe, BloodMagicOrbRecipe, BloodMagicAlchemyRecipe } from './bloodmagic';
import {
    IC2CannerBottleRecipe, IC2CannerEnrichRecipe, IC2CompressorRecipe, IC2ExtractorRecipe,
    IC2MaceratorRecipe, IC2MetalFormerCuttingRecipe, IC2MetalFormerExtrudingRecipe,
    IC2MetalFormerRollingRecipe, IC2OreWasherRecipe, IC2ThermalCentrifugeRecipe,
    IC2RecyclerBlacklistRecipe, IC2ScrapBoxRecipe
} from './ic2';
import { NEIHideRecipe, NEIAddEntryRecipe } from './nei';
import { AvaritiaExtremeCraftingRecipe, AvaritiaCompressorRecipe } from './avaritia';
import { DeleteRecipe } from './delete';

export const RecipeFactory = {
    create(type: string, modType: ModType) {
        switch (type.toLowerCase()) {
            case 'workbench':
                return new WorkbenchRecipe(modType);
            case 'smelting':
                return new SmeltingRecipe(modType);
            case 'blasting':
                return new BlastingRecipe(modType);
            case 'smoking':
                return new SmokingRecipe(modType);
            case 'campfirecooking':
                return new CampfireRecipe(modType);
            case 'stonecutting':
                return new StonecuttingRecipe(modType);
            case 'smelt_fuel':
                return new SmeltFuelRecipe(modType);
            case 'oredict_add':
                return new OreDictAddRecipe(modType);
            case 'oredict_mirror':
                return new OreDictMirrorRecipe(modType);
            case 'tooltip':
                return new TooltipRecipe(modType);
            case 'bloodmagic_altar':
                return new BloodMagicAltarRecipe(modType);
            case 'bloodmagic_orb':
                return new BloodMagicOrbRecipe(modType);
            case 'bloodmagic_alchemy':
                return new BloodMagicAlchemyRecipe(modType);
            case 'ic2_canner_bottle':
                return new IC2CannerBottleRecipe(modType);
            case 'ic2_canner_enrich':
                return new IC2CannerEnrichRecipe(modType);
            case 'ic2_compressor':
                return new IC2CompressorRecipe(modType);
            case 'ic2_extractor':
                return new IC2ExtractorRecipe(modType);
            case 'ic2_macerator':
                return new IC2MaceratorRecipe(modType);
            case 'ic2_metal_former_cutting':
                return new IC2MetalFormerCuttingRecipe(modType);
            case 'ic2_metal_former_extruding':
                return new IC2MetalFormerExtrudingRecipe(modType);
            case 'ic2_metal_former_rolling':
                return new IC2MetalFormerRollingRecipe(modType);
            case 'ic2_ore_washer':
                return new IC2OreWasherRecipe(modType);
            case 'ic2_thermal_centrifuge':
                return new IC2ThermalCentrifugeRecipe(modType);
            case 'ic2_recycler_blacklist':
                return new IC2RecyclerBlacklistRecipe(modType);
            case 'ic2_scrapbox':
                return new IC2ScrapBoxRecipe(modType);
            case 'nei_hide':
                return new NEIHideRecipe(modType);
            case 'nei_addentry':
                return new NEIAddEntryRecipe(modType);
            case 'avaritia_extreme':
                return new AvaritiaExtremeCraftingRecipe(modType);
            case 'avaritia_compressor':
                return new AvaritiaCompressorRecipe(modType);
            case 'delete':
                return new DeleteRecipe(modType);
            default:
                throw new Error(`Unknown recipe type: ${type}`);
        }
    }
}