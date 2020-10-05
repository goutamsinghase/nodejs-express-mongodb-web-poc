require('dotenv').config();

const db = require('./db')();


const app = require('./app');



const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});