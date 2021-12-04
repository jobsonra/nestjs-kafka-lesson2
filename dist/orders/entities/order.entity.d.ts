import { Model } from 'sequelize-typescript';
export declare enum OrderStatus {
    Approved = "approved",
    Pending = "pending"
}
export declare class Order extends Model {
    id: string;
    amount: number;
    status: OrderStatus;
}
