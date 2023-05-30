const mongoose = require('mongoose');
const schema = new mongoose.Schema({
name:String,
email:String,
password:String
});

const UserModel = mongoose.model('User',schema);

module.exports={
    UserModel
}