import { FormEvent, useEffect, useRef } from "react";
import { X, Phone, Mail, MapPin, User } from "lucide-react";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "add";
  name: string;
  email: string;
  mobile: string;
  address: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMobile: (value: string) => void;
  setAddress: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function CustomerModal({
  isOpen,
  onClose,
  mode,
  name,
  email,
  mobile,
  address,
  setName,
  setEmail,
  setMobile,
  setAddress,
  onSubmit,
}: CustomerModalProps) {
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
        return "Customer Details";
      case "edit":
        return "Edit Customer";
      case "add":
        return "Add New Customer";
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 overflow-auto bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-auto mt-24"
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
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter customer name"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      readOnly={mode === "view"}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter customer email"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={mode === "view"}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter customer phone number"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      readOnly={mode === "view"}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter customer address"
                      className="pl-10 w-full border rounded-lg py-2 px-3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      readOnly={mode === "view"}
                      required
                    />
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
                  {mode === "edit" ? "Save Changes" : "Add Customer"}
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

export default CustomerModal;