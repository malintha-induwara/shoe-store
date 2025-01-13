import { FormEvent } from "react";
import { useState, useMemo } from "react";
import {
  Search,
  PackagePlus,
  Eye,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ItemModal from "../../components/ItemModal";
import { addItem, deleteItem, updateItem } from "../../reducers/ItemSlice";

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  qty: number;
  status: string;
}

type SortField = "name" | "price" | "size" | "qty" | "status";
type SortOrder = "asc" | "desc";

function ItemManage() {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const items = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  const resetForm = () => {
    setName("");
    setImage("");
    setPrice("");
    setSize("");
    setQty("");
    setStatus("active");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemData = {
      name,
      image,
      price: parseFloat(price),
      size,
      qty: parseInt(qty),
      status,
    };

    if (modalMode === "add") {
      dispatch(addItem(itemData));
    } else if (modalMode === "edit" && selectedItem) {
      dispatch(updateItem({ ...itemData, id: selectedItem.id }));
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAction = (action: "view" | "edit" | "add", item?: Item) => {
    setModalMode(action);
    if (item && (action === "view" || action === "edit")) {
      setSelectedItem(item);
      setName(item.name);
      setImage(item.image);
      setPrice(item.price.toString());
      setSize(item.size);
      setQty(item.qty.toString());
      setStatus(item.status);
    } else {
      setSelectedItem(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleRemove = (item: Item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(item.id));
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.size.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortField === "price" || sortField === "qty") {
        return sortOrder === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }

      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();

      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return result;
  }, [items, searchQuery, sortField, sortOrder]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-gray-600 bg-gray-100";
      case "out-of-stock":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-screen-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Item Management
        </h1>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => handleAction("add")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors max-w-md"
        >
          <PackagePlus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-295px)]">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  { field: "id", label: "ID" },
                  { field: "name", label: "Name" },
                  { field: "image", label: "Image" },
                  { field: "price", label: "Price" },
                  { field: "size", label: "Size" },
                  { field: "qty", label: "Qty" },
                  { field: "status", label: "Status" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group bg-gray-50"
                    onClick={() =>
                      field !== "image" && handleSort(field as SortField)
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      {field !== "image" && (
                        <SortIcon field={field as SortField} />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    Rs.{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.size}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.qty}</td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleAction("view", item)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", item)}
                      className="text-amber-600 hover:text-amber-900 mx-2"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(item)}
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
      <ItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        name={name}
        image={image}
        price={price}
        size={size}
        qty={qty}
        status={status}
        setName={setName}
        setImage={setImage}
        setPrice={setPrice}
        setSize={setSize}
        setQty={setQty}
        setStatus={setStatus}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ItemManage;
