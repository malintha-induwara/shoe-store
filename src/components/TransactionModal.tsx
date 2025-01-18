import { useEffect, useRef } from "react";
import Orders from "../models/Orders";
import { X } from "lucide-react";
import OrderItem from "../models/OrderItem";
import Item from "../models/Item";

interface TransactionModalProps {
  isModalOpen: boolean;
  selectedOrder: Orders | null;
  handleCloseModal: () => void;
  getCustomerName: (customerId: number) => string;
  getItemDetails: (itemId: number) => Item | undefined;
}

function TransactionModal({
  isModalOpen,
  selectedOrder,
  handleCloseModal,
  getCustomerName,
  getItemDetails,
}: TransactionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      return () => {
        dialog.close();
      };
    }
  }, [isModalOpen]);

  return (
    <>
      <dialog ref={dialogRef} className="rounded-lg shadow-xl w-full max-w-2xl">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Details #{selectedOrder?.id}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">
                Customer Information
              </h4>
              <p>
                Name:
                {selectedOrder && getCustomerName(selectedOrder.customerId)}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Order Items</h4>
              <div className="mt-2 border rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Item
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder?.orderItems.map((orderItem: OrderItem) => {
                      const item = getItemDetails(orderItem.itemId);
                      return (
                        <tr key={orderItem.itemId}>
                          <td className="px-4 py-2">{item?.name}</td>
                          <td className="px-4 py-2">{orderItem.quantity}</td>
                          <td className="px-4 py-2">
                            Rs.{(item?.price * orderItem.quantity).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="font-medium">Total Amount:</span>
              <span>Rs.{selectedOrder?.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end p-4 border-t">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseModal}
        ></div>
      )}
    </>
  );
}

export default TransactionModal;
