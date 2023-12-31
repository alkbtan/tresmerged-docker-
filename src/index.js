const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// const {Client} = require('pg');
const os = require('os');
// init app
const PORT =process.env.PORT || 4000;
const app = express();

// connect to redis
const Redis_PORT = 6379;
const Redis_HOST = 'redis';
const redisClient = redis.createClient({
  url: `redis://${Redis_HOST}:${Redis_PORT }`,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('Connect', () => console.log('connected to redis....', err));
redisClient.connect();


// connect DB postgres
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: URI,
// });

// client
// .connect()
// .then(() => console.log('Connected to postgres DB ...'))
// .catch((err) => console.error('Failed to connect to postgres DB:', err));





// connect DB Mongo
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI)
  .then(() => console.log('Connected to DB ...'))
  .catch((err) => console.error('Failed to connect to DB:', err));


app.get('/', (req, res) => {
  redisClient.set('products', 'products.....');
  console.log(`traffic from ${os.hostname}`);
  res.send('<h1> Hello with docker Swarm</h1>');
}); 

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1> Hello Mohammad55555</h1> <h2>${products}</h2>`);
}); 


app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`)); 
