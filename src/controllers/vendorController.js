import { responseHandler } from '../helpers/responseHandler';
import { errorHandler } from '../helpers/errorHandler';
import Model from '../server/models';
import bcrypt from 'bcryptjs';

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