export enum OPERATIONS {
    OPEN_BRACKET = '(',
    CLOSE_BRACKET = ')',
    MULTIPLY = '*',
    ADD = '+',
    SUBTRACT = '-',
    POWER = '^',
    DIVIDE = '/',
}

export const PATTERN = 'n';

/* available RPN operations and priorities */
export const OPERATIONS_PRIORITY = {
    [OPERATIONS.OPEN_BRACKET]: 1,
    [OPERATIONS.CLOSE_BRACKET]: 1,
    [OPERATIONS.ADD]: 2,
    [OPERATIONS.SUBTRACT]: 2,
    [OPERATIONS.MULTIPLY]: 3,
    [OPERATIONS.DIVIDE]: 3,
    [OPERATIONS.POWER]: 4,
}

const operationsString = Object.keys(OPERATIONS_PRIORITY).join('\\');
export const OPERATION_REGEXP: RegExp = new RegExp(`[\\${operationsString}]`);
