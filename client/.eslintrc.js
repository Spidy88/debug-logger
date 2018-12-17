module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["../.eslintrc.js", "plugin:react/recommended"],
    "globals": {
        "CONFIG": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // React and JSX
        "react/button-has-type": [
            "warn",
            {
                "button": true,
                "submit": false,
                "reset": false
            }
        ],
        "react/no-access-state-in-setstate": "error",
        "react/no-array-index-key": "error",
        "react/no-danger": "warn",
        "react/no-did-mount-set-state": "warn",
        "react/no-did-update-set-state": "warn",
        "react/no-redundant-should-component-update": "warn",
        "react/no-typos": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unused-prop-types": "warn",
        "react/no-unused-state": "warn",
        "react/no-will-update-set-state": "error",
        "react/prefer-es6-class": [
            "error",
            "always"
        ],
        "react/prop-types": [
            "warn",
            { "ignore": ["className"] }
        ],
        "react/style-prop-object": "warn"
    },
    "settings": {
        "react": {
            "version": "16.0"
        }
    }
};