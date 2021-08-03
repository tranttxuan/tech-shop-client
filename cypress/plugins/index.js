const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
    const configWithDotenv = require('dotenv').config();
    if (configWithDotenv.error) {
      throw configWithDotenv.error;
    }
    const env = { ...config.env, ...configWithDotenv.parsed };
    const result = { ...config, env };

    on('file:preprocessor', cucumber())
  
    return result;
}
