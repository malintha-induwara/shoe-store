import { FormEvent, useEffect, useRef, useState } from "react";
import { X, Calendar,  Search } from "lucide-react";

interface Staff {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  hireDate: Date;
}

interface User {
  email: string;
  role: string;
}

interface Attendance {
  id: number;
  date: Date;
  staff: Staff[];
  createdBy: User;
  createdAt: Date;
}

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "add";
  attendance: Attendance | null;
  onSubmit: (date: Date, selectedStaffIds: number[], mode: "add" | "edit") => void;
  allStaff: Staff[];
}

function AttendanceModal({
  isOpen,
  onClose,
  mode,
  attendance,
  onSubmit,
  allStaff,
}: AttendanceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStaffIds, setSelectedStaffIds] = useState<number[]>([]);
  const [searchStaff, setSearchStaff] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      return () => {
        dialog.close();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (attendance) {
      setSelectedDate(attendance.date);
      setSelectedStaffIds(attendance.staff.map((s) => s.id));
    } else {
      setSelectedDate(new Date());
      setSelectedStaffIds([]);
    }
    setSearchStaff("");
  }, [attendance]);

  const getModalTitle = () => {
    switch (mode) {
      case "view":
        return "Attendance Details";
      case "edit":
        return "Edit Attendance";
      case "add":
        return "Mark Attendance";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(selectedDate, selectedStaffIds, mode === "add" ? "add" : "edit");
  };

  const filteredStaff = allStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchStaff.toLowerCase())
  );

  const toggleStaffSelection = (staffId: number) => {
    setSelectedStaffIds((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStaffIds.length === filteredStaff.length) {
      setSelectedStaffIds([]);
    } else {
      setSelectedStaffIds(filteredStaff.map((staff) => staff.id));
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className=" bg-white rounded-lg shadow-xl  w-full max-w-xl"
      >
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {getModalTitle()}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} method="dialog">
            <div className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      disabled={mode === "view"}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Staff Attendance
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search staff..."
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={searchStaff}
                        onChange={(e) => setSearchStaff(e.target.value)}
                        disabled={mode === "view"}
                      />
                    </div>

                    <div className="border rounded-lg max-h-60 overflow-y-auto">
                      {mode !== "view" && (
                        <div className="p-2 border-b bg-gray-50">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={
                                selectedStaffIds.length === filteredStaff.length &&
                                filteredStaff.length > 0
                              }
                              onChange={handleSelectAll}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Select All
                            </span>
                          </label>
                        </div>
                      )}
                      {filteredStaff.map((staff) => (
                        <label
                          key={staff.id}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer"
                        >
                          {mode !== "view" && (
                            <input
                              type="checkbox"
                              checked={selectedStaffIds.includes(staff.id)}
                              onChange={() => toggleStaffSelection(staff.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {staff.name}
                            </p>
                            <p className="text-xs text-gray-500">{staff.email}</p>
                          </div>
                          <span
                            className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              selectedStaffIds.includes(staff.id)
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedStaffIds.includes(staff.id)
                              ? "Present"
                              : "Absent"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              {mode !== "view" && (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {mode === "edit" ? "Save Changes" : "Mark Attendance"}
                </button>
              )}
            </div>
          </form>
        </div>
      </dialog>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

export default AttendanceModal;