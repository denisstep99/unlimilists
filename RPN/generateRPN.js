import { OPERATIONS, OPERATION_REGEXP, OPERATIONS_PRIORITY } from "../constants.js";
function generateRPN(notation) {
    const result = [];
    const helpingStack = [];
    let isNumber = false;
    for (const currentSymbol of notation) {
        if (OPERATION_REGEXP.test(currentSymbol)) {
            if (isNumber) {
                isNumber = false;
            }
            if (currentSymbol === OPERATIONS.OPEN_BRACKET) {
                helpingStack.push(currentSymbol);
                continue;
            }
            let lastHelperStackElement = helpingStack.pop();
            if (currentSymbol === OPERATIONS.CLOSE_BRACKET) {
                while (lastHelperStackElement &&
                    OPERATIONS_PRIORITY[lastHelperStackElement] > OPERATIONS_PRIORITY[currentSymbol]) {
                    result.push(lastHelperStackElement);
                    lastHelperStackElement = helpingStack.pop();
                }
                if (!lastHelperStackElement) {
                    throw new Error('Incorrect brackets');
                }
                continue;
            }
            if (!lastHelperStackElement ||
                OPERATIONS_PRIORITY[lastHelperStackElement] < OPERATIONS_PRIORITY[currentSymbol]) {
                if (lastHelperStackElement) {
                    helpingStack.push(lastHelperStackElement);
                }
                helpingStack.push(currentSymbol);
            }
            else {
                while (lastHelperStackElement &&
                    OPERATIONS_PRIORITY[lastHelperStackElement] >= OPERATIONS_PRIORITY[currentSymbol]) {
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
export default generateRPN;
