module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'import-helpers', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ],
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          'endOfLine': 'auto',
          'tabWidth': 4,
          'semi': true,
        },
      ],
      'import-helpers/order-imports': [
        'error',
        {
          'newlinesBetween': 'always',
          'groups': [
            '/^@nestjs/',  // Imports de NestJS
            'module',      // Otros módulos de Node.js o librerías externas
            ['parent', 'sibling'],  // Imports relativos
          ],
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        },
      ],
      // Puedes añadir más reglas aquí si lo deseas
    },
  };
  