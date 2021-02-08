"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils_1 = require("../../../common/utils/stringUtils");
const firestore_1 = require("@google-cloud/firestore");
const index_1 = require("../index");
const errorConstants_1 = require("../../../common/constants/errorConstants");
const DtoUtils_1 = require("../utils/DtoUtils");
const firestore = new firestore_1.Firestore();
const env = process.env.ENVIRONMENT;
const baseUrl = `${env}api/routes`;
console.info("Base URL", baseUrl);
const TodoRepository = {
    getUser: async (userId) => {
        const user = await firestore.doc(`${baseUrl}/users/${userId}`).get();
        if (!user.exists)
            throw new Error(errorConstants_1.invalidUser);
        return user.data();
    },
    getTodos: async (completed) => {
        const todos = await firestore.collection(`${baseUrl}/todos`)
            .where('completed', '==', completed)
            .get();
        return todos.docs.map(todo => todo.data());
    },
    getTodo: async (id) => {
        const todo = await firestore.doc(`${baseUrl}/todos/todo_${id}`).get();
        return todo.data();
    },
    getTagsByTodo: async (todoId) => {
        const tags = await firestore.collection(`${baseUrl}/tags`)
            .where('todoRefs', 'array-contains', todoId)
            .get();
        return tags.docs.map(tag => tag.data());
    },
    getTags: async () => {
        const tags = await firestore.collection(`${baseUrl}/tags`).get();
        return tags.docs.map(tag => tag.data());
    },
    updateUser: async ({ userId, username, email }) => {
        const id = stringUtils_1.grabIdFromUserId(userId);
        await index_1.defaultAdmin.auth().updateUser(id, {
            displayName: username
        });
        const userDoc = firestore.doc(`${baseUrl}/users/${userId}`);
        const user = { userId, username, id, email };
        if ((await userDoc.get()).exists) {
            await userDoc.delete();
        }
        userDoc.set(user);
        const userDto = { user };
        return DtoUtils_1.resolveDto(userDto, "user");
    }
};
exports.default = TodoRepository;
//# sourceMappingURL=TodoRepository.js.map