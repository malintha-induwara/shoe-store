import { FormEvent, useState, useMemo } from "react";
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
import StaffModal from "../../components/StaffModal";
import { addStaff, deleteStaff, updateStaff } from "../../reducers/StaffSlice";

interface Staff {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  hireDate: Date;
}

type SortField = "name" | "email" | "role";
type SortOrder = "asc" | "desc";

function StaffManage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("Sales");
  const [hireDate, setHireDate] = useState<Date>(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const staff = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch();

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAddress("");
    setRole("Sales");
    setHireDate(new Date());
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const staffData = {
      name,
      email,
      mobile,
      address,
      role,
      hireDate,
    };

    if (modalMode === "add") {
      dispatch(addStaff(staffData));
    } else if (modalMode === "edit" && selectedStaff) {
      dispatch(updateStaff({ ...staffData, id: selectedStaff.id }));
    }
    
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAction = (
    action: "view" | "edit" | "add",
    staff?: Staff
  ) => {
    setModalMode(action);
    if (staff && (action === "view" || action === "edit")) {
      setSelectedStaff(staff);
      setName(staff.name);
      setEmail(staff.email);
      setMobile(staff.mobile);
      setAddress(staff.address);
      setRole(staff.role);
      setHireDate(staff.hireDate);
    } else {
      setSelectedStaff(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleRemove = (staff: Staff) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      dispatch(deleteStaff(staff.id));
    }
  };

  const filteredAndSortedStaff = useMemo(() => {
    let result = [...staff];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (staff) =>
          staff.name.toLowerCase().includes(query) ||
          staff.email.toLowerCase().includes(query) ||
          staff.role.toLowerCase().includes(query)
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
  }, [staff, searchQuery, sortField, sortOrder]);

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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Staff Management
        </h1>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
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
          Add Staff
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
                  { field: "role", label: "Role" },
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
              {filteredAndSortedStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      staff.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      staff.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      staff.role === 'Sales' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {staff.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleAction("view", staff)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", staff)}
                      className="text-amber-600 hover:text-amber-900 mx-2"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(staff)}
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
      <StaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        name={name}
        email={email}
        mobile={mobile}
        address={address}
        role={role}
        hireDate={hireDate}
        setName={setName}
        setEmail={setEmail}
        setMobile={setMobile}
        setAddress={setAddress}
        setRole={setRole}
        setHireDate={setHireDate}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default StaffManage;