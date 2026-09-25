import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Users,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to log in. Please check your credentials.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc] text-slate-900 selection:bg-[#2563eb] selection:text-white">
      {/* ================= LEFT SECTION: BRANDING & 3D SHOWCASE ================= */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between p-10 xl:p-14 overflow-hidden border-r border-slate-200/70 min-h-screen">
        {/* Full-width and full-height background image spanning the entire left area */}
        <div className="pointer-events-none absolute inset-0 h-full w-full select-none z-0">
          <img
            src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Admin-Crm-Image.webp"
            alt="Solvoka CRM 3D Workspace"
            className="h-full w-full object-cover object-center"
          />
          {/* Gentle soft ambient gradient so left text has ultra-sharp contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none" />
        </div>

        {/* Top: Logo & Subtitle */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#2563eb] p-1.5 shadow-md shadow-[#2563eb]/25">
              <img
                src="/solvoka-logo.webp"
                alt="Solvoka"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              Solvoka <span className="text-[#2563eb]">CRM</span>
            </span>
          </div>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500 font-semibold">
            Internal Operations Portal
          </p>
        </div>

        {/* Middle: Headline, Description & Features */}
        <div className="relative z-10 my-auto max-w-lg pt-8 pb-12">
          <h1 className="text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Smarter Operations <br />
            <span className="text-[#2563eb]">Stronger Growth.</span>
          </h1>

          <p className="mt-4 text-sm xl:text-base text-slate-600 leading-relaxed max-w-md">
            A unified CRM platform for streamlined processes, better collaboration, and measurable results.
          </p>

          {/* Feature Badges */}
          <div className="mt-8 space-y-4 max-w-sm">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100/70 text-[#2563eb] shadow-sm transition-transform group-hover:scale-105">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Unified Operations</h3>
                <p className="text-xs text-slate-500">People, processes and data in one place.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100/70 text-[#2563eb] shadow-sm transition-transform group-hover:scale-105">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Real-time Insights</h3>
                <p className="text-xs text-slate-500">Make faster, smarter decisions.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100/70 text-[#2563eb] shadow-sm transition-transform group-hover:scale-105">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Secure & Reliable</h3>
                <p className="text-xs text-slate-500">Your data, always protected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 pt-4 border-t border-slate-200/80">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-slate-400">
            People &times; Process &times; Progress
          </p>
        </div>
      </div>

      {/* ================= RIGHT SECTION: LOGIN FORM ================= */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-10 xl:px-16 bg-[#f8fafc]">
        {/* Header visible above login card */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#2563eb] p-1.5 shadow-md shadow-[#2563eb]/20">
              <img
                src="/solvoka-logo.webp"
                alt="Solvoka"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Solvoka <span className="text-[#2563eb]">CRM</span>
            </span>
          </div>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
            Internal Operations Portal
          </p>
        </div>

        {/* White Card Container */}
        <div className="w-full max-w-[430px] rounded-3xl bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-slate-100">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Administrator Login</h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your authorized email and password to access the CRM.
          </p>

          {error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative rounded-xl border border-slate-200 bg-slate-50/60 focus-within:border-[#2563eb] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2563eb]/10 transition-all">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative rounded-xl border border-slate-200 bg-slate-50/60 focus-within:border-[#2563eb] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2563eb]/10 transition-all">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center">
            <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <p className="text-[11px] text-slate-400 font-normal">
              Authorized personnel only. Sessions are encrypted and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

