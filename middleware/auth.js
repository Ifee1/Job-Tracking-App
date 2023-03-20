import { UnAuthenticated } from "../errors/index.js"
import jwt from 'jsonwebtoken'

 const auth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token){
    throw new UnAuthenticated ('Authentication Invalid')
  }
  // You remember how we checked for headers, now with the inception and benefits of cookies, we will refactor the code and check for cookies. Since cookies act as a storage and as authorization.
    // const authHeader = req.headers.authorization
    // if (!authHeader || !authHeader.startsWith('Bearer')){
    //     throw new UnAuthenticated('Authentication Invalid')
    // }
    // const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '6414e29e18768b87b9ca4227'
        req.user = {userId: payload.userId, testUser}
      next()  
       
    } catch (error) {
      throw new UnAuthenticated('Authentication Invalid')  
    }
   
 }

 export default auth