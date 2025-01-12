import { useState, useMemo } from "react";
import { 
  Search, 
  UserPlus, 
  Eye, 
  Pencil, 
  Trash2, 
  X,
  Phone,
  Mail,
  MapPin,
  User,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

type SortField = 'name' | 'email' | 'mobile' | 'address';
type SortOrder = 'asc' | 'desc';

const CustomerManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');


  const customers = useSelector((state:RootState ) => state.customer);
  
  
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.mobile.toLowerCase().includes(query) ||
        customer.address.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return result;
  }, [customers, searchQuery, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-blue-500" />
      : <ChevronDown className="h-4 w-4 text-blue-500" />;
  };

  const handleAction = (action: 'view' | 'edit' | 'add', customer?: Customer) => {
    setModalMode(action);
    setSelectedCustomer(customer || null);
    setIsModalOpen(true);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case 'view':
        return 'Customer Details';
      case 'edit':
        return 'Edit Customer';
      case 'add':
        return 'Add New Customer';
    }
  };

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-screen-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
        <button
          onClick={() => handleAction('add')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
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
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-290px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { field: 'name', label: 'Name' },
                  { field: 'email', label: 'Email' },
                  { field: 'mobile', label: 'Mobile' },
                  { field: 'address', label: 'Address' },
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
                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead> 
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleAction('view', customer)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', customer)}
                      className="text-amber-600 hover:text-amber-900 mx-2"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 mx-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog
        className="fixed inset-0 z-50 overflow-auto bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-auto mt-24"
        open={isModalOpen}
      >
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{getModalTitle()}</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    value={selectedCustomer?.name || ''}
                    readOnly={modalMode === 'view'}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    value={selectedCustomer?.email || ''}
                    readOnly={modalMode === 'view'}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    value={selectedCustomer?.mobile || ''}
                    readOnly={modalMode === 'view'}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    value={selectedCustomer?.address || ''}
                    readOnly={modalMode === 'view'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-4 border-t">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            {modalMode !== 'view' && (
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {modalMode === 'edit' ? 'Save Changes' : 'Add Customer'}
              </button>
            )}
          </div>
        </div>
      </dialog>
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsModalOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CustomerManage;