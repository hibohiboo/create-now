module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
    '\\.css$': '<rootDir>/node_modules/jest-css-modules'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react'
      }
    }
  },
  transform: {
    '^.+\\.stories\\.tsx$': '@storybook/addon-storyshots/injectFileName'
  }
}
