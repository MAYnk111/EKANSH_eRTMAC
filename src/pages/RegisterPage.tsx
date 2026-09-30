import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Drill, Shield, Lock, Mail, User, Building, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Drilling Engineer');
  const [org, setOrg] = useState('Oil India Limited (Assam Asset)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerWithEmail(email, password, name, role, org);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-oil-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-2xl border border-cyan-400/50">
          <span className="font-mono">OIL</span>
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-white uppercase">
          Register Operational Credentials
        </h2>
        <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
          eRTMAC – NEARBY WELLS INTELLIGENCE SYSTEM
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-oil-navy-900/90 py-8 px-6 shadow-2xl rounded-2xl border border-oil-navy-700/80 backdrop-blur-md space-y-5">
          {error && (
            <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Bhaskar Borah"
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Oil India Operational Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="b.borah@oilindia.in"
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Operational Role
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
                >
                  <option value="Drilling Engineer">Drilling Engineer</option>
                  <option value="eRTMAC Operator">eRTMAC Operator</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="OIL Management">OIL Management</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Asset / Organization
                </label>
                <input
                  type="text"
                  required
                  value={org}
                  onChange={e => setOrg(e.target.value)}
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-950 mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-oil-navy-800">
            Already registered?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
