import { Minus, Plus, X } from "lucide-react";
import Item from "../models/Item";
import OrderItem from "../models/OrderItem";

interface ItemCartCardProps {
  item: Item;
  cartItem: OrderItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

function ItemCartCard({
  item,
  cartItem,
  updateQuantity,
  removeFromCart,
}: ItemCartCardProps) {
  return (
    <>
      <div
        className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h4 className="font-medium">{item.name}</h4>
          <div className="text-sm text-gray-600">Size: {item.size}</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-200"
              disabled={cartItem.quantity >= item.qty}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">
            Rs. {item.price * cartItem.quantity}
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-600 mt-2"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemCartCard;
