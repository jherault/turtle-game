export class Instruction {

    public label:string;
    public instruction:Function;

    constructor(caller: Object, label: string, instruction:Function) {
        this.label = label;
        this.instruction = instruction;
    }
}