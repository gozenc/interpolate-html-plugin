import regexEscaper from "./regexEscaper"
import { Compiler, Compilation } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

type Interpolation = { html: string; outputName?: string; plugin?: HtmlWebpackPlugin; }

class InterpolateHtmlPlugin {
    public tapped: number = 0
    constructor(
        public replacements: {
            [key: string]: string
        }
    ) {}

    apply(compiler: Compiler): void {
        compiler.hooks.compilation.tap("InterpolateHtmlPlugin", (compilation: Compilation) => {
            const hooks = HtmlWebpackPlugin.getHooks(compilation)
            if (!this.tapped++ && "beforeEmit" in hooks) {
                hooks.beforeEmit.tap("InterpolateHtmlPlugin", ({ html }): Interpolation | any => {
                    Object.keys(this.replacements).forEach( (key:string) => {
                        if (key in this.replacements) {
                            const value = this.replacements[key]
                            html = html.replace(new RegExp("%" + regexEscaper(key) + "%", "g"), value )
                        }
                    })
                })
            }
        })
    }
}

module.exports = InterpolateHtmlPlugin
