<h1 align="center">InterpolateHtmlPlugin</h1>

<p align="center">Replaces your variable names in your HTML templates.<br> <br><i>Inspired from <a href="https://www.npmjs.com/package/react-dev-utils/v/6.0.0">react-dev-utils/interpolate-html-plugin</a>.<br> Written in <a href="https://www.typescriptlang.org/">TypeScript</a> with <span style="color:red">♥</span> </i></p>

## Overview

It works in combination with latest versions of [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin]) and [`webpack`](https://webpack.js.org/). You can learn more about creating plugins like this [here](https://github.com/jantimon/html-webpack-plugin]).

## Installation

| NPM                                        | YARN                                          |
| ------------------------------------------ | --------------------------------------------- |
| `npm i -D webpack html-webpack-plugin`     | `yarn add -D webpack html-webpack-plugin`     |
| `npm i -D @gozenc/interpolate-html-plugin` | `yarn add -D @gozenc/interpolate-html-plugin` |

## Usage

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InterpolateHtmlPlugin = require("@gozenc/interpolate-html-plugin")
// In the webpack.config file:
...
plugins: [
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        'PUBLIC_URL': "https://example.com",
        // Replaces %PUBLIC_URL% with https://example.com in index.html.
        VARIABLE: 1024,
        // Replaces %VARIABLE% with 1024 in index.html.
    }),
    ...
```

## Development

I know build pipeline looks kinda strange, but I am making some Linux practice with node concurrently for performant build pipelines. I may insert some C calls into it too. I'll develop it further in the future, but of course I am open for discussions for it.

Also just open a ticket for feature requests of course, I'll be glad to resolve them.

## ToDo

-   Add webpack@3 support.
-   Add webpack@4 support.
-   More testing suites for development.
-   Type definitions for hook.tap params.
