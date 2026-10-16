import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import {
  LayoutDashboard, FileText, BarChart3, Map, TrendingUp, Cpu, Download,
  History, Search, Filter, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw,
  Plus, MessageSquare, ChevronRight, X, ArrowUpRight, ShieldCheck, MapPin, Eye
} from 'lucide-react';
import {
  EnvironmentalComplaint,
  EnvironmentalCategory,
  ComplaintStatus,
  DashboardStats,
  ModelMetrics,
  RuleBasedRecommendation,
  ENVIRONMENTAL_CATEGORIES,
  COMPLAINT_STATUSES
} from '../types/environmental';
import { INDIAN_STATES_AND_UTS } from '../data/indiaGeo';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'complaints' | 'pollution' | 'states' | 'trends' | 'model' | 'reports' | 'activity'
  >('overview');

  // Dashboard Stats & Charts state
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartsData, setChartsData] = useState<any | null>(null);
  const [recommendations, setRecommendations] = useState<RuleBasedRecommendation[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Complaints Management State
  const [complaints, setComplaints] = useState<EnvironmentalComplaint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterState, setFilterState] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState<EnvironmentalComplaint | null>(null);

  // Modal Action States
  const [statusChange, setStatusChange] = useState<string>('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [categoryCorrection, setCategoryCorrection] = useState<string>('');
  const [correctionReason, setCorrectionReason] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);

  // State analysis section state
  const [selectedAnalysisState, setSelectedAnalysisState] = useState('Delhi');

  // Load dashboard overview data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, chartsRes, recsRes, modelRes, logRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/dashboard/charts'),
        fetch('/api/admin/analytics/recommendations'),
        fetch('/api/admin/model/performance'),
        fetch('/api/admin/activity-log'),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (chartsRes.ok) setChartsData(await chartsRes.json());
      if (recsRes.ok) {
        const data = await recsRes.json();
        setRecommendations(data.recommendations || []);
      }
      if (modelRes.ok) setModelMetrics(await modelRes.json());
      if (logRes.ok) setActivityLogs(await logRes.json());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load complaints list
  const loadComplaints = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (filterCategory !== 'All') params.append('category', filterCategory);
      if (filterState !== 'All') params.append('state', filterState);
      if (filterStatus !== 'All') params.append('status', filterStatus);

      const res = await fetch(`/api/admin/complaints?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setComplaints(data.complaints);
      }
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadComplaints();
  }, [searchQuery, filterCategory, filterState, filterStatus]);

  // Handle status update
  const handleUpdateStatus = async () => {
    if (!selectedComplaint || !statusChange) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/complaints/${selectedComplaint.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusChange,
          remarks: statusRemarks,
          actor: 'Er. Rajesh Sharma',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedComplaint(data.complaint);
        loadComplaints();
        loadDashboardData();
        setStatusRemarks('');
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle category correction (Human review)
  const handleCorrectCategory = async () => {
    if (!selectedComplaint || !categoryCorrection) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/complaints/${selectedComplaint.id}/category`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryCorrection,
          reason: correctionReason,
          actor: 'Er. Rajesh Sharma',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedComplaint(data.complaint);
        loadComplaints();
        loadDashboardData();
        setCorrectionReason('');
      }
    } catch (err) {
      console.error('Category correction failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle adding private note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !newNoteText.trim()) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/complaints/${selectedComplaint.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newNoteText.trim(),
          author: 'Er. Rajesh Sharma',
          role: 'Administrator',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const updated = { ...selectedComplaint, notes: [...selectedComplaint.notes, data.note] };
        setSelectedComplaint(updated);
        setNewNoteText('');
        loadComplaints();
      }
    } catch (err) {
      console.error('Add note failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Retrain model trigger
  const handleRetrainModel = async () => {
    setIsRetraining(true);
    try {
      const res = await fetch('/api/admin/model/retrain', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setModelMetrics(data.metrics);
        loadDashboardData();
      }
    } catch (err) {
      console.error('Retrain failed:', err);
    } finally {
      setIsRetraining(false);
    }
  };

  // Color palette for charts
  const CHART_COLORS = ['#059669', '#0d9488', '#0284c7', '#d97706', '#dc2626', '#8b5cf6', '#64748b'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between">
        <div>
          <div className="p-5 border-b border-slate-100">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-800">
              Admin Governance Console
            </span>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              EcoTrack Control Center
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'complaints', label: 'Environmental Complaints', icon: FileText },
              { id: 'pollution', label: 'Pollution Analysis', icon: BarChart3 },
              { id: 'states', label: 'State & District Analysis', icon: Map },
              { id: 'trends', label: 'Trends & Recommendations', icon: TrendingUp },
              { id: 'model', label: 'Model Performance', icon: Cpu },
              { id: 'reports', label: 'Reports & Exports', icon: Download },
              { id: 'activity', label: 'Admin Activity Log', icon: History },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Officer Footer Info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            <span className="text-[11px] font-semibold text-slate-700">Database Active</span>
          </div>
          <div className="text-[11px] text-slate-500">
            <span>Logged in: </span>
            <strong className="text-slate-700">Er. Rajesh Sharma</strong>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Header & Official Notice Banner */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Environmental Complaints Monitoring Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time grievance telemetry and NLP classification across Indian states & districts
                  </p>
                </div>
                <button
                  onClick={loadDashboardData}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 shadow-2xs self-start"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh Telemetry</span>
                </button>
              </div>

              {/* Data Disclaimer Notice Banner */}
              <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Data Classification Notice:</strong> Statistics and metrics displayed here represent 
                  <strong> reported citizen complaints</strong> analyzed through natural language processing and 
                  machine learning. Internal complaint frequency is an operational indicator for grievance management 
                  and must not be presented as certified ambient pollution measurements by government bodies.
                </span>
              </div>
            </div>

            {/* 8 KPI Cards Grid */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Total Complaints</span>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    {stats.total_complaints}
                  </div>
                  <span className="text-[11px] text-slate-400">All registered records</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Submitted Today</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums mt-1">
                    {stats.submitted_today}
                  </div>
                  <span className="text-[11px] text-slate-400">Past 24 hours</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Under Review</span>
                  <div className="text-2xl font-bold font-mono text-amber-600 tabular-nums mt-1">
                    {stats.under_review}
                  </div>
                  <span className="text-[11px] text-slate-400">Pending officer triage</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">In Progress</span>
                  <div className="text-2xl font-bold font-mono text-sky-600 tabular-nums mt-1">
                    {stats.in_progress}
                  </div>
                  <span className="text-[11px] text-slate-400">Field action initiated</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Resolved Cases</span>
                  <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums mt-1">
                    {stats.resolved}
                  </div>
                  <span className="text-[11px] text-slate-400">Remediation closed</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Most Reported Issue</span>
                  <div className="text-sm font-bold text-slate-900 truncate mt-2" title={stats.most_reported_issue}>
                    {stats.most_reported_issue}
                  </div>
                  <span className="text-[11px] text-slate-400">Top complaint category</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Most Reported State</span>
                  <div className="text-sm font-bold text-slate-900 truncate mt-2" title={stats.most_reported_state}>
                    {stats.most_reported_state}
                  </div>
                  <span className="text-[11px] text-slate-400">State-level volume leader</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-medium text-slate-500 block">Most Reported District</span>
                  <div className="text-sm font-bold text-slate-900 truncate mt-2" title={stats.most_reported_district}>
                    {stats.most_reported_district}
                  </div>
                  <span className="text-[11px] text-slate-400">District priority hotspot</span>
                </div>
              </div>
            )}

            {/* Core Charts (2x2 Grid) */}
            {chartsData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Categories */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Complaints by Environmental Category</h2>
                      <p className="text-xs text-slate-500">Distribution across Indian environmental issues</p>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartsData.categoryChart.slice(0, 8)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#059669" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: State-wise */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">State-wise Complaint Distribution</h2>
                      <p className="text-xs text-slate-500">Top reported Indian States & Union Territories</p>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartsData.stateChart.slice(0, 7)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="state" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3: Status Distribution */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Complaint Resolution Status</h2>
                      <p className="text-xs text-slate-500">Breakdown of administrative handling stage</p>
                    </div>
                  </div>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartsData.statusChart}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }: any) => `${name || ''} (${(((percent as number) || 0) * 100).toFixed(0)}%)`}
                        >
                          {chartsData.statusChart.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 4: Monthly Trend */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Monthly Complaint Volume Trend</h2>
                      <p className="text-xs text-slate-500">Seasonal variation and reporting patterns</p>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartsData.monthlyChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="complaints" stroke="#059669" strokeWidth={2.5} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: ENVIRONMENTAL COMPLAINTS (MANAGEMENT MODULE) */}
        {activeSection === 'complaints' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Environmental Complaints Management</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review grievances, inspect ML predictions, correct categories, and update case progress
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/api/admin/reports/export?format=csv"
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </a>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ID, text, locality..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
                />
              </div>

              <div>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
                >
                  <option value="All">All Categories (18 Issues)</option>
                  {ENVIRONMENTAL_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filterState}
                  onChange={e => setFilterState(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
                >
                  <option value="All">All States / UTs</option>
                  {INDIAN_STATES_AND_UTS.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
                >
                  <option value="All">All Statuses</option>
                  {COMPLAINT_STATUSES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Complaints Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Complaint ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Category (Model / Human)</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Confidence</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {complaints.length > 0 ? (
                      complaints.map(c => {
                        const isCorrected = c.human_reviewed_category && c.human_reviewed_category !== c.predicted_category;
                        return (
                          <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                              {c.id}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono">
                              {new Date(c.submission_date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-slate-900">
                                {c.human_reviewed_category || c.predicted_category}
                              </span>
                              {isCorrected && (
                                <span className="block text-[10px] text-amber-700 font-medium">
                                  Human Corrected (Pred: {c.predicted_category})
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className="block text-slate-800">{c.district}, {c.state}</span>
                              {c.locality && (
                                <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                                  {c.locality}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                                c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                                c.status === 'In Progress' ? 'bg-sky-100 text-sky-800' :
                                c.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                                c.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono tabular-nums text-emerald-700 font-medium whitespace-nowrap">
                              {(c.prediction_confidence * 100).toFixed(0)}%
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => setSelectedComplaint(c)}
                                className="px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                              >
                                Review & Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                          No complaints match the current filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: POLLUTION ANALYSIS (4 MAJOR DOMAINS & KEYWORDS) */}
        {activeSection === 'pollution' && chartsData && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pollution Domain & Keyword Analysis</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Aggregated domain analysis across Air, Water, Land/Waste, and Noise categories in India
              </p>
            </div>

            {/* 4 Major Domains Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {chartsData.domainsChart.map((dom: any) => (
                <div key={dom.domain} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-semibold text-slate-500 block">{dom.domain}</span>
                  <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    {dom.count}
                  </div>
                  <span className="text-[11px] text-slate-400">Total recorded grievances</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Breakdown */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h2 className="text-sm font-bold text-slate-900 mb-1">Major Pollution Domains Ratio</h2>
                <p className="text-xs text-slate-500 mb-4">Proportion across atmospheric, aquatic, soil/waste and noise domains</p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartsData.domainsChart}
                        dataKey="count"
                        nameKey="domain"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        label={({ name, percent }: any) => `${(name || '').split(' ')[0]} (${(((percent as number) || 0) * 100).toFixed(0)}%)`}
                      >
                        {chartsData.domainsChart.map((d: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={d.color || CHART_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Frequently Reported Hotspot Locations */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h2 className="text-sm font-bold text-slate-900 mb-1">Most Frequently Reported Locations</h2>
                <p className="text-xs text-slate-500 mb-4">Water bodies, industrial corridors, and landfills mentioned in complaints</p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartsData.topLocationsChart} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="location" type="category" width={130} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: STATE & DISTRICT ANALYSIS */}
        {activeSection === 'states' && chartsData && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">State & District Environmental Explorer</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Drill down into district-level concerns, hotspots, and resolution rates across Indian regions
              </p>
            </div>

            {/* State Selector */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4 flex-wrap">
              <label className="text-xs font-semibold text-slate-700">Select Indian State / UT to Inspect:</label>
              <select
                value={selectedAnalysisState}
                onChange={e => setSelectedAnalysisState(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-600 font-medium text-slate-900"
              >
                {INDIAN_STATES_AND_UTS.map(s => (
                  <option key={s.name} value={s.name}>{s.name} ({s.type})</option>
                ))}
              </select>
            </div>

            {/* Top Reported Districts Nationwide */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <h2 className="text-sm font-bold text-slate-900 mb-1">Top Reported Districts Nationwide</h2>
              <p className="text-xs text-slate-500 mb-4">Districts generating the highest volume of citizen grievances</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartsData.districtChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: TRENDS & RULE-BASED RECOMMENDATIONS */}
        {activeSection === 'trends' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Environmental Trends & Rule-Based Recommendations</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Transparent automated advisory alerts generated strictly from recorded grievance patterns
              </p>
            </div>

            {/* Recommendations Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Active Rule-Based Administrative Advisories</h2>
                  <p className="text-xs text-slate-500">Derived from recorded complaint density thresholds</p>
                </div>
                <span className="text-xs font-mono font-medium text-emerald-800">
                  {recommendations.length} Active Rules Triggered
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {recommendations.length > 0 ? (
                  recommendations.map(rec => (
                    <div key={rec.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                            rec.severity === 'Urgent Action' ? 'bg-red-100 text-red-800' :
                            rec.severity === 'High Attention' ? 'bg-amber-100 text-amber-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {rec.severity}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{rec.district_or_state}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs font-medium text-emerald-800">{rec.category}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {rec.complaint_count} Complaints Recorded
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 mb-2">
                        <strong className="text-slate-900">Recommended Administrative Action: </strong>
                        <span>{rec.action_recommendation}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span><strong>Trigger Rule:</strong> {rec.rule_trigger}</span>
                        <span aria-hidden="true">·</span>
                        <span><strong>Recorded Evidence:</strong> {rec.recorded_evidence}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No active threshold triggers detected on current dataset.
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
                <strong>Disclaimer:</strong> Recommendations are heuristic advisory notifications to help 
                environmental authorities prioritize field inspection resources. They do not constitute official 
                determinations of statutory pollution violations.
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: MODEL PERFORMANCE */}
        {activeSection === 'model' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">NLP & Machine Learning Performance</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Genuine evaluation metrics on hold-out test set using TF-IDF features and Logistic Regression
                </p>
              </div>
              <button
                onClick={handleRetrainModel}
                disabled={isRetraining}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 rounded-lg shadow-2xs transition-colors self-start cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetraining ? 'animate-spin' : ''}`} />
                <span>{isRetraining ? 'Retraining on Combined Corpus...' : 'Retrain Model Now'}</span>
              </button>
            </div>

            {modelMetrics && (
              <>
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Test Accuracy</span>
                    <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums mt-1">
                      {(modelMetrics.accuracy * 100).toFixed(1)}%
                    </div>
                    <span className="text-[11px] text-slate-400">Overall correctness</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Macro F1-Score</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                      {modelMetrics.macro_f1.toFixed(3)}
                    </div>
                    <span className="text-[11px] text-slate-400">Unweighted category mean</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Macro Precision</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                      {modelMetrics.macro_precision.toFixed(3)}
                    </div>
                    <span className="text-[11px] text-slate-400">Class positive accuracy</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Macro Recall</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                      {modelMetrics.macro_recall.toFixed(3)}
                    </div>
                    <span className="text-[11px] text-slate-400">Category sensitivity</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Feature Vocabulary</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                      {modelMetrics.vocabulary_size}
                    </div>
                    <span className="text-[11px] text-slate-400">N-gram tokens (1, 2)</span>
                  </div>
                </div>

                {/* Category-wise Classification Report Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">Per-Category Classification Metrics</h2>
                    <span className="text-xs text-slate-500 font-mono">
                      Training Samples: {modelMetrics.training_samples} · Test: {modelMetrics.test_samples}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Environmental Category</th>
                          <th className="py-2.5 px-4 font-mono">Precision</th>
                          <th className="py-2.5 px-4 font-mono">Recall</th>
                          <th className="py-2.5 px-4 font-mono">F1-Score</th>
                          <th className="py-2.5 px-4 font-mono">Test Support</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {modelMetrics.category_metrics.map(cat => (
                          <tr key={cat.category} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-4 font-medium text-slate-900">{cat.category}</td>
                            <td className="py-2.5 px-4 font-mono tabular-nums">{cat.precision.toFixed(3)}</td>
                            <td className="py-2.5 px-4 font-mono tabular-nums">{cat.recall.toFixed(3)}</td>
                            <td className="py-2.5 px-4 font-mono tabular-nums text-emerald-800 font-semibold">{cat.f1.toFixed(3)}</td>
                            <td className="py-2.5 px-4 font-mono tabular-nums text-slate-500">{cat.support}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* SECTION 7: REPORTS */}
        {activeSection === 'reports' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Environmental Grievance Reports & Data Exports</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate structured compliance summaries, state-level dossiers, and dataset exports
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-base font-bold text-slate-900">Export Stored Environmental Grievances</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Download full raw datasets with NLP predictions, user-reported descriptions, and administrative resolutions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/api/admin/reports/export?format=csv"
                  download="ecotrack_complaints_report.csv"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full CSV Dataset</span>
                </a>

                <a
                  href="/api/admin/reports/export?format=json"
                  download="ecotrack_complaints_report.json"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full JSON Report</span>
                </a>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                <p>
                  <strong>Mandatory Reporting Disclaimer:</strong> Internal grievance reports generated by EcoTrack AI 
                  are intended for statutory administrative monitoring and internal workflow dispatch. They do not 
                  substitute for officially gazetted environmental surveys or court-mandated affidavits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: ADMIN ACTIVITY LOG */}
        {activeSection === 'activity' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Administrative Activity & Audit Trail</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Chronological log of officer triage, category modifications, and status changes
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                {activityLogs.map(log => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs hover:bg-slate-50/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{log.action}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-emerald-800 font-medium">{log.actor}</span>
                      </div>
                      <p className="text-slate-600">{log.details}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPLAINT DETAIL & REVIEW MODAL */}
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-mono text-sm font-bold">
                    ID
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{selectedComplaint.id}</h2>
                    <span className="text-xs text-slate-500">
                      Logged on {new Date(selectedComplaint.submission_date).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
                {/* Full Description */}
                <div>
                  <span className="font-semibold text-slate-900 block mb-1">Complaint Description:</span>
                  <p className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed text-slate-800">
                    {selectedComplaint.description}
                  </p>
                </div>

                {/* NLP vs Human Category Card */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900">Category Classification Status</span>
                    <span className="font-mono text-emerald-700">
                      Confidence: {(selectedComplaint.prediction_confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Original Model Prediction:</span>
                      <strong className="text-slate-900">{selectedComplaint.predicted_category}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Human Reviewed Category:</span>
                      <strong className="text-emerald-900">
                        {selectedComplaint.human_reviewed_category || 'No correction applied (Accepted Model Prediction)'}
                      </strong>
                    </div>
                  </div>

                  {/* Category Correction Control */}
                  <div className="pt-2 border-t border-emerald-100 flex flex-col sm:flex-row gap-2 items-center">
                    <select
                      value={categoryCorrection || selectedComplaint.human_reviewed_category || selectedComplaint.predicted_category}
                      onChange={e => setCategoryCorrection(e.target.value)}
                      className="w-full sm:w-auto flex-1 px-2.5 py-1.5 bg-white border border-emerald-300 rounded-md text-slate-900 focus:outline-none"
                    >
                      {ENVIRONMENTAL_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Reason for correction (optional)"
                      value={correctionReason}
                      onChange={e => setCorrectionReason(e.target.value)}
                      className="w-full sm:w-64 px-2.5 py-1.5 bg-white border border-emerald-300 rounded-md text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleCorrectCategory}
                      disabled={isUpdating}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md shrink-0 cursor-pointer"
                    >
                      Apply Correction
                    </button>
                  </div>
                </div>

                {/* Location Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block mb-1">Citizen-Submitted Location:</span>
                    <div>State: <strong>{selectedComplaint.state}</strong></div>
                    <div>District: <strong>{selectedComplaint.district}</strong></div>
                    <div>City/Town/Village: <strong>{selectedComplaint.city_town_village}</strong></div>
                    <div>Locality: <strong>{selectedComplaint.locality || 'None'}</strong></div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-semibold text-slate-900 block mb-1">NLP-Extracted Location Entities:</span>
                    <div>Detected State: <strong>{selectedComplaint.extracted_locations.state || 'N/A'}</strong></div>
                    <div>Detected District: <strong>{selectedComplaint.extracted_locations.district || 'N/A'}</strong></div>
                    <div>Detected Landmark: <strong>{selectedComplaint.extracted_locations.locality_or_landmark || 'N/A'}</strong></div>
                    <div className="truncate">Raw mentions: <strong>{selectedComplaint.extracted_locations.raw_mentions.join(', ') || 'None'}</strong></div>
                  </div>
                </div>

                {/* Status Update Control */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="font-semibold text-slate-900 block">Update Complaint Status:</span>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <select
                      value={statusChange || selectedComplaint.status}
                      onChange={e => setStatusChange(e.target.value)}
                      className="w-full sm:w-48 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900"
                    >
                      {COMPLAINT_STATUSES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Administrative action remarks"
                      value={statusRemarks}
                      onChange={e => setStatusRemarks(e.target.value)}
                      className="w-full sm:flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleUpdateStatus}
                      disabled={isUpdating}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md shrink-0 cursor-pointer"
                    >
                      Save Status
                    </button>
                  </div>
                </div>

                {/* Private Notes Section */}
                <div>
                  <span className="font-semibold text-slate-900 block mb-2">Private Administrator Notes:</span>
                  <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                    {selectedComplaint.notes && selectedComplaint.notes.length > 0 ? (
                      selectedComplaint.notes.map(note => (
                        <div key={note.id} className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-md">
                          <div className="flex items-center justify-between text-[11px] text-amber-900 mb-0.5">
                            <span className="font-bold">{note.author} ({note.role})</span>
                            <span className="font-mono text-slate-400">{new Date(note.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-slate-800">{note.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">No administrative notes recorded yet.</p>
                    )}
                  </div>

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal note..."
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={isUpdating || !newNoteText.trim()}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-semibold rounded-md shrink-0 cursor-pointer"
                    >
                      Add Note
                    </button>
                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
