import { FormEvent, useEffect, useRef } from "react";
import {
  X,
  Package,
  DollarSign,
  Ruler,
  ListOrdered,
  Activity,
} from "lucide-react";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "add";
  name: string;
  image: string;
  price: string;
  size: string;
  qty: string;
  status: string;
  setName: (value: string) => void;
  setImage: (value: string) => void;
  setPrice: (value: string) => void;
  setSize: (value: string) => void;
  setQty: (value: string) => void;
  setStatus: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function ItemModal({
  isOpen,
  onClose,
  mode,
  name,
  image,
  price,
  size,
  qty,
  status,
  setName,
  setImage,
  setPrice,
  setSize,
  setQty,
  setStatus,
  onSubmit,
}: ItemModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

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
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("border-blue-500");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("border-blue-500");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("border-blue-500");

      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [setImage]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const getModalTitle = () => {
    switch (mode) {
      case "view":
        return "Item Details";
      case "edit":
        return "Edit Item";
      case "add":
        return "Add New Item";
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
                <div className="space-y-4 " >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter product name"
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
                      Image
                    </label>
                    {mode !== "view" && (
                      <div
                        ref={dropZoneRef}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        {image ? (
                          <div className="relative">
                            <img
                              src={image}
                              alt="Product"
                              className="mx-auto h-32 w-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="hidden"
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer text-blue-600 hover:text-blue-500"
                            >
                              Drop an image here or click to upload
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                    {mode === "view" && image && (
                      <img
                        src={image}
                        alt="Product"
                        className="h-32 w-32 object-cover rounded"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter size"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="relative">
                      <ListOrdered className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        placeholder="Enter quantity"
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        readOnly={mode === "view"}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        className="pl-10 w-full border rounded-lg py-2 px-3"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={mode === "view"}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
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
                  {mode === "edit" ? "Save Changes" : "Add Item"}
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

export default ItemModal;
