// TODO add separate configs for ui and server tests to split test environments

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^src/(.*)$': '<rootDir>/src/$1'
  }
};
