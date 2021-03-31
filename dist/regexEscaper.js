"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (string) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
});
