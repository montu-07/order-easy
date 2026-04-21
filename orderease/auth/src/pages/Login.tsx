import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { loginUser, clearError, clearSuccess } from 'host/authSlice';
import { useAppDispatch, useAppSelector } from 'host/hooks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useAppSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) dispatch(clearError());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-8 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-2">
        <div className="hidden bg-[#111111] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">OrderEase</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Welcome back.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Sign in to access your dashboard, manage orders, and continue with a clean and minimal experience.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Fast access</p>
            <p className="mt-2 text-3xl font-semibold">Everything in one place</p>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">Sign in</p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight text-black">
              Login to your account
            </h2>
            <p className="mt-4 text-base text-black/55">
              Use your email and password to continue.
            </p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Email address
                </label>
                <div className="flex items-center rounded-2xl border border-black/10 px-4 py-3">
                  <Mail className="mr-3 h-5 w-5 text-black/35" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Password
                </label>
                <div className="flex items-center rounded-2xl border border-black/10 px-4 py-3">
                  <Lock className="mr-3 h-5 w-5 text-black/35" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-3 text-black/40 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-black/50 hover:text-black">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-black px-4 py-3.5 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-black/55">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="font-medium text-black underline underline-offset-4"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;