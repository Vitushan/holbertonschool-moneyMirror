// Setup file for Jest, loaded before all tests

import "@testing-library/jest-dom"

// Clear all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});