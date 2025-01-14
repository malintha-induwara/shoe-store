import { FormEvent, useEffect, useRef } from "react";
import { X, Mail, Phone, MapPin, Users, Calendar, User } from "lucide-react";

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "add";
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  hireDate: Date;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMobile: (value: string) => void;
  setAddress: (value: string) => void;
  setRole: (value: string) => void;
  setHireDate: (value: Date) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function StaffModal({
  isOpen,
  onClose,
  mode,
  name,
  email,
  mobile,
  address,
  role,
  hireDate,
  setName,
  setEmail,
  setMobile,
  setAddress,
  setRole,
  setHireDate,
  onSubmit,
}: StaffModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const getModalTitle = () => {
    switch (mode) {
      case "view":
        return "Staff Details";
      case "edit":
        return "Edit Staff";
      case "add":
        return "Add New Staff";
    }
  };

  return (
    <>
      <dialog ref={dialogRef} className="rounded-lg shadow-xl w-full max-w-2xl">
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

          <form onSubmit={onSubmit} method="dialog">
            <div className="p-4 space-y-4">
              <div className="flex gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter staff name"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        placeholder="Enter address"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        className="pl-10 w-full border rounded-lg py-2 px-3 appearance-none"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={mode === "view"}
                        required
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                        <option value="Inventory">Inventory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hire Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={hireDate.toISOString().split("T")[0]}
                        onChange={(e) => setHireDate(new Date(e.target.value))}
                        readOnly={mode === "view"}
                        required
                      />
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
                  {mode === "edit" ? "Save Changes" : "Add Staff"}
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

export default StaffModal;
