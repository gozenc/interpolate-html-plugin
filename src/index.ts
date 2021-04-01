import {
    Compiler,
    Compilation,
    InterpolatorPlugin
} from "./index.d"

import Interpolator from "./Interpolator"

class InterpolateHtmlPlugin extends Interpolator {

    constructor(
        public HTMLPlugin: InterpolatorPlugin["HTMLPlugin"],
        public replacements: InterpolatorPlugin["replacements"],
    ) {
        super()
    }

    init: InterpolatorPlugin["init"] = (compiler: Compiler) =>
        compiler.hooks.compilation
            .tap("InterpolateHtmlPlugin", (compilation: Compilation) =>
                this.HTMLPlugin.getHooks(compilation)
                    .afterTemplateExecution.tap(
                        "InterpolateHtmlPlugin",
                        (data: any): any => Interpolator.run(this.replacements, data)
                    )
            )

    ifParamsValid: InterpolatorPlugin["ifParamsValid"] = () => this.replacements
        ? Object.keys(this.replacements).length !== 0
            ? "getHooks" in this.HTMLPlugin
                ? true
                : Interpolator.throwError("html-webpack-plugin v5 needs to be installed.")
            : Interpolator.throwError("Your key/value object is empty.")
        : Interpolator.throwError("You need to pass HtmlWebpackPlugin and a key/value object to interpolate.")

    apply: InterpolatorPlugin["apply"] = (compiler: Compiler) => {
        try {
            this.ifParamsValid()
            this.init(compiler)
        } catch (e) {
            console.error(e)
            return
        }
    }
}

module.exports = InterpolateHtmlPlugin