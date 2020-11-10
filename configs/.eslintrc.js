module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'no-bitwise': 'off', // 不让用位操作符，不知道为啥，先关掉
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
