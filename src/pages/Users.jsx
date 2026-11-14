
import { useEffect, useState } from "react";

import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../api/user.api";

import LoadingSpinner from "../components/ui/LoadingSpinner";

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

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons = {
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    shield: (
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    ),
    verified: (
      <>
        <circle cx="10" cy="8" r="4" />
        <path d="M4 21v-2a6 6 0 0 1 12 0v2" />
        <path d="m17 11 2 2 4-4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m19 6-1 14H6L5 6" />
        <path d="M10 11v5M14 11v5" />
      </>
    ),
    close: (
      <>
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    x: (
      <>
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72l.3 2.7a2 2 0 0 1-.57 1.7L8.1 10.83a16 16 0 0 0 5.07 5.07l1.71-1.71a2 2 0 0 1 1.7-.57l2.7.3a2 2 0 0 1 1.72 2Z" />
    ),
  };

  return <svg {...common}>{icons[name] || icons.user}</svg>;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [updatingId, setUpdatingId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [localRoles, setLocalRoles] = useState({});

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUsers();
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

  // Form handlers
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;

    setEditForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Create user
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

      await addUser(payload);

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

  // Delete user
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

      await deleteUser(userId);

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

  // Open edit modal
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

  // Update user
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

      const response = await updateUser(userId, payload);

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

  // UI-only role toggle
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

  // Search
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      (user.username || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query) ||
      getRole(user).includes(query)
    );
  });

  // Statistics
  const admins = users.filter(
    (user) => getRole(user) === "admin"
  ).length;

  const customers = users.filter(
    (user) => getRole(user) === "customer"
  ).length;

  const verifiedUsers = users.filter(
    (user) => user.isVerified === true
  ).length;

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: "users",
    },
    {
      label: "Admins",
      value: admins,
      icon: "shield",
    },
    {
      label: "Customers",
      value: customers,
      icon: "users",
    },
    {
      label: "Verified",
      value: verifiedUsers,
      icon: "verified",
    },
  ];

  const closeCreateModal = () => {
    if (creating) return;

    setShowCreateModal(false);
    setForm(emptyForm);
  };

  const closeEditModal = () => {
    if (updatingId !== null) return;

    setEditingUser(null);
  };

// Loading
if (loading) {
  return <LoadingSpinner message="Loading users..." />;
}

  return (
    <main className="min-h-screen w-full space-y-6 bg-[var(--bg-app)] p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <section className="flex flex-col gap-5 rounded-3xl border border-[var(--border-app)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)] lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-cyan-500)]">
            User Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Manage Users
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Icon
              name="search"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users..."
              className="h-12 w-full rounded-2xl border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-cyan-500)] focus:ring-2 focus:ring-[var(--color-cyan-500)]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setError("");
              setSuccess("");
              setShowCreateModal(true);
            }}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--color-cyan-500)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition hover:bg-[var(--color-cyan-600)] active:scale-[0.98]"
          >
            <Icon name="plus" size={20} />
            Add User
          </button>
        </div>
      </section>

      {/* Alerts */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="shrink-0 font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="flex min-h-[114px] items-center justify-between rounded-3xl border border-[var(--border-app)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)] transition hover:-translate-y-1"
          >
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">
                {stat.label}
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {stat.value}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-cyan-500)] text-white">
              <Icon name={stat.icon} size={25} />
            </div>
          </article>
        ))}
      </section>

      {/* Users Table */}
      <section className="overflow-hidden rounded-3xl border border-[var(--border-app)] bg-[var(--bg-surface)] shadow-[var(--shadow-lg)]">

        <div className="flex flex-col gap-2 border-b border-[var(--border-app)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            All Users
          </h2>

          <span className="text-sm text-[var(--text-secondary)]">
            {filteredUsers.length} users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">

            <thead className="bg-[var(--bg-app)]">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                  User
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                  Verified
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const userId = user._id || user.id;
                const username = user.username || "Unnamed User";
                const role = getRole(user);

                return (
                  <tr
                    key={userId || user.email}
                    className="border-t border-[var(--border-app)] transition hover:bg-[var(--bg-surface-secondary)]"
                  >
                    {/* User Identity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-lg font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={username}
                              className="h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            username.charAt(0).toUpperCase()
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--text-primary)]">
                            {username}
                          </p>

                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {user.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          role === "admin"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                            : "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"
                        }`}
                      >
                        {role}
                      </span>
                    </td>

                    {/* Verified */}
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          <Icon name="check" size={19} />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <Icon
                            name="x"
                            size={19}
                            className="text-pink-500"
                          />
                          No
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          title="Edit user"
                          onClick={() => handleEdit(user)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white transition hover:bg-blue-600"
                        >
                          <Icon name="edit" size={17} />
                        </button>

                        <button
                          type="button"
                          title="Toggle role (interface only)"
                          onClick={() => handleToggleRole(user)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600"
                        >
                          <Icon name="shield" size={17} />
                        </button>

                        <button
                          type="button"
                          title="Delete user"
                          disabled={!userId || deletingId === userId}
                          onClick={() => handleDelete(user)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === userId ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ) : (
                            <Icon name="trash" size={17} />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon
                        name="users"
                        size={36}
                        className="text-[var(--text-muted)]"
                      />

                      <p className="font-semibold text-[var(--text-primary)]">
                        No users found
                      </p>

                      <p className="text-sm text-[var(--text-secondary)]">
                        Try another search or add a new user.
                      </p>
                    </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeCreateModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-user-title"
            className="my-auto w-full max-w-lg rounded-3xl border border-[var(--border-app)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-2xl)]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="create-user-title"
                  className="text-xl font-bold text-[var(--text-primary)]"
                >
                  Create New User
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Enter the details to add a new user.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                disabled={creating}
                className="rounded-xl p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-app)] hover:text-[var(--text-primary)] disabled:opacity-50"
              >
                <Icon name="close" size={21} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">

              <FormField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleFormChange}
                placeholder="Enter username"
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Enter email address"
                required
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleFormChange}
                placeholder="Enter password"
                minLength={6}
                required
              />

              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Enter phone number"
              />

              <p className="text-xs text-[var(--text-secondary)]">
                * Required fields
              </p>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={creating}
                  className="rounded-xl border border-[var(--border-app)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-app)] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-xl bg-[var(--color-cyan-500)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-cyan-600)] disabled:cursor-not-allowed disabled:opacity-60"
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
            className="my-auto w-full max-w-lg rounded-3xl border border-[var(--border-app)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-2xl)]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="edit-user-title"
                  className="text-xl font-bold text-[var(--text-primary)]"
                >
                  Edit User
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Update the user's information below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={updatingId !== null}
                className="rounded-xl p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-app)] hover:text-[var(--text-primary)] disabled:opacity-50"
              >
                <Icon name="close" size={21} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">

              <FormField
                label="Username"
                name="username"
                value={editForm.username}
                onChange={handleEditFormChange}
                placeholder="Enter username"
                required
              />

              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={editForm.phone}
                onChange={handleEditFormChange}
                placeholder="Enter phone number"
              />

              <FormField
                label="Avatar URL"
                name="avatar"
                type="url"
                value={editForm.avatar}
                onChange={handleEditFormChange}
                placeholder="https://example.com/avatar.png"
              />

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updatingId !== null}
                  className="rounded-xl border border-[var(--border-app)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-app)] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updatingId !== null}
                  className="rounded-xl bg-[var(--color-cyan-500)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-cyan-600)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingId !== null ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </section>
        </div>
      )}

    </main>
  );
}

// Reusable form field
function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="h-12 w-full rounded-xl border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-cyan-500)] focus:ring-2 focus:ring-[var(--color-cyan-500)]/10"
      />
    </label>
  );
}

export default Users;
