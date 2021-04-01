import { Compiler } from "webpack"
import HtmlWebpackPlugin = require("html-webpack-plugin");

export type InterpolateFn = (compiler: Compiler) => void
export { Compiler, Compilation } from "webpack"
export interface Interpolator {
    HTMLPlugin: typeof HtmlWebpackPlugin;
    replacements: { [key: string]: string };
    escapeRegex: (str: string) => string | TypeError;
    throwError: (message: string, type?: undefined | string) => Error;
    interpolate: InterpolateFn;
    ifParamsValid: (param: Compiler, callback: InterpolateFn) => void | Error;
    apply(compiler: Compiler): void;
}