"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DynamooseCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamooseCoreModule = void 0;
const common_1 = require("@nestjs/common");
const dynamoose_1 = require("dynamoose");
const dynamoose_logger_provider_1 = require("./dynamoose-logger.provider");
const dynamoose_constants_1 = require("./dynamoose.constants");
const dynamoose_module_1 = require("./dynamoose.module");
function initialization(options) {
    if (options.aws) {
        dynamoose_1.aws.sdk.config.update(options.aws);
    }
    if (options.local) {
        if (typeof options.local === 'boolean') {
            dynamoose_1.aws.ddb.local();
        }
        else {
            dynamoose_1.aws.ddb.local(options.local);
        }
    }
    if (options.model) {
        dynamoose_1.model.defaults.set(options.model);
    }
    if (options.logger) {
        let loggerService;
        if (typeof options.logger === 'boolean') {
            loggerService = new common_1.Logger(dynamoose_module_1.DynamooseModule.name);
        }
        else {
            loggerService = options.logger;
        }
        dynamoose_1.logger.providers.add(new dynamoose_logger_provider_1.LoggerProvider(loggerService));
    }
}
let DynamooseCoreModule = DynamooseCoreModule_1 = class DynamooseCoreModule {
    static forRoot(options = {}) {
        const initialProvider = {
            provide: dynamoose_constants_1.DYNAMOOSE_INITIALIZATION,
            useFactory: () => initialization(options),
        };
        return {
            module: DynamooseCoreModule_1,
            providers: [initialProvider],
            exports: [initialProvider],
        };
    }
    static forRootAsync(options) {
        const initialProvider = {
            provide: dynamoose_constants_1.DYNAMOOSE_INITIALIZATION,
            useFactory: (dynamoooseModuleOptions) => initialization(dynamoooseModuleOptions),
            inject: [dynamoose_constants_1.DYNAMOOSE_MODULE_OPTIONS],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: DynamooseCoreModule_1,
            imports: options.imports,
            providers: [...asyncProviders, initialProvider],
            exports: [initialProvider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: dynamoose_constants_1.DYNAMOOSE_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: dynamoose_constants_1.DYNAMOOSE_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createDynamooseOptions(); }),
            inject,
        };
    }
};
DynamooseCoreModule = DynamooseCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], DynamooseCoreModule);
exports.DynamooseCoreModule = DynamooseCoreModule;
