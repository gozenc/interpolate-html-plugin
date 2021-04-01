import {
    InterpolatorPlugin
} from "./index.d"

export default class Interpolator {

    public static escapeRegex = (str: string) => {
        return typeof str !== "string"
            ? Interpolator.throwError('Expected a string', "type")
            : str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                .replace(/-/g, '\\x2d')
    }

    public static throwError = (message: string, type: undefined | string = undefined) => {
        return type === "type"
            ? (() => { throw new TypeError(`InterpolateHtmlPlugin: ${message}`) })()
            : (() => { throw new Error(`InterpolateHtmlPlugin: ${message}`) })()
    }

    public static interpolate = (data: any, replacements: InterpolatorPlugin["replacements"], key: string) => {
        return data.html.replace(new RegExp('%' + Interpolator.escapeRegex(key) + '%', 'g'),
            replacements[key])
    }

    public static run = (replacements: InterpolatorPlugin["replacements"], data: any) => {
        for (const key in replacements)
            data.html = Interpolator.interpolate(data, replacements, key)
    }
}