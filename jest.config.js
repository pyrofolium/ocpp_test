module.exports = {
    "collectCoverage": true,
    "setupFiles": [
        "dotenv/config",
        "reflect-metadata",
        "<rootDir>/node_modules/jest-offline",
    ],
    "testMatch": ["**/*.test.js", "**/*.test.ts"],
    "transform": {
        "^.+\\.(ts|tsx)$": ["@swc/jest", {}],
    },
}
