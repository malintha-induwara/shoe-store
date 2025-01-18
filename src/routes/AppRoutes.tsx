import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import ProtectedRoute from "../ProtectedRoute";
import DashboardOverview from "../pages/Dashboard/DahboardOverview";
import CustomerManage from "../pages/Dashboard/CustomerManage";
import ItemManage from "../pages/Dashboard/ItemManage";
import UserManage from "../pages/Dashboard/UserManage";
import StaffManage from "../pages/Dashboard/StaffManage";
import OrderManage from "../pages/Dashboard/OrderManage";
import Transactions from "../pages/Dashboard/Transactions";
import Settings from "../pages/Dashboard/Settings";

function AppRoutes  () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview/>} />
          <Route path="customer-manage" element={<CustomerManage />} />
          <Route path="item-manage" element={<ItemManage />} />
          <Route path="staff-manage" element={<StaffManage />} />
          <Route path="order-manage" element={<OrderManage />} />
          <Route path="user-manage" element={<UserManage />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
