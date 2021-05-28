"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION_REGEXP = exports.OPERATIONS_PRIORITY = exports.PATTERN = exports.OPERATIONS = void 0;
var OPERATIONS;
(function (OPERATIONS) {
    OPERATIONS["OPEN_BRACKET"] = "(";
    OPERATIONS["CLOSE_BRACKET"] = ")";
    OPERATIONS["MULTIPLY"] = "*";
    OPERATIONS["ADD"] = "+";
    OPERATIONS["SUBTRACT"] = "-";
    OPERATIONS["POWER"] = "^";
    OPERATIONS["DIVIDE"] = "/";
})(OPERATIONS = exports.OPERATIONS || (exports.OPERATIONS = {}));
exports.PATTERN = 'n';
exports.OPERATIONS_PRIORITY = {
    [OPERATIONS.OPEN_BRACKET]: 1,
    [OPERATIONS.CLOSE_BRACKET]: 1,
    [OPERATIONS.ADD]: 2,
    [OPERATIONS.SUBTRACT]: 2,
    [OPERATIONS.MULTIPLY]: 3,
    [OPERATIONS.DIVIDE]: 3,
    [OPERATIONS.POWER]: 4,
};
const operationsString = Object.keys(exports.OPERATIONS_PRIORITY).join('\\');
exports.OPERATION_REGEXP = new RegExp(`[\\${operationsString}]`);
