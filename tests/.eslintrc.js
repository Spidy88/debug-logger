module.exports = {
    extends: ['../.eslintrc.js', 'plugin:react/recommended'],
    env: {
        node: true,
        es6: true,
        jest: true
    },
    settings: {
        react: {
            version: "16.0"
        }
    }
};