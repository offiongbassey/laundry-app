import { responseHandler } from '../helpers/responseHandler';
import { errorHandler } from '../helpers/errorHandler';
import Model from '../server/models';

export const createProduct = async(req, res) => {
    try {
    
    const new_product = await Model.Product.create(req.body);
    return responseHandler(res, 201, true, "Product successfully created", new_product);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }

}