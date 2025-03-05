module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Matches .test.ts or .spec.ts files
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transforms TypeScript files
  },
  roots: ["<rootDir>/src"], // Look for tests in the src directory
};