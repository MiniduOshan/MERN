import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const API_BASE = "http://localhost:5000/api/auth";

const AdminDashboard = () => {
  const { user: currentUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview"); // overview | users
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorSummary, setErrorSummary] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  // load summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const { data } = await axios.get(`${API_BASE}/admin/summary`);
        setSummary(data);
        setErrorSummary(null);
      } catch (err) {
        console.error(err);
        setErrorSummary(
          err.response?.data?.message || "Failed to load summary."
        );
      } finally {
        setLoadingSummary(false);
      }
    };
    fetchSummary();
  }, []);

  // load users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await axios.get(`${API_BASE}/admin/users`);
      setUsers(data);
      setErrorUsers(null);
    } catch (err) {
      console.error(err);
      setErrorUsers(
        err.response?.data?.message || "Failed to load users."
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      setUpdatingUserId(id);
      await axios.put(`${API_BASE}/admin/users/${id}/role`, { role: newRole });
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to update user role."
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeletingUserId(id);
      await axios.delete(`${API_BASE}/admin/users/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to delete user."
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <p className="text-xs text-gray-400 mt-1">
            Logged in as {currentUser?.name} ({currentUser?.email})
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "overview"
                ? "bg-gray-800"
                : "hover:bg-gray-800/60"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "users"
                ? "bg-gray-800"
                : "hover:bg-gray-800/60"
            }`}
          >
            Users
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-sm py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <section className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {activeTab === "overview" ? "Dashboard Overview" : "Manage Users"}
            </h2>
            <p className="text-sm text-gray-600">
              {activeTab === "overview"
                ? "Quick stats about your application."
                : "View, promote or remove users."}
            </p>
          </div>
        </div>

        {/* Content based on tab */}
        {activeTab === "overview" && (
          <div>
            {errorSummary && (
              <p className="text-red-600 mb-4">{errorSummary}</p>
            )}

            {loadingSummary && (
              <p className="text-gray-600">Loading summary...</p>
            )}

            {!loadingSummary && summary && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="text-sm text-gray-500">Total users</p>
                  <p className="text-3xl font-semibold">
                    {summary.stats?.users ?? 0}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <p className="text-sm text-gray-500">Admins</p>
                  <p className="text-3xl font-semibold">
                    {summary.stats?.admins ?? 0}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="text-lg font-medium">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Users</h3>
              <button
                onClick={fetchUsers}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
              >
                Refresh
              </button>
            </div>

            {errorUsers && (
              <p className="text-red-600 mb-4">{errorUsers}</p>
            )}

            {loadingUsers ? (
              <p className="text-gray-600">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">Created</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-3 py-2">{u.name}</td>
                        <td className="px-3 py-2">{u.email}</td>
                        <td className="px-3 py-2">
                          <select
                            value={u.role}
                            onChange={(e) =>
                              handleRoleChange(u._id, e.target.value)
                            }
                            disabled={updatingUserId === u._id}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            disabled={deletingUserId === u._id}
                            className="text-red-600 hover:underline text-sm"
                          >
                            {deletingUserId === u._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
