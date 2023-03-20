import { UnAuthenticated } from "../errors/index.js";

const CheckPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return
     throw new UnAuthenticated('Not Authorized to access this route')
}

export default CheckPermissions