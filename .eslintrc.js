"use strict"

module.exports = {
        env: {
            node: true
        },
        extends: ["plugin:jsdoc/recommended"],
        rules: {
            // Override our default settings just for this directory
            eqeqeq: "warn",
            strict: 1
        }
}