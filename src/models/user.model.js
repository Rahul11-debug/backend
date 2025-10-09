import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { use } from 'react';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar : {
        type: String, //cloudnary url
        required: true,     
    },
    coverImage:{
        type: String, //cloudnary url
    },
    watchHistory: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Video',
        }
    ],
    password: {
        type: String,
        required: [true,'password is required'],
    },
    refreshToken: {
        type: String,
    },

}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password =  await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
         },   
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
    );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
         { 
            _id: this._id,
         },   
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
}
export const User = mongoose.model('User', userSchema);

