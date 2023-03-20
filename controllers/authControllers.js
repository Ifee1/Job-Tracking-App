import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnAuthenticated} from "../errors/index.js"
import attachCookie from "../utils/AttachCookie.js"


const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError ('Please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email is already in use')
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()
    attachCookie({res, token})
    res.status(StatusCodes.CREATED)
    .json({
        user: {
            email: user.email,
            lastName:user.lastName,
            location: user.location,
            name: user.name,
        }, 
       // Because of this cookie feature, we don't need the token in our json responses. Hence, the Front-End doesn't need to store it anymore. Now, we remove the token in the register, login and update user controllers.
       // token, 
        location: user.location})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticated('Invalid Credentials')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticated('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    attachCookie({res, token})
    // Cookie setting. Cookie is used when you don't want to save information on the Local Storage. Data from local storage can always be gotten Javascript command. Hence, there are Security concerns. Now we send our token with HTTPOnly cookie. this information can be accessed only by the browser and not Javascript command. With Cookies, we don't need to send out token to the State and Local Storage. The browser automatically send the info. 
    
    res.status(StatusCodes.OK).json({user, 
        //token, 
        location: user.location})
}
 
const updateUser = async (req, res) => {
    const {email, name, lastName, location} = req.body
    if(!email || !name || !lastName || !location){
        throw new BadRequestError ('Please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId})
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location
    
    await user.save()
    const token = user.createJWT()
    attachCookie({res, token})
    res.status(StatusCodes.OK).json({user, 
        //token, 
        location: user.location})
}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    res.status(StatusCodes.OK).json({user, 
        //token, 
        location: user.location})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: 'User Logged Out'})
}

export {register, login, updateUser, getCurrentUser, logout}