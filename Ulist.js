import { OPERATIONS } from "./constants.js";
import generateRPN from "./RPN/generateRPN.js";
import calculateRPN from "./RPN/calculateRPN.js";
export class Ulist {
    constructor(formula) {
        this._limit = 1000;
        this._rawFormula = formula;
        this._formula = generateRPN(formula.replace(/\s/g, ''));
        return new Proxy(this, {
            get: ((target, element) => {
                if (typeof element === "string") {
                    const index = parseInt(element);
                    if (Number.isNaN(index)) {
                        return target[element];
                    }
                    return calculateRPN(this._formula, index);
                }
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
    add(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.ADD}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.ADD}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    multiply(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.MULTIPLY}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.MULTIPLY}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    subtract(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.SUBTRACT}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.SUBTRACT}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    divide(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.DIVIDE}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.DIVIDE}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    power(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.POWER}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${OPERATIONS.POWER}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    setIterationLimit(limit) {
        this._limit = limit;
    }
    slice(startIndex, lastIndex, step = 1) {
        const resultArray = [];
        for (let index = startIndex; index < lastIndex; index += step) {
            resultArray.push(this[index]);
        }
        return resultArray;
    }
    *[Symbol.iterator]() {
        for (let index = 0; index < this._limit; index++) {
            yield this[index];
        }
    }
    getFormula() {
        return this._rawFormula;
    }
}
