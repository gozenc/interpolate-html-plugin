"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var regexEscaper_1 = __importDefault(require("./regexEscaper"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var InterpolateHtmlPlugin = /** @class */ (function () {
    function InterpolateHtmlPlugin(replacements) {
        this.replacements = replacements;
        this.tapped = 0;
    }
    InterpolateHtmlPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.compilation.tap("InterpolateHtmlPlugin", function (compilation) {
            var hooks = html_webpack_plugin_1.default.getHooks(compilation);
            if (!_this.tapped++ && "beforeEmit" in hooks) {
                hooks.beforeEmit.tap("InterpolateHtmlPlugin", function (_a) {
                    var html = _a.html;
                    Object.keys(_this.replacements).forEach(function (key) {
                        if (key in _this.replacements) {
                            var value = _this.replacements[key];
                            html = html.replace(new RegExp("%" + regexEscaper_1.default(key) + "%", "g"), value);
                        }
                    });
                });
            }
        });
    };
    return InterpolateHtmlPlugin;
}());
module.exports = InterpolateHtmlPlugin;
