"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./AppModule");
const bootstrap = async () => {
    const appContext = await core_1.NestFactory.createApplicationContext(AppModule_1.AppModule);
    return appContext;
};
exports.bootstrap = bootstrap;
