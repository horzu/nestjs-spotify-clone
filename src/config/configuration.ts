export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'production', // environment variable
  port: parseInt(process.env.PORT || '3000'), // default port
  secret: process.env.SECRET, // secret key for JWT
  dbHost: process.env.DB_HOST, // database host
  dbPort: parseInt(process.env.DB_PORT || '5432'), // database port
  dbName: process.env.DB_NAME, // database name
  username: process.env.DB_USER, // database user
  password: process.env.DB_PASSWORD, // database password
});
