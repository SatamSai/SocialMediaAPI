const mongoose = require('mongoose')
const Post = require('../models/Post')

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min:6,
    },
    profilePicture:{
        type: String,
        default: '',
    },
    coverPicture:{
        type: String,
        default: '',
    },
    followers:{
        type: Array,
        default: [],
    },
    followings:{
        type: Array,
        default: [],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    desc:{
        type: String,
        max:50,
        default: '',
    },
    city:{
        type: String,
        max:50,
    },
    from:{
        type:Number,
        enum:[1,2,3],
    },
    posts:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
)

module.exports=mongoose.model("User",UserSchema)