export class Instruction {

    public label:string;
    public instruction:Function;

    constructor(label: string, instruction:Function) {
        this.label = label;
        this.instruction = instruction;
    }

    execute(): void {
        this.instruction(false);
    }

}