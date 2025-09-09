import { defineConfig } from 'cypress'
import { startDevServer } from '@cypress/vite-dev-server'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on) {
      on('dev-server:start', options => {
        return startDevServer({ options })
      })
    },
  },
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
})
