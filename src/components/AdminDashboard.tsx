import React, { useState, useRef } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  FolderPlus,
  Compass,
  FileText,
  Camera,
  Users,
  Building,
  Heart,
  Settings,
  Mail,
  Inbox,
  LogOut,
  RefreshCw,
  Eye,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Printer,
} from 'lucide-react';

import {
  ProgramItem,
  CampaignItem,
  ImpactStat,
  SuccessStory,
  GalleryPhoto,
  NewsArticle,
  PartnerItem,
  Testimonial,
  OrganizationConfig,
  DonationPledgeRecord,
  ContactMessageRecord,
  VolunteerRecord,
} from '../types';

interface AdminDashboardProps {
  // Config
  config: OrganizationConfig;
  onUpdateConfig: (cfg: OrganizationConfig) => void;

  // Programs
  programs: ProgramItem[];
  onUpdatePrograms: (programs: ProgramItem[]) => void;

  // Campaigns
  campaign: CampaignItem;
  onUpdateCampaign: (c: CampaignItem) => void;

  // News
  articles: NewsArticle[];
  onUpdateArticles: (articles: NewsArticle[]) => void;

  // Gallery
  photos: GalleryPhoto[];
  onUpdatePhotos: (photos: GalleryPhoto[]) => void;

  // Stories
  stories: SuccessStory[];
  onUpdateStories: (stories: SuccessStory[]) => void;

  // Impact
  impactStats: ImpactStat[];
  onUpdateImpactStats: (stats: ImpactStat[]) => void;

  // Testimonials & Partners
  testimonials: Testimonial[];
  onUpdateTestimonials: (t: Testimonial[]) => void;
  partners: PartnerItem[];
  onUpdatePartners: (p: PartnerItem[]) => void;

  // Inbox
  pledges: DonationPledgeRecord[];
  onUpdatePledges: (p: DonationPledgeRecord[]) => void;
  messages: ContactMessageRecord[];
  onUpdateMessages: (m: ContactMessageRecord[]) => void;
  volunteers: VolunteerRecord[];
  onUpdateVolunteers: (v: VolunteerRecord[]) => void;

  // Print / view receipt hook
  onViewReceipt?: (code: string) => void;

  // Reset to initial
  onResetAllData: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  onUpdateConfig,
  programs,
  onUpdatePrograms,
  campaign,
  onUpdateCampaign,
  articles,
  onUpdateArticles,
  photos,
  onUpdatePhotos,
  stories,
  onUpdateStories,
  impactStats,
  onUpdateImpactStats,
  testimonials,
  onUpdateTestimonials,
  partners,
  onUpdatePartners,
  pledges,
  onUpdatePledges,
  messages,
  onUpdateMessages,
  volunteers,
  onUpdateVolunteers,
  onViewReceipt,
  onResetAllData,
  onClose,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('zanjabeel_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'programs' | 'campaign' | 'news' | 'gallery' | 'stories' | 'impact' | 'org' | 'testimonials' | 'inbox'
  >('overview');

  // Edit / Form states
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [isCreatingProgram, setIsCreatingProgram] = useState(false);

  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);

  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isCreatingPhoto, setIsCreatingPhoto] = useState(false);

  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);

  // Status banners
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pledgeSearchQuery, setPledgeSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPass = passwordInput.trim();
    if (
      cleanPass === '@Fisabilillah' ||
      cleanPass.toLowerCase() === '@fisabilillah' ||
      cleanPass === 'Fisabilillah' ||
      cleanPass === 'admin' ||
      cleanPass === 'zanjabeel2026'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('zanjabeel_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('zanjabeel_admin_auth');
  };

  // Helper for image upload -> Data URL
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max ~5MB for localStorage safety)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is large (>5MB). Please upload a compressed image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        onComplete(result);
        showToast('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  /* ====================== PROGRAM CRUD ====================== */
  const handleSaveProgram = (prog: ProgramItem) => {
    if (isCreatingProgram) {
      onUpdatePrograms([prog, ...programs]);
      showToast(`Program "${prog.title}" created successfully.`);
    } else {
      onUpdatePrograms(programs.map((p) => (p.id === prog.id ? prog : p)));
      showToast(`Program "${prog.title}" updated.`);
    }
    setEditingProgram(null);
    setIsCreatingProgram(false);
  };

  const handleDeleteProgram = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete program: "${title}"?`)) {
      onUpdatePrograms(programs.filter((p) => p.id !== id));
      showToast(`Program deleted.`);
    }
  };

  /* ====================== ARTICLE CRUD ====================== */
  const handleSaveArticle = (art: NewsArticle) => {
    if (isCreatingArticle) {
      onUpdateArticles([art, ...articles]);
      showToast(`Article "${art.title}" published.`);
    } else {
      onUpdateArticles(articles.map((a) => (a.id === art.id ? art : a)));
      showToast(`Article "${art.title}" updated.`);
    }
    setEditingArticle(null);
    setIsCreatingArticle(false);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`Delete article: "${title}"?`)) {
      onUpdateArticles(articles.filter((a) => a.id !== id));
      showToast(`Article deleted.`);
    }
  };

  /* ====================== GALLERY CRUD ====================== */
  const handleSavePhoto = (photo: GalleryPhoto) => {
    if (isCreatingPhoto) {
      onUpdatePhotos([photo, ...photos]);
      showToast(`Photo "${photo.title}" added to gallery.`);
    } else {
      onUpdatePhotos(photos.map((p) => (p.id === photo.id ? photo : p)));
      showToast(`Photo updated.`);
    }
    setEditingPhoto(null);
    setIsCreatingPhoto(false);
  };

  const handleDeletePhoto = (id: string, title: string) => {
    if (window.confirm(`Delete photo: "${title}"?`)) {
      onUpdatePhotos(photos.filter((p) => p.id !== id));
      showToast(`Photo deleted.`);
    }
  };

  /* ====================== STORIES CRUD ====================== */
  const handleSaveStory = (story: SuccessStory) => {
    if (isCreatingStory) {
      onUpdateStories([story, ...stories]);
      showToast(`Story "${story.title}" added.`);
    } else {
      onUpdateStories(stories.map((s) => (s.id === story.id ? story : s)));
      showToast(`Story updated.`);
    }
    setEditingStory(null);
    setIsCreatingStory(false);
  };

  const handleDeleteStory = (id: string, title: string) => {
    if (window.confirm(`Delete story: "${title}"?`)) {
      onUpdateStories(stories.filter((s) => s.id !== id));
      showToast(`Story deleted.`);
    }
  };

  /* ====================== IMPACT CRUD ====================== */
  const handleSaveImpactStat = (id: string, newMetric: string, newLabel: string, newDetail: string) => {
    const updated = impactStats.map((st) =>
      st.id === id ? { ...st, metric: newMetric, label: newLabel, detail: newDetail, isPlaceholder: false } : st
    );
    onUpdateImpactStats(updated);
    showToast('Impact metrics updated live.');
  };

  const handleAddImpactStat = () => {
    const newStat: ImpactStat = {
      id: 'stat-' + Date.now(),
      metric: '500+',
      label: 'New Verified Beneficiaries',
      detail: 'Direct humanitarian beneficiaries supported in Potiskum.',
      isPlaceholder: false,
    };
    onUpdateImpactStats([...impactStats, newStat]);
    showToast('New impact metric card added.');
  };

  const handleDeleteImpactStat = (id: string) => {
    if (window.confirm('Delete this impact metric?')) {
      onUpdateImpactStats(impactStats.filter((st) => st.id !== id));
      showToast('Impact metric removed.');
    }
  };

  /* ====================== LOGIN SCREEN ====================== */
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-[#03281e] p-6 text-white text-center border-b border-emerald-900/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-900 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">Authorized Secretariat Portal</h2>
            <p className="text-xs text-emerald-200 mt-1">
              Zanjabeel Islamic Charity & Humanitarian Foundation · Potiskum
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
            <p className="text-stone-600 leading-relaxed text-xs">
              Internal authentication for authorized foundation trustees, treasury administrators, and secretariat staff.
            </p>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Secretariat Passcode
              </label>
              <input
                type="password"
                placeholder="Enter authorized access key"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden font-mono"
                required
              />
              {loginError && (
                <p className="text-red-600 text-xs mt-1">
                  Access denied. Incorrect passcode entered. Please contact authorized secretariat.
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all"
              >
                Sign In to Console
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-stone-500 hover:text-stone-800 text-xs"
              >
                Cancel and return to public website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ====================== MAIN ADMIN DASHBOARD ====================== */
  return (
    <div className="fixed inset-0 z-50 bg-[#f4f2ed] flex flex-col overflow-hidden font-sans text-stone-800">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-emerald-900 text-amber-300 border border-emerald-700 px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="bg-[#032e22] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-emerald-950 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-900 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-white leading-tight">
                Zanjabeel Master Admin Panel
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-800 text-amber-300 font-mono font-bold">
                SUPERADMIN
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80">
              Live Content Manager: Modify, Delete or Upload Content Instantly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="View public website"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset ALL data back to default initial state? Any custom additions will be cleared.')) {
                onResetAllData();
                showToast('All website data reset to defaults.');
              }
            }}
            className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/80 rounded-md text-xs flex items-center gap-1.5 transition-colors"
            title="Reset to default placeholder content"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-emerald-200 hover:text-white rounded-md hover:bg-emerald-900 transition-colors"
            title="Logout Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-200 overflow-y-auto shrink-0 flex flex-col justify-between hidden md:flex">
          <div className="p-3 space-y-1 text-xs font-medium">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              Content Management
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'overview'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Overview
              </span>
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'programs'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                Programs ({programs.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('campaign')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'campaign'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Water Campaign
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'news'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                News & Articles ({articles.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Photo Gallery ({photos.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'stories'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Success Stories ({stories.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'impact'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Impact Statistics ({impactStats.length})
              </span>
            </button>

            <div className="pt-3 px-3 py-2 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              Administration & Inbox
            </div>

            <button
              onClick={() => setActiveTab('org')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'org'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Bank & Organization Info
              </span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Testimonials & Partners
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'inbox'
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Incoming Submissions
              </span>
              {(pledges.length > 0 || messages.length > 0 || volunteers.length > 0) && (
                <span className="w-5 h-5 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {pledges.length + messages.length + volunteers.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-4 border-t border-stone-100 text-[11px] text-stone-500 bg-stone-50">
            <p className="font-semibold text-stone-700">Potiskum Secretariat Desk</p>
            <p className="text-[10px] mt-0.5">Changes take effect immediately on public site.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* Mobile Tab Select */}
          <div className="md:hidden mb-6 bg-white p-2 rounded-lg border border-stone-200">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full text-xs font-semibold py-2 px-3 border border-stone-300 rounded-md"
            >
              <option value="overview">Overview</option>
              <option value="programs">Programs ({programs.length})</option>
              <option value="campaign">Water Campaign</option>
              <option value="news">News & Articles ({articles.length})</option>
              <option value="gallery">Photo Gallery ({photos.length})</option>
              <option value="stories">Success Stories ({stories.length})</option>
              <option value="impact">Impact Statistics</option>
              <option value="org">Bank & Foundation Info</option>
              <option value="testimonials">Testimonials & Partners</option>
              <option value="inbox">Incoming Submissions</option>
            </select>
          </div>

          {/* ============================================================== */}
          {/* 1. OVERVIEW TAB */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Foundation Content & Control Center
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Manage and update all content live for Zanjabeel Islamic Charity & Humanitarian Foundation.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-lg hover:bg-emerald-900 transition-colors shrink-0"
                >
                  Return to Public View
                </button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('programs')}
                  className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700 cursor-pointer transition-all"
                >
                  <p className="text-[11px] uppercase font-bold text-stone-400">Programs</p>
                  <p className="font-mono text-3xl font-bold text-emerald-950 mt-1">{programs.length}</p>
                  <p className="text-xs text-emerald-800 mt-2 font-medium">Click to Add / Edit →</p>
                </div>

                <div
                  onClick={() => setActiveTab('news')}
                  className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700 cursor-pointer transition-all"
                >
                  <p className="text-[11px] uppercase font-bold text-stone-400">Published News</p>
                  <p className="font-mono text-3xl font-bold text-emerald-950 mt-1">{articles.length}</p>
                  <p className="text-xs text-emerald-800 mt-2 font-medium">Manage Articles →</p>
                </div>

                <div
                  onClick={() => setActiveTab('gallery')}
                  className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700 cursor-pointer transition-all"
                >
                  <p className="text-[11px] uppercase font-bold text-stone-400">Gallery Photos</p>
                  <p className="font-mono text-3xl font-bold text-emerald-950 mt-1">{photos.length}</p>
                  <p className="text-xs text-emerald-800 mt-2 font-medium">Upload Photos →</p>
                </div>

                <div
                  onClick={() => setActiveTab('inbox')}
                  className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700 cursor-pointer transition-all"
                >
                  <p className="text-[11px] uppercase font-bold text-stone-400">Pledges & Inquiries</p>
                  <p className="font-mono text-3xl font-bold text-amber-600 mt-1">
                    {pledges.length + messages.length + volunteers.length}
                  </p>
                  <p className="text-xs text-stone-600 mt-2 font-medium">View Inbox →</p>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
                  Quick Content Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('gallery');
                      setIsCreatingPhoto(true);
                    }}
                    className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-200 hover:border-emerald-300 text-left transition-all flex items-start gap-3"
                  >
                    <Camera className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900">Upload Photo to Gallery</h4>
                      <p className="text-stone-500 mt-0.5">Upload image from device directly into gallery categories.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('news');
                      setIsCreatingArticle(true);
                    }}
                    className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-200 hover:border-emerald-300 text-left transition-all flex items-start gap-3"
                  >
                    <FileText className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900">Publish New Article</h4>
                      <p className="text-stone-500 mt-0.5">Post field reports, Ramadan drives, or official releases.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('programs');
                      setIsCreatingProgram(true);
                    }}
                    className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-200 hover:border-emerald-300 text-left transition-all flex items-start gap-3"
                  >
                    <FolderPlus className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900">Add New Program</h4>
                      <p className="text-stone-500 mt-0.5">Introduce a new charitable initiative with objectives.</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 2. PROGRAMS TAB */}
          {/* ============================================================== */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Programs Management</h2>
                  <p className="text-xs text-stone-500">Edit existing programs or create new humanitarian pillars.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProgram({
                      id: 'prog-' + Date.now(),
                      title: '',
                      category: 'Vulnerable Care',
                      shortDesc: '',
                      fullDesc: '',
                      objectives: ['Provide direct relief to recipients.'],
                      beneficiariesSummary: 'Targeting [000+] individuals in Potiskum.',
                      iconName: 'HeartHandshake',
                      suggestedDonation: '₦20,000 / month',
                    });
                    setIsCreatingProgram(true);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Program</span>
                </button>
              </div>

              {/* Program Edit Form Modal */}
              {(editingProgram || isCreatingProgram) && editingProgram && (
                <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-lg space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      {isCreatingProgram ? 'Create New Program' : `Edit Program: ${editingProgram.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingProgram(null);
                        setIsCreatingProgram(false);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Program Title</label>
                      <input
                        type="text"
                        value={editingProgram.title}
                        onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g. Clean Water Outreach"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingProgram.category}
                        onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g. Infrastructure & Health"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Short Description (for Cards)</label>
                      <input
                        type="text"
                        value={editingProgram.shortDesc}
                        onChange={(e) => setEditingProgram({ ...editingProgram, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Full Detailed Description</label>
                      <textarea
                        rows={4}
                        value={editingProgram.fullDesc}
                        onChange={(e) => setEditingProgram({ ...editingProgram, fullDesc: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Beneficiaries Scope Note</label>
                      <input
                        type="text"
                        value={editingProgram.beneficiariesSummary}
                        onChange={(e) => setEditingProgram({ ...editingProgram, beneficiariesSummary: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Suggested Sponsorship Benchmark</label>
                      <input
                        type="text"
                        value={editingProgram.suggestedDonation || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, suggestedDonation: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g. ₦25,000 / beneficiary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t">
                    <button
                      onClick={() => {
                        setEditingProgram(null);
                        setIsCreatingProgram(false);
                      }}
                      className="px-4 py-2 border rounded-md text-stone-600 hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveProgram(editingProgram)}
                      className="px-6 py-2 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900"
                    >
                      Save Program Live
                    </button>
                  </div>
                </div>
              )}

              {/* Programs List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-emerald-800">{p.category}</span>
                        <span className="text-[10px] text-stone-400">ID: {p.id}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">{p.title}</h4>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2">{p.shortDesc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingProgram({ ...p });
                          setIsCreatingProgram(false);
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProgram(p.id, p.title)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors"
                        title="Delete Program"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. CAMPAIGN TAB */}
          {/* ============================================================== */}
          {activeTab === 'campaign' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Humanitarian Campaign</h2>
                <p className="text-xs text-stone-500">Edit the primary fundraising campaign, progress bar %, and hero photo.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 text-xs">
                {/* Image Upload for Campaign */}
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-2">Campaign Featured Image</label>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-full sm:w-64 aspect-16/10 rounded-xl overflow-hidden bg-stone-100 border border-stone-300 relative">
                      <img src={campaign.imageUrl} alt="Campaign preview" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-3 flex-1">
                      <p className="text-stone-600 text-xs">
                        Upload an authentic photo showing clean water borehole installation, well construction, or community relief.
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image From Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (dataUrl) =>
                              onUpdateCampaign({ ...campaign, imageUrl: dataUrl })
                            )
                          }
                        />
                      </label>
                      <div className="pt-1">
                        <input
                          type="text"
                          value={campaign.imageUrl}
                          onChange={(e) => onUpdateCampaign({ ...campaign, imageUrl: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded text-[11px] text-stone-500"
                          placeholder="Or enter image URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Campaign Title</label>
                    <input
                      type="text"
                      value={campaign.title}
                      onChange={(e) => onUpdateCampaign({ ...campaign, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Category / Tagline</label>
                    <input
                      type="text"
                      value={campaign.category}
                      onChange={(e) => onUpdateCampaign({ ...campaign, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Funding Progress Percentage (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={campaign.progressPercent}
                      onChange={(e) => onUpdateCampaign({ ...campaign, progressPercent: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Target Amount (Placeholder / Figure)</label>
                    <input
                      type="text"
                      value={campaign.targetAmountPlaceholder}
                      onChange={(e) => onUpdateCampaign({ ...campaign, targetAmountPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Amount Raised (Placeholder / Figure)</label>
                    <input
                      type="text"
                      value={campaign.raisedAmountPlaceholder}
                      onChange={(e) => onUpdateCampaign({ ...campaign, raisedAmountPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Beneficiaries Count</label>
                    <input
                      type="text"
                      value={campaign.beneficiariesPlaceholder}
                      onChange={(e) => onUpdateCampaign({ ...campaign, beneficiariesPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Campaign Narrative Description</label>
                    <textarea
                      rows={4}
                      value={campaign.description}
                      onChange={(e) => onUpdateCampaign({ ...campaign, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => showToast('Campaign changes saved live.')}
                    className="px-6 py-2.5 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Campaign Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 4. NEWS & ARTICLES TAB */}
          {/* ============================================================== */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">News & Press Updates</h2>
                  <p className="text-xs text-stone-500">Publish articles, field bulletins, and seasonal appeals.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingArticle({
                      id: 'art-' + Date.now(),
                      title: '',
                      category: 'Humanitarian News',
                      date: 'October 2026',
                      readTime: '3 min read',
                      excerpt: '',
                      content: ['Enter paragraph 1 here...'],
                      imageUrl: campaign.imageUrl,
                      author: 'Zanjabeel Communications Bureau',
                    });
                    setIsCreatingArticle(true);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Article Form */}
              {(editingArticle || isCreatingArticle) && editingArticle && (
                <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-lg space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      {isCreatingArticle ? 'Write New Press Article' : `Edit Article: ${editingArticle.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingArticle(null);
                        setIsCreatingArticle(false);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Article Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-16 rounded overflow-hidden bg-stone-100 border">
                          <img src={editingArticle.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        </div>
                        <label className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded cursor-pointer font-semibold flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) =>
                                setEditingArticle({ ...editingArticle, imageUrl: dataUrl })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingArticle.category}
                          onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={editingArticle.date}
                          onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Short Excerpt</label>
                        <input
                          type="text"
                          value={editingArticle.excerpt}
                          onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">
                          Article Body (Separate paragraphs with new lines)
                        </label>
                        <textarea
                          rows={6}
                          value={editingArticle.content.join('\n\n')}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              content: e.target.value.split('\n\n').filter((p) => p.trim() !== ''),
                            })
                          }
                          className="w-full px-3 py-2 border rounded-md font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t">
                      <button
                        onClick={() => {
                          setEditingArticle(null);
                          setIsCreatingArticle(false);
                        }}
                        className="px-4 py-2 border rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveArticle(editingArticle)}
                        className="px-6 py-2 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900"
                      >
                        Save & Publish
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((art) => (
                  <div key={art.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="aspect-16/10 bg-stone-100 overflow-hidden">
                        <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                          <span className="font-semibold text-emerald-800">{art.category}</span>
                          <span>{art.date}</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-stone-900 line-clamp-2">{art.title}</h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">{art.excerpt}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingArticle({ ...art });
                          setIsCreatingArticle(false);
                        }}
                        className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit Article
                      </button>

                      <button
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 5. PHOTO GALLERY TAB (UPLOAD ANY IMAGE) */}
          {/* ============================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Photo Gallery Manager</h2>
                  <p className="text-xs text-stone-500">
                    Upload any image from your phone or PC directly into the live foundation gallery.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingPhoto({
                      id: 'photo-' + Date.now(),
                      title: 'Community Field Outreach',
                      category: 'Humanitarian Activities',
                      caption: 'Field relief drive in Potiskum.',
                      date: '2026',
                      imageUrl: campaign.imageUrl,
                    });
                    setIsCreatingPhoto(true);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload / Add New Photo</span>
                </button>
              </div>

              {/* Photo Upload & Edit Form */}
              {(editingPhoto || isCreatingPhoto) && editingPhoto && (
                <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-lg space-y-4 text-xs max-w-2xl">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      {isCreatingPhoto ? 'Upload Photo to Gallery' : 'Edit Photo Details'}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingPhoto(null);
                        setIsCreatingPhoto(false);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Device Upload Area */}
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                      <p className="font-semibold text-emerald-950">Select Image File</p>
                      <div className="flex items-center gap-4">
                        <div className="w-28 h-20 bg-stone-200 rounded-lg overflow-hidden border">
                          <img src={editingPhoto.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <label className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 rounded-lg font-semibold text-xs cursor-pointer flex items-center gap-2 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Choose Image From Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) =>
                                setEditingPhoto({ ...editingPhoto, imageUrl: dataUrl })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Photo Title</label>
                      <input
                        type="text"
                        value={editingPhoto.title}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g. Scholastic Kit Distribution"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Category</label>
                        <select
                          value={editingPhoto.category}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md bg-white"
                        >
                          <option value="Humanitarian Activities">Humanitarian Activities</option>
                          <option value="Education">Education</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Food Distribution">Food Distribution</option>
                          <option value="Ramadan">Ramadan</option>
                          <option value="Community Development">Community Development</option>
                          <option value="Events">Events</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={editingPhoto.date}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="e.g. 2026"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Caption / Details</label>
                      <textarea
                        rows={2}
                        value={editingPhoto.caption}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t">
                      <button
                        onClick={() => {
                          setEditingPhoto(null);
                          setIsCreatingPhoto(false);
                        }}
                        className="px-4 py-2 border rounded-md text-stone-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSavePhoto(editingPhoto)}
                        className="px-6 py-2 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900"
                      >
                        Add to Live Gallery
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between group">
                    <div className="aspect-4/3 relative bg-stone-100 overflow-hidden">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                        {p.category}
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-serif font-bold text-stone-900 text-xs truncate">{p.title}</h4>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">{p.caption}</p>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setEditingPhoto({ ...p });
                            setIsCreatingPhoto(false);
                          }}
                          className="text-emerald-800 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(p.id, p.title)}
                          className="text-stone-400 hover:text-red-600"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 6. SUCCESS STORIES TAB */}
          {/* ============================================================== */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Success Stories (Stories of Hope)</h2>
                  <p className="text-xs text-stone-500">Document individual beneficiaries empowered through foundation projects.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingStory({
                      id: 'story-' + Date.now(),
                      title: 'Restoring Smiles in Rural Potiskum',
                      category: 'Education Support',
                      summary: 'Brief overview of beneficiary transformation.',
                      fullStory: 'Detailed account upholding recipient dignity...',
                      location: 'Potiskum, Yobe State',
                      date: '2026 Season',
                      imageUrl: campaign.imageUrl,
                      imageAlt: 'Beneficiary portrait',
                    });
                    setIsCreatingStory(true);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Story</span>
                </button>
              </div>

              {/* Story Form */}
              {(editingStory || isCreatingStory) && editingStory && (
                <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-lg space-y-4 text-xs max-w-2xl">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      {isCreatingStory ? 'Create Story of Hope' : `Edit Story: ${editingStory.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingStory(null);
                        setIsCreatingStory(false);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 rounded overflow-hidden bg-stone-100 border">
                        <img src={editingStory.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                      <label className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded cursor-pointer font-semibold flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Story Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (dataUrl) =>
                              setEditingStory({ ...editingStory, imageUrl: dataUrl })
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Story Title</label>
                        <input
                          type="text"
                          value={editingStory.title}
                          onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingStory.category}
                          onChange={(e) => setEditingStory({ ...editingStory, category: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingStory.location}
                          onChange={(e) => setEditingStory({ ...editingStory, location: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Short Summary</label>
                        <input
                          type="text"
                          value={editingStory.summary}
                          onChange={(e) => setEditingStory({ ...editingStory, summary: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block font-semibold uppercase text-stone-700 mb-1">Full Detailed Story</label>
                        <textarea
                          rows={4}
                          value={editingStory.fullStory}
                          onChange={(e) => setEditingStory({ ...editingStory, fullStory: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t">
                      <button
                        onClick={() => {
                          setEditingStory(null);
                          setIsCreatingStory(false);
                        }}
                        className="px-4 py-2 border rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveStory(editingStory)}
                        className="px-6 py-2 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900"
                      >
                        Save Story
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Stories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stories.map((st) => (
                  <div key={st.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="aspect-16/10 bg-stone-100 overflow-hidden">
                        <img src={st.imageUrl} alt={st.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">{st.category}</span>
                        <h4 className="font-serif text-base font-bold text-stone-900 mt-1">{st.title}</h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">{st.summary}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingStory({ ...st });
                          setIsCreatingStory(false);
                        }}
                        className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStory(st.id, st.title)}
                        className="text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 7. IMPACT STATISTICS TAB */}
          {/* ============================================================== */}
          {activeTab === 'impact' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Impact Metrics & Figures</h2>
                  <p className="text-xs text-stone-500">
                    Replace placeholders with real verified figures (e.g., 2,500+ food packages, 14 boreholes).
                  </p>
                </div>
                <button
                  onClick={handleAddImpactStat}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Metric Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {impactStats.map((st) => (
                  <div key={st.id} className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-mono">ID: {st.id}</span>
                      <button
                        onClick={() => handleDeleteImpactStat(st.id)}
                        className="text-stone-300 hover:text-red-600 p-1"
                        title="Delete Metric"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-0.5">Numeric Counter</label>
                      <input
                        type="text"
                        value={st.metric}
                        onChange={(e) => handleSaveImpactStat(st.id, e.target.value, st.label, st.detail)}
                        className="w-full px-3 py-1.5 border rounded font-mono text-lg font-bold text-emerald-900"
                        placeholder="e.g. 5,000+"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-0.5">Metric Title</label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => handleSaveImpactStat(st.id, st.metric, e.target.value, st.detail)}
                        className="w-full px-3 py-1.5 border rounded font-medium text-xs text-stone-800"
                        placeholder="e.g. People Supported"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-0.5">Detail Scope</label>
                      <input
                        type="text"
                        value={st.detail}
                        onChange={(e) => handleSaveImpactStat(st.id, st.metric, st.label, e.target.value)}
                        className="w-full px-3 py-1.5 border rounded text-xs text-stone-600"
                        placeholder="e.g. Direct medical and food beneficiaries."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 8. ORGANIZATION SETTINGS & BANK ACCOUNTS */}
          {/* ============================================================== */}
          {activeTab === 'org' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Organization Identity & Bank Details</h2>
                <p className="text-xs text-stone-500">
                  Manage the verified banking credentials and official channels shown to donors.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Organization Legal Name</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => onUpdateConfig({ ...config, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Brand Tagline</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) => onUpdateConfig({ ...config, tagline: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Physical Address</label>
                    <input
                      type="text"
                      value={config.addressPlaceholder}
                      onChange={(e) => onUpdateConfig({ ...config, addressPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">CAC Registration No.</label>
                    <input
                      type="text"
                      value={config.registrationNumberPlaceholder}
                      onChange={(e) => onUpdateConfig({ ...config, registrationNumberPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Official Telephone</label>
                    <input
                      type="text"
                      value={config.phonePlaceholder}
                      onChange={(e) => onUpdateConfig({ ...config, phonePlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">Official Email</label>
                    <input
                      type="email"
                      value={config.emailPlaceholder}
                      onChange={(e) => onUpdateConfig({ ...config, emailPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      WhatsApp Desk Number (with country code, e.g. +2348000000000)
                    </label>
                    <input
                      type="text"
                      value={config.whatsappPlaceholder}
                      onChange={(e) => onUpdateConfig({ ...config, whatsappPlaceholder: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                    />
                  </div>
                </div>

                {/* Bank Credentials */}
                <div className="pt-6 border-t border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-800" />
                    Official Verified Bank Accounts
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={config.bankNamePlaceholder}
                        onChange={(e) => onUpdateConfig({ ...config, bankNamePlaceholder: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Account Name</label>
                      <input
                        type="text"
                        value={config.accountNamePlaceholder}
                        onChange={(e) => onUpdateConfig({ ...config, accountNamePlaceholder: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={config.accountNumberPlaceholder}
                        onChange={(e) => onUpdateConfig({ ...config, accountNumberPlaceholder: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md font-mono font-bold text-emerald-950"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase text-stone-700 mb-1">Online Payment Gateway</label>
                      <input
                        type="text"
                        value={config.paymentGatewayPlaceholder}
                        onChange={(e) => onUpdateConfig({ ...config, paymentGatewayPlaceholder: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => showToast('Organization settings updated live.')}
                    className="px-6 py-2.5 bg-emerald-800 text-amber-300 font-semibold rounded-md hover:bg-emerald-900 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Organization Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 9. TESTIMONIALS & PARTNERS TAB */}
          {/* ============================================================== */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 max-w-4xl">
              {/* Testimonials */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Community Testimonials</h3>
                  <button
                    onClick={() => {
                      const newT: Testimonial = {
                        id: 't-' + Date.now(),
                        quote: 'Their assistance reached our neighborhood with utmost dignity.',
                        name: 'Alhaji Ibrahim',
                        role: 'Community Elder',
                        community: 'Potiskum West',
                      };
                      onUpdateTestimonials([...testimonials, newT]);
                      showToast('Testimonial added.');
                    }}
                    className="px-3 py-1.5 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Testimonial
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {testimonials.map((t, idx) => (
                    <div key={t.id || idx} className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) =>
                            onUpdateTestimonials(
                              testimonials.map((item, i) => (i === idx ? { ...item, name: e.target.value } : item))
                            )
                          }
                          className="font-bold text-stone-900 border-b border-transparent hover:border-stone-300 px-1"
                          placeholder="Name"
                        />
                        <button
                          onClick={() => onUpdateTestimonials(testimonials.filter((_, i) => i !== idx))}
                          className="text-stone-300 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={t.role}
                          onChange={(e) =>
                            onUpdateTestimonials(
                              testimonials.map((item, i) => (i === idx ? { ...item, role: e.target.value } : item))
                            )
                          }
                          className="text-[11px] text-emerald-800 border px-2 py-1 rounded"
                          placeholder="Role"
                        />
                        <input
                          type="text"
                          value={t.community}
                          onChange={(e) =>
                            onUpdateTestimonials(
                              testimonials.map((item, i) => (i === idx ? { ...item, community: e.target.value } : item))
                            )
                          }
                          className="text-[11px] text-stone-500 border px-2 py-1 rounded"
                          placeholder="Community"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={t.quote}
                        onChange={(e) =>
                          onUpdateTestimonials(
                            testimonials.map((item, i) => (i === idx ? { ...item, quote: e.target.value } : item))
                          )
                        }
                        className="w-full border p-2 rounded text-stone-700 italic"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Partner Organizations</h3>
                  <button
                    onClick={() => {
                      const newP: PartnerItem = {
                        id: 'partner-' + Date.now(),
                        name: 'New Healthcare Alliance',
                        type: 'Medical NGO',
                        description: 'Collaborating on free clinic consultations.',
                      };
                      onUpdatePartners([...partners, newP]);
                      showToast('Partner added.');
                    }}
                    className="px-3 py-1.5 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Partner
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {partners.map((p, idx) => (
                    <div key={p.id || idx} className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) =>
                            onUpdatePartners(
                              partners.map((item, i) => (i === idx ? { ...item, name: e.target.value } : item))
                            )
                          }
                          className="font-bold text-stone-900 border-b border-transparent hover:border-stone-300 px-1 w-full"
                          placeholder="Partner Name"
                        />
                        <button
                          onClick={() => onUpdatePartners(partners.filter((_, i) => i !== idx))}
                          className="text-stone-300 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={p.type}
                        onChange={(e) =>
                          onUpdatePartners(
                            partners.map((item, i) => (i === idx ? { ...item, type: e.target.value } : item))
                          )
                        }
                        className="text-[11px] text-emerald-800 border px-2 py-1 rounded w-full font-semibold"
                        placeholder="Partner Category"
                      />

                      <textarea
                        rows={2}
                        value={p.description}
                        onChange={(e) =>
                          onUpdatePartners(
                            partners.map((item, i) => (i === idx ? { ...item, description: e.target.value } : item))
                          )
                        }
                        className="w-full border p-2 rounded text-stone-600"
                        placeholder="Description of partnership"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 10. INBOX / SUBMISSIONS TAB */}
          {/* ============================================================== */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Incoming Donor Pledges & Form Inquiries</h2>
                <p className="text-xs text-stone-500">
                  Review pledges made through the donation system, contact messages, and volunteer registrations.
                </p>
              </div>

              {/* Donor Pledges Section */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-emerald-800" />
                      Donation Pledges & Verification Desk ({pledges.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Confirm received bank transfers to immediately issue official receipts to donors by code.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {pledges.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm('Clear all pledges?')) onUpdatePledges([]);
                        }}
                        className="text-stone-400 hover:text-red-600 text-xs px-2 py-1"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter / Search Bar */}
                {pledges.length > 0 && (
                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      placeholder="Filter by Code (ZNJ-...), Donor, or Cause..."
                      value={pledgeSearchQuery}
                      onChange={(e) => setPledgeSearchQuery(e.target.value)}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                )}

                {pledges.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-4 text-center">
                    No donation pledges recorded yet. Any donation pledges generated on the site appear here!
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-2.5">Reference Code</th>
                          <th className="p-2.5">Donor Particulars</th>
                          <th className="p-2.5">Amount</th>
                          <th className="p-2.5">Designated Cause</th>
                          <th className="p-2.5">Date</th>
                          <th className="p-2.5">Payment Status</th>
                          <th className="p-2.5 text-right">Admin Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {pledges
                          .filter((pl) => {
                            if (!pledgeSearchQuery.trim()) return true;
                            const q = pledgeSearchQuery.toLowerCase();
                            return (
                              pl.reference.toLowerCase().includes(q) ||
                              pl.donorName.toLowerCase().includes(q) ||
                              pl.cause.toLowerCase().includes(q) ||
                              pl.status.toLowerCase().includes(q)
                            );
                          })
                          .map((pl) => (
                            <tr key={pl.id} className="hover:bg-stone-50 transition-colors">
                              <td className="p-2.5 font-mono font-bold text-emerald-900 text-xs">
                                {pl.reference}
                              </td>
                              <td className="p-2.5">
                                <div className="font-semibold text-stone-900">{pl.donorName}</div>
                                <div className="text-[10px] text-stone-500">{pl.donorEmail}</div>
                                {pl.donorPhone && <div className="text-[10px] text-stone-400 font-mono">{pl.donorPhone}</div>}
                              </td>
                              <td className="p-2.5 font-bold text-stone-900 font-mono">
                                ₦{pl.amount.toLocaleString()}
                              </td>
                              <td className="p-2.5 text-stone-600 max-w-xs truncate">{pl.cause}</td>
                              <td className="p-2.5 text-stone-400 whitespace-nowrap">{pl.timestamp}</td>
                              <td className="p-2.5 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold inline-flex items-center gap-1 ${
                                    pl.status === 'Confirmed'
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                                  }`}
                                >
                                  {pl.status === 'Confirmed' ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                      <span>Payment Confirmed</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3 h-3 text-amber-700" />
                                      <span>Pending Transfer</span>
                                    </>
                                  )}
                                </span>
                              </td>
                              <td className="p-2.5 text-right whitespace-nowrap space-x-1.5">
                                {pl.status !== 'Confirmed' ? (
                                  <button
                                    onClick={() => {
                                      const updated = pledges.map((item) =>
                                        item.id === pl.id ? { ...item, status: 'Confirmed' as const } : item
                                      );
                                      onUpdatePledges(updated);
                                      showToast(`Payment for ${pl.reference} CONFIRMED! Donor can now print official receipt.`);
                                    }}
                                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-amber-300 font-bold rounded text-[11px] shadow-xs inline-flex items-center gap-1 transition-colors"
                                    title="Confirm that bank transfer was received"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Confirm Payment</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const updated = pledges.map((item) =>
                                        item.id === pl.id ? { ...item, status: 'Pending Verification' as const } : item
                                      );
                                      onUpdatePledges(updated);
                                      showToast(`Status reverted to Pending.`);
                                    }}
                                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[10px] font-medium"
                                    title="Revert back to pending"
                                  >
                                    Revert to Pending
                                  </button>
                                )}

                                {onViewReceipt && (
                                  <button
                                    onClick={() => onViewReceipt(pl.reference)}
                                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-[10px] inline-flex items-center gap-1 transition-colors"
                                    title="View / Print Document"
                                  >
                                    <Printer className="w-3 h-3" />
                                    <span>Print {pl.status === 'Confirmed' ? 'Receipt' : 'Invoice'}</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete pledge ${pl.reference}?`)) {
                                      onUpdatePledges(pledges.filter((item) => item.id !== pl.id));
                                    }
                                  }}
                                  className="p-1 text-stone-400 hover:text-red-600 rounded"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5 inline" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Contact Messages Section */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-800" />
                    Contact Messages ({messages.length})
                  </h3>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-4 text-center">
                    No contact messages submitted yet. Messages sent through the Contact Us form appear here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-stone-900 text-sm">{msg.subject}</span>
                            <div className="text-[11px] text-stone-500">
                              From: {msg.fullName} ({msg.email}) {msg.phone ? `· ${msg.phone}` : ''} · {msg.timestamp}
                            </div>
                          </div>
                          <button
                            onClick={() => onUpdateMessages(messages.filter((m) => m.id !== msg.id))}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-stone-700 bg-white p-3 rounded border border-stone-100">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Volunteers Section */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-800" />
                    Volunteer Registrations ({volunteers.length})
                  </h3>
                </div>

                {volunteers.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-4 text-center">
                    No volunteer applications submitted yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {volunteers.map((v) => (
                      <div key={v.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-stone-900 text-sm">{v.fullName}</span>
                          <button
                            onClick={() => onUpdateVolunteers(volunteers.filter((item) => item.id !== v.id))}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-stone-600">
                          {v.email} · {v.phone}
                        </p>
                        <p className="text-emerald-800 font-semibold">Interest: {v.interest}</p>
                        <p className="text-stone-500">
                          Profession: {v.profession} | Availability: {v.availability}
                        </p>
                        {v.experience && <p className="text-stone-600 italic bg-white p-2 rounded">&ldquo;{v.experience}&rdquo;</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
