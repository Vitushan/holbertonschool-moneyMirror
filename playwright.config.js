// Playwright configuration for integration tests

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./__tests__.integration", // location of integration tests (corrected path)
    testMatch: "**/*.e2e.spec.js", // only run E2E tests (not Supertest)
    fullyParallel: true, // run tests in parallel
    forbidOnly: !!process.env.CI, // fail on test.only in CI (CI = Continuous Integration [automatic server that tests your code] )
    retries: process.env.CI ? 2 : 0, // retry failed tests in CI
    workers: process.env.CI ? 1 : undefined, // number of parallel workers
    reporter: "html", // generate HTML report
    globalSetup: "./playwright.global-setup.js", // run setup before all tests
    use: {
        baseURL: "http://localhost:3000", // base URL for tests
        trace: "on-first-retry", // capture trace on first retry
    },

    // test against Chromium only for speed
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // start dev server before tests
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});