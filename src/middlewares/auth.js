import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import { jwtVerification } from "../helpers/jwtVerification";
import Model from '../server/models';
import { client } from '../server/config/redis';

export const adminAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token){
            return responseHandler(res, 404, false, "Token is required");
        }
        const verification = jwtVerification(token);
        const redis_token = await client.get(`admin_${ verification.id.toString()}`, (err, data) => {
            if(err) throw new err;
        });

        if(!redis_token){
            return responseHandler(res, 404, false, "Not logged In");
        }
        const user = await Model.Admin.findOne({ where: { id: verification.id }});
        if(!user){
            return responseHandler(res, 404, false, "User not found");
        }
        req.user = user;
        next();

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const vendorAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token){
            return responseHandler(res, 404, false, "Token is required");
        }
        const verification = jwtVerification(token);
        const redis_token = await client.get(`vendor_${ verification.id.toString()}`, (err, data) => {
            if(err) throw new err;
        });

        if(!redis_token){
            return responseHandler(res, 404, false, "Not logged In");
        }
        const vendor = await Model.Vendor.findOne({ where: { id: verification.id }});
        if(!vendor){
            return responseHandler(res, 404, false, "Vendor not found");
        }
        req.vendor = vendor;
        next();

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}