import { ChevronLeft, Layers } from "lucide-react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  UserCircle,
  Settings,ClipboardCheck,
  Package,
} from "lucide-react";
import Logo from '../assets/logo.svg';

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Customers", path: "/dashboard/customer-manage" },
  { icon: ShoppingBag, label: "Items", path: "/dashboard/item-manage" },
  { icon: UserCircle, label: "Users", path: "/dashboard/user-manage" },
  { icon: Users, label: "Staff", path: "/dashboard/staff-manage" },
  { icon: Package, label: "Orders", path: "/dashboard/order-manage" },
  { icon: Layers, label: "Transactions", path: "/dashboard/transactions" },
  { icon: ClipboardCheck, label: "Attendance", path: "/dashboard/attendance" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen: boolean;
}

function Sidebar  ({ isCollapsed, setIsCollapsed, isMobileMenuOpen }: SidebarProps)  {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        bg-white border-r border-gray-200`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && <img  className="h-8 md:mx-auto" src={Logo} alt="Logo" /> }
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
        >
          <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
            {!isCollapsed && (
              <span className="ml-3 text-gray-600 group-hover:text-blue-600">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
