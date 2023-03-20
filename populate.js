import {readFile} from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Job from './models/Job.js'

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URL)
        // this function is to delete the already created jobs. (await Job.deleteMany())
        const fakeJobs = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)))
        await Job.create(fakeJobs)
        console.log('Success!!!');
        process.exit(0)
        // Process.exit is an operation in Node used when you want to exit a program. 0 is for success. and 1 is for error. 
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()