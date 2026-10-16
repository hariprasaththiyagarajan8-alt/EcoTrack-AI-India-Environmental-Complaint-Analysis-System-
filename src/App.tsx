/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CitizenComplaintForm } from './components/CitizenComplaintForm';
import { TrackComplaint } from './components/TrackComplaint';
import { AdminDashboard } from './components/AdminDashboard';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminUser } from './types/environmental';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track' | 'admin' | 'docs'>('submit');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [trackRefId, setTrackRefId] = useState<string>('');

  // Check stored admin session token on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ecotrack_admin_user');
    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('ecotrack_admin_user');
      }
    }
  }, []);

  const handleLoginSuccess = (user: AdminUser, token: string) => {
    setAdminUser(user);
    localStorage.setItem('ecotrack_admin_user', JSON.stringify(user));
    localStorage.setItem('ecotrack_admin_token', token);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('ecotrack_admin_user');
    localStorage.removeItem('ecotrack_admin_token');
    setActiveTab('submit');
  };

  const handleSubmissionSuccess = (refId: string) => {
    setTrackRefId(refId);
  };

  const handleTrackRedirect = (refId: string) => {
    setTrackRefId(refId);
    setActiveTab('track');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminUser={adminUser}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1">
        {activeTab === 'submit' && (
          <CitizenComplaintForm
            onSubmissionSuccess={handleSubmissionSuccess}
            onTrackRedirect={handleTrackRedirect}
          />
        )}

        {activeTab === 'track' && (
          <TrackComplaint
            initialRefId={trackRefId}
            onLodgeNew={() => setActiveTab('submit')}
          />
        )}

        {activeTab === 'admin' && (
          adminUser ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <div className="max-w-md mx-auto py-16 px-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Officer Authentication Required</h2>
              <p className="text-xs text-slate-600 mb-6">
                The administrative dashboard is restricted to authorized environmental monitoring personnel.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Sign In with Officer Credentials
              </button>
            </div>
          )
        )}

        {activeTab === 'docs' && <ArchitectureDocs />}
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Statutory Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-700">
              EcoTrack AI – India Environmental Complaint Analysis System
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Natural Language Processing & Machine Learning for Environmental Governance</span>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right max-w-md">
            Grievance metrics reflect citizen filings and automated NLP classifications. Not an official statutory ambient index of CPCB/SPCB.
          </div>
        </div>
      </footer>
    </div>
  );
}
