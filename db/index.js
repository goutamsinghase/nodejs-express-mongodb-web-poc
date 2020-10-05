const mongoose = require('mongoose');
const registrationSchema =  require('./models/registration');

module.exports = ()=>{
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });
  
  return {
    Registration: mongoose.model('Registration', registrationSchema)
  }
};