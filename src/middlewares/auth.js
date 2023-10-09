import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";

export const adminAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token){
            return responseHandler(res, 404, false, "Token is required");
        }
        const verification = jwtVerification(token);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}