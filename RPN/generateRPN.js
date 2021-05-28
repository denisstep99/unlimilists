"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function generateRPN(notation) {
    const result = [];
    const helpingStack = [];
    let isNumber = false;
    for (const currentSymbol of notation) {
        if (constants_1.OPERATION_REGEXP.test(currentSymbol)) {
            if (isNumber) {
                isNumber = false;
            }
            if (currentSymbol === constants_1.OPERATIONS.OPEN_BRACKET) {
                helpingStack.push(currentSymbol);
                continue;
            }
            let lastHelperStackElement = helpingStack.pop();
            if (currentSymbol === constants_1.OPERATIONS.CLOSE_BRACKET) {
                while (lastHelperStackElement &&
                    constants_1.OPERATIONS_PRIORITY[lastHelperStackElement] > constants_1.OPERATIONS_PRIORITY[currentSymbol]) {
                    result.push(lastHelperStackElement);
                    lastHelperStackElement = helpingStack.pop();
                }
                if (!lastHelperStackElement) {
                    throw new Error('Incorrect brackets');
                }
                continue;
            }
            if (!lastHelperStackElement ||
                constants_1.OPERATIONS_PRIORITY[lastHelperStackElement] < constants_1.OPERATIONS_PRIORITY[currentSymbol]) {
                if (lastHelperStackElement) {
                    helpingStack.push(lastHelperStackElement);
                }
                helpingStack.push(currentSymbol);
            }
            else {
                while (lastHelperStackElement &&
                    constants_1.OPERATIONS_PRIORITY[lastHelperStackElement] >= constants_1.OPERATIONS_PRIORITY[currentSymbol]) {
                    result.push(lastHelperStackElement);
                    lastHelperStackElement = helpingStack.pop();
                }
                if (lastHelperStackElement) {
                    helpingStack.push(lastHelperStackElement);
                }
                helpingStack.push(currentSymbol);
            }
        }
        else {
            if (!isNumber) {
                result.push(currentSymbol);
            }
            else {
                const lastElement = result.pop();
                result.push(lastElement + currentSymbol);
            }
            isNumber = true;
        }
    }
    result.push(...helpingStack.reverse());
    return result;
}
exports.default = generateRPN;
