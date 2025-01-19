import { FormEvent, useEffect, useRef } from "react";
import { X, Mail, Lock, Users } from "lucide-react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "add";
  email: string;
  password: string;
  role: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function UserModal({
  isOpen,
  onClose,
  mode,
  email,
  password,
  role,
  setEmail,
  setPassword,
  setRole,
  onSubmit,
}: UserModalProps) {
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
        return "User Details";
      case "edit":
        return "Edit User";
      case "add":
        return "Add New User";
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className=" bg-white rounded-lg shadow-xl w-full max-w-md"
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

          <form onSubmit={onSubmit} method="dialog">
            <div className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter user email"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={mode === "view"}
                      required
                    />
                  </div>
                </div>

                {mode !== "view" && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        placeholder={
                          mode === "edit"
                            ? "Enter new password"
                            : "Enter password"
                        }
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={mode === "add"}
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
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
                  {mode === "edit" ? "Save Changes" : "Add User"}
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

export default UserModal;
