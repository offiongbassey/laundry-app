import { responseHandler } from '../helpers/responseHandler';
import { errorHandler } from '../helpers/errorHandler';
import Model from '../server/models';
import bcrypt from 'bcryptjs';
import { generateToken, jwtVerification } from '../helpers/jwtVerification';
import { client } from '../server/config/redis';

export const createVendor = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, gender } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        const new_vendor = await Model.Vendor.create({
            firstname, 
            lastname,
            email,
            password: hashed_password,
            phone,
            gender,
        });
        return responseHandler(res, 201, true, "Account successfully created", new_vendor);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res,  500, false, "Something went wrong, try again later");
    }
}

export const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const vendor = await Model.Vendor.findOne({ where: { email } });
        if(!vendor){
            return responseHandler(res, 404, false, "Invalid Email or Password");
        }
        const verify_password = await bcrypt.compare(password, vendor.password);
        if(!verify_password){
            return responseHandler(res, 404, false, "Invalid Email or Password");
        }
        const token = generateToken(vendor.id);
        await client.setEx(`vendor_${ vendor.id.toString() }`, 60000, token);

        const { id, firstname, lastname, gender, status, phone } = vendor;
        const vendor_data = { id, firstname, lastname, gender, status, phone, email, token };
        return responseHandler(res, 200, true, "Successfully Logged In", vendor_data);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const logoutVendor = async (req, res) => {
    try {
        const token = req.headers.token;
        const verification = jwtVerification(token);
        const redis_token = await client.get(`vendor_${verification.id.toString()}`);
        if(redis_token){
            await client.DEL(`vendor_${ verification.id.toString() }`);
        }
        return responseHandler(res, 200, true, "You have successfully logged out.")
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}