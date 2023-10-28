import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";
import Model from '../server/models';
const Op = Model.Sequelize.Op;

export const checkAllowedFields = (payload, fields) => {
    payload = Array.isArray(payload) ? payload : [payload];

    payload.forEach((item) => {
        const allowed = Object.keys(item).every(field => fields.includes(field));
        fields = typeof fields === 'string' ? fields : fields.join(', ');

        if(!allowed){
            throw new Error(`Wrong fields passed. Allolwed fields: ${ fields }`); 
        }
    });
    return true;
}

export const create_account_validation = async (body) => {
    await existingEmail(body.email, 'Admin');
    await acceptedPhoneNumber(body.phone, 'Admin');
    await existingPhone(body.phone, 'Admin');
}

export const validationHandler = (values = []) => {
    return async (req, res, next) => {
        await Promise.all(values.map((value) => value.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        const _errors = errors.array();
        let message = "Invalid Parameters:";

        _errors.forEach((v) => {
            message += `${ v.param },`;
        });
        responseHandler(res, 422, false, { errors: errors.array() });
    };
}

export const titleCase = async (name) => {
    return name?.toLowerCase()?.split(' ').map(function (text) {
        return (text?.charAt(0).toUpperCase() + text?.slice(1));
    }).join(' ');
}

export const existingEmail = async (email, type) => {
    const check_existing_email = await Model[type].findOne({ where: { email }});

    if(check_existing_email){
        throw new Error("Email already exist.");
    }
    return true;
}

export const existingPhone = async (phone, type) => {
    const check_existing_phone = await Model[type].findOne({ where: { phone }});

    if(check_existing_phone){
        throw new Error("Phone Number already exist");
    }
    return true; 
}

export const acceptedPhoneNumber = async (phone) => {
    const phone_type = phone.charAt(0);
    if(phone_type === `+` && phone?.length != 14){
        throw new Error("Wrong Phone Number type. Tips: +234801234567899");
    }else if(Number(phone_type) === 0 && phone?.length != 11){
        throw new Error("Wrong Phone Number type. Tips: 08012345678");
    }else if (phone_type !== `+` && phone_type != 0){
        throw new Error("Invalid Phone Number");
    }
    return true;
}

export const existingProduct = async (id) => {
    const product = await Model.Product.findOne({where: {id, status: {[Op.ne]: 'deleted'}}});
    if(!product){
        throw new Error("Product does not exist");
    }
    return true;
}

export const existingProductType = async (id) => {
    const product_type = await Model.ProductType.findOne({ where: {id, status: {[Op.ne]: 'deleted' }}})
    if(!product_type){
        throw new Error("Product Type does not exist");
    }
    return true;
}

export const createVendorValidation = async (body) => {
    await existingEmail(body.email, 'Vendor');
    await acceptedPhoneNumber(body.phone, 'Vendor');
    await existingPhone(body.phone, 'Vendor');
}

export const existingBusinessAccount = async (registration_number) => {
    const business_account = await Model.Business.findOne({ where: { registration_number }});
    if(business_account){
        throw new Error("Business Account already exist");
    }
    return true;
}
export const createBusinessValidation = async (body) => {
    await acceptedPhoneNumber(body.phone, 'Business');
    await existingBusinessAccount(body.registration_number)
}