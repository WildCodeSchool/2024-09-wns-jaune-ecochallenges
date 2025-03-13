import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:7001/api',
  documents: './src/lib/graphql/operations.ts',
  generates: {
    './src/lib/graphql/generated/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
