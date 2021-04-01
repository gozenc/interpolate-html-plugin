<h1 align="center">InterpolateHtmlPlugin</h1>

<p align="center">Replaces your variable names in your HTML templates.<br> <br><i>Inspired from <a href="https://www.npmjs.com/package/react-dev-utils/v/6.0.0">react-dev-utils/interpolate-html-plugin</a>.<br> Build with <a href="https://www.typescriptlang.org/">TypeScript</a>.</i></p>

##

It works in combination with latest versions of [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin]) and [`webpack`](https://webpack.js.org/). You can learn more about creating plugins like this [here](https://github.com/jantimon/html-webpack-plugin]).

## Installation

|                   | NPM                                             | YARN                                               |
| ----------------: | ----------------------------------------------- | -------------------------------------------------- |
| **Prerequisites** | `npm i -D webpack html-webpack-plugin`          | `yarn add -D webpack html-webpack-plugin`          |
|    **Installing** | `npm i -D @fatihgozenc/interpolate-html-plugin` | `yarn add -D @fatihgozenc/interpolate-html-plugin` |

## Usage

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InterpolateHtmlPlugin = require("@fatihgozenc/interpolate-html-plugin")
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

## ToDo

-   Add webpack@3 support.
-   Add webpack@4 support.
-   More testing suites for development.
