import { responseHandler } from '../helpers/responseHandler';
import { errorHandler } from '../helpers/errorHandler';
import Model from '../server/models';
const Op = Model.Sequelize.Op;

export const createProductType = async (req, res) => {
    try {
        const product_type = await Model.ProductType.create({
            admin_id: req.user.id,
            name: req.body.name
        });
        return responseHandler(res, 201, true, "Product Type Created", product_type);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.")
    }
}

export const adminGetAllProductTypes = async (req, res) => {
    try {
        const product_types = await Model.ProductType.findAll({ where: { status: {[Op.ne]: 'deleted'}}});
        if(product_types.length < 1){
            return responseHandler(res, 404, false, "Data not found");
        }
        return responseHandler(res, 200, true, "Data Retrieved", product_types);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const activeProductTypes = async (req, res) => {
    try {
        const product_types = await Model.ProductType.findAll({ where: { status: 'active' }});
        if(product_types.length < 1){
            return responseHandler(res, 404, false, "Data not found");
        }
        return responseHandler(res, 200, true, "Data retrieved", product_types);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const updateProductType = async (req, res) => {
    try {
        const { id } = req.params;
        const update_product_type = await Model.ProductType.update({ name: req.body.name }, {where: { id }, returning: true});
        return responseHandler(res, 200, true, "Product Type Updated", update_product_type);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const changeProductTypeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        let status = 'disabled';
        const product_type = await Model.ProductType.findOne({ where: { id, status: {[Op.ne]: 'deleted' }}});
        if(!product_type){
            return responseHandler(res, 404, false, "Record not found");
        }
        if(product_type.status === 'disabled'){
            status = 'active';
        }
        const product_type_status = await Model.ProductType.update({ status}, { where: { id }, returning: true});
        return responseHandler(res, 200, true, "Product Type Status Changed", product_type_status);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteProductType = async (req, res) => {
    try {
        await Model.ProductType.update({status: 'deleted'}, { where: { id: req.params.id } });
        return responseHandler(res, 200, true, "Product Type Deleted");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}