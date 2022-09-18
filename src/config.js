const env = process.env.NODE_ENV;
console.log('env:', env);

const production = {
  API_URL: 'https://api.basodel.bryan-ferrando.fr'
}

const development = {
  API_URL: 'http://localhost:5001'
}

const config = {
  production,
  development
}

module.exports = config[env] ?? config['production'];