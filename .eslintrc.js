"use strict"

module.exports = {
    env: {
        node: true
    },
    extends: ["plugin:jsdoc/recommended"],
    rules: {
        eqeqeq: "error",
        strict: 1
    },
    ignorePatterns: [
        "dist/*.js",
        "*.config.js"
    ],
}