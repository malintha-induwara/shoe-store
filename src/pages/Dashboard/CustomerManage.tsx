import { FormEvent } from "react";
import { useState, useMemo } from "react";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import CustomerModal from "../../components/CustomerModal";
import { addCustomer, deleteCustomer, updateCustomer } from "../../reducers/CustomerSlice";
import Customer from "../../models/Customer";


type SortField = "name" | "email" | "mobile" | "address";
type SortOrder = "asc" | "desc";

function CustomerManage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const customers = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAddress("");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = {
      name,
      email,
      mobile,
      address,
    };

    if (modalMode === "add") {
      dispatch(addCustomer(customerData));
    } else if (modalMode === "edit" && selectedCustomer) {
      dispatch(updateCustomer({ ...customerData, id: selectedCustomer.id }));
    }
    
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };


  const handleAction = (
    action: "view" | "edit" | "add",
    customer?: Customer
  ) => {
    setModalMode(action);
    if (customer && (action === "view" || action === "edit")) {
      setSelectedCustomer(customer);
      setName(customer.name);
      setEmail(customer.email);
      setMobile(customer.mobile);
      setAddress(customer.address);
    } else {
      setSelectedCustomer(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleRemove = (customer: Customer) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(customer.id));
    }
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.mobile.toLowerCase().includes(query) ||
          customer.address.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return result;
  }, [customers, searchQuery, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-screen-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8 ">
        <h1 className="text-2xl font-semibold text-gray-900">
          Customer Management
        </h1>
        
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => handleAction("add")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors max-w-md"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-295px)]">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  { field: "name", label: "Name" },
                  { field: "email", label: "Email" },
                  { field: "mobile", label: "Mobile" },
                  { field: "address", label: "Address" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group bg-gray-50"
                    onClick={() => handleSort(field as SortField)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      <SortIcon field={field as SortField} />
                    </div>
                  </th>
                ))}
                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleAction("view", customer)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", customer)}
                      className="text-amber-600 hover:text-amber-900 mx-2"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleRemove(customer)} className="text-red-600 hover:text-red-900 mx-2">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        name={name}
        email={email}
        mobile={mobile}
        address={address}
        setName={setName}
        setEmail={setEmail}
        setMobile={setMobile}
        setAddress={setAddress}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default CustomerManage;
