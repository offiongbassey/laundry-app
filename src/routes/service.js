import express from 'express';
import { changeServiceStatus, createService, deleteService, updateVendorService, viewAllVendorServices } from '../controllers/serviceController';
import { validationHandler } from '../helpers/validation';
import { create_service_validator, delete_service_validator, update_service_status_validator, vendor_update_service_validator, vendor_view_all_services_validator } from '../middlewares/validator';
import { vendorAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/create-new-service', validationHandler(create_service_validator), vendorAuth, createService);
router.get('/vendor-all-services/:business_id', validationHandler(vendor_view_all_services_validator), vendorAuth, viewAllVendorServices);
router.patch('/update/:service_id', validationHandler(vendor_update_service_validator), vendorAuth, updateVendorService);
router.patch('/change_status/:service_id', validationHandler(update_service_status_validator), vendorAuth, changeServiceStatus);
router.patch('/delete/:service_id', validationHandler(delete_service_validator), vendorAuth, deleteService);
module.exports = router;