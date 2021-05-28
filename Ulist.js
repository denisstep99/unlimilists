"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ulist = void 0;
const constants_1 = require("./constants");
const generateRPN_1 = __importDefault(require("./RPN/generateRPN"));
const calculateRPN_1 = __importDefault(require("./RPN/calculateRPN"));
class Ulist {
    constructor(formula) {
        this._limit = 1000;
        this._rawFormula = formula;
        this._formula = generateRPN_1.default(formula.replace(/\s/g, ''));
        return new Proxy(this, {
            get: ((target, element) => {
                if (typeof element === "string") {
                    const index = parseInt(element);
                    if (Number.isNaN(index)) {
                        return target[element];
                    }
                    return calculateRPN_1.default(this._formula, index);
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
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.ADD}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.ADD}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN_1.default(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    multiply(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.MULTIPLY}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.MULTIPLY}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN_1.default(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    subtract(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.SUBTRACT}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.SUBTRACT}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN_1.default(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    divide(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.DIVIDE}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.DIVIDE}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN_1.default(this._rawFormula.replace(/\s/g, ''));
        return this;
    }
    power(anotherList) {
        if (typeof anotherList === 'number') {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.POWER}${anotherList}`;
        }
        else {
            this._rawFormula = `(${this._rawFormula})${constants_1.OPERATIONS.POWER}(${anotherList.getFormula()})`;
        }
        this._formula = generateRPN_1.default(this._rawFormula.replace(/\s/g, ''));
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
exports.Ulist = Ulist;
