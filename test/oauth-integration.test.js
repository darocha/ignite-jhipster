const commonMethods = require('./common-methods')
const jetpack = require('fs-jetpack')

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('JWT Integration Test', () => {
  beforeAll(async () => {
    const authType = 'oauth2'
    const useDto = false
    await commonMethods.copyFilesAndGenerateApp(authType, useDto)
  })

  test('lints a fresh app', commonMethods.lintBoilerplate)

  test('generates two entities', commonMethods.generateEntities)

  test('passes generated tests', commonMethods.runTests)

  test('generates oauth2 files in the JHipster project directory', async () => {
    console.log('Checking for OAuth2 files...')
    expect(jetpack.exists('../backend/src/main/java/com/mycompany/myapp/config/ResourceServerConfiguration.java')).toBe('file')
    expect(jetpack.exists('../backend/src/main/java/com/mycompany/myapp/web/rest/AuthInfoResource.java')).toBe('file')
  })
})
