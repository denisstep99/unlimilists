export declare enum OPERATIONS {
    OPEN_BRACKET = "(",
    CLOSE_BRACKET = ")",
    MULTIPLY = "*",
    ADD = "+",
    SUBTRACT = "-",
    POWER = "^",
    DIVIDE = "/"
}
export declare const PATTERN = "n";
export declare const OPERATIONS_PRIORITY: {
    "(": number;
    ")": number;
    "+": number;
    "-": number;
    "*": number;
    "/": number;
    "^": number;
};
export declare const OPERATION_REGEXP: RegExp;
