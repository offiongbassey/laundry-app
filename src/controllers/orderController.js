import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const Op = Model.Sequelize.Op;

//delcaring multiple user order
export const createOrder = async( req, res ) => {
    try {
        const { business_id, total_amount, order_items } = req.body;

        const order = await Model.Order.create({ user_id: req.user.id, business_id, total_amount, service_charge: 0, reference: 2334444 });
        var total = 0;
        for(let count = 0; count< order_items.length; count ++){
            const order_item = order_items[count];
            const { service_id, quantity, price } = order_item;
            const service = await Model.Service.findOne({ where:  { id: service_id }, include: [
                {model: Model.Product, 
                attributes: [
                    "name",
                    "image"
                ], 
            as: "product" },
            {model: Model.ProductType, 
            attributes: [
                "name"
            ], 
             as: "product_type" }
            ]})
            const amount = service.price * quantity;
            total += amount;
            await Model.Order_Item.create({order_id: order.id, service_id, quantity, price: service.price, status: 'active', product_type: service.product_type.name, product_image: service.product.image, product_name: service.product.name, amount });
        }
        if(order.total_amount != total){
            await Model.Order.update({total_amount: total}, {where: { id: order.id}});
            order.total_amount = total;
        }

        return responseHandler(res, 201, true, "Order Processing", order);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");

    }
}

export const userOrders = async (req, res) => {
    try {
        const orders = await Model.Order.findAll({ where: { user_id: req.user.id, status: {[Op.ne]: 'deleted' }}, include: [
            { model: Model.Business,
            attributes: [
                "business_name",
                "phone",
                "address"
            ],
            as: "vendor" }
        ]});

        if(orders.length < 1){
            return responseHandler(res, 404, false, "No Data Available");
        }
        
        return responseHandler(res, 200, true, "Data Available", orders);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

export const userOrderById = async (req, res) => {
    try {
        const id = req.params.order_id
        
        const order = await Model.Order.findOne({ where: { user_id: req.user.id, id }, include: [
            { model: Model.Order_Item, 
            attributes: [
                "id",
                "service_id",
                "quantity",
                "price",
                "amount",
                "product_name",
                "product_image",
                "product_type",
                "status"
            ],
            as: "order_items", 
            where: { status: 'active' }
        }
        ]});

        if(!order){
            return responseHandler(res, 404, false, "Order not found");
        }

        return responseHandler(res, 200, true, "Data Retrieved", order);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteOrderItem = async (req, res) => {
    try {

        const { order_item_id, order_id } = req.params;
        const order = await Model.Order.findOne({ where: { id: order_id, user_id: req.user.id, is_paid: {[Op.ne]: true}}});
        if(!order){
            return responseHandler(res, 404, false, "Invalid Order");
        }

        //verifying the status of the order_item
        const order_item_status = await Model.Order_Item.findOne({ where: { id: order_item_id, status: "active" }});
        if(!order_item_status){
            return responseHandler(res, 404, false, "Order Item does not exist");
        }

        await Model.Order_Item.update({ status: 'deleted'}, { where: { order_id: order_id, id: order_item_id } });

        //retrieving current amount
        let total_amount = 0
        const new_order_items = await Model.Order_Item.findAll({ where: { order_id: order_id, status: 'active' }});
        new_order_items.forEach(item => {
            total_amount += item.amount;
        });

        //updating Order total amount
        await Model.Order.update({total_amount}, { where: { id: order_id }});
        return responseHandler(res, 200, true, "Order Item Successfully Removed.");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await Model.Order.findOne({ where: { id: order_id, is_paid: false, user_id: req.user.id, status: {[Op.ne]: "deleted"} } });
        if(!order){
            return responseHandler(res, 404, false, "Order not found");
        }

        //updating the status to delete
        await Model.Order.update({ status: "deleted"}, { where: { id: order_id } });
        await Model.Order_Item.update({ status: "deleted"}, { where: { order_id }});
        
        return responseHandler(res, 200, true, "Order Successfully Deleted");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}