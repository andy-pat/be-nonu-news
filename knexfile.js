const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: 'andy',
      password: 'fuckpsql'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: 'andy',
      password: 'fuckpsql'
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
