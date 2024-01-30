import BaseError from "src/base.error";

export enum ErrorCode {
    USER_IS_EMPTY = 101,
    USER_NOT_FOUND = 102,
    USER_WAS_DELETED = 103,
    CUSTOMER_EXISTED = 104,
    INVALID_PHONENUMBER_FORMAT = 105,
    MISSING_PHONENUMBER = 106,
    CATEGORY_EXISTED = 107,
    CUSTOMER_NOT_FOUND = 108,
    PRODUCT_NOT_FOUND = 109,
    CREATE_ORDER_DETAIL_FAIL = 110,
}

export const ErrorMessage = {
    101: 'User cannot be empty',
    102: 'User is not found',
    103: 'User was deleted',
    104: 'Customer was existed',
    105: 'Phone format is wrong',
    106: 'Missing phone number',
    107: 'Category was existed',
    108: 'Customer is not found',
    109: 'Product is not found',
    110: 'Create order detail fail',
};

export default class CommonError extends BaseError {
    code: ErrorCode;

    constructor(code: ErrorCode) {
        super(ErrorMessage[code], 400);

        this.name = 'Error';

        this.code = code;
    }
}
