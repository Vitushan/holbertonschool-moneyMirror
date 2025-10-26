/// Configuration for Jest file

// Import Next.js Jest configuration helper
const nextJest = require("next/jest");

// Create Jest configuration factory with Next.js integration
const createJestConfig = nextJest({
    // Provide the path to my Next.js app to load next.config.js and .env files in my test environment
    dir: './',
});

// Add custom Jest configuration
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Load jest.setup.js before tests
    testEnvironment: "node",  // Use Node.js environment for backend testing
    moduleNameMapper: {
         '^@/(.*)$': '<rootDir>/src/$1', // Map @/ to the src folder
    },
    testMatch: ['**/__tests__/**/*.test.js'], // Locate test files
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '\\.e2e\\.spec\\.js$', '/__tests__.integration/'], // Exclude E2E Playwright tests and integration tests
    collectCoverageFrom: [
        "src/app/api/**/*.js", // Include API files for coverage
        "!src/app/api/**/_*.js" // Exclude private API files
    ],
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);