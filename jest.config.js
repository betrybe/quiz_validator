module.exports = {
	setupFiles: ['<rootDir>/.jest/set_env_vars.js'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?|js?|tsx?|ts?)$',
	testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
	moduleFileExtensions: ['js', 'jsx', 'mjs']
}