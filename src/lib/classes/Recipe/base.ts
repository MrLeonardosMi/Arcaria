export type ModType = 'kubejs' | 'crafttweaker' | 'minetweaker';

export interface RecipeConfig {
  rows: number;
  columns: number;
  additionalInputs?: string[];
  requiresOutput?: boolean;
  title?: string;
  modType: ModType;
}

export abstract class Recipe {
  protected config: RecipeConfig;
  protected inputs: (string | null)[];
  protected output: string;
  protected shaped: boolean = true;
  
  constructor(config: RecipeConfig) {
    this.config = config;
    this.inputs = new Array(config.rows * config.columns).fill(null);
    this.output = '';
  }

  setInput(index: number, value: string | null): void {
    if (index >= 0 && index < this.inputs.length) {
      this.inputs[index] = value;
    }
  }

  setOutput(value: string): void {
    this.output = value;
  }

  setShaped(shaped: boolean): void {
    this.shaped = shaped;
  }

  isShaped(): boolean {
    return this.shaped;
  }

  getInputs(): (string | null)[] {
    return this.inputs;
  }

  getOutput(): string {
    return this.output;
  }

  getSlotCount(): number {
    return this.config.rows * this.config.columns;
  }

  getModType(): ModType {
    return this.config.modType;
  }

  clear(): void {
    this.inputs = new Array(this.getSlotCount()).fill(null);
    this.output = '';
  }

  setAdditionalInput(_name: string, _value: string): void {
  }

  abstract generateScript(): string;
}
