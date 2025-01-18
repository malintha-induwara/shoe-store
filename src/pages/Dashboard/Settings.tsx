import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Lock, UserX} from "lucide-react";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");


  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const validatePasswordChange = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return false;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordChange()) return;
    setPasswordSuccess("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Password is required to delete account");
      return;
    }

    dispatch({ type: "auth/deleteAccount" });
    setShowDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
    setDeletePassword("");
    setDeleteError("");
  };
  return (
    <div className="p-4 lg:p-7 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className=" flex justify-center gap-5">
        <div className="max-w-xl w-full space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Delete Account
            </h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center"
            >
              <UserX className="h-5 w-5 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
        <div className="w-full max-w-xl ">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Change Password
            </h2>
            {passwordError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {passwordSuccess}
              </div>
            )}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full border rounded-lg py-2 px-3"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        showDeleteDialog={showDeleteDialog}
        deleteError={deleteError}
        deletePassword={deletePassword}
        handleCloseDialog={handleCloseDialog}
        handleDeleteAccount={handleDeleteAccount}
        setDeletePassword={setDeletePassword}
      />
    </div>
  );
}

export default Settings;
