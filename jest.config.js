module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/tests/**/*.ts", "**/*.test.ts"],
  transform: { "\\.ts$": "ts-jest" },
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*.stories.js*',
    '!**/{dist,build,esm}/**',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/test/**',
    '!**/*.d.ts',
    '!**/typings',
  ]
}
