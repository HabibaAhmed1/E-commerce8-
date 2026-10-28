
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Users.css";

const emptyForm = {
  username: "",
  email: "",
  password: "",
  phone: "",
};

const emptyEditForm = {
  username: "",
  phone: "",
  avatar: "",
};

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [localRoles, setLocalRoles] = useState({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users/all");
      const data = response.data;

      const usersList = Array.isArray(data)
        ? data
        : data.users || data.data || [];

      setUsers(usersList);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const payload = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      if (form.phone.trim()) {
        payload.phone = form.phone.trim();
      }

      await api.post("/users/add", payload);

      setForm(emptyForm);
      setShowCreateModal(false);
      setSuccess("User created successfully.");
      await fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create user."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (user) => {
    const userId = user._id || user.id;

    if (!userId) {
      setError("Cannot delete user: ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        user.username || user.email
      }?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(userId);
      setError("");
      setSuccess("");

      await api.delete(`/users/${userId}`);

      setUsers((current) =>
        current.filter(
          (item) => (item._id || item.id) !== userId
        )
      );

      setLocalRoles((current) => {
        const updated = { ...current };
        delete updated[userId];
        return updated;
      });

      setSuccess("User deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete user."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (user) => {
    setError("");
    setSuccess("");
    setEditingUser(user);

    setEditForm({
      username: user.username || "",
      phone: user.phone || "",
      avatar: user.avatar || "",
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const userId = editingUser?._id || editingUser?.id;

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    try {
      setUpdatingId(userId);
      setError("");
      setSuccess("");

      const payload = {
        username: editForm.username.trim(),
        phone: editForm.phone.trim(),
        avatar: editForm.avatar.trim(),
      };

      const response = await api.patch(
        `/users/${userId}`,
        payload
      );

      const updatedUser = response.data?.user;

      setUsers((current) =>
        current.map((user) =>
          (user._id || user.id) === userId
            ? { ...user, ...(updatedUser || payload) }
            : user
        )
      );

      setEditingUser(null);
      setSuccess("User updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update user."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // UI-only role toggle; the API has no role-update endpoint.
  const handleToggleRole = (user) => {
    const userId = user._id || user.id;

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const currentRole = (
      localRoles[userId] || user.role || "customer"
    ).toLowerCase();

    if (!["admin", "customer"].includes(currentRole)) {
      setError("This user's role cannot be toggled.");
      return;
    }

    const newRole =
      currentRole === "admin" ? "customer" : "admin";

    setLocalRoles((current) => ({
      ...current,
      [userId]: newRole,
    }));

    setError("");
    setSuccess(
      `Role changed to ${newRole} in the interface only.`
    );
  };

  const getRole = (user) =>
    (
      localRoles[user._id || user.id] ||
      user.role ||
      "customer"
    ).toLowerCase();

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      (user.username || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query) ||
      getRole(user).includes(query)
    );
  });

  const admins = users.filter(
    (user) => getRole(user) === "admin"
  ).length;

  const customers = users.filter(
    (user) => getRole(user) === "customer"
  ).length;

  if (loading) {
    return <div className="users-message">Loading users...</div>;
  }

  return (
    <main className="users-page">
      <section className="users-heading">
        <div>
          <p className="users-eyebrow">USER MANAGEMENT</p>
          <h1>Manage Users</h1>
          <p className="users-subtitle">
            View and manage all registered users.
          </p>
        </div>

        <div className="users-heading-actions">
          <input
            className="users-search"
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button
            type="button"
            className="users-open-create-button"
            onClick={() => {
              setForm(emptyForm);
              setError("");
              setShowCreateModal(true);
            }}
          >
            <span aria-hidden="true">＋</span> Add User
          </button>
        </div>
      </section>

      {error && (
        <div className="users-error" role="alert">
          {error}
          <button type="button" onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div className="users-success" role="status">
          {success}
          <button type="button" onClick={() => setSuccess("")}>
            Dismiss
          </button>
        </div>
      )}

      <section className="users-stats">
        <article className="users-stat-card">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </article>

        <article className="users-stat-card">
          <span>Admins</span>
          <strong>{admins}</strong>
        </article>

        <article className="users-stat-card">
          <span>Customers</span>
          <strong>{customers}</strong>
        </article>
      </section>

      <section className="users-table-card">
        <div className="users-table-heading">
          <h2>All Users</h2>
          <span>{filteredUsers.length} users</span>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const userId = user._id || user.id;
                const username = user.username || "Unnamed User";
                const role = getRole(user);

                return (
                  <tr key={userId || user.email}>
                    <td>
                      <div className="users-identity">
                        <div className="users-avatar">
                          {username.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{username}</strong>
                          <span>{user.email || "No email"}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`users-role ${
                          role === "admin"
                            ? "admin-role"
                            : "customer-role"
                        }`}
                      >
                        {role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`users-verified ${
                          user.isVerified ? "verified" : "unverified"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </td>

                    <td>
                      <div className="users-action-buttons">
                        <button
                          type="button"
                          className="users-edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="users-verify-button"
                          onClick={() => handleToggleRole(user)}
                        >
                          Toggle Role
                        </button>

                        <button
                          type="button"
                          className="users-delete-button"
                          disabled={!userId || deletingId === userId}
                          onClick={() => handleDelete(user)}
                        >
                          {deletingId === userId ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="users-empty">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create User Modal */}
      {showCreateModal && (
        <div
          className="users-modal-backdrop"
          onClick={(event) => {
            if (
              event.target === event.currentTarget &&
              !creating
            ) {
              setShowCreateModal(false);
            }
          }}
        >
          <section
            className="users-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-user-title"
          >
            <div className="users-modal-heading">
              <div>
                <h2 id="create-user-title">Create New User</h2>
                <p>Enter the details to add a new user.</p>
              </div>

              <button
                type="button"
                className="users-modal-close"
                aria-label="Close"
                disabled={creating}
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <label>
                Username *
                <input
                  name="username"
                  value={form.username}
                  onChange={handleFormChange}
                  placeholder="Enter username"
                  required
                />
              </label>

              <label>
                Email *
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Enter email address"
                  required
                />
              </label>

              <label>
                Password *
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleFormChange}
                  placeholder="Enter password"
                  minLength={6}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="Enter phone number"
                />
              </label>

              <p className="users-required-note">
                * Required fields
              </p>

              <div className="users-form-actions">
                <button
                  type="button"
                  className="users-clear-button"
                  disabled={creating}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="users-create-button"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="users-modal-backdrop"
          onClick={(event) => {
            if (
              event.target === event.currentTarget &&
              updatingId === null
            ) {
              setEditingUser(null);
            }
          }}
        >
          <section
            className="users-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
          >
            <div className="users-modal-heading">
              <div>
                <h2 id="edit-user-title">Edit User</h2>
                <p>Update the user's information below.</p>
              </div>

              <button
                type="button"
                className="users-modal-close"
                aria-label="Close"
                disabled={updatingId !== null}
                onClick={() => setEditingUser(null)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <label>
                Username *
                <input
                  name="username"
                  value={editForm.username}
                  onChange={handleEditFormChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={handleEditFormChange}
                />
              </label>

              <label>
                Avatar URL
                <input
                  name="avatar"
                  type="url"
                  value={editForm.avatar}
                  onChange={handleEditFormChange}
                  placeholder="https://example.com/avatar.png"
                />
              </label>

              <div className="users-form-actions">
                <button
                  type="button"
                  className="users-clear-button"
                  disabled={updatingId !== null}
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="users-create-button"
                  disabled={
                    updatingId === (editingUser._id || editingUser.id)
                  }
                >
                  {updatingId === (editingUser._id || editingUser.id)
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Users;
