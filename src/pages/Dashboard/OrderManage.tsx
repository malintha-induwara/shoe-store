import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, ShoppingCart, X } from "lucide-react";
import { RootState } from "../../store/store";
import Customer from "../../models/Customer";
import Item from "../../models/Item";
import OrderItem from "../../models/OrderItem";
import ItemCartCard from "../../components/ItemCartCard";
import CustomerDropdown from "../../components/CustomerDropdown";
import { addOrder } from "../../reducers/OrderSlice";
import ItemCard from "../../components/ItemCard";

const OrderManage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [orderId, setOrderId] = useState("ORD-0001");
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

  const items = useSelector((state: RootState) => state.item);
  const customers = useSelector((state: RootState) => state.customer);

  const dispatch = useDispatch();

  const placeOrder = () => {
    if (!selectedCustomer) return;
    const newOrder = {
      id: orderId,
      orderDate: new Date(),
      customerId: selectedCustomer.id,
      totalAmount: total,
      orderItems: cart,
    };
    dispatch(addOrder(newOrder));
    resetCart();
  };

  const resetCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setOrderId(
      `ORD-${(parseInt(orderId.split("-")[1]) + 1).toString().padStart(4, "0")}`
    );
  };

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    );
  }, [items, searchTerm]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerSearch.toLowerCase())
    );
  }, [customers, customerSearch]);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = items.find((product) => product.id === item.itemId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }, [cart, items]);

  const canAddToCart = (item: Item) => {
    const cartItem = cart.find((x) => x.itemId === item.id);
    const currentQty = cartItem ? cartItem.quantity : 0;
    return currentQty < item.qty;
  };

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.itemId === item.id);
      if (existing) {
        return prev.map((OrderItem) =>
          OrderItem.itemId === item.id
            ? { ...OrderItem, quantity: OrderItem.quantity + 1 }
            : OrderItem
        );
      }
      return [...prev, { itemId: item.id, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: number, newQty: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item || newQty > item.qty) return;

    if (newQty < 1) {
      setCart((prev) => prev.filter((x) => x.itemId !== itemId));
      return;
    }
    setCart((prev) =>
      prev.map((x) => (x.itemId === itemId ? { ...x, quantity: newQty } : x))
    );
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-screen-[calc(100vh-4rem)] overflow-y-auto">
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Order Management
        </h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="p-2 rounded-lg bg-blue-600 text-white relative"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`flex-1 ${showCart ? "hidden" : "block"} lg:block`}>
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search items by name, size, or ID..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-190px)]">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                addToCart={addToCart}
                canAddToCart={canAddToCart}
              />
            ))}
          </div>
        </div>

        <div
          className={`w-full lg:w-96 bg-white rounded-xl shadow-lg p-4 ${
            showCart ? "block" : "hidden"
          } lg:block`}
        >
          <button
            onClick={() => setShowCart(false)}
            className="lg:hidden mb-4 text-blue-600 flex items-center gap-2"
          >
            <X size={20} />
            Back to Items
          </button>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">
              Order ID: {orderId}
            </span>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer
            </label>
            <CustomerDropdown
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              customerSearch={customerSearch}
              setCustomerSearch={setCustomerSearch}
              isCustomerDropdownOpen={isCustomerDropdownOpen}
              setIsCustomerDropdownOpen={setIsCustomerDropdownOpen}
              filteredCustomers={filteredCustomers}
            />
          </div>

          <div className="space-y-4 mb-6 h-[calc(100vh-481px)] overflow-y-auto">
            {cart.map((cartItem) => {
              const item = items.find((i) => i.id === cartItem.itemId);
              if (!item) return null;
              return (
                <ItemCartCard
                  key={item.id}
                  item={item}
                  cartItem={cartItem}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="text-xl font-semibold text-blue-600">
                Rs. {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
              disabled={!selectedCustomer || cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
