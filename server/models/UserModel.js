const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true,'Name must be required']},
    email: {
        type: String, 
        unique: true, 
        trim: true, 
        required: [true,'Email must be required']},
    password: {
        type: String, 
        trim: true, 
        required: [true,'Password must be required'],
                 minlength: [6,'Password must be at least 6 characters']},
    avatar:{
        type: String, 
        required: false
    },
    isAdmin:{
        type: Boolean, 
        default: false},
    likedQuizzes: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    // avatar: {
    //     type: Object,
    //     required: false,
    //     contains: {
    //         url: {
    //             type: String
    //         },
    //         publicId: {
    //             type: String
    //         }
    //     }
    // },
    access_token:{type: String, required: false},
    refresh_token:{type: String, required: false},
},{timestamps: true})



userSchema.pre('save',function(next){
    let user = this;
    bcrypt.hash(user.password,10,function(error,hash){
        if(error){
            return next(error);
        }else{
            user.password =hash;
            next()
        }
    })
})

const User = mongoose.model('User',userSchema);

module.exports = User;