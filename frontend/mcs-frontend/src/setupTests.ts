// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock global fetch if you're using it
global.fetch = jest.fn();

// Setup any global mocks or configurations here

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});