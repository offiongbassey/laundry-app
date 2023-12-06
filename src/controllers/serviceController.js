import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const Op = Model.Sequelize.Op;

export const createService = async(req, res) => {
    try { 
        const { business_id, product_id, product_type_id, price } = req.body;
        const vendor_id = req.vendor.id;
        //validation for existing service
        const service = await Model.Service.findOne({where: { business_id, product_id, product_type_id }});
        if(service){
            return responseHandler(res, 400, false, "The Service already exist with the same type");
        }

        const new_service = await Model.Service.create({
            business_id,
            vendor_id,
            product_id,
            product_type_id,
            price
        });
        return responseHandler(res, 201, true, "Service Created Successfully", new_service);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.")
    }

}

export const viewAllVendorServices = async(req, res) => {
    try {
        const  { business_id } = req.params;
        const services = await Model.Service.findAll({ where: { vendor_id: req.vendor.id, business_id, status: {[Op.ne]: 'deleted' } } });

        if(services.length < 1){
            return responseHandler(res, 404, false, "You don't have any Service yet, add one");
        }

        return responseHandler(res, 200, true, "Service Available", services);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later")
    }
}

export const updateVendorService = async(req, res) => {
    try {
        const id =  req.params.service_id;
        const service = await Model.Service.findOne({ where: { id, vendor_id: req.vendor.id, status: {[Op.ne]: 'deleted' } }});
        if(!service){
            return responseHandler(res, 404, false, "Service not available");
        }
        const update_services = await Model.Service.update(req.body, { where: { id }, returning: true});
        return responseHandler(res, 200, true, "Service Updated Successfully", update_services);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const changeServiceStatus = async(req, res) => {
    try {
        const id = req.params.service_id;
        const service = await Model.Service.findOne({ where: { id, vendor_id: req.vendor.id, status: {[Op.ne]: 'deleted' } }});
        if(!service){
            return responseHandler(res, 404, false, "Service not available");
        }
        const status = service.status == 'active' ? 'inactive' : 'active';

        const change_status = await Model.Service.update({ status }, { where: { id }, returning: true });
        return responseHandler(res, 200, true, "Service Status Successfully Updated", change_status)
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");

    }
}

export const deleteService = async(req, res) => {
    try {
        const id = req.params.service_id;
        const service = await Model.Service.findOne({where: { id, vendor_id: req.vendor.id, status: {[Op.ne]: 'deleted' } }});
        if(!service){
            return responseHandler(res, 404, false, "Service not available");
        }
        await Model.Service.update({ status: 'deleted' }, { where: { id }, returning: true});
        return responseHandler(res, 200, true, "Service successfully deleted");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const activeServicesByVendor = async(req, res) => {
    try {
        const { business_id } = req.params;
        const services = await Model.Service.findAll({ where: { business_id, status: 'active'}, include: [
            { model: Model.Product, 
            attributes: [
                "name",
                "image",
                "slug_url"
            ], 
            as: 'product' },
            { model: Model.ProductType, 
            attributes: [
                "name"
            ], 
            as: 'product_type'}
        ] });

        if(services.length < 1 ){
                return responseHandler(res, 404, false, "Services not available for this vendor, check back later.");
        }

        return responseHandler(res, 200, true, "Services Available", services);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}
