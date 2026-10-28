import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      toast.error('All fields are required');
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://e-commerce-api-3wara.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API endpoint error: Server returned HTML instead of JSON.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      toast.success('Login successful!');
      console.log('Login Success:', data);
      
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0b0f19] p-4 lg:p-0">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#111827] border border-gray-800 flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side: Gradient Banner & Features */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-8 lg:p-12 flex flex-col justify-between text-white relative">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span className="font-semibold text-lg tracking-wide">Koda Commerce</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
              Manage Your Store Like a Pro
            </h1>
            <p className="text-blue-100 text-sm lg:text-base mb-8">
              Control products, orders, users, carts and analytics from a modern dashboard experience.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-cyan-200 font-bold">✓</span>
              <span className="text-sm font-medium">Product Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-cyan-200 font-bold">✓</span>
              <span className="text-sm font-medium">Order Tracking</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-cyan-200 font-bold">✓</span>
              <span className="text-sm font-medium">Customer Insights</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-[#111827]">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gray-900 border border-gray-800 rounded-xl mb-4 shadow-inner">
              <h2 className="text-xl font-bold text-white tracking-wider">KODA <span className="text-cyan-400">STORE</span></h2>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Online Store</p>
            </div>
            <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
            <p className="text-gray-400 text-sm mt-1">Sign in to your admin dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f2937] border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="admin@koda.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f2937] border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition duration-200 disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">Secure Admin Access</p>
        </div>

      </div>
    </div>
  );
}