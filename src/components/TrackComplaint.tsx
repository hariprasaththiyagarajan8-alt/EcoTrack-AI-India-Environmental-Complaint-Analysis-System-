import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { ComplaintStatus } from '../types/environmental';

interface TrackComplaintProps {
  initialRefId?: string;
  onLodgeNew: () => void;
}

export const TrackComplaint: React.FC<TrackComplaintProps> = ({
  initialRefId = '',
  onLodgeNew,
}) => {
  const [refInput, setRefInput] = useState(initialRefId);
  const [isLoading, setIsLoading] = useState(false);
  const [complaintData, setComplaintData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!refInput.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setComplaintData(null);

    try {
      const res = await fetch(`/api/complaints/track/${encodeURIComponent(refInput.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Complaint not found with this reference ID.');
      }
      setComplaintData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error retrieving complaint status.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStepIndex = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return 0;
      case 'Under Review':
        return 1;
      case 'In Progress':
        return 2;
      case 'Resolved':
        return 3;
      case 'Rejected':
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { label: 'Submitted', desc: 'Complaint registered in national portal' },
    { label: 'Under Review', desc: 'Environmental officer triaging complaint' },
    { label: 'In Progress', desc: 'Field inspection or enforcement action' },
    { label: 'Resolved', desc: 'Pollution mitigation completed' },
  ];

  const currentStep = complaintData ? getStatusStepIndex(complaintData.status) : 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-2">
          <span>Public Grievance Tracker</span>
          <span aria-hidden="true">·</span>
          <span>Transparent Administrative Audit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Track Environmental Complaint Status
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Enter your unique reference ID (e.g., <code className="font-mono text-emerald-800 font-semibold">ECO-IN-2026-1001</code>) 
          to monitor administrative actions, field inspection updates, and resolution milestones.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={refInput}
              onChange={e => setRefInput(e.target.value)}
              placeholder="Enter Reference ID (e.g. ECO-IN-2026-1001)"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none uppercase font-mono text-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !refInput.trim()}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            {isLoading ? 'Searching...' : 'Track Status'}
          </button>
        </div>

        {/* Quick Demo Reference IDs */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span>Try sample reference IDs:</span>
          {['ECO-IN-2026-1001', 'ECO-IN-2026-1003', 'ECO-IN-2026-1004', 'ECO-IN-2026-1009', 'ECO-IN-2026-1013'].map(id => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setRefInput(id);
              }}
              className="font-mono text-emerald-800 hover:underline cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      </form>

      {errorMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800 text-sm mb-6">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Record Not Found</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {complaintData && (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400">Reference ID</span>
                <div className="text-xl font-bold font-mono text-slate-900">
                  {complaintData.id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Current Status:</span>
                <span className="px-3 py-1 text-xs font-semibold rounded-md bg-emerald-100 text-emerald-800">
                  {complaintData.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            {complaintData.status !== 'Rejected' ? (
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {steps.map((st, idx) => {
                    const isDone = currentStep >= idx;
                    const isCurrent = currentStep === idx;
                    return (
                      <div
                        key={st.label}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50 border-emerald-500'
                            : isDone
                            ? 'bg-slate-50 border-slate-300'
                            : 'bg-white border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-mono">
                              {idx + 1}
                            </div>
                          )}
                          <span className={`text-xs font-semibold ${isDone ? 'text-emerald-900' : 'text-slate-600'}`}>
                            {st.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {st.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs mb-6">
                <strong>Complaint Status: Rejected</strong>
                <p className="mt-1">
                  This grievance was reviewed and marked as non-actionable or outside the jurisdiction of environmental boards.
                </p>
              </div>
            )}

            {/* Metadata Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200 mb-5">
              <div>
                <span className="text-slate-400 block">Classified Category:</span>
                <span className="font-semibold text-slate-800">{complaintData.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Geographic Location:</span>
                <span className="font-medium text-slate-800">
                  {complaintData.city_town_village}, {complaintData.district}, {complaintData.state}
                </span>
                {complaintData.locality && (
                  <span className="block text-slate-500 text-[11px] mt-0.5">
                    Locality: {complaintData.locality}
                  </span>
                )}
              </div>
              <div>
                <span className="text-slate-400 block">Filing Timestamp:</span>
                <span className="font-mono text-slate-700">
                  {new Date(complaintData.submission_date).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                Submitted Grievance Details:
              </span>
              <p className="text-sm text-slate-800 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                {complaintData.description}
              </p>
            </div>
          </div>

          {/* Activity / Audit History */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Administrative History & Milestones</span>
            </h3>

            <div className="space-y-3">
              {complaintData.history && complaintData.history.length > 0 ? (
                complaintData.history.map((hist: any) => (
                  <div key={hist.id} className="flex items-start gap-3 text-xs border-l-2 border-emerald-600 pl-3 py-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{hist.action}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-emerald-800">{hist.actor}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{hist.details}</p>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(hist.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No administrative logs recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
