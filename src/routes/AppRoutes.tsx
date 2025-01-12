import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

// import Dashboard from "../pages/Dashboard/Dashboard";
// import CustomerManage from "../pages/Dashboard/CustomerManage";
// import ItemManage from "../pages/Dashboard/ItemManage";
// import OrderManage from "../pages/Dashboard/OrderManage";
// import StaffManage from "../pages/Dashboard/StaffManage";
// import Transactions from "../pages/Dashboard/Transactions";
// import UserManage from "../pages/Dashboard/UserManage";
import ProtectedRoute from "../ProtectedRoute";
import DashboardOverview from "../pages/Dashboard/DahboardOverview";
import CustomerManage from "../pages/Dashboard/CustomerManage";

const AppRoutes = () => {
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
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview/>} />
          <Route path="customer-manage" element={<CustomerManage />} />
          {/* <Route path="item-manage" element={<ItemManage />} />
          <Route path="order-manage" element={<OrderManage />} />
          <Route path="staff-manage" element={<StaffManage />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="user-manage" element={<UserManage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
