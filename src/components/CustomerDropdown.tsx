import { ChevronDown } from "lucide-react";
import Customer from "../models/Customer";

interface CustomerDropdownProps {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer) => void;
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  isCustomerDropdownOpen: boolean;
  setIsCustomerDropdownOpen: (isOpen: boolean) => void;
  filteredCustomers: Customer[];
}

function CustomerDropdown({
  selectedCustomer,
  setSelectedCustomer,
  customerSearch,
  setCustomerSearch,
  isCustomerDropdownOpen,
  setIsCustomerDropdownOpen,
  filteredCustomers,
}: CustomerDropdownProps) {
  return (
    <div className="relative">
      <div className="relative">
        <div
          className="w-full px-4 py-2 rounded-lg border h-16 border-gray-300 bg-white flex items-center justify-between cursor-pointer"
          onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
        >
          {selectedCustomer ? (
            <div className="flex-1">
              <div className="font-medium">{selectedCustomer.name}</div>
              <div className="text-sm text-gray-600">
                {selectedCustomer.email}
              </div>
            </div>
          ) : (
            <span className="text-gray-500">Select Customer</span>
          )}
          <ChevronDown
            className={`transition-transform duration-200 ${
              isCustomerDropdownOpen ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>
      </div>

      {isCustomerDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-3 py-1.5 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setCustomerSearch("");
                  setIsCustomerDropdownOpen(false);
                }}
              >
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-gray-600">{customer.email}</div>
              </div>
            ))}
            {filteredCustomers.length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-center">
                No customers found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDropdown;
