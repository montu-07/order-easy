import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { clearError, clearSuccess } from 'host/authSlice';
import { useAppDispatch, useAppSelector } from 'host/hooks';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useAppSelector((state: any) => state.auth);

  // Local signup function since host doesn't export it
  const signupUser = async (userData: { name: string; email: string; password: string; role: string }) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(clearError());
        return;
      }

      // Store token in localStorage
      if (data.data.accessToken) {
        localStorage.setItem('token', data.data.accessToken);
      }

      dispatch(clearSuccess());
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) dispatch(clearError());
    if (localError) setLocalError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    dispatch(
      signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white px-4 py-10">
      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="hidden w-1/2 flex-col justify-between bg-black p-12 text-white lg:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">OrderEase</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Create your account.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Join OrderEase and get a clean, fast, and focused experience for managing your activity.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/60">Simple onboarding</p>
              <p className="mt-2 text-2xl font-medium">Start in a few seconds</p>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 sm:p-10 lg:w-1/2 lg:p-14">
          <div className="mx-auto max-w-md">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-black/40">
                Sign up
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/55">
                Fill in your details to get started.
              </p>
            </div>

            {(error || localError) && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {localError || error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Full name
                </label>
                <div className="flex items-center rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-black">
                  <User className="mr-3 h-5 w-5 text-black/35" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Email address
                </label>
                <div className="flex items-center rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-black">
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
                <div className="flex items-center rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-black">
                  <Lock className="mr-3 h-5 w-5 text-black/35" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-3 text-black/40 transition hover:text-black"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Confirm password
                </label>
                <div className="flex items-center rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-black">
                  <Lock className="mr-3 h-5 w-5 text-black/35" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="ml-3 text-black/40 transition hover:text-black"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[15px] text-black outline-none"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-black px-4 py-3.5 text-sm font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-black/55">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-black underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;