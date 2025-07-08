module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation/native|@react-navigation/.*|@react-native/js-polyfills|react-redux)/)'
  ],
};
