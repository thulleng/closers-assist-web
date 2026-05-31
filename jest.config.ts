import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^next/navigation$": "<rootDir>/__mocks__/next-navigation.ts",
    "^next/link$": "<rootDir>/__mocks__/next-link.tsx",
    "^next/image$": "<rootDir>/__mocks__/next-image.tsx",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        jsx: "react-jsx",
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!lucide-react)",
  ],
  testPathPattern: "/__tests__/.*\\.test\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;
