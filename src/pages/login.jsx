import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('admin@koda.com');
  const [password, setPassword] = useState('admin1212');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);

    /* 
    
    //API Authentication 
    
    try {
      const response = await axios.post('https://e-commerce-api-3wara.vercel.app/api/auth/login', {
        email,
        password
      });

      const data = response.data;
      toast.success('Login successful!');
      localStorage.setItem('token', data.token || 'success_token'); 
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      let errorMsg = 'Failed to login';
      if (err.response?.status === 404) {
        errorMsg = 'User not found or invalid credentials';
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
    */

    // Temporary Bypass for Demo/Testing
    setTimeout(() => {
      localStorage.setItem('token', 'mock_admin_token_12345');
      toast.success('Login successful!');
      navigate('/dashboard');
      setLoading(false);
    }, 600);
  };

  const handleGoogleLogin = () => {
    /*
    // Google Auth API Integration Endpoint
    // await axios.post('https://e-commerce-api-3wara.vercel.app/api/auth/google', { token });
    */
    localStorage.setItem('token', 'mock_admin_token_12345');
    toast.success('Google login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0b0f19] p-4 lg:p-0">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#111827] border border-gray-800 flex-col lg:flex-row min-h-[600px]">
        
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-8 lg:p-12 flex flex-col justify-between text-white relative">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              
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

        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-[#111827]">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-gray-900 border border-gray-800 rounded-xl mb-4 shadow-inner">
              <h2 className="text-xl font-bold text-white tracking-wider">KODA <span className="text-cyan-400">STORE</span></h2>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Online Store</p>
            </div>
            <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
            <p className="text-gray-400 text-sm mt-1">Sign in to your admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
                <span className="text-xs text-gray-400">(admin@koda.com)</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f2937] border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f2937] border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="Enter your password"
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

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="px-3 text-xs text-gray-500 uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 bg-[#1f2937] hover:bg-gray-800 text-white font-medium rounded-xl border border-gray-700 flex items-center justify-center gap-3 transition duration-200 shadow-sm text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.18 21.31 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.39-1.49-.39-2.24s.14-1.52.39-2.24V6.61H1.2C.44 8.13 0 9.83 0 12s.44 3.87 1.2 5.39l4.07-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.69 1.2 6.61l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}