import { errorHandler } from '../helpers/errorHandler';
import { responseHandler } from '../helpers/responseHandler';
import bcrypt from 'bcryptjs';
import Model from '../server/models';
export const createAdmin = async (req, res) => {
   try {
    const { firstname, lastname, email, password, phone, gender, role, status } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Model.Admin.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone,
        gender
    });

    return responseHandler(res, 201, true, "Account successfully created", admin);

   } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later.");
   }
}