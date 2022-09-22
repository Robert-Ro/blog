import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/jest.config.ts',
    '!<rootDir>/practises/**/*.ts',
    '!<rootDir>/typescript/**/*.ts',
  ],
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testURL: 'http://localhost:4444',
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/**/*.(sepc|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}

export default config
