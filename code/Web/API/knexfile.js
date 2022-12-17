// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/UsersDevelopment.db'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './database/Users.db'
    },
    useNullAsDefault: true
  },
  debugMode: true,
};
