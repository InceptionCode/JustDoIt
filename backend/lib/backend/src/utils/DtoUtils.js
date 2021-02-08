"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDto = void 0;
function resolveDto(o, key) {
    const keys = Object.keys(o[key]);
    let resolvedDto = {};
    keys.forEach(k => {
        resolvedDto[k] = o[key][k];
    });
    return resolvedDto;
}
exports.resolveDto = resolveDto;
//# sourceMappingURL=DtoUtils.js.map