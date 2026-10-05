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
  NoticeRecord,
} from './types/legal';

import {
  initialFirmProfile,
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

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Managing Partner');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Firm Profile
  const [firmProfile, setFirmProfile] = useState<FirmProfile>(() => {
    try {
      const saved = localStorage.getItem('bbbc_firm_profile');
      return saved ? JSON.parse(saved) : initialFirmProfile;
    } catch {
      return initialFirmProfile;
    }
  });

  // 2. Users
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_users');
      return saved ? JSON.parse(saved) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  // 3. Clients
  const [clients, setClients] = useState<ClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_clients');
      return saved ? JSON.parse(saved) : initialClients;
    } catch {
      return initialClients;
    }
  });

  // 4. Matters
  const [matters, setMatters] = useState<MatterRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_matters');
      return saved ? JSON.parse(saved) : initialMatters;
    } catch {
      return initialMatters;
    }
  });

  // 5. Litigation Cases
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_cases');
      return saved ? JSON.parse(saved) : initialCases;
    } catch {
      return initialCases;
    }
  });

  // 6. Court Diary
  const [courtDiary, setCourtDiary] = useState<CourtDiaryItem[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_court_diary');
      return saved ? JSON.parse(saved) : initialCourtDiary;
    } catch {
      return initialCourtDiary;
    }
  });

  // 7. Deadlines & Tasks
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

  // 8. Documents & Templates
  const [documents, setDocuments] = useState<LegalDocumentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bbbc_documents');
      return saved ? JSON.parse(saved) : initialDocuments;
    } catch {
      return initialDocuments;
    }
  });

  const [templates] = useState<LegalTemplate[]>(initialTemplates);

  // 9. Correspondence, Research, Appointments
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

  // 10. Properties, Landlords, Tenants
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

  // 11. Invoices, Payments, Expenses
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

  // 12. Audit Logs & Notifications
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
    localStorage.setItem('bbbc_firm_profile', JSON.stringify(firmProfile));
  }, [firmProfile]);
  useEffect(() => {
    localStorage.setItem('bbbc_users', JSON.stringify(users));
  }, [users]);
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

  // Audit Log Helper
  const logAudit = (action: string, module: string, details: string) => {
    const newLog: AuditLogRecord = {
      id: 'log-' + Date.now(),
      userId: 'user-active',
      userName: currentUserRole === 'Managing Partner' ? 'Barr. B. B. Bale, SAN' : currentUserRole,
      userRole: currentUserRole,
      action,
      module,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Handlers for data updates
  const handleAddClient = (client: ClientRecord) => {
    setClients((prev) => [client, ...prev]);
    logAudit('CREATE_CLIENT', 'Clients', `Added new client: ${client.name} (${client.clientType})`);
    showToast(`Client "${client.name}" registered successfully.`);
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
    setMatters((prev) => [matter, ...prev]);
    logAudit('CREATE_MATTER', 'Matters', `Opened new matter: ${matter.reference} - ${matter.title}`);
    showToast(`Matter "${matter.reference}" registered.`);
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
    setCases((prev) => [caseItem, ...prev]);
    logAudit('CREATE_CASE', 'Litigation', `Instituted litigation case: ${caseItem.suitNumber} (${caseItem.plaintiff} v. ${caseItem.defendant})`);
    showToast(`Case "${caseItem.suitNumber}" created in docket.`);
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
    setCourtDiary((prev) => [entry, ...prev]);
    logAudit('SCHEDULE_COURT_DATE', 'Court Diary', `Scheduled appearance for ${entry.courtDate}: ${entry.suitNumber} at ${entry.courtName}`);
    showToast(`Court appearance scheduled for ${entry.courtDate}.`);
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
    logAudit('CREATE_TASK', 'Tasks', `Assigned task: ${t.title} to ${t.assignedTo}`);
    showToast(`Task assigned to ${t.assignedTo}.`);
  };

  const handleUpdateTask = (t: TaskRecord) => {
    setTasks((prev) => prev.map((item) => (item.id === t.id ? t : item)));
  };

  const handleUploadDocument = (doc: LegalDocumentRecord) => {
    setDocuments((prev) => [doc, ...prev]);
    logAudit('UPLOAD_DOCUMENT', 'Documentation', `Uploaded document: ${doc.title} (${doc.category})`);
    showToast(`Document "${doc.title}" saved to chambers vault.`);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    logAudit('DELETE_DOCUMENT', 'Documentation', `Deleted document ID ${id}`);
    showToast(`Document removed.`);
  };

  const handleAddProperty = (p: PropertyRecord) => {
    setProperties((prev) => [p, ...prev]);
    logAudit('CREATE_PROPERTY', 'Property Register', `Registered managed property: ${p.name}`);
    showToast(`Property "${p.name}" registered.`);
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
    setTenants((prev) => [t, ...prev]);
    logAudit('CREATE_TENANT', 'Tenants', `Onboarded tenant: ${t.name} at ${t.propertyName} (${t.unitNumber})`);
    showToast(`Tenant "${t.name}" added to rent roll.`);
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
    setInvoices((prev) => [inv, ...prev]);
    logAudit('CREATE_INVOICE', 'Finance', `Issued Fee Note: ${inv.invoiceNumber} for ₦${inv.totalAmount.toLocaleString()} to ${inv.clientName}`);
    showToast(`Invoice "${inv.invoiceNumber}" issued.`);
  };

  const handleRecordPayment = (payment: PaymentRecord) => {
    setPayments((prev) => [payment, ...prev]);
    // update invoice balance
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
    setClients((prev) => [newClient, ...prev]);
    if (newMatter) {
      setMatters((prev) => [newMatter, ...prev]);
    }
    logAudit('CLIENT_INTAKE', 'Client Intake', `Completed intake & conflict check for ${newClient.name}`);
    showToast(`Client intake completed for "${newClient.name}".`);
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

      {/* RENDER PUBLIC WEBSITE OR INTERNAL MANAGEMENT APP */}
      {currentTab === 'public-site' ? (
        <PublicFirmView
          firmProfile={firmProfile}
          lawyers={users.filter((u) => u.role.includes('Partner') || u.role.includes('Counsel'))}
          onOpenPortal={() => setCurrentTab('dashboard')}
          onRequestConsultation={handlePublicConsultation}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <LegalNavbar
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
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
            onLogout={() => setCurrentTab('public-site')}
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
                  clients={clients}
                  matters={matters}
                  cases={cases}
                  courtDiary={courtDiary}
                  deadlines={deadlines}
                  properties={properties}
                  tenants={tenants}
                  invoices={invoices}
                  payments={payments}
                  auditLogs={auditLogs}
                  onNavigateTab={setCurrentTab}
                  onOpenQuickAction={handleQuickAction}
                />
              )}

              {currentTab === 'clients' && (
                <ClientsView
                  clients={clients}
                  matters={matters}
                  cases={cases}
                  invoices={invoices}
                  properties={properties}
                  onAddClient={handleAddClient}
                  onUpdateClient={handleUpdateClient}
                  onDeleteClient={handleDeleteClient}
                  onOpenMatterDetail={() => setCurrentTab('matters')}
                />
              )}

              {currentTab === 'client-intake' && (
                <ClientIntakeView
                  clients={clients}
                  matters={matters}
                  cases={cases}
                  onCompleteIntake={handleCompleteIntake}
                />
              )}

              {currentTab === 'matters' && (
                <MattersView
                  matters={matters}
                  clients={clients}
                  cases={cases}
                  documents={documents}
                  tasks={tasks}
                  onAddMatter={handleAddMatter}
                  onUpdateMatter={handleUpdateMatter}
                  onDeleteMatter={handleDeleteMatter}
                  onOpenCaseDetail={() => setCurrentTab('litigation')}
                />
              )}

              {currentTab === 'litigation' && (
                <LitigationCasesView
                  cases={cases}
                  matters={matters}
                  onAddCase={handleAddCase}
                  onUpdateCase={handleUpdateCase}
                  onDeleteCase={handleDeleteCase}
                />
              )}

              {currentTab === 'court-diary' && (
                <CourtDiaryView
                  courtDiary={courtDiary}
                  cases={cases}
                  onAddCourtDate={handleAddCourtDate}
                  onUpdateCourtDate={handleUpdateCourtDate}
                />
              )}

              {currentTab === 'deadlines' && (
                <DeadlinesTasksView
                  deadlines={deadlines}
                  tasks={tasks}
                  onAddDeadline={handleAddDeadline}
                  onUpdateDeadline={handleUpdateDeadline}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                />
              )}

              {currentTab === 'tasks' && (
                <DeadlinesTasksView
                  deadlines={deadlines}
                  tasks={tasks}
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
                  properties={properties}
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
                  tenants={tenants}
                  properties={properties}
                  onAddLandlord={handleAddLandlord}
                  onAddTenant={handleAddTenant}
                  onDeleteTenant={handleDeleteTenant}
                />
              )}

              {(currentTab === 'rent-management' || currentTab === 'notices-recovery' || currentTab === 'property-transactions') && (
                <TenancyNoticesTransactionsView
                  initialSubTab={currentTab as any}
                  properties={properties}
                  tenants={tenants}
                  firmProfile={firmProfile}
                  onUpdateTenantPayment={handleUpdateTenantPayment}
                />
              )}

              {currentTab === 'billing' && (
                <BillingFinanceView
                  invoices={invoices}
                  payments={payments}
                  expenses={expenses}
                  clients={clients}
                  matters={matters}
                  firmProfile={firmProfile}
                  onAddInvoice={handleAddInvoice}
                  onRecordPayment={handleRecordPayment}
                  onAddExpense={handleAddExpense}
                />
              )}

              {(currentTab === 'reports' || currentTab === 'audit-trail' || currentTab === 'administration') && (
                <AuditAdministrationReportsView
                  initialSubTab={currentTab as any}
                  auditLogs={auditLogs}
                  firmProfile={firmProfile}
                  users={users}
                  currentUserRole={currentUserRole}
                  onChangeUserRole={setCurrentUserRole}
                  onUpdateFirmProfile={setFirmProfile}
                  cases={cases}
                  matters={matters}
                  invoices={invoices}
                  properties={properties}
                  tenants={tenants}
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
