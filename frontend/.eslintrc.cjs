// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// }

// {
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:react-hooks/recommended"
//   ],
//   "plugins": ["react", "react-hooks"],
//   "parserOptions": {
//     "ecmaVersion": 2021,
//     "sourceType": "module",
//     "ecmaFeatures": {
//       "jsx": true
//     }
//   },
//   "env": {
//     "browser": true,
//     "es2021": true
//   },
//   "rules": {
//     "react/react-in-jsx-scope": "off",
//     "no-unused-vars": "off",
//     "react/jsx-key": "off",
//     "no-undef": "off",
//     "react/prop-types": "off"
//     // "react-hooks/exhaustive-deps": "off",
//     // "react/display-name": "off"
//     // "no-empty": "off" // For disabling "catch (error) {}"
//   },
//   "settings": {
//     "react": {
//       "version": "detect"
//     }
//   }
// }

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // turn this one off
    'react/prop-types': 'off',
    // change these errors to warnings
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'off',
  },
};

/* Note:
If i want to disable a specific prompt for an error from "Eslint" to checking out, for that we need to hover this error prompt and copy the error for example: "no-unused-vars" (when we didn't use some component or a variable). Then past this error in ".eslint.json" configure file in "rules" section and set it as needed in our case this will be "off". 
*/
