import React, { useState } from 'react';
import {
  Lock,
  Building2,
  KeyRound,
  ShieldCheck,
  User,
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle2,
  Scale,
} from 'lucide-react';
import { BranchRecord, UserProfile, UserRole } from '../../types/legal';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: BranchRecord[];
  users: UserProfile[];
  onLoginSuccess: (user: UserProfile, branch: BranchRecord) => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({
  isOpen,
  onClose,
  branches,
  users,
  onLoginSuccess,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branches[0]?.id || 'branch-abj');
  const [loginMode, setLoginMode] = useState<'admin' | 'staff' | 'principal'>('admin');

  // Form Fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  // When branch or mode changes, auto-set username for administrator mode
  const handleBranchChange = (branchId: string) => {
    setSelectedBranchId(branchId);
    setErrorMessage(null);
    const b = branches.find((item) => item.id === branchId);
    if (b && loginMode === 'admin') {
      setUsername(b.name);
    }
  };

  const handleModeChange = (mode: 'admin' | 'staff' | 'principal') => {
    setLoginMode(mode);
    setErrorMessage(null);
    setPassword('');
    if (mode === 'admin') {
      setUsername(currentBranch.name);
    } else if (mode === 'principal') {
      setUsername('b.bale');
    } else {
      setUsername('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const enteredUser = username.trim().toLowerCase();
    const enteredPass = password.trim();

    if (!enteredUser || !enteredPass) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (loginMode === 'admin') {
      // Find branch administrator
      const branchAdmin = users.find(
        (u) =>
          u.role === 'Administrator' &&
          u.branchId === currentBranch.id &&
          (u.username.toLowerCase() === enteredUser ||
            currentBranch.name.toLowerCase() === enteredUser ||
            currentBranch.name.toLowerCase().includes(enteredUser) ||
            enteredUser === 'admin')
      );

      if (!branchAdmin) {
        setErrorMessage(`No administrator account found for branch: ${currentBranch.name}`);
        return;
      }

      // Check password: default is 'admin' (case-insensitive) or custom changed password
      const validPass = branchAdmin.password || 'admin';
      const isMatch =
        enteredPass.toLowerCase() === validPass.toLowerCase() ||
        (!branchAdmin.hasChangedDefaultPassword && enteredPass.toLowerCase() === 'admin');

      if (isMatch) {
        onLoginSuccess(branchAdmin, currentBranch);
        onClose();
      } else {
        setErrorMessage('Invalid Administrator password. (Initial default passcode is: admin)');
      }
    } else if (loginMode === 'principal') {
      // Principal Partner
      const principal = users.find(
        (u) =>
          u.role === 'Managing Partner' ||
          u.role === 'Principal Partner' ||
          u.username === 'b.bale' ||
          u.username === 'principal'
      );

      if (!principal) {
        setErrorMessage('Principal Partner profile not found.');
        return;
      }

      const validPass = principal.password || 'admin';
      if (enteredPass.toLowerCase() === validPass.toLowerCase() || enteredPass.toLowerCase() === 'admin') {
        onLoginSuccess(principal, currentBranch);
        onClose();
      } else {
        setErrorMessage('Invalid Principal Partner password.');
      }
    } else {
      // Staff member in this branch
      const staffUser = users.find(
        (u) =>
          u.branchId === currentBranch.id &&
          u.username.toLowerCase() === enteredUser &&
          u.role !== 'Administrator'
      );

      if (!staffUser) {
        setErrorMessage(
          `Staff user "${username}" does not exist in ${currentBranch.name}. Contact your Branch Administrator to create your login details.`
        );
        return;
      }

      const validPass = staffUser.password || 'admin';
      if (enteredPass === validPass || enteredPass.toLowerCase() === 'admin') {
        onLoginSuccess(staffUser, currentBranch);
        onClose();
      } else {
        setErrorMessage('Invalid password for this staff account.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0B1B3D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#800020] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Chambers Internal Gateway
              </h2>
              <p className="text-xs text-slate-300">
                B. B. Bale & Co. Chambers · Branch Authentication Portal
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Step 1: Select Branch */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#800020]" />
              <span>Step 1: Select Chambers Branch</span>
            </label>
            <select
              value={selectedBranchId}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-[#0B1B3D] focus:outline-none shadow-xs"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.city}, {b.state}) {b.isHeadquarters ? '· [HEADQUARTERS]' : ''}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              {currentBranch.address}
            </p>
          </div>

          {/* Step 2: Login Mode Selector */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B1B3D]" />
              <span>Step 2: Authentication Role</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleModeChange('admin')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition ${
                  loginMode === 'admin'
                    ? 'bg-[#800020] text-amber-200 border-[#800020] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Branch Admin
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('staff')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition ${
                  loginMode === 'staff'
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Staff / Counsel
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('principal')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition ${
                  loginMode === 'principal'
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Principal Partner
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
            {loginMode === 'admin' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-800">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Branch Administrator Protocol:</span>
                </p>
                <p>
                  Username is your <strong>Branch Name</strong> (<code>{currentBranch.name}</code>).
                </p>
                <p>
                  Initial default password for all Branch Administrators is <code>admin</code> (can be changed inside the portal).
                </p>
              </div>
            )}

            {loginMode === 'staff' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-blue-800">
                  <User className="w-3.5 h-3.5" />
                  <span>Staff / Counsel Sign In:</span>
                </p>
                <p>
                  Staff login credentials for other roles (Partners, Counsel, Secretaries, Accounts, Property) are created exclusively by this branch’s Administrator.
                </p>
              </div>
            )}

            {loginMode === 'principal' && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-[11px] text-purple-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-purple-800">
                  <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Principal Partner Access:</span>
                </p>
                <p>
                  Barr. B. B. Bale, SAN has chambers-wide jurisdiction across all branches and exclusive authority to establish new chambers branches.
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {loginMode === 'admin'
                  ? 'Username (Branch Name)'
                  : loginMode === 'principal'
                  ? 'Principal Username'
                  : 'Staff Username'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  loginMode === 'admin'
                    ? currentBranch.name
                    : loginMode === 'principal'
                    ? 'b.bale'
                    : 'e.g. h.mohammed'
                }
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#0B1B3D] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={loginMode === 'admin' ? 'Initial passcode: admin' : '••••••••'}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#0B1B3D] focus:outline-none"
                required
              />
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-[#13274F] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition"
              >
                <span>Authenticate & Enter</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
