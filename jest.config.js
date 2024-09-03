module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/Cal/tests/**/*.test.ts',
    '<rootDir>/src/components/tests/**/*.test.(ts|tsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup file for test environment configuration
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported file extensions
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  collectCoverage: false, // Enable test coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Collect coverage from all .ts and .tsx files
    '!src/**/*.d.ts',    // Exclude TypeScript declaration files
    '!src/**/index.tsx', // Exclude index.tsx from coverage
    '!src/setupTests.ts', // Exclude setupTests.ts from coverage
  ],
  coverageDirectory: '<rootDir>/coverage', // Output coverage reports to the coverage directory
};
