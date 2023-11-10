import { Config } from 'jest'
import nextJest from 'next/jest'

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

const customJestConfig: Config = {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  restoreMocks: true,
}

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  if (!nextJestConfig.transformIgnorePatterns) {
    nextJestConfig.transformIgnorePatterns = []
  }

  // /node_modules/ is the first pattern (we'll replace it)
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!geodesy)/'
  return nextJestConfig
}

export default jestConfig
