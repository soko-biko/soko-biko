import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Lock, Mail, User, LogIn } from 'lucide-react';

export function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirectTo') || '/trip-planner';

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl shadow-black/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-safari-orange/80">
              {isRegister ? 'Create account' : 'Welcome back'}
            </p>
            <h2 className="text-xl font-semibold text-slate-50 mt-1">
              {isRegister ? 'Join PlacesInKenya' : 'Sign in to continue'}
            </h2>
            <p className="text-[0.7rem] text-slate-400 mt-1 max-w-sm">
              You&apos;ll use this account to keep your trip boards in sync. No payments or bookings here—just ideas.
            </p>
          </div>
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-safari-orange/15 border border-safari-orange/50">
            <Lock className="h-4 w-4 text-safari-orange" />
          </div>
        </div>

        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-[0.7rem] text-slate-300">Name</label>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-transparent flex-1 text-xs text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Traveler name"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[0.7rem] text-slate-300">Email</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent flex-1 text-xs text-slate-100 outline-none placeholder:text-slate-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.7rem] text-slate-300">Password</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent flex-1 text-xs text-slate-100 outline-none placeholder:text-slate-500"
                placeholder="At least 6 characters"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-safari-orange px-3 py-2 text-xs font-medium text-white shadow-md shadow-safari-orange/40 hover:bg-safari-orange/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <span className="h-3 w-3 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
                {isRegister ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5" />
                {isRegister ? 'Create account' : 'Sign in'}
              </>
            )}
          </button>
        </form>

        <p className="mt-3 text-[0.7rem] text-slate-400 text-center">
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegister((v) => !v)}
            className="text-safari-orange hover:underline font-medium"
          >
            {isRegister ? 'Sign in' : 'Create one'}
          </button>
        </p>

        <p className="mt-3 text-[0.65rem] text-slate-500 text-center">
          This experience is for discovering places and organizing ideas only.{' '}
          <span className="text-slate-300">No booking or payment happens here.</span>
        </p>

        <p className="mt-2 text-[0.65rem] text-slate-600 text-center">
          Want to jump straight to destinations?{' '}
          <Link to="/explore" className="text-slate-300 hover:text-safari-orange">
            Explore without saving
          </Link>
        </p>
      </div>
    </div>
  );
}

