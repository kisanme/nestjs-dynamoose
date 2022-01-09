import { TransactionSettings } from 'dynamoose/dist/Transaction';
import { CallbackType, ConditionTransactionInput, CreateTransactionInput, DeleteTransactionInput, GetTransactionInput, UpdateTransactionInput } from './model.interface';
export declare type Transaction = GetTransactionInput | CreateTransactionInput | DeleteTransactionInput | UpdateTransactionInput | ConditionTransactionInput;
export declare type Transactions = (Transaction | Promise<Transaction>)[];
export declare abstract class TransactionSupport {
    transaction(transactions: Transactions, settings?: TransactionSettings, callback?: CallbackType<any, any>): any;
}
