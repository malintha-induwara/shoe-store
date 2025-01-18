import OrderItem from "./OrderItem";

class Orders{
    id: number;
    orderDate: Date;
    customerId: number;
    totalAmount: number;
    orderItems: OrderItem[];
    constructor(id: number, orderDate: Date, customerId: number, totalAmount: number, orderItems: OrderItem[]){
        this.id = id;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.orderItems = orderItems;
    }
    
}

export default Orders;