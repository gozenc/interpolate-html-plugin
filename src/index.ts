import {
    Compiler,
    Compilation,
    Interpolator,
    InterpolateFn
} from "./index.d"

export default class InterpolateHtmlPlugin implements Interpolator {

    constructor(
        public HTMLPlugin: Interpolator["HTMLPlugin"],
        public replacements: Interpolator["replacements"],
    ) { }

    escapeRegex: Interpolator["escapeRegex"] = (str: string) => {
        return typeof str !== "string"
            ? this.throwError('Expected a string', "type")
            : str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                .replace(/-/g, '\\x2d')
    }

    throwError: Interpolator["throwError"] = (message: string, type: undefined | string = undefined) => {
        return type === "type"
            ? (() => { throw new TypeError(`InterpolateHtmlPlugin: ${message}`) })()
            : (() => { throw new Error(`InterpolateHtmlPlugin: ${message}`) })()
    }

    interpolate: Interpolator["interpolate"]
        = (compiler: Compiler) => {
            compiler.hooks.compilation
                .tap("InterpolateHtmlPlugin", (compilation: Compilation) => {
                    this.HTMLPlugin.getHooks(compilation)
                        .afterTemplateExecution.tap(
                            "InterpolateHtmlPlugin",
                            (data): any => {
                                for (const key in this.replacements)
                                    return data.html = data.html.replace(
                                        new RegExp(
                                            "%" + this.escapeRegex(key) + "%", "g"
                                        ), this.replacements[key])
                            })

                })
        }

    ifParamsValid: Interpolator["ifParamsValid"]
        = (param: Compiler, callback: InterpolateFn) => {
            return this.replacements && this.HTMLPlugin
                ? Object.keys(this.replacements).length !== 0
                    ? "getHooks" in this.HTMLPlugin
                        ? callback(param)
                        : this.throwError("html-webpack-plugin v5 needs to be installed.")
                    : this.throwError("Your key/value object is empty.")
                : this.throwError("You need to pass HtmlWebpackPlugin and a key/value object to interpolate.")
        }

    apply: Interpolator["apply"] = (compiler: Compiler) => {
        try {
            this.ifParamsValid(compiler, this.interpolate)
        } catch (e) {
            console.error(e)
            return
        }
    }
}