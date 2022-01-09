"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDynamooseAsyncProviders = exports.createDynamooseProviders = void 0;
const common_1 = require("@nestjs/common");
const dynamoose = require("dynamoose");
const dynamoose_utils_1 = require("./common/dynamoose.utils");
const dynamoose_constants_1 = require("./dynamoose.constants");
function createDynamooseProviders(models = []) {
    const providers = (models || []).map((model) => ({
        provide: (0, dynamoose_utils_1.getModelToken)(model.name),
        useFactory: () => {
            const modelInstance = dynamoose.model(model.name, model.schema, model.options);
            if (model.serializers) {
                Object.entries(model.serializers).forEach(([key, value]) => {
                    modelInstance.serializer.add(key, value);
                });
            }
            return modelInstance;
        },
        inject: [dynamoose_constants_1.DYNAMOOSE_INITIALIZATION],
    }));
    return providers;
}
exports.createDynamooseProviders = createDynamooseProviders;
function createDynamooseAsyncProviders(modelFactories = []) {
    const providers = (modelFactories || []).map((model) => [
        {
            provide: (0, dynamoose_utils_1.getModelToken)(model.name),
            useFactory: (...args) => __awaiter(this, void 0, void 0, function* () {
                const schema = yield model.useFactory(...args);
                const modelInstance = dynamoose.model(model.name, schema, model.options);
                if (model.serializers) {
                    Object.entries(model.serializers).forEach(([key, value]) => {
                        modelInstance.serializer.add(key, value);
                    });
                }
                return modelInstance;
            }),
            inject: [dynamoose_constants_1.DYNAMOOSE_INITIALIZATION, ...(model.inject || [])],
        },
    ]);
    return (0, common_1.flatten)(providers);
}
exports.createDynamooseAsyncProviders = createDynamooseAsyncProviders;
