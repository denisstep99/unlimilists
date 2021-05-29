import {OPERATIONS, OPERATION_REGEXP, OPERATIONS_PRIORITY} from "../constants.js";

function generateRPN(notation: string): Array<string> {
    const result: Array<string> = [];
    const helpingStack: Array<OPERATIONS> = [];

    let isNumber = false;

    for (const currentSymbol of notation) {
        if (OPERATION_REGEXP.test(currentSymbol)) {

            if (isNumber) {
                isNumber = false;
            }


            /* if open bracket just push current symbol and continue */

            if (currentSymbol === OPERATIONS.OPEN_BRACKET) {
                helpingStack.push(currentSymbol);
                continue;
            }

            let lastHelperStackElement = helpingStack.pop();


            /* if the current symbol is a closing bracket then pops elements from helpingStack till an open bracket */

            if (currentSymbol === OPERATIONS.CLOSE_BRACKET) {
                while (
                    lastHelperStackElement &&
                    OPERATIONS_PRIORITY[lastHelperStackElement] > OPERATIONS_PRIORITY[currentSymbol]
                    ) {
                    result.push(lastHelperStackElement);
                    lastHelperStackElement = helpingStack.pop();
                }

                if (!lastHelperStackElement) {
                    throw new Error('Incorrect brackets');
                }

                continue;
            }


            if (
                !lastHelperStackElement ||
                OPERATIONS_PRIORITY[lastHelperStackElement] < OPERATIONS_PRIORITY[currentSymbol as OPERATIONS]
            ) {
                if (lastHelperStackElement){
                    helpingStack.push(lastHelperStackElement);
                }

                helpingStack.push(currentSymbol as OPERATIONS);
            } else {
                while (
                    lastHelperStackElement &&
                    OPERATIONS_PRIORITY[lastHelperStackElement] >= OPERATIONS_PRIORITY[currentSymbol as OPERATIONS]
                    ) {
                    result.push(lastHelperStackElement);
                    lastHelperStackElement = helpingStack.pop();
                }
                if (lastHelperStackElement) {
                    helpingStack.push(lastHelperStackElement);
                }
                helpingStack.push(currentSymbol as OPERATIONS);
            }

        } else {
            if (!isNumber) {
                result.push(currentSymbol);
            } else {
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