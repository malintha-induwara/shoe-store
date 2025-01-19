import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';
import { RootState } from '../../store/store';

const DashboardOverview = () => {
  const orders = useSelector((state: RootState) => state.order) ;
  const customers = useSelector((state: RootState) => state.customer) ;
  const items = useSelector((state: RootState) => state.item) ;

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.totalAmount, 0),
    [orders]
  );

  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const lowStockItems = items.filter((item) => item.qty < 10).length;

  const topSellingItems = useMemo(() => {
    const itemSales: Record<number, number> = {};
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        itemSales[item.itemId] = (itemSales[item.itemId] || 0) + item.quantity;
      });
    });

    return Object.entries(itemSales)
      .map(([itemId, quantity]) => ({
        name: items.find((item) => item.id === parseInt(itemId))?.name || 'Unknown',
        sales: quantity,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [orders, items]);

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold">Rs {totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-75" />
          </div>
        </div>

        <div className="rounded-lg shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <ShoppingBag className="h-8 w-8 opacity-75" />
          </div>
        </div>

        <div className="rounded-lg shadow-sm bg-gradient-to-br from-green-500 to-green-600 p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">Total Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <Users className="h-8 w-8 opacity-75" />
          </div>
        </div>

        <div className="rounded-lg shadow-sm bg-gradient-to-br from-red-500 to-red-600 p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">Low Stock Items</p>
              <p className="text-2xl font-bold">{lowStockItems}</p>
            </div>
            <AlertCircle className="h-8 w-8 opacity-75" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg shadow-sm bg-white ">
          <div className="px-6 py-4 ">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
          </div>
          <div className="px-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(-4).map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        Rs {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {order.orderItems.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-sm bg-white">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">Top Selling Items</h3>
          </div>
          <div className="p-6 pt-0 h-72 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
