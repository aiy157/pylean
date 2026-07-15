// src/__tests__/setup.js
// Vitest global setup

// Mock localStorage and sessionStorage for Node.js environment
const createStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
};

global.localStorage = createStorageMock();
global.sessionStorage = createStorageMock();

// Mock window for location reload
global.window = {
  location: { href: '' },
};
