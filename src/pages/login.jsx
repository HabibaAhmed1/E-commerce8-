import { useState } from "react";

export default function Login({ onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden bg-slate-900">
        <div className="hidden md:flex flex-col justify-center w-1/2 p-10 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold mb-4">Koda Commerce</h2>
          <h1 className="text-3xl font-bold mb-4">Manage Your Store Like a Pro</h1>
          <p className="mb-6">
            Control products, orders, users, carts and analytics from a modern
            dashboard.
          </p>
          <p className="mb-2">✓ Product Management</p>
          <p className="mb-2">✓ Order Tracking</p>
          <p>✓ Customer Insights</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8">
          <img src="/logo.png" alt="Koda Store" className="h-14 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
          <p className="text-slate-400 text-center mb-6">
            Sign in to your admin dashboard
          </p>

          <label className="block text-sm text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-400"
          />

          <label className="block text-sm text-slate-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-400"
          />

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">Secure Admin Access</p>
        </form>
      </div>
    </div>
  );
} 