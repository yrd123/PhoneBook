const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/PhoneBook",{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("Connected to mongo server");
})

exports.mongoose = mongoose;