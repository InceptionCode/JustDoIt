"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError {
    constructor(error, message = ServerError.InternalServerError, code = null) {
        this.Code = '500';
        this.Code = code;
        this.Message = message;
        this.ErrorDetails = `${error.name} ${error.message}`;
    }
}
exports.default = ServerError;
ServerError.InternalServerError = "Oops something went wrong on our end. Internal Server Error";
//# sourceMappingURL=error.js.map