"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAdmin = void 0;
const tslib_1 = require("tslib");
const functions = tslib_1.__importStar(require("firebase-functions"));
const admin = tslib_1.__importStar(require("firebase-admin"));
const express_1 = tslib_1.__importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const schema_1 = tslib_1.__importDefault(require("./schema"));
exports.defaultAdmin = admin.initializeApp();
const env = process.env.ENVIRONMENT;
console.info(`In ${env} environment`);
const isDev = env === "dev";
console.info('Defining server');
const server = express_1.default();
server.use(cors_1.default({ origin: true }))
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: false }))
    .use('/', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: isDev,
}));
// IN Dev only Remove when deploying
if (isDev) {
    server.listen(3000);
}
exports.api = functions.runWith({ memory: "2GB", timeoutSeconds: 120 }).https.onRequest(server);
//# sourceMappingURL=index.js.map