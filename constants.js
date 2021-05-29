export var OPERATIONS;
(function (OPERATIONS) {
    OPERATIONS["OPEN_BRACKET"] = "(";
    OPERATIONS["CLOSE_BRACKET"] = ")";
    OPERATIONS["MULTIPLY"] = "*";
    OPERATIONS["ADD"] = "+";
    OPERATIONS["SUBTRACT"] = "-";
    OPERATIONS["POWER"] = "^";
    OPERATIONS["DIVIDE"] = "/";
})(OPERATIONS || (OPERATIONS = {}));
export const PATTERN = 'n';
export const OPERATIONS_PRIORITY = {
    [OPERATIONS.OPEN_BRACKET]: 1,
    [OPERATIONS.CLOSE_BRACKET]: 1,
    [OPERATIONS.ADD]: 2,
    [OPERATIONS.SUBTRACT]: 2,
    [OPERATIONS.MULTIPLY]: 3,
    [OPERATIONS.DIVIDE]: 3,
    [OPERATIONS.POWER]: 4,
};
const operationsString = Object.keys(OPERATIONS_PRIORITY).join('\\');
export const OPERATION_REGEXP = new RegExp(`[\\${operationsString}]`);
