"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamooseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamooseModule = void 0;
const common_1 = require("@nestjs/common");
const dynamoose_core_module_1 = require("./dynamoose-core.module");
const dynamoose_providers_1 = require("./dynamoose.providers");
let DynamooseModule = DynamooseModule_1 = class DynamooseModule {
    static forRoot(options = {}) {
        return {
            module: DynamooseModule_1,
            imports: [dynamoose_core_module_1.DynamooseCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: DynamooseModule_1,
            imports: [dynamoose_core_module_1.DynamooseCoreModule.forRootAsync(options)],
        };
    }
    static forFeature(models = []) {
        const providers = (0, dynamoose_providers_1.createDynamooseProviders)(models);
        return {
            module: DynamooseModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static forFeatureAsync(factories = []) {
        const providers = (0, dynamoose_providers_1.createDynamooseAsyncProviders)(factories);
        const imports = factories.map((factory) => factory.imports || []);
        const uniqImports = new Set((0, common_1.flatten)(imports));
        return {
            module: DynamooseModule_1,
            imports: [...uniqImports],
            providers: providers,
            exports: providers,
        };
    }
};
DynamooseModule = DynamooseModule_1 = __decorate([
    (0, common_1.Module)({})
], DynamooseModule);
exports.DynamooseModule = DynamooseModule;
