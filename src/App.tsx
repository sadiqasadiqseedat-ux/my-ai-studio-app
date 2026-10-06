/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ClientRecord,
  MatterRecord,
  CaseRecord,
  CourtDiaryItem,
  DeadlineRecord,
  TaskRecord,
  LegalDocumentRecord,
  LegalTemplate,
  CorrespondenceRecord,
  LegalResearchRecord,
  AppointmentRecord,
  PropertyRecord,
  LandlordRecord,
  UnitRecord,
  TenantRecord,
  InvoiceRecord,
  PaymentRecord,
  ExpenseRecord,
  AuditLogRecord,
  NotificationItem,
  FirmProfile,
  UserProfile,
  UserRole,
  BranchRecord,
} from './types/legal';

import {
  initialFirmProfile,
  initialBranches,
  initialUsers,
  initialClients,
  initialMatters,
  initialCases,
  initialCourtDiary,
  initialDeadlines,
  initialTasks,
  initialProperties,
  initialLandlords,
  initialTenants,
  initialUnits,
  initialDocuments,
  initialTemplates,
  initialCorrespondence,
  initialResearch,
  initialAppointments,
  initialInvoices,
  initialPayments,
  initialExpenses,
  initialAuditLogs,
  initialNotifications,
} from './data/legalMockData';

// Legal Subcomponents
import { LegalNavbar } from './components/legal/LegalNavbar';
import { LegalSidebar } from './components/legal/LegalSidebar';
import { DashboardView } from './components/legal/DashboardView';
import { ClientsView } from './components/legal/ClientsView';
import { ClientIntakeView } from './components/legal/ClientIntakeView';
import { MattersView } from './components/legal/MattersView';
import { LitigationCasesView } from './components/legal/LitigationCasesView';
import { CourtDiaryView } from './components/legal/CourtDiaryView';
import { DeadlinesTasksView } from './components/legal/DeadlinesTasksView';
import { DocumentsTemplatesView } from './components/legal/DocumentsTemplatesView';
import { CorrespondenceResearchView } from './components/legal/CorrespondenceResearchView';
import { PropertyRegisterView } from './components/legal/PropertyRegisterView';
import { LandlordsTenantsView } from './components/legal/LandlordsTenantsView';
import { BillingFinanceView } from './components/legal/BillingFinanceView';
import { TenancyNoticesTransactionsView } from './components/legal/TenancyNoticesTransactionsView';
import { AuditAdministrationReportsView } from './components/legal/AuditAdministrationReportsView';
import { AiLegalAssistantView } from './components/legal/AiLegalAssistantView';
import { PublicFirmView } from './components/legal/PublicFirmView';
import { StaffLoginModal } from './components/legal/StaffLoginModal';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<string>('public-site');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Authentication & Branch State
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 1. Branches State (Persisted)
  const [branches, setBranches] = useState<BranchRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_branches');
      return saved ? JSON.parse(saved) : initialBranches;
    } catch {
      return initialBranches;
    }
  });

  // 2. Users State (Persisted)
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_users');
      return saved ? JSON.parse(saved) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  // 3. Current Authenticated User (Default is Principal Partner or saved)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('bbbc_current_user');
      return saved ? JSON.parse(saved) : initialUsers[3]; // Barr. B. B. Bale, SAN (Principal Partner)
    } catch {
      return initialUsers[3];
    }
  });

  // 4. Active Branch Context ('all' for Principal Partner, or specific branch ID)
  const [activeBranchId, setActiveBranchId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('bbbc_active_branch_id');
      return saved ? saved : 'branch-abj';
    } catch {
      return 'branch-abj';
    }
  });

  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(currentUser.role);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 5. Firm Profile
  const [firmProfile, setFirmProfile] = useState<FirmProfile>(() => {
    try {
      const saved = localStorage.getItem('bbbc_firm_profile');
      return saved ? JSON.parse(saved) : initialFirmProfile;
    } catch {
      return initialFirmProfile;
    }
  });

  // 6. Clients
  const [clients, setClients] = useState<ClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_clients');
      return saved ? JSON.parse(saved) : initialClients;
    } catch {
      return initialClients;
    }
  });

  // 7. Matters
  const [matters, setMatters] = useState<MatterRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_matters');
      return saved ? JSON.parse(saved) : initialMatters;
    } catch {
      return initialMatters;
    }
  });

  // 8. Litigation Cases
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_cases');
      return saved ? JSON.parse(saved) : initialCases;
    } catch {
      return initialCases;
    }
  });

  // 9. Court Diary
  const [courtDiary, setCourtDiary] = useState<CourtDiaryItem[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_court_diary');
      return saved ? JSON.parse(saved) : initialCourtDiary;
    } catch {
      return initialCourtDiary;
    }
  });

  // 10. Deadlines & Tasks
  const [deadlines, setDeadlines] = useState<DeadlineRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_deadlines');
      return saved ? JSON.parse(saved) : initialDeadlines;
    } catch {
      return initialDeadlines;
    }
  });

  const [tasks, setTasks] = useState<TaskRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_tasks');
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  // 11. Documents & Templates
  const [documents, setDocuments] = useState<LegalDocumentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_documents');
      return saved ? JSON.parse(saved) : initialDocuments;
    } catch {
      return initialDocuments;
    }
  });

  const [templates] = useState<LegalTemplate[]>(initialTemplates);

  // 12. Correspondence, Research, Appointments
  const [correspondence, setCorrespondence] = useState<CorrespondenceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_correspondence');
      return saved ? JSON.parse(saved) : initialCorrespondence;
    } catch {
      return initialCorrespondence;
    }
  });

  const [research, setResearch] = useState<LegalResearchRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_research');
      return saved ? JSON.parse(saved) : initialResearch;
    } catch {
      return initialResearch;
    }
  });

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_appointments');
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  // 13. Properties, Landlords, Tenants
  const [properties, setProperties] = useState<PropertyRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_properties');
      return saved ? JSON.parse(saved) : initialProperties;
    } catch {
      return initialProperties;
    }
  });

  const [landlords, setLandlords] = useState<LandlordRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_landlords');
      return saved ? JSON.parse(saved) : initialLandlords;
    } catch {
      return initialLandlords;
    }
  });

  const [tenants, setTenants] = useState<TenantRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_tenants');
      return saved ? JSON.parse(saved) : initialTenants;
    } catch {
      return initialTenants;
    }
  });

  const [units] = useState<UnitRecord[]>(initialUnits);

  // 14. Invoices, Payments, Expenses
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_invoices');
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch {
      return initialInvoices;
    }
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_payments');
      return saved ? JSON.parse(saved) : initialPayments;
    } catch {
      return initialPayments;
    }
  });

  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_expenses');
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch {
      return initialExpenses;
    }
  });

  // 15. Audit Logs & Notifications
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_audit_logs');
      return saved ? JSON.parse(saved) : initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_notifications');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('bbbc_branches', JSON.stringify(branches));
  }, [branches]);
  useEffect(() => {
    localStorage.setItem('bbbc_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('bbbc_current_user', JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem('bbbc_active_branch_id', activeBranchId);
  }, [activeBranchId]);
  useEffect(() => {
    localStorage.setItem('bbbc_firm_profile', JSON.stringify(firmProfile));
  }, [firmProfile]);
  useEffect(() => {
    localStorage.setItem('bbbc_clients', JSON.stringify(clients));
  }, [clients]);
  useEffect(() => {
    localStorage.setItem('bbbc_matters', JSON.stringify(matters));
  }, [matters]);
  useEffect(() => {
    localStorage.setItem('bbbc_cases', JSON.stringify(cases));
  }, [cases]);
  useEffect(() => {
    localStorage.setItem('bbbc_court_diary', JSON.stringify(courtDiary));
  }, [courtDiary]);
  useEffect(() => {
    localStorage.setItem('bbbc_deadlines', JSON.stringify(deadlines));
  }, [deadlines]);
  useEffect(() => {
    localStorage.setItem('bbbc_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('bbbc_documents', JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem('bbbc_correspondence', JSON.stringify(correspondence));
  }, [correspondence]);
  useEffect(() => {
    localStorage.setItem('bbbc_research', JSON.stringify(research));
  }, [research]);
  useEffect(() => {
    localStorage.setItem('bbbc_appointments', JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem('bbbc_properties', JSON.stringify(properties));
  }, [properties]);
  useEffect(() => {
    localStorage.setItem('bbbc_landlords', JSON.stringify(landlords));
  }, [landlords]);
  useEffect(() => {
    localStorage.setItem('bbbc_tenants', JSON.stringify(tenants));
  }, [tenants]);
  useEffect(() => {
    localStorage.setItem('bbbc_invoices', JSON.stringify(invoices));
  }, [invoices]);
  useEffect(() => {
    localStorage.setItem('bbbc_payments', JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem('bbbc_expenses', JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('bbbc_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);
  useEffect(() => {
    localStorage.setItem('bbbc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Current active branch object
  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const isPrincipalPartner =
    currentUserRole === 'Managing Partner' ||
    currentUserRole === 'Principal Partner' ||
    currentUser.username === 'b.bale' ||
    currentUser.username === 'principal';

  // Audit Log Helper
  const logAudit = (action: string, module: string, details: string) => {
    const newLog: AuditLogRecord = {
      id: 'log-' + Date.now(),
      user: currentUser.name,
      role: currentUserRole,
      userName: currentUser.name,
      userRole: currentUserRole,
      action,
      module,
      details,
      branchId: activeBranch.id,
      branchName: activeBranch.name,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  /* ========================================================
     MULTI-BRANCH PARTITIONING & DATA FILTERING
     "AND USER FROM OTHER BRANCH CANNOT SEE ANYTHING FROM OTHER BRANCH.
      AND ONLY PRINCIPAL PARTNER CAN SEE THROUGH ALL THE BRANCHES"
  ======================================================== */
  const shouldFilterBranch = !isPrincipalPartner || activeBranchId !== 'all';

  const branchFilteredClients = shouldFilterBranch
    ? clients.filter((c) => !c.branchId || c.branchId === activeBranch.id)
    : clients;

  const branchFilteredMatters = shouldFilterBranch
    ? matters.filter((m) => !m.branchId || m.branchId === activeBranch.id)
    : matters;

  const branchFilteredCases = shouldFilterBranch
    ? cases.filter((c) => !c.branchId || c.branchId === activeBranch.id)
    : cases;

  const branchFilteredCourtDiary = shouldFilterBranch
    ? courtDiary.filter((c) => !c.branchId || c.branchId === activeBranch.id)
    : courtDiary;

  const branchFilteredDeadlines = shouldFilterBranch
    ? deadlines.filter((d) => !d.branchId || d.branchId === activeBranch.id)
    : deadlines;

  const branchFilteredTasks = shouldFilterBranch
    ? tasks.filter((t) => !t.branchId || t.branchId === activeBranch.id)
    : tasks;

  const branchFilteredProperties = shouldFilterBranch
    ? properties.filter((p) => !p.branchId || p.branchId === activeBranch.id)
    : properties;

  const branchFilteredTenants = shouldFilterBranch
    ? tenants.filter((t) => !t.branchId || t.branchId === activeBranch.id)
    : tenants;

  const branchFilteredInvoices = shouldFilterBranch
    ? invoices.filter((i) => !i.branchId || i.branchId === activeBranch.id)
    : invoices;

  const branchFilteredPayments = shouldFilterBranch
    ? payments.filter((p) => !p.branchId || p.branchId === activeBranch.id)
    : payments;

  const branchFilteredExpenses = shouldFilterBranch
    ? expenses.filter((e) => !e.branchId || e.branchId === activeBranch.id)
    : expenses;

  const branchFilteredAuditLogs = shouldFilterBranch
    ? auditLogs.filter((l) => !l.branchId || l.branchId === activeBranch.id)
    : auditLogs;

  /* ========================================================
     AUTHENTICATION & LOGIN HANDLERS
  ======================================================== */
  const handleLoginSuccess = (user: UserProfile, branch: BranchRecord) => {
    setCurrentUser(user);
    setCurrentUserRole(user.role);
    setActiveBranchId(branch.id);
    setCurrentTab('dashboard');

    logAudit('STAFF_LOGIN', 'Authentication', `Logged into ${branch.name} as ${user.name} (${user.role})`);
    showToast(`Authenticated into ${branch.name} as ${user.name}`);

    // If initial administrator using default password 'admin', give warning
    if (user.role === 'Administrator' && (!user.hasChangedDefaultPassword || user.password === 'admin')) {
      setTimeout(() => {
        showToast(`Default Password Notice: You are using the default Administrator password 'admin'. Please change your password in Administration.`);
      }, 1500);
    }
  };

  const handleLogout = () => {
    setCurrentTab('public-site');
    showToast('Logged out of Chambers Portal.');
  };

  /* ========================================================
     PRINCIPAL PARTNER: CREATE BRANCH & AUTO-PROVISION ADMIN
  ======================================================== */
  const handleCreateBranch = (newBranch: BranchRecord) => {
    setBranches((prev) => [...prev, newBranch]);

    // Automatically create Branch Administrator:
    // Username = Branch Name
    // Initial Password = 'admin'
    const newAdminUser: UserProfile = {
      id: 'admin-' + Date.now(),
      name: `${newBranch.name} Administrator`,
      username: newBranch.name,
      password: 'admin',
      email: `admin.${newBranch.code.toLowerCase()}@bbbalelaw.ng`,
      role: 'Administrator',
      title: `Branch Administrator (${newBranch.name})`,
      branchId: newBranch.id,
      branchName: newBranch.name,
      phone: newBranch.phone,
      isInitialAdmin: true,
      hasChangedDefaultPassword: false,
    };

    setUsers((prev) => [...prev, newAdminUser]);
    logAudit('CREATE_BRANCH', 'Administration', `Principal Partner established new branch: ${newBranch.name}`);
    showToast(`Branch "${newBranch.name}" created with Administrator username "${newBranch.name}" & initial password "admin".`);
  };

  /* ========================================================
     BRANCH ADMINISTRATOR: CREATE STAFF FOR OWN BRANCH
  ======================================================== */
  const handleCreateStaffUser = (staff: UserProfile) => {
    setUsers((prev) => [...prev, staff]);
    logAudit('CREATE_STAFF_ACCOUNT', 'Administration', `Administrator provisioned credentials for ${staff.name} (${staff.role}) in ${activeBranch.name}`);
    showToast(`Staff credentials created for "${staff.name}" (${staff.username}) in ${activeBranch.name}.`);
  };

  /* ========================================================
     CHANGE PASSWORD
  ======================================================== */
  const handleChangePassword = (userId: string, newPass: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, password: newPass, hasChangedDefaultPassword: true }
          : u
      )
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, password: newPass, hasChangedDefaultPassword: true }));
    }
    logAudit('PASSWORD_CHANGE', 'Authentication', `Password updated for user ID ${userId}`);
    showToast('Password successfully changed.');
  };

  /* ========================================================
     DATA MUTATIONS (TAGGED TO CURRENT BRANCH)
  ======================================================== */
  const handleAddClient = (client: ClientRecord) => {
    const tagged = {
      ...client,
      branchId: client.branchId || activeBranch.id,
      branchName: client.branchName || activeBranch.name,
    };
    setClients((prev) => [tagged, ...prev]);
    logAudit('CREATE_CLIENT', 'Clients', `Added client: ${tagged.name} (${tagged.clientType})`);
    showToast(`Client "${tagged.name}" registered in ${activeBranch.name}.`);
  };

  const handleUpdateClient = (client: ClientRecord) => {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
    logAudit('UPDATE_CLIENT', 'Clients', `Updated client record: ${client.name}`);
    showToast(`Client "${client.name}" updated.`);
  };

  const handleDeleteClient = (id: string) => {
    const client = clients.find((c) => c.id === id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (client) {
      logAudit('DELETE_CLIENT', 'Clients', `Archived client record: ${client.name}`);
      showToast(`Client "${client.name}" archived.`);
    }
  };

  const handleAddMatter = (matter: MatterRecord) => {
    const tagged = {
      ...matter,
      branchId: matter.branchId || activeBranch.id,
      branchName: matter.branchName || activeBranch.name,
    };
    setMatters((prev) => [tagged, ...prev]);
    logAudit('CREATE_MATTER', 'Matters', `Opened matter: ${tagged.reference} - ${tagged.title}`);
    showToast(`Matter "${tagged.reference}" registered.`);
  };

  const handleUpdateMatter = (matter: MatterRecord) => {
    setMatters((prev) => prev.map((m) => (m.id === matter.id ? matter : m)));
    logAudit('UPDATE_MATTER', 'Matters', `Updated matter: ${matter.reference}`);
    showToast(`Matter "${matter.reference}" updated.`);
  };

  const handleDeleteMatter = (id: string) => {
    setMatters((prev) => prev.filter((m) => m.id !== id));
    logAudit('DELETE_MATTER', 'Matters', `Closed/Archived matter ID ${id}`);
    showToast(`Matter archived.`);
  };

  const handleAddCase = (caseItem: CaseRecord) => {
    const tagged = {
      ...caseItem,
      branchId: caseItem.branchId || activeBranch.id,
      branchName: caseItem.branchName || activeBranch.name,
    };
    setCases((prev) => [tagged, ...prev]);
    logAudit('CREATE_CASE', 'Litigation', `Instituted litigation case: ${tagged.suitNumber} (${tagged.plaintiffClaimant || tagged.plaintiff} v. ${tagged.defendantRespondent || tagged.defendant})`);
    showToast(`Case "${tagged.suitNumber}" created in docket.`);
  };

  const handleUpdateCase = (caseItem: CaseRecord) => {
    setCases((prev) => prev.map((c) => (c.id === caseItem.id ? caseItem : c)));
    logAudit('UPDATE_CASE', 'Litigation', `Updated case docket: ${caseItem.suitNumber}`);
    showToast(`Case "${caseItem.suitNumber}" updated.`);
  };

  const handleDeleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    logAudit('DELETE_CASE', 'Litigation', `Removed case ID ${id}`);
    showToast(`Case removed from active docket.`);
  };

  const handleAddCourtDate = (entry: CourtDiaryItem) => {
    const tagged = {
      ...entry,
      branchId: entry.branchId || activeBranch.id,
      branchName: entry.branchName || activeBranch.name,
    };
    setCourtDiary((prev) => [tagged, ...prev]);
    logAudit('SCHEDULE_COURT_DATE', 'Court Diary', `Scheduled appearance for ${tagged.courtDate}: ${tagged.suitNumber} at ${tagged.courtName}`);
    showToast(`Court appearance scheduled for ${tagged.courtDate}.`);
  };

  const handleUpdateCourtDate = (entry: CourtDiaryItem) => {
    setCourtDiary((prev) => prev.map((c) => (c.id === entry.id ? entry : c)));
    logAudit('UPDATE_COURT_DATE', 'Court Diary', `Updated appearance ${entry.suitNumber}`);
    showToast(`Court diary entry updated.`);
  };

  const handleAddDeadline = (d: DeadlineRecord) => {
    setDeadlines((prev) => [d, ...prev]);
    logAudit('CREATE_DEADLINE', 'Deadlines', `Logged deadline: ${d.title} due ${d.dueDate}`);
    showToast(`Deadline set for ${d.dueDate}.`);
  };

  const handleUpdateDeadline = (d: DeadlineRecord) => {
    setDeadlines((prev) => prev.map((item) => (item.id === d.id ? d : item)));
  };

  const handleAddTask = (t: TaskRecord) => {
    setTasks((prev) => [t, ...prev]);
    logAudit('CREATE_TASK', 'Tasks', `Assigned task: ${t.title} to ${t.assignedPerson || t.assignedTo}`);
    showToast(`Task assigned to ${t.assignedPerson || t.assignedTo}.`);
  };

  const handleUpdateTask = (t: TaskRecord) => {
    setTasks((prev) => prev.map((item) => (item.id === t.id ? t : item)));
  };

  const handleUploadDocument = (doc: LegalDocumentRecord) => {
    setDocuments((prev) => [doc, ...prev]);
    logAudit('UPLOAD_DOCUMENT', 'Documentation', `Uploaded document: ${doc.title} (${doc.category})`);
    showToast(`Document "${doc.title}" saved.`);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    logAudit('DELETE_DOCUMENT', 'Documentation', `Deleted document ID ${id}`);
    showToast(`Document removed.`);
  };

  const handleAddProperty = (p: PropertyRecord) => {
    const tagged = {
      ...p,
      branchId: p.branchId || activeBranch.id,
      branchName: p.branchName || activeBranch.name,
    };
    setProperties((prev) => [tagged, ...prev]);
    logAudit('CREATE_PROPERTY', 'Property Register', `Registered property: ${tagged.name}`);
    showToast(`Property "${tagged.name}" registered in ${activeBranch.name}.`);
  };

  const handleUpdateProperty = (p: PropertyRecord) => {
    setProperties((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    logAudit('DELETE_PROPERTY', 'Property Register', `Removed property ID ${id}`);
  };

  const handleAddLandlord = (l: LandlordRecord) => {
    setLandlords((prev) => [l, ...prev]);
    logAudit('CREATE_LANDLORD', 'Landlords', `Onboarded landlord: ${l.name}`);
    showToast(`Landlord "${l.name}" registered.`);
  };

  const handleAddTenant = (t: TenantRecord) => {
    const tagged = {
      ...t,
      branchId: t.branchId || activeBranch.id,
      branchName: t.branchName || activeBranch.name,
    };
    setTenants((prev) => [tagged, ...prev]);
    logAudit('CREATE_TENANT', 'Tenants', `Onboarded tenant: ${tagged.name} at ${tagged.propertyName}`);
    showToast(`Tenant "${tagged.name}" added to rent roll in ${activeBranch.name}.`);
  };

  const handleDeleteTenant = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
    logAudit('DELETE_TENANT', 'Tenants', `Offboarded tenant ID ${id}`);
  };

  const handleUpdateTenantPayment = (tenantId: string, status: 'Paid' | 'Overdue' | 'Partially Paid') => {
    setTenants((prev) =>
      prev.map((t) => (t.id === tenantId ? { ...t, paymentStatus: status } : t))
    );
    showToast(`Tenant payment status updated to "${status}".`);
  };

  const handleAddInvoice = (inv: InvoiceRecord) => {
    const tagged = {
      ...inv,
      branchId: inv.branchId || activeBranch.id,
      branchName: inv.branchName || activeBranch.name,
    };
    setInvoices((prev) => [tagged, ...prev]);
    logAudit('CREATE_INVOICE', 'Finance', `Issued Fee Note: ${tagged.invoiceNumber} for ₦${tagged.totalAmount.toLocaleString()}`);
    showToast(`Invoice "${tagged.invoiceNumber}" issued.`);
  };

  const handleRecordPayment = (payment: PaymentRecord) => {
    setPayments((prev) => [payment, ...prev]);
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === payment.invoiceId) {
          const newPaid = inv.amountPaid + payment.amount;
          const newBal = Math.max(0, inv.totalAmount - newPaid);
          return {
            ...inv,
            amountPaid: newPaid,
            balance: newBal,
            status: newBal === 0 ? 'Paid' : 'Partially Paid',
          };
        }
        return inv;
      })
    );
    logAudit('RECORD_PAYMENT', 'Finance', `Recorded payment: ₦${payment.amount.toLocaleString()} for Invoice ${payment.invoiceNumber}`);
    showToast(`Payment of ₦${payment.amount.toLocaleString()} posted to Trust Account.`);
  };

  const handleAddExpense = (exp: ExpenseRecord) => {
    setExpenses((prev) => [exp, ...prev]);
    logAudit('CREATE_EXPENSE', 'Finance', `Recorded disbursement: ₦${exp.amount.toLocaleString()} (${exp.category})`);
    showToast(`Disbursement recorded.`);
  };

  const handleCompleteIntake = (newClient: ClientRecord, newMatter?: MatterRecord) => {
    handleAddClient(newClient);
    if (newMatter) {
      handleAddMatter(newMatter);
    }
    logAudit('CLIENT_INTAKE', 'Client Intake', `Completed intake & conflict check for ${newClient.name}`);
    setCurrentTab('clients');
  };

  const handleMarkNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Quick Action triggers from Navbar
  const handleQuickAction = (actionType: string) => {
    if (actionType === 'new-client') setCurrentTab('client-intake');
    else if (actionType === 'new-matter') setCurrentTab('matters');
    else if (actionType === 'new-case') setCurrentTab('litigation');
    else if (actionType === 'new-court-date') setCurrentTab('court-diary');
    else if (actionType === 'new-notice') setCurrentTab('notices-recovery');
    else if (actionType === 'new-invoice') setCurrentTab('billing');
  };

  // When public site requests consultation
  const handlePublicConsultation = (data: {
    name: string;
    phone: string;
    email: string;
    matterType: string;
    notes: string;
  }) => {
    const newProspect: ClientRecord = {
      id: 'client-prospect-' + Date.now(),
      name: data.name,
      clientType: 'Individual',
      phone: data.phone,
      email: data.email,
      address: 'Abuja, FCT',
      occupation: 'Prospective Client (Public Web Inquiry)',
      dateOnboarded: new Date().toISOString().split('T')[0],
      assignedLawyer: 'Barr. B. B. Bale, SAN',
      status: 'Prospect',
      branchId: activeBranch.id,
      branchName: activeBranch.name,
      notes: `Inquiry Area: ${data.matterType}. Brief: ${data.notes}`,
    };
    setClients((prev) => [newProspect, ...prev]);
    logAudit('PUBLIC_INQUIRY', 'Client Intake', `Received consultation request from ${data.name}`);
    showToast(`New consultation brief logged for "${data.name}".`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3D] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#D4AF37]/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Staff Login Modal (Triggered by disguised button) */}
      <StaffLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        branches={branches}
        users={users}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* RENDER PUBLIC WEBSITE OR INTERNAL MANAGEMENT APP */}
      {currentTab === 'public-site' ? (
        <PublicFirmView
          firmProfile={firmProfile}
          lawyers={users.filter((u) => u.role.includes('Partner') || u.role.includes('Counsel'))}
          onOpenPortal={() => setShowLoginModal(true)}
          onRequestConsultation={handlePublicConsultation}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <LegalNavbar
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            currentUser={currentUser}
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
            branches={branches}
            activeBranchId={activeBranchId}
            onSelectBranch={setActiveBranchId}
            onOpenQuickAction={handleQuickAction}
            onSearchSelect={(type, id) => {
              if (type === 'matter') setCurrentTab('matters');
              else if (type === 'case') setCurrentTab('litigation');
              else if (type === 'client') setCurrentTab('clients');
              else if (type === 'property') setCurrentTab('properties');
            }}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotification}
            onOpenPublicSite={() => setCurrentTab('public-site')}
            onLogout={handleLogout}
            searchQuery={globalSearchQuery}
            onSearchChange={setGlobalSearchQuery}
          />

          {/* Main Layout: Sidebar + Workspace */}
          <div className="flex-1 flex">
            {/* Sidebar */}
            <LegalSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setMobileSidebarOpen(false);
              }}
              currentUserRole={currentUserRole}
              mobileOpen={mobileSidebarOpen}
              onCloseMobile={() => setMobileSidebarOpen(false)}
              unreadNotificationsCount={notifications.filter((n) => !n.isRead).length}
            />

            {/* Main Content Workspace */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {currentTab === 'dashboard' && (
                <DashboardView
                  clients={branchFilteredClients}
                  matters={branchFilteredMatters}
                  cases={branchFilteredCases}
                  courtDiary={branchFilteredCourtDiary}
                  deadlines={branchFilteredDeadlines}
                  properties={branchFilteredProperties}
                  tenants={branchFilteredTenants}
                  invoices={branchFilteredInvoices}
                  payments={branchFilteredPayments}
                  auditLogs={branchFilteredAuditLogs}
                  onNavigateTab={setCurrentTab}
                  onOpenQuickAction={handleQuickAction}
                />
              )}

              {currentTab === 'clients' && (
                <ClientsView
                  clients={branchFilteredClients}
                  matters={branchFilteredMatters}
                  cases={branchFilteredCases}
                  invoices={branchFilteredInvoices}
                  properties={branchFilteredProperties}
                  onAddClient={handleAddClient}
                  onUpdateClient={handleUpdateClient}
                  onDeleteClient={handleDeleteClient}
                  onOpenMatterDetail={() => setCurrentTab('matters')}
                />
              )}

              {currentTab === 'client-intake' && (
                <ClientIntakeView
                  clients={branchFilteredClients}
                  matters={branchFilteredMatters}
                  cases={branchFilteredCases}
                  onCompleteIntake={handleCompleteIntake}
                />
              )}

              {currentTab === 'matters' && (
                <MattersView
                  matters={branchFilteredMatters}
                  clients={branchFilteredClients}
                  cases={branchFilteredCases}
                  documents={documents}
                  tasks={branchFilteredTasks}
                  onAddMatter={handleAddMatter}
                  onUpdateMatter={handleUpdateMatter}
                  onDeleteMatter={handleDeleteMatter}
                  onOpenCaseDetail={() => setCurrentTab('litigation')}
                />
              )}

              {currentTab === 'litigation' && (
                <LitigationCasesView
                  cases={branchFilteredCases}
                  matters={branchFilteredMatters}
                  onAddCase={handleAddCase}
                  onUpdateCase={handleUpdateCase}
                  onDeleteCase={handleDeleteCase}
                />
              )}

              {currentTab === 'court-diary' && (
                <CourtDiaryView
                  courtDiary={branchFilteredCourtDiary}
                  cases={branchFilteredCases}
                  onAddCourtDate={handleAddCourtDate}
                  onUpdateCourtDate={handleUpdateCourtDate}
                />
              )}

              {currentTab === 'deadlines' && (
                <DeadlinesTasksView
                  deadlines={branchFilteredDeadlines}
                  tasks={branchFilteredTasks}
                  onAddDeadline={handleAddDeadline}
                  onUpdateDeadline={handleUpdateDeadline}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                />
              )}

              {currentTab === 'tasks' && (
                <DeadlinesTasksView
                  deadlines={branchFilteredDeadlines}
                  tasks={branchFilteredTasks}
                  onAddDeadline={handleAddDeadline}
                  onUpdateDeadline={handleUpdateDeadline}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                />
              )}

              {currentTab === 'documents' && (
                <DocumentsTemplatesView
                  documents={documents}
                  templates={templates}
                  onUploadDocument={handleUploadDocument}
                  onDeleteDocument={handleDeleteDocument}
                />
              )}

              {(currentTab === 'correspondence' || currentTab === 'research' || currentTab === 'appointments') && (
                <CorrespondenceResearchView
                  correspondence={correspondence}
                  research={research}
                  appointments={appointments}
                  onAddCorrespondence={(c) => setCorrespondence([c, ...correspondence])}
                  onAddResearch={(r) => setResearch([r, ...research])}
                  onAddAppointment={(a) => setAppointments([a, ...appointments])}
                />
              )}

              {currentTab === 'properties' && (
                <PropertyRegisterView
                  properties={branchFilteredProperties}
                  units={units}
                  landlords={landlords}
                  onAddProperty={handleAddProperty}
                  onUpdateProperty={handleUpdateProperty}
                  onDeleteProperty={handleDeleteProperty}
                />
              )}

              {currentTab === 'landlords-tenants' && (
                <LandlordsTenantsView
                  landlords={landlords}
                  tenants={branchFilteredTenants}
                  properties={branchFilteredProperties}
                  onAddLandlord={handleAddLandlord}
                  onAddTenant={handleAddTenant}
                  onDeleteTenant={handleDeleteTenant}
                />
              )}

              {(currentTab === 'rent-management' || currentTab === 'notices-recovery' || currentTab === 'property-transactions') && (
                <TenancyNoticesTransactionsView
                  initialSubTab={currentTab as any}
                  properties={branchFilteredProperties}
                  tenants={branchFilteredTenants}
                  firmProfile={firmProfile}
                  onUpdateTenantPayment={handleUpdateTenantPayment}
                />
              )}

              {currentTab === 'billing' && (
                <BillingFinanceView
                  invoices={branchFilteredInvoices}
                  payments={branchFilteredPayments}
                  expenses={branchFilteredExpenses}
                  clients={branchFilteredClients}
                  matters={branchFilteredMatters}
                  firmProfile={firmProfile}
                  onAddInvoice={handleAddInvoice}
                  onRecordPayment={handleRecordPayment}
                  onAddExpense={handleAddExpense}
                />
              )}

              {(currentTab === 'reports' || currentTab === 'audit-trail' || currentTab === 'administration') && (
                <AuditAdministrationReportsView
                  initialSubTab={currentTab as any}
                  auditLogs={branchFilteredAuditLogs}
                  firmProfile={firmProfile}
                  branches={branches}
                  activeBranch={activeBranch}
                  users={users}
                  currentUser={currentUser}
                  currentUserRole={currentUserRole}
                  onChangeUserRole={setCurrentUserRole}
                  onUpdateFirmProfile={setFirmProfile}
                  onCreateBranch={handleCreateBranch}
                  onCreateStaffUser={handleCreateStaffUser}
                  onChangePassword={handleChangePassword}
                  cases={branchFilteredCases}
                  matters={branchFilteredMatters}
                  invoices={branchFilteredInvoices}
                  properties={branchFilteredProperties}
                  tenants={branchFilteredTenants}
                />
              )}

              {currentTab === 'ai-assistant' && <AiLegalAssistantView />}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
