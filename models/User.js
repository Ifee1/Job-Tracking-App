import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide name'],
        minlength: 4,
        max_length: 30,
        trim: true,
    },

    email: {
        type: String, 
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true,
    },

    password: {
        type: String, 
        required: [true, 'Please provide name'],
        minlength: 6,
        select: false,
    },

    lastName: {
        type: String, 
        minlength: 2,
        trim: true,
        default: 'Smith'
    },

    location: {
        type: String, 
        minlength: 2,
        trim: true,
        default: 'My City'
    },
})

// Password hashing
UserSchema.pre('save', async function(){
    //console.log(this.modifiedPaths());
    if(!this.isModified ('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// JWT
UserSchema.methods.createJWT  = function(){
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME} )
}
// Jwt.sign accepts three arguments. The Payload(userId: this id gets the name, email and other credentials of the user.), the secret(jwtSecret) and the options(the expiration date etc).

// Compare Password
UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
export default mongoose.model('User', UserSchema)