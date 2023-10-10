import { errorHandler } from '../helpers/errorHandler';
import { responseHandler } from '../helpers/responseHandler';
import { generateToken, jwtVerification } from '../helpers/jwtVerification';
import { client } from '../server/config/redis';
import bcrypt from 'bcryptjs';
import Model from '../server/models';

export const createAdmin = async (req, res) => {
   try {
    const { firstname, lastname, email, password, phone, gender } = req.body;
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

export const loginAdmin = async (req, res) => {
    try {
        const { email,  password } = req.body;
        const admin = await Model.Admin.findOne({ where: { email }});
        if(!admin){
            return responseHandler(res, 500, false, "Email not found");
        }
        const verify_password = await bcrypt.compare(password, admin.password);
        if(!verify_password){
            return responseHandler(res, 404, false, "Invalid Email or Password");
        }
        const token = generateToken(admin.id);
        await client.setEx(`admin_${ admin.id.toString() }`, 60000, token);

        const { id, firstname, lastname, status, gender, phone } = admin;
        const admin_data = { id, firstname, lastname, status, gender, phone, token };

        return responseHandler(res, 200, true, "Successful", admin_data);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrongm, try again later.");
    }
}

export const adminLogout = async (req, res) => {
    try {
        const token = req.headers.token;
        const verification = jwtVerification(token);
        const redis_token = await client.get(`admin_${ verification.id.toString()}`);

        if(redis_token){
            await client.DEL(`admin_${ verification.id.toString() }`);
        }

        return responseHandler(res, 200, true, "You have successfully logged out.");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}