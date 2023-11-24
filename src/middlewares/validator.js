import { body, header, param } from 'express-validator';
import { checkAllowedFields, createBusinessValidation, createVendorValidation, create_account_validation, existingProduct, existingProductType, titleCase } from '../helpers/validation';


export const create_admin_validator = [
    body('firstname')
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .trim()
        .customSanitizer(titleCase), 
    body('lastname')
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("last Name cannot be empty")
        .trim(),
    body('email')
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Email is not valid")
        .trim()
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 7 })
        .withMessage("Password cannot be less than 7 characters"),
    body('phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isInt()
        .withMessage("Phone Number must be a number")
        .isLength({ min: 11, max: 14})
        .withMessage("Invalid Phone Number")
        .trim(),
    body('gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Gender cannot be empty")
        .isIn(['male', 'female'])
        .withMessage("Gender must be male or female"),
    body()
        .custom(create_account_validation),
    body()
        .custom(body => checkAllowedFields(body, ['firstname', 'lastname', 'email', 'password', 'phone', 'gender']))
]

export const login_admin_validator = [
    body('email')
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 7 })
        .withMessage("Password cannot be less than 7 digits"),
    body()
        .custom(body => checkAllowedFields(body, ['email', 'password']))
]

export const logout_admin_validator = [
    header('token')
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty")
]

export const create_product_validator = [
    body('name')
        .exists()
        .withMessage("Product Name is required")
        .notEmpty()
        .withMessage("Product Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body()
        .custom(body => checkAllowedFields(body, ['name']))
]

export const update_product_validator = [
    body('name')
        .exists()
        .withMessage("Product Name is required")
        .notEmpty()
        .withMessage("Product Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    param('id')
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be a number")
        .custom(existingProduct),
    param()
        .custom(param => checkAllowedFields(param, ['id'])),
    body()
        .custom(body => checkAllowedFields(body, ['name']))
]

export const delete_product_validator = [
    param('id')
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID Cannot be empty")
        .isInt()
        .withMessage("Product ID must be Number ")
        .custom(existingProduct),
    param()
        .custom(param => checkAllowedFields(param, ['id']))
]

export const change_product_status_validator = [
    param('id')
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be a number")
        .custom(existingProduct),
    param()
        .custom(param => checkAllowedFields(param, ['id']))
]

export const create_product_type_valiator = [
    body('name')
        .exists()
        .withMessage("Product Type Name is required")
        .notEmpty()
        .withMessage("Product Type Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body()
        .custom(body => checkAllowedFields(body, ['name']))
]

export const update_product_type_validator = [
    body('name')
        .exists()
        .withMessage("Product Type Name is required")
        .notEmpty()
        .withMessage("Product Type Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    param('id')
        .exists()
        .withMessage("Product Type ID is required")
        .notEmpty()
        .withMessage("Product Type ID cannot be empty")
        .isInt()
        .withMessage("Product Type Must be number")
        .custom(existingProductType),
    param()
        .custom(param => checkAllowedFields(param, ['id'])),
    body()
        .custom(body => checkAllowedFields(body, ['name']))
]

export const change_product_type_status_validator = [
    param('id')
        .exists()
        .withMessage("Product Type ID is required")
        .notEmpty()
        .withMessage("Product Type ID cannot be empty")
        .isInt()
        .withMessage("Prodcut Type ID must be a number"),
    param()
        .custom(param => checkAllowedFields(param, ['id']))
]

export const delete_product_type_validator = [
    param('id')
        .exists()
        .withMessage("Product Type ID is required")
        .notEmpty()
        .withMessage("Product Type ID cannot be empty")
        .isInt()
        .withMessage("Product Type ID must be a number")
        .custom(existingProductType),
    param()
        .custom(param => checkAllowedFields(param, ['id']))
]

export const create_vendor_validator = [
    body('firstname')
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("First Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body('lastname')
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body('email')
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .trim()
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 7 })
        .withMessage("Password must be atleast 7 characters"),
    body('phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Numbner cannot be empty")
        .isLength({ min: 11, max: 14 })
        .trim()
        .withMessage("Invalid Phone Number"),
    body('gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Gender cannot be empty")
        .isIn(['male', 'female'])
        .withMessage("Gender must be male or female"),
    body()
        .custom(createVendorValidation)
        .custom(body => checkAllowedFields(body, ['firstname', 'lastname', 'email', 'password', 'phone', 'gender']))
]

export const login_vendor_validator = [
    body('email')
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .trim()
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 7 })
        .withMessage("Password must not be less than 7 characters"),
    body()
        .custom(body => checkAllowedFields(body, ['email', 'password']))
]

export const logout_vendor_validator = [
    header('token')
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty")
]

export const create_business_validator = [
    header('token')
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    body('business_name')
        .exists()
        .withMessage("Business Name is required")
        .notEmpty()
        .withMessage("Business Name cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body('registration_number')
        .exists()
        .withMessage("Registration Number is required")
        .notEmpty()
        .withMessage("Registration Number cannot be empty")
        .isInt()
        .withMessage("Registration Number must be a number")
        .trim(),
    body('date_registered')
        .exists()
        .withMessage("Registration Date is required")
        .notEmpty()
        .withMessage("Registration Date cannot be empty")
        .trim(),
    body('phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({ min: 11, max: 14})
        .trim(),
    body('address')
        .exists()
        .withMessage("Address is required")
        .notEmpty()
        .withMessage("Address cannot be empty")
        .trim(),
    body('lga')
        .exists()
        .withMessage("LGA is required")
        .notEmpty()
        .withMessage("LGA cannot be empty")
        .customSanitizer(titleCase)
        .trim(),
    body('state')
        .exists()
        .withMessage("State of Residence is required")
        .notEmpty()
        .withMessage("State cannot be empty"),
    body()
        .custom(createBusinessValidation)
        .custom(body => checkAllowedFields(body, ['business_name', 'registration_number', 'date_registered', 'phone', 'address', 'lga', 'state'])) 
]

export const create_service_validator = [
    header("token")
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    body("business_id")
        .exists()
        .withMessage("Business ID is required")
        .notEmpty()
        .withMessage("Business ID cannot be empty")
        .isInt()
        .withMessage("Business ID must be number")
        .trim(),
    body("product_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be number")
        .trim(),
    body("product_type_id")
        .exists()
        .withMessage("Product ID is required")
        .notEmpty()
        .withMessage("Product ID cannot be empty")
        .isInt()
        .withMessage("Product ID must be Number"),
    body("price")
        .exists()
        .withMessage("Product Price cannot be empty")
        .notEmpty()
        .withMessage("Product Price cannot be empty")
        .isInt()
        .withMessage("Product Price must be number")
        .trim(),
    body()
        .custom(body => checkAllowedFields(body, ['business_id', 'product_id', 'product_type_id', 'price' ]))
        
]

export const vendor_view_all_services_validator = [
    header("token")
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    param("business_id")
        .exists()
        .withMessage("Business ID is required")
        .notEmpty()
        .withMessage("Business ID cannot be empty")
        .isInt()
        .withMessage("Business ID must be number"),
    param()
        .custom(param => checkAllowedFields(param, ['business_id']))
]

export const vendor_update_service_validator = [
    header("token")
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    param("service_id")
        .exists()
        .withMessage("Service ID is required")
        .notEmpty()
        .withMessage("Service ID cannot be empty")
        .isInt()
        .withMessage("Service ID must be number"),
    body('price')
        .exists()
        .withMessage("Price is required")
        .notEmpty()
        .withMessage("Price cannot be empty")
        .isInt()
        .withMessage("Must be a number")
        .trim(),
    body()
        .custom(body => checkAllowedFields(body, ['price'])),
    param()
        .custom(param => checkAllowedFields(param, ['service_id']))
]

export const update_service_status_validator = [
    header('token')
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    param("service_id")
        .exists()
        .withMessage("Service ID is required")
        .notEmpty()
        .withMessage("Service ID cannot be empty")
        .isInt()
        .withMessage("Service ID must be a number"),
    param()
        .custom(param => checkAllowedFields(param, ['service_id']))
]

export const delete_service_validator = [
    header('token')
        .exists()
        .withMessage("Token is required")
        .notEmpty()
        .withMessage("Token cannot be empty"),
    param("service_id")
        .exists()
        .withMessage("Service ID is required")
        .notEmpty()
        .withMessage("Service ID cannot be empty")
        .isInt()
        .withMessage("Service ID must be a number"),
    param()
        .custom(param => checkAllowedFields(param, ['service_id']))
]