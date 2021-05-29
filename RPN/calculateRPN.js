import { OPERATION_REGEXP, OPERATIONS, PATTERN } from "../constants.js";
function calculate(firstOperand, secondOperand, operation, patternFill) {
    if (typeof firstOperand === "string") {
        if (firstOperand === PATTERN) {
            firstOperand = patternFill;
        }
        else {
            firstOperand = parseFloat(firstOperand);
        }
    }
    if (typeof secondOperand === "string") {
        if (secondOperand === PATTERN) {
            secondOperand = patternFill;
        }
        else {
            secondOperand = parseFloat(secondOperand);
        }
    }
    switch (operation) {
        case OPERATIONS.ADD:
            return firstOperand + secondOperand;
        case OPERATIONS.SUBTRACT:
            return firstOperand - secondOperand;
        case OPERATIONS.DIVIDE:
            return firstOperand / secondOperand;
        case OPERATIONS.MULTIPLY:
            return firstOperand * secondOperand;
        case OPERATIONS.POWER:
            return firstOperand ** secondOperand;
        default:
            throw new Error('Incorrect operand');
    }
}
function calculateRPN(rpn, patternFill = 1) {
    const helpingStack = [];
    rpn = [...rpn].reverse();
    while (rpn.length) {
        const lastSymbol = rpn.pop() || "";
        if (OPERATION_REGEXP.test(lastSymbol)) {
            const secondOperand = helpingStack.pop();
            const firstOperand = helpingStack.pop();
            if (firstOperand === undefined || secondOperand === undefined) {
                throw new Error("Incorrect RPN!");
            }
            helpingStack.push(calculate(firstOperand, secondOperand, lastSymbol, patternFill).toString());
        }
        else {
            helpingStack.push(lastSymbol);
        }
    }
    if (helpingStack.length > 1) {
        throw new Error('Execution problems!');
    }
    const result = helpingStack.pop();
    if (result) {
        return parseFloat(result);
    }
    return NaN;
}
export default calculateRPN;
