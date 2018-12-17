module.exports = {
    "root": true,
	"extends": ["eslint:recommended"],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		// Possible errors
		"require-atomic-updates": "error",

		// Best practices
		"array-callback-return": "error",
		"block-scoped-var": "error",
		"class-methods-use-this": "error",
		"curly": [
			"error",
			"all"
		],
		"dot-location": [
			"error",
			"property"
		],
		"eqeqeq": [
			"error",
			"always"
		],
		"max-classes-per-file": [
			"error",
			1
		],
		"no-alert": "error",
		"no-caller": "error",
		"no-console": [
			"error",
			{ allow: ["warn", "error"] }
		],
		"no-else-return": "error",
		"no-empty-function": "error",
		"no-eq-null": "error",
		"no-eval": "error",
		"no-floating-decimal": "warn",
		"no-multi-spaces": "warn",
		"no-multi-str": "error",
		"no-new": "error",
		"no-octal-escape": "error",
		"no-proto": "error",
		"no-return-assign": [
			"error",
			"always"
		],
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-template-curly-in-string": "error",
		"no-throw-literal": "error",
		"no-unmodified-loop-condition": "error",
		"no-useless-call": "error",
		"no-useless-concat": "error",
		"no-useless-return": "error",
		"wrap-iife": [
			"error",
			"inside"
		],
		"yoda": [
			"error",
			"never"
		],

		// Stylistic issues
		"array-bracket-newline": [
			"warn",
			"consistent"
		],
		"array-bracket-spacing": [
			"warn",
			"never"
		],
		"array-element-newline": [
			"warn",
			"consistent"
		],
		"block-spacing": [
			"warn",
			"always"
		],
		"brace-style": [
			"warn",
			"stroustrup"
		],
		"comma-dangle": "warn",
		"comma-spacing": "warn",
		"comma-style": "warn",
		"computed-property-spacing": "warn",
		"func-call-spacing": "warn",
		"func-names": "warn",
		"func-style": [
			"warn",
			"declaration",
			{ "allowArrowFunctions": true }
		],
		"function-paren-newline": [
			"warn",
			"consistent"
		],
		"implicit-arrow-linebreak": "warn",
		"indent": [
			"warn",
			4,
			{ "SwitchCase": 1 }
		],
		"jsx-quotes": "warn",
		"key-spacing": "warn",
		"keyword-spacing": [
			"warn",
			{
				"before": true,
				"after": false,
				"overrides": {
					"import": { "after": true },
					"from": { "after": true },
					"export": { "after": true },
					"return": { "after": true },
					"try": { "after": true },
					"let": { "after": true },
					"const": { "after": true },
					"class": { "after": true },
					"as": { "after": true },
					"else": { "after": true },
					"case": { "after": true },
                    "async": { "after": true }
				}
			}
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"lines-between-class-members": [
			"warn",
			"always"
		],
		"max-len": [
			"warn",
			120,
			{
				"ignoreStrings": true,
				"ignoreComments": true
			}
		],
		"max-nested-callbacks": [
			"warn",
			3
		],
		"max-statements-per-line": "warn",
		"multiline-ternary": [
			"warn",
			"always-multiline"
		],
		"new-parens": "warn",
		"newline-per-chained-call": "warn",
		"no-bitwise": [
			"warn",
			{ "allow": ["~"] }
		],
		"no-lonely-if": "warn",
		"no-multiple-empty-lines": [
			"warn",
			{ "max": 1 }
		],
		"no-trailing-spaces": "warn",
		"no-unneeded-ternary": "warn",
		"no-whitespace-before-property": "warn",
		"nonblock-statement-body-position": "warn",
		"object-curly-newline": [
			"warn",
			{
				"minProperties": 6,
				"multiline": true,
				"consistent": true
			}
		],
		"object-curly-spacing": [
			"warn",
			"always"
		],
		"one-var": [
			"warn",
			"never"
		],
		"operator-linebreak": [
			"warn",
			"after"
		],
		"quotes": [
			"warn",
			"single",
			{ "allowTemplateLiterals": true }
		],
		"semi": "warn",
		"space-before-blocks": [
			"warn",
			"always"
		],
		"space-before-function-paren": [
			"warn",
			"never"
		],
		"space-unary-ops": [
			"warn",
			{
				"words": true,
				"nonwords": false
			}
		],
		"spaced-comment": [
			"warn",
			"always",
			{ exceptions: ['*'] }
		],
		"switch-colon-spacing": "warn",
		"template-tag-spacing": "warn",

		// ES6
		"arrow-parens": "warn",
		"arrow-spacing": "warn",
		"generator-star-spacing": "warn",
		"no-duplicate-imports": "warn",
		"no-useless-computed-key": "warn",
		"no-useless-constructor": "warn",
		"no-useless-rename": "warn",
		"no-var": "warn",
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"rest-spread-spacing": "warn",
	}
};