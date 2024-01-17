const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePhoto: {
        data: Buffer, // Store binary data
        contentType: String, // Specify the content type (e.g., image/jpeg)
    },
    blogsPosted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blogs',
        }
    ]
},{timestamps:true});
module.exports = mongoose.model("User",userSchema);