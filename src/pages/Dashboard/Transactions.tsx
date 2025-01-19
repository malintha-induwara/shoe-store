import { useState, useMemo} from "react";
import { Search, Eye, ChevronUp, ChevronDown, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Orders from "../../models/Orders";
import TransactionModal from "../../components/TransactionModal";

type SortField = "id" | "customerName" | "totalAmount" | "orderDate";
type SortOrder = "asc" | "desc";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const orders = useSelector((state: RootState) => state.order);
  const customers = useSelector((state: RootState) => state.customer);
  const items = useSelector((state: RootState) => state.item);

  const handleViewDetails = (order: Orders) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getCustomerName = (customerId: number) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  const getItemDetails = (itemId: number) => {
    return items.find((item) => item.id === itemId);
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    if (startDate && endDate) {
      result = result.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const customerName = getCustomerName(order.customerId).toLowerCase();
        return (
          order.id.toString().includes(query) ||
          customerName.includes(query) ||
          order.totalAmount.toString().includes(query)
        );
      });
    }

    result.sort((a, b) => {
      if (sortField === "customerName") {
        const aName = getCustomerName(a.customerId).toLowerCase();
        const bName = getCustomerName(b.customerId).toLowerCase();
        return sortOrder === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }

      if (sortField === "totalAmount") {
        return sortOrder === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }

      if (sortField === "orderDate") {
        return sortOrder === "asc"
          ? new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
          : new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      }

      return sortOrder === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    });

    return result;
  }, [searchQuery, sortField, sortOrder, startDate, endDate]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return (
        <ChevronUp className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
      );
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 text-blue-500" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-500" />
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-screen-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto  overflow-y-auto max-h-[calc(100vh-295px)]">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-50 sticky top-0 z-10 ">
              <tr>
                {[
                  { field: "id", label: "Order ID" },
                  { field: "customerName", label: "Customer Name" },
                  { field: "totalAmount", label: "Total Amount" },
                  { field: "orderDate", label: "Date" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort(field as SortField)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      <SortIcon field={field as SortField} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCustomerName(order.customerId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs.{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TransactionModal
        isModalOpen={isModalOpen}
        selectedOrder={selectedOrder}
        handleCloseModal={handleCloseModal}
        getCustomerName={getCustomerName}
        getItemDetails={getItemDetails}
      />
    </div>
  );
}

export default Transactions;
