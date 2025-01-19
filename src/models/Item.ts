class Item {
    id: number;
    name: string;
    image: string;
    price: number;
    size: string;
    qty: number;
    status: string;

    constructor(id: number, name: string, image: string, price: number, size: string, qty: number, status: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.size = size;
        this.qty = qty;
        this.status = status;
    }
}

export default Item;