import { ModelDefinition } from './interfaces';
import { AsyncModelFactory } from './interfaces/async-model-factory.interface';
export declare function createDynamooseProviders(models?: ModelDefinition[]): {
    provide: string;
    useFactory: () => import("dynamoose/dist/General").ModelType<import("dynamoose/dist/Document").AnyDocument>;
    inject: string[];
}[];
export declare function createDynamooseAsyncProviders(modelFactories?: AsyncModelFactory[]): {
    provide: string;
    useFactory: (...args: unknown[]) => Promise<import("dynamoose/dist/General").ModelType<import("dynamoose/dist/Document").AnyDocument>>;
    inject: any[];
}[];
