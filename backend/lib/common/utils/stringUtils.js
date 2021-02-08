"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grabIdFromUserId = void 0;
const grabIdFromUserId = (userId) => {
    return userId.split('_').pop();
};
exports.grabIdFromUserId = grabIdFromUserId;
//# sourceMappingURL=stringUtils.js.map