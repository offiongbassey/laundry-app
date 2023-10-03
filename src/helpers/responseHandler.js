export const responseHandler = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({success, statusCode, message, data});
}