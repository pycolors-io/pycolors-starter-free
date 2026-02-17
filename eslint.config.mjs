import { config as baseConfig } from '@pycolors/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,

  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];
