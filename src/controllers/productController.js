import { responseHandler } from '../helpers/responseHandler';
import { errorHandler } from '../helpers/errorHandler';
import Model from '../server/models';
import crypto from 'crypto';
const Op = Model.Sequelize.Op;

export const createProduct = async(req, res) => {
    try {
    const { name } = req.body;
    let slug_url = name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").toLowerCase();
    const existing_slug = await Model.Product.findOne({ where: { slug_url }});
    if(existing_slug){
        slug_url = slug_url+ crypto.randomInt(0,1392029);
    }
    const new_product = await Model.Product.create({
        admin_id: req.user.id,
        name,
        slug_url
    });

    return responseHandler(res, 201, true, "Product successfully created", new_product);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const AdminGetAllProducts = async(req, res) => {
    try {
        const products = await Model.Product.findAll({ where: { status: {[Op.ne]: 'deleted'} } });
        if(!products){
            return responseHandler(res, 404, false, "Products not found");
        }
        return responseHandler(res, 200, true, 'Products Retrieved', products);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const updateProduct = async(req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const update_product = await Model.Product.update({
            name
        }, { where: {id} , returning: true });
        return responseHandler(res, 200, true, "Product Updated Successfully", update_product);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const activeProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Model.Product.findAll({ where: {status: 'active' } });
        if(!products){
            return responseHandler(res, 404, false, "No record found");
        }
        return responseHandler(res, 200, true, "Products retrieved", products);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const changeProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        let status = 'disabled';
        const product = await Model.Product.findOne({ where: { id, status: {[Op.ne]: 'deleted'} }});
        if(!product){
            return responseHandler(res, 404, false, "Product not found");
        }
        if(product.status === 'disabled'){
            status = 'active';
        }
        
        const new_product_status = await Model.Product.update({ status }, { where: { id }, returning: true });
        return responseHandler(res, 200, true, "Product Status Changed", new_product_status);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Model.Product.update({ status: 'deleted'}, {where: { id } });
        return responseHandler(res, 200, true, "Product Deleted Successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.")
    }
}
