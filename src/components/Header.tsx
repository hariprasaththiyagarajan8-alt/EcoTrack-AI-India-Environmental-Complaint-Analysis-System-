import React from 'react';
import { ShieldCheck, LogOut, FileText, Activity, MapPin, Send } from 'lucide-react';
import { AdminUser } from '../types/environmental';

interface HeaderProps {
  activeTab: 'submit' | 'track' | 'admin' | 'docs';
  setActiveTab: (tab: 'submit' | 'track' | 'admin' | 'docs') => void;
  adminUser: AdminUser | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  adminUser,
  onLogout,
  onOpenLogin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold shadow-sm">
              <span className="text-base tracking-tight font-mono">ET</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                EcoTrack <span className="text-emerald-700 font-semibold">AI</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                National Environmental Complaint Analysis
              </span>
            </div>
          </div>

          {/* Zone 2: Concise Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('submit')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'submit'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : 'hover:text-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Submit Complaint</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'track'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : 'hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Track Grievance</span>
            </button>

            <button
              onClick={() => {
                if (adminUser) {
                  setActiveTab('admin');
                } else {
                  onOpenLogin();
                }
              }}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'admin'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : 'hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'docs'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Python & NLP Specs</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {adminUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-900">{adminUser.name}</span>
                  <span className="text-[10px] text-emerald-700 font-mono">Authenticated Officer</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                Officer Portal Sign-in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
