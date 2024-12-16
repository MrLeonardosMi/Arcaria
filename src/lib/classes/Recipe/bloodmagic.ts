import { Recipe, ModType } from './base';
import { replaceItems, wrapMineTweakerMeta } from '../../utils';

export class BloodMagicAltarRecipe extends Recipe {
    private bloodTier: string = '';
    private bloodLp: string = '';
    private bloodUsageRate: string = '';
    private bloodDrainRate: string = '';

    constructor(modType: ModType) {
        super({
            rows: 1,
            columns: 1,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        switch (name) {
            case 'blood_tier':
                this.bloodTier = value;
                break;
            case 'blood_lp':
                this.bloodLp = value;
                break;
            case 'blood_usage_rate':
                this.bloodUsageRate = value;
                break;
            case 'blood_drain_rate':
                this.bloodDrainRate = value;
                break;
        }
    }

    generateScript(): string {
        const input = this.getInputs()[0];
        if (!input || !this.output || !this.bloodTier || !this.bloodLp) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `mods.bloodmagic.Altar.addRecipe(${wrapMineTweakerMeta(this.output)}, ${wrapMineTweakerMeta(input)}, ${this.bloodTier}, ${this.bloodLp}`;
                if (this.bloodUsageRate && this.bloodDrainRate) {
                    script += `, ${this.bloodUsageRate}, ${this.bloodDrainRate}`;
                }
                script += ');';
                break;
            
            default:
                throw new Error(`Blood Magic altar recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}

export class BloodMagicOrbRecipe extends Recipe {

    constructor(modType: ModType) {
        super({
            rows: 3,
            columns: 3,
            requiresOutput: true,
            modType
        });
    }

    generateScript(): string {
        const inputs = this.getInputs().filter(Boolean);
        if (inputs.length === 0 || !this.output) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `mods.bloodmagic.BloodOrb.addShaped(${wrapMineTweakerMeta(this.output)}, [`;
                for (let i = 0; i < 9; i++) {
                    if (i % 3 === 0) script += '[';
                    script += inputs[i] ? wrapMineTweakerMeta(inputs[i] as string) : 'null';
                    if (i % 3 === 2) script += ']';
                    else script += ', ';
                }
                script += ']);';
                break;
            
            default:
                throw new Error(`Blood Magic orb recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}

export class BloodMagicAlchemyRecipe extends Recipe {
    private bloodTier: string = '';
    private bloodLp: string = '';

    constructor(modType: ModType) {
        super({
            rows: 3,
            columns: 3,
            requiresOutput: true,
            modType
        });
    }

    setAdditionalInput(name: string, value: string) {
        switch (name) {
            case 'blood_tier':
                this.bloodTier = value;
                break;
            case 'blood_lp':
                this.bloodLp = value;
                break;
        }
    }

    generateScript(): string {
        const inputs = this.getInputs().filter(Boolean);
        if (inputs.length === 0 || !this.output || !this.bloodTier || !this.bloodLp) return '';

        let script = '';
        switch (this.config.modType) {
            case 'minetweaker':
                script = `mods.bloodmagic.Alchemy.addRecipe(${wrapMineTweakerMeta(this.output)}, [`;
                script += inputs.map(input => wrapMineTweakerMeta(input as string)).join(', ');
                script += `], ${this.bloodTier}, ${this.bloodLp});`;
                break;
            
            default:
                throw new Error(`Blood Magic alchemy recipes are not supported in ${this.config.modType}`);
        }

        return replaceItems(script);
    }
}
