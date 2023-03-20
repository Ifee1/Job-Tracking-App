import express from 'express'
const app = express()
import 'express-async-errors'
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()


// db and authenticate user
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRouter.js'
import jobsRouter from './routes/jobsRouter.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

// production
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// Security Packages
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// Cookie 
import cookieParser from 'cookie-parser'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use (express.json())
app.use(cookieParser())
app.use (helmet())
app.use (xss())
app.use (mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    
  })

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening on ${port} ...`);
        })
    } catch (error) {
        console.log(error); 
    }
}

start()