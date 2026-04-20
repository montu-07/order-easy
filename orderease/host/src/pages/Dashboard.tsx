import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Package, Settings, LogOut, ArrowUpRight } from 'lucide-react';
import { logout } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cards = [
    {
      title: 'Orders',
      description: 'Track and manage your recent orders.',
      icon: Package,
    },
    {
      title: 'Products',
      description: 'Browse product activity and updates.',
      icon: Box,
    },
    {
      title: 'Settings',
      description: 'Update your account and preferences.',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f7f7f5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-black/35">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Welcome{user?.name ? `, ${user.name}` : ''}.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">
              This is your protected dashboard. Manage your workflow with a clean and minimal experience.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl border border-black/10 bg-black p-3 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-black/30 transition group-hover:text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-black">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{card.description}</p>

                <button className="mt-6 text-sm font-medium text-black underline underline-offset-4">
                  Open
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="text-2xl font-semibold text-black">Quick overview</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55">
            Your account is active and protected. From here, you can extend this dashboard with analytics, order summaries, profile settings, and product management.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f7f5] p-5">
              <p className="text-sm text-black/45">Status</p>
              <p className="mt-2 text-lg font-semibold text-black">Active</p>
            </div>
            <div className="rounded-2xl bg-[#f7f7f5] p-5">
              <p className="text-sm text-black/45">Role</p>
              <p className="mt-2 text-lg font-semibold text-black">{user?.role || 'USER'}</p>
            </div>
            <div className="rounded-2xl bg-[#f7f7f5] p-5">
              <p className="text-sm text-black/45">Session</p>
              <p className="mt-2 text-lg font-semibold text-black">Authenticated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;