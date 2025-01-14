"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'Success') => ({
    success: true,
    message,
    data,
});
exports.successResponse = successResponse;
const errorResponse = (message, details = null) => ({
    success: false,
    message,
    details,
});
exports.errorResponse = errorResponse;
