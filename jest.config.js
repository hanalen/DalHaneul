const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
//https://jestjs.io/docs/configuration
module.exports = {
  preset: 'ts-jest',
  verbose:true,
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: [
    '<rootDir>/test/jest.env.js',
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};
