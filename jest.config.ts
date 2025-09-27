import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testMatch: [
    "<rootDir>/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"
  ],
};

export default config;
