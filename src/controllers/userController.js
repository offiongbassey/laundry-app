import { errorHandler } from "../helpers/errorHandler";
import { generateToken, jwtVerification } from "../helpers/jwtVerification";
import { responseHandler } from "../helpers/responseHandler";
import { client } from "../server/config/redis";
import Model from "../server/models";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, gender } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        const create_account = await Model.User.create({
            firstname,
            lastname,
            email,
            password: hashed_password,
            phone,
            gender
        });
        create_account.password = undefined;
        return responseHandler(res, 201, true, "Account created successfully", create_account);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Model.User.findOne({ where: { email }});

        if(!user){
            return responseHandler(res, 404, false, "Incorrect email or password");
        }

        const verify_password = await bcrypt.compare(password, user.password);
        if(!verify_password){
            return responseHandler(res, 404, false, "Incorrect email or password");
        }

        const token = generateToken(user.id);
        await client.setEx(`user_${ user.id.toString() }`, 60000, token);
        user.password = undefined;
        user.set('token', 'asaa');
        return responseHandler(res, 200, true, "Successfully Logged In", { user, token });

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.token;
        const verification = jwtVerification(token);
        const redis_token = await client.get(`user_${ verification.id.toString() }`);
        
        if(redis_token){
            await client.DEL(`user_${ verification.id.toString() }`);
        }else{
            return responseHandler(res, 400, false, "Invalid token or token expired");
        }

        return responseHandler(res, 500, false, "You have successfully logged out", verification);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}