module.exports = {
	root: true,
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	ignorePatterns: [ 'node_modules/' ],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'semi': [ 'error', 'never' ],
		'quotes': [ 'error', 'single' ],
		'indent': [ 'error', 2 ],
		'object-curly-spacing': [ 'error', 'always' ],
		'computed-property-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'comma-dangle': [ 'error', 'never' ],
		'no-multiple-empty-lines': [ 'error', { 'max': 1 } ],
		'no-unused-vars': 1  //  0 = off, 1 = warn, 2 = error
	},
}
