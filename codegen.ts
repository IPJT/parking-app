import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:4000/graphql', //TODO take from env-variable
  documents: ['**/*.tsx'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
}

export default config
