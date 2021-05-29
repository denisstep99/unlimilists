import {OPERATIONS} from "./constants.js";
import generateRPN from "./RPN/generateRPN.js";
import calculateRPN from "./RPN/calculateRPN.js";

export class Ulist {
    private _formula: Array<string>;
    private _rawFormula: string;
    private _limit = 1000;

    [index: string]: any;

    constructor(formula: string) {
        this._rawFormula = formula;
        this._formula = generateRPN(formula.replace(/\s/g, ''));

        return new Proxy(this,
            {
                get: ((target, element) => {
                    if (typeof element === "string") {
                        const index = parseInt(element);

                        if (Number.isNaN(index)) {
                            // ts doesn't like symbols as object keys
                            // @ts-ignore
                            return target[element];
                        }

                        return calculateRPN(this._formula, index);
                    }
                    // @ts-ignore
                    return target[element];
                }),
                has: ((target, property) => {
                    if (typeof property === "string" && !Number.isNaN(property)) {
                        return +property % 1 === 0;
                    }
                    return target.hasOwnProperty(property);
                })
            });
    }

    add(anotherList: Ulist | number): Ulist {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.ADD}${anotherList}`;
        } else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.ADD}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));

        return this;
    }

    multiply(anotherList: Ulist | number): Ulist {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.MULTIPLY}${anotherList}`;
        } else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.MULTIPLY}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));

        return this;
    }

    subtract(anotherList: Ulist | number): Ulist {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.SUBTRACT}${anotherList}`;
        } else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.SUBTRACT}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));

        return this;
    }

    divide(anotherList: Ulist | number): Ulist {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.DIVIDE}${anotherList}`;
        } else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.DIVIDE}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));

        return this;
    }

    power(anotherList: Ulist | number): Ulist {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.POWER}${anotherList}`;
        } else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.POWER}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));

        return this;
    }

    setIterationLimit(limit: number): void {
        this._limit = limit;
    }

    slice(startIndex: number, lastIndex: number, step: number = 1): Array<number> {
        const resultArray = [];

        for (let index = startIndex; index < lastIndex; index += step) {
            resultArray.push(this[index]);
        }

        return resultArray;
    }

    * [Symbol.iterator](): Iterator<number> {
        for (let index = 0; index < this._limit; index++) {
            yield this[index];
        }
    }

    getFormula() {
        return this._rawFormula;
    }
}