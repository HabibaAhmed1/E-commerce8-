import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@koda.com");
  const [password, setPassword] = useState("admin1212");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const loginEndpoint = import.meta.env.VITE_LOGIN_ENDPOINT;

      if (!loginEndpoint) {
        toast.error("Please configure VITE_LOGIN_ENDPOINT in .env");
        return;
      }

      const response = await api.post(loginEndpoint, {
        email: email.trim(),
        password,
      });

      const data = response.data;

      const token =
        data?.token ||
        data?.accessToken ||
        data?.data?.token ||
        data?.data?.accessToken;

      if (!token || typeof token !== "string") {
        toast.error(
          "Login response did not contain a recognized token."
        );
        return;
      }

      localStorage.setItem("token", token);

      const user =
        data?.user ||
        data?.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info(
      "Google login is not configured yet. Please use email and password."
    );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0b0f19] p-4 lg:p-0">
      <div className="flex w-full max-w-5xl min-h-[600px] flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] shadow-2xl lg:flex-row">

        {/* Left Side */}
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-8 text-white lg:w-1/2 lg:p-12">
          <div>
            <div className="mb-8 flex items-center gap-2">
              <span className="rounded-lg bg-white/10 p-2 backdrop-blur-md">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-wide">
                Koda Commerce
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:text-4xl">
              Manage Your Store Like a Pro
            </h1>

            <p className="mb-8 text-sm text-blue-100 lg:text-base">
              Control products, orders, users, carts and analytics
              from a modern dashboard experience.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Product Management",
              "Order Tracking",
              "Customer Insights",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
              >
                <span className="font-bold text-cyan-200">✓</span>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center bg-[#111827] p-8 lg:w-1/2 lg:p-12">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-block rounded-xl border border-gray-800 bg-gray-900 p-3 shadow-inner">
              <h2 className="text-xl font-bold tracking-wider text-white">
                KODA <span className="text-cyan-400">STORE</span>
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Online Store
              </p>
            </div>

            <h3 className="text-2xl font-bold text-white">
              Welcome Back
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Sign in to your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Email Address
                </label>
                <span className="text-xs text-gray-400">
                  Admin account
                </span>
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ✉️
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] py-3 pl-10 pr-4 text-sm text-white transition placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Password
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  🔒
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] py-3 pl-10 pr-4 text-sm text-white transition placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-gray-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-800" />
            <span className="px-3 text-xs uppercase tracking-wider text-gray-500">
              OR
            </span>
            <div className="flex-grow border-t border-gray-800" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-gray-800"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-cyan-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
