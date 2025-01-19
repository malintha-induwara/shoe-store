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
import AttendanceModal from "../../components/AttendanceModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Attendance from "../../models/Attendance";
import {
  addAttendance,
  deleteAttendance,
  updateAttendance,
} from "../../reducers/AttendanceSlice";

type SortField = "date" | "createdBy";
type SortOrder = "asc" | "desc";

function AttendanceManage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const loggedUser = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user).find((element) => {
    return element.email === loggedUser.email;
  })!;
  const staff = useSelector((state: RootState) => state.staff);
  const attendance = useSelector((state: RootState) => state.attendance);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttendance(null);
  };

  const handleAction = (
    action: "view" | "edit" | "add",
    attendance?: Attendance
  ) => {
    setModalMode(action);
    if (attendance) {
      setSelectedAttendance(attendance);
    } else {
      setSelectedAttendance(null);
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (
    date: Date,
    selectedStaffIds: number[],
    mode: "add" | "edit"
  ) => {
    const selectedStaff = staff.filter((staff) =>
      selectedStaffIds.includes(staff.id)
    );

    const attendanceData = {
      date,
      staff: selectedStaff,
      createdBy: user,
      createdAt: new Date(),
    };

    if (mode === "add") {
      dispatch(addAttendance(attendanceData));
    } else if (mode === "edit" && selectedAttendance) {
      dispatch(
        updateAttendance({ ...attendanceData, id: selectedAttendance.id })
      );
    }

    handleCloseModal();
  };

  const handleRemove = (attendance: Attendance) => {
    if (
      window.confirm("Are you sure you want to delete this attendance record?")
    ) {
      dispatch(deleteAttendance(attendance.id));
    }
  };

  const filteredAndSortedAttendance = useMemo(() => {
    let result = [...attendance];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (record) =>
          record.date.toLocaleDateString().includes(query) ||
          record.createdBy.email.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      } else {
        const aValue = a.createdBy.email.toLowerCase();
        const bValue = b.createdBy.email.toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

    return result;
  }, [attendance, searchQuery, sortField, sortOrder]);

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
          Attendance Management
        </h1>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search attendance records..."
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
          Add Attendance
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-295px)]">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group bg-gray-50"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <SortIcon field="date" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Present
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group bg-gray-50"
                  onClick={() => handleSort("createdBy")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Created By</span>
                    <SortIcon field="createdBy" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {record.staff.length} Present
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.createdBy.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.createdAt.toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleAction("view", record)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", record)}
                      className="text-amber-600 hover:text-amber-900 mx-2"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(record)}
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

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        attendance={selectedAttendance}
        onSubmit={handleFormSubmit}
        allStaff={staff}
      />
    </div>
  );
}

export default AttendanceManage;
