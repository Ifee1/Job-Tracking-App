import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Please provide Company'],
        maxlength: 50
    },

    company: {
        type: String,
        required: [true, 'Please provide Position'],
        maxlength: 100
    },

    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },

    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },

    jobLocation: {
        type: String,
        required: true,
        default: 'My City'
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide User']
    },
},
    {timestamps: true}
)

export default mongoose.model('Job', JobSchema)