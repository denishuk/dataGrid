module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/client/src/test/setup.ts'],
  testMatch: [
    '<rootDir>/client/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/client/src/**/*.{test,spec}.{ts,tsx}'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@/components/(.*)$': '<rootDir>/client/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/client/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/client/src/hooks/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  collectCoverageFrom: [
    'client/src/components/**/*.{ts,tsx}',
    'client/src/lib/**/*.{ts,tsx}',
    'client/src/hooks/**/*.{ts,tsx}',
    '!client/src/**/__tests__/**',
    '!client/src/**/*.test.{ts,tsx}',
    '!client/src/**/*.spec.{ts,tsx}',
    '!client/src/test/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}