import { Compiler } from "webpack"
import HtmlWebpackPlugin = require("html-webpack-plugin");

export type InterpolateFn = (compiler: Compiler) => void
export { Compiler, Compilation } from "webpack"

export interface InterpolatorPlugin {
    HTMLPlugin: typeof HtmlWebpackPlugin;
    replacements: { [key: string]: string };
    init: InterpolateFn;
    ifParamsValid: () => boolean | Error;
    apply(compiler: Compiler): void;
}