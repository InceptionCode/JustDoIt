"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
// Create a new client
const firestore = new firestore_1.Firestore();
const env = process.env.ENVIRONMENT;
const baseUrl = `${env}api/routes`;
console.debug("Base URL", baseUrl);
const TodoRepository = {
    getUser: async (userId) => {
        const user = await firestore.doc(`${baseUrl}/users/${userId}`).get();
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
    }
};
exports.default = TodoRepository;
//# sourceMappingURL=TodoRepository.js.map