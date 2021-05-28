export declare class Ulist {
    private _formula;
    private _rawFormula;
    private _limit;
    [index: string]: any;
    constructor(formula: string);
    add(anotherList: Ulist | number): Ulist;
    multiply(anotherList: Ulist | number): Ulist;
    subtract(anotherList: Ulist | number): Ulist;
    divide(anotherList: Ulist | number): Ulist;
    power(anotherList: Ulist | number): Ulist;
    setIterationLimit(limit: number): void;
    slice(startIndex: number, lastIndex: number, step?: number): Array<number>;
    [Symbol.iterator](): Iterator<number>;
    getFormula(): string;
}
