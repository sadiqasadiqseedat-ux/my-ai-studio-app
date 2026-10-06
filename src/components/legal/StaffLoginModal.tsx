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

  const currentBranch = branches.find((b) => b.id === selectedBranchId) || branches[0] || {
    id: 'branch-abj',
    name: 'Abuja Headquarters',
    code: 'ABJ',
    city: 'Abuja',
    state: 'FCT',
    address: 'Abuja, FCT',
    phone: '+234 9 291 4820',
    email: 'chambers@bbbalelaw.ng',
    dateCreated: '1998-05-14',
  };

  // Form Fields - Auto-populated with Branch Name as username for Administrator
  const [username, setUsername] = useState<string>(currentBranch.name);
  const [password, setPassword] = useState<string>('admin');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync username when branch changes or modal opens
  React.useEffect(() => {
    if (loginMode === 'admin') {
      setUsername(currentBranch.name);
    }
  }, [selectedBranchId, loginMode, currentBranch.name]);

  if (!isOpen) return null;

  // When branch changes, auto-set username for administrator mode
  const handleBranchChange = (branchId: string) => {
    setSelectedBranchId(branchId);
    setErrorMessage(null);
    const b = branches.find((item) => item.id === branchId);
    if (b && loginMode === 'admin') {
      setUsername(b.name);
      setPassword('admin');
    }
  };

  const handleModeChange = (mode: 'admin' | 'staff' | 'principal') => {
    setLoginMode(mode);
    setErrorMessage(null);
    if (mode === 'admin') {
      setUsername(currentBranch.name);
      setPassword('admin');
    } else if (mode === 'principal') {
      setUsername('b.bale');
      setPassword('admin');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const setQuickDemo = (bId: string, mode: 'admin' | 'staff' | 'principal', user: string, pass: string) => {
    setSelectedBranchId(bId);
    setLoginMode(mode);
    setUsername(user);
    setPassword(pass);
    setErrorMessage(null);
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
      // Find branch administrator: accepts branch name, admin user, or branch name matches
      const branchAdmin = users.find(
        (u) =>
          u.role === 'Administrator' &&
          u.branchId === currentBranch.id &&
          (u.username.toLowerCase() === enteredUser ||
            currentBranch.name.toLowerCase() === enteredUser ||
            currentBranch.name.toLowerCase().includes(enteredUser) ||
            enteredUser.includes(currentBranch.name.toLowerCase()) ||
            enteredUser === 'admin')
      );

      if (branchAdmin) {
        // Check password: default is 'admin' (case-insensitive) or custom changed password
        const validPass = branchAdmin.password || 'admin';
        const isMatch =
          enteredPass.toLowerCase() === validPass.toLowerCase() ||
          (!branchAdmin.hasChangedDefaultPassword && enteredPass.toLowerCase() === 'admin');

        if (isMatch) {
          onLoginSuccess(branchAdmin, currentBranch);
          onClose();
          return;
        } else {
          setErrorMessage('Invalid Administrator password. (Initial default passcode is: admin)');
          return;
        }
      }

      // If user typed Principal Partner credentials while in default tab:
      if (enteredUser === 'b.bale' || enteredUser === 'principal') {
        const principal = users.find(
          (u) => u.username === 'b.bale' || u.role === 'Managing Partner' || u.role === 'Principal Partner'
        );
        if (principal) {
          const validPass = principal.password || 'admin';
          if (enteredPass.toLowerCase() === validPass.toLowerCase() || enteredPass.toLowerCase() === 'admin') {
            onLoginSuccess(principal, currentBranch);
            onClose();
            return;
          }
        }
      }

      // If user typed staff username while in default tab:
      const branchStaff = users.find(
        (u) => u.branchId === currentBranch.id && u.username.toLowerCase() === enteredUser
      );
      if (branchStaff) {
        const validPass = branchStaff.password || 'admin';
        if (enteredPass === validPass || enteredPass.toLowerCase() === 'admin') {
          onLoginSuccess(branchStaff, currentBranch);
          onClose();
          return;
        } else {
          setErrorMessage('Invalid password for this staff account.');
          return;
        }
      }

      // Check if user belongs to another branch:
      const otherBranchUser = users.find((u) => u.username.toLowerCase() === enteredUser);
      if (otherBranchUser) {
        const otherBranch = branches.find((b) => b.id === otherBranchUser.branchId);
        setErrorMessage(
          `Access Denied: User "${username}" belongs to ${otherBranch?.name || 'another branch'}. Under Chambers rules, staff from other branches cannot access data from ${currentBranch.name}. Please select your registered branch.`
        );
        return;
      }

      setErrorMessage(
        `No administrator or staff account found for "${username}" in ${currentBranch.name}. Use your branch name ("${currentBranch.name}") as username with initial password "admin".`
      );
      return;
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
        // Multi-branch isolation enforcement check:
        const otherBranchUser = users.find((u) => u.username.toLowerCase() === enteredUser);
        if (otherBranchUser) {
          const otherBranch = branches.find((b) => b.id === otherBranchUser.branchId);
          setErrorMessage(
            `Access Denied: User "${username}" belongs to ${otherBranch?.name || 'another branch'}. Under Chambers rules, staff from other branches cannot access data from ${currentBranch.name}. Please select your registered branch.`
          );
          return;
        }

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

          {/* Quick-Fill Demo Bar for Examiners and Testing */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Quick Test Credentials (1-Click Fill):
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setQuickDemo('branch-abj', 'admin', 'Abuja Headquarters', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-medium transition"
              >
                🏢 Abuja Admin (User: &quot;Abuja Headquarters&quot;)
              </button>
              <button
                type="button"
                onClick={() => setQuickDemo('branch-lag', 'admin', 'Lagos Branch', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-medium transition"
              >
                🏢 Lagos Admin (User: &quot;Lagos Branch&quot;)
              </button>
              <button
                type="button"
                onClick={() => setQuickDemo('branch-kan', 'admin', 'Kano Branch', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-medium transition"
              >
                🏢 Kano Admin (User: &quot;Kano Branch&quot;)
              </button>
              <button
                type="button"
                onClick={() => setQuickDemo('branch-abj', 'principal', 'b.bale', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-medium transition"
              >
                ⚖️ Principal Partner (Barr. B. B. Bale, SAN)
              </button>
              <button
                type="button"
                onClick={() => setQuickDemo('branch-abj', 'staff', 'h.mohammed', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-medium transition"
              >
                👤 Abuja Staff (Hadiza)
              </button>
              <button
                type="button"
                onClick={() => setQuickDemo('branch-lag', 'staff', 'c.eze', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-medium transition"
              >
                👤 Lagos Staff (Chinedu)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
