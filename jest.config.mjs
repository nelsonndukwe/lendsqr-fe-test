import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "helpers/**/*.ts",
    "hooks/**/*.tsx",
    "app/actions/**/*.ts",
    "app/components/**/*.tsx",
    "lib/**/*.ts",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", ".module.scss", ".scss"],
};

export default createJestConfig(config);
