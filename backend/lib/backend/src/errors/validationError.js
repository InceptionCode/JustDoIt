"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError {
    constructor(message, ErrorDetails = null) {
        this.Code = '400';
        this.Message = 'Not found';
        this.Message = message;
        this.ErrorDetails = ErrorDetails;
    }
}
exports.default = ValidationError;
//# sourceMappingURL=validationError.js.map