import { ModType, Recipe } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class IC2CannerBottleRecipe extends Recipe {
    private container: string = '';
    private fillIngredient: string = '';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'container') this.container = value;
        if (name === 'fill_ingredient') this.fillIngredient = value;
    }

    generateScript(): string {
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`Canner.addBottleRecipe(${output}, ${wrapMineTweakerMeta(this.container)}, ${wrapMineTweakerMeta(this.fillIngredient)})`);
    }
}

export class IC2CannerEnrichRecipe extends Recipe {
    private additive: string = '';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'additive') this.additive = value;
    }

    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`Canner.addEnrichRecipe(${output}, ${input}, ${wrapMineTweakerMeta(this.additive)})`);
    }
}

export class IC2CompressorRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`Compressor.addRecipe(${output}, ${input})`);
    }
}

export class IC2ExtractorRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`Extractor.addRecipe(${output}, ${input})`);
    }
}

export class IC2MaceratorRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`Macerator.addRecipe(${output}, ${input})`);
    }
}

export class IC2MetalFormerCuttingRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`MetalFormer.addCuttingRecipe(${output}, ${input})`);
    }
}

export class IC2MetalFormerExtrudingRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`MetalFormer.addExtrudingRecipe(${output}, ${input})`);
    }
}

export class IC2MetalFormerRollingRecipe extends Recipe {
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`MetalFormer.addRollingRecipe(${output}, ${input})`);
    }
}

export class IC2OreWasherRecipe extends Recipe {
    private waterUsage: string = '1000';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'ic2_water_usage') this.waterUsage = value;
    }

    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`OreWasher.addRecipe(${output}, ${input}, ${this.waterUsage})`);
    }
}

export class IC2RecyclerBlacklistRecipe extends Recipe {
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
        return replaceItems(`Recycler.addBlacklist(${input})`);
    }
}

export class IC2ScrapBoxRecipe extends Recipe {
    private weight: string = '0.05';
    
    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: false,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        if (name === 'weight') this.weight = value;
    }

    generateScript(): string {
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`ScrapBox.addDrop(${output}.weight(${this.weight}))`);
    }
}

export class IC2ThermalCentrifugeRecipe extends Recipe {
    private minTemperature: string = '1000';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }
    
    setAdditionalInput(name: string, value: string) {
        if (name === 'min_temperature') this.minTemperature = value;
    }

    generateScript(): string {
        const input = this.inputs[0] ? wrapMineTweakerMeta(this.inputs[0]) : '';
        const output = this.output ? wrapMineTweakerMeta(this.output) : '';
        return replaceItems(`ThermalCentrifuge.addRecipe(${output}, ${input}, ${this.minTemperature})`);
    }
}
