const mongoose = require('mongoose');
const schema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
flight:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Flight",
}
});

const BookModel = mongoose.model('Booking',schema);

module.exports={
    BookModel
}