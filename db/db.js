const mongoose = require('mongoose');


const db = () => {
    mongoose.connect(process.env.DB_CONNECT)
      .then(() => {
        console.log("Connected to database");
      })
       .catch(err  =>console.log(err));
  };
module.exports = db