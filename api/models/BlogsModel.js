const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    contentImage:{
        type : Buffer,
        contentType: String,
    },
    summary:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    time:{
        type:String,
        required : true,
        default: Date.now(),
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
},{timestamps:true});

module.exports = mongoose.model("Blogs",BlogSchema);