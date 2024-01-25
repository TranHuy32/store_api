import BaseError from "src/base.error";

export enum ErrorCode {
    USER_IS_EMPTY = 101,
    USER_NOT_FOUND = 102,
    USER_WAS_DELETED = 103,

}

export const ErrorMessage = {
    101: 'User cannot be empty',
    102: 'User is not found',
    103: 'User was deleted',
};

export default class CommonError extends BaseError {
    code: ErrorCode;

    constructor(code: ErrorCode) {
        super(ErrorMessage[code], 400);

        this.name = 'Error';

        this.code = code;
    }
}
