export type UserRole =
  | 'Principal Partner'
  | 'Managing Partner'
  | 'Partner'
  | 'Associate / Counsel'
  | 'Litigation Secretary'
  | 'Clerk'
  | 'Accounts Officer'
  | 'Property/Facility Officer'
  | 'Administrator';

export interface BranchRecord {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters?: boolean;
  dateCreated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  role: UserRole;
  title: string;
  branchId: string;
  branchName: string;
  barNumber?: string;
  phone: string;
  avatar?: string;
  isInitialAdmin?: boolean;
  hasChangedDefaultPassword?: boolean;
}

export type ClientType =
  | 'Individual'
  | 'Company'
  | 'Government Agency'
  | 'Organization'
  | 'Estate'
  | 'Association'
  | 'Other';

export interface ClientRecord {
  id: string;
  name: string;
  clientType: ClientType;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  identification?: string;
  dateOnboarded: string;
  assignedLawyer: string;
  status: 'Active' | 'Prospect' | 'Inactive';
  notes?: string;
  branchId?: string;
  branchName?: string;
}

export type MatterStatus =
  | 'New'
  | 'Consultation'
  | 'Active'
  | 'Pending'
  | 'Adjourned'
  | 'Settled'
  | 'Concluded'
  | 'Closed'
  | 'Archived';

export type PriorityLevel = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface MatterRecord {
  id: string;
  reference: string; // e.g. BBBC/2026/001
  title: string;
  clientId: string;
  clientName: string;
  matterType: string;
  assignedPartner: string;
  assignedCounsel: string;
  supportingStaff: string;
  dateOpened: string;
  status: MatterStatus;
  priority: PriorityLevel;
  opposingParty?: string;
  opposingCounsel?: string;
  court?: string;
  jurisdiction: string;
  description: string;
  isSharia?: boolean;
  branchId?: string;
  branchName?: string;
}

export type CaseCategory =
  | 'Civil Litigation'
  | 'Criminal Litigation'
  | 'Commercial Litigation'
  | 'Land Matters'
  | 'Family Matters'
  | 'Probate / Estate'
  | 'Employment Matters'
  | 'Constitutional Matters'
  | 'Judicial Review'
  | 'Debt Recovery'
  | 'Contract Disputes'
  | 'Property Disputes'
  | 'Recovery of Premises'
  | 'Election Matters'
  | 'Human Rights'
  | 'Sharia / Islamic Law'
  | 'Other';

export interface CaseRecord {
  id: string;
  suitNumber: string; // e.g. FHC/ABJ/CS/104/2026
  matterRef: string;
  clientId: string;
  clientName: string;
  plaintiffClaimant: string;
  defendantRespondent: string;
  plaintiff?: string;
  defendant?: string;
  courtName: string;
  judicialDivision: string;
  judge: string;
  caseType: CaseCategory;
  dateFiled: string;
  counsel: string;
  opposingCounsel: string;
  caseStatus: string;
  currentStage:
    | 'Filing of Originating Process'
    | 'Service of Process'
    | 'Pleadings & Statements of Defense'
    | 'Case Management Conference'
    | 'Hearing of Interlocutory Motions'
    | 'Trial / Examination-in-Chief'
    | 'Cross-Examination'
    | 'Final Written Addresses'
    | 'Reserved for Judgment / Ruling'
    | 'Judgment Delivered'
    | 'Execution / Enforcement'
    | 'Appeal Pending';
  nextCourtDate: string;
  nextCourtPurpose: string;
  previousCourtDate?: string;
  reliefsClaims: string;
  summary: string;
  branchId?: string;
  branchName?: string;
}

export interface CourtDiaryItem {
  id: string;
  caseId: string;
  suitNumber: string;
  matterRef: string;
  courtName: string;
  division: string;
  courtDate: string;
  courtTime: string;
  judge: string;
  purpose: string;
  assignedCounsel: string;
  supportingLawyer: string;
  status: 'Scheduled' | 'Heard' | 'Adjourned' | 'Judgment/Ruling' | 'Struck Out';
  notes: string;
  nextAdjournedDate?: string;
  branchId?: string;
  branchName?: string;
}

export interface DeadlineRecord {
  id: string;
  title: string;
  matterRef: string;
  dueDate: string;
  category: 'Filing Deadline' | 'Court Ordered' | 'Contract Expiry' | 'Statutory Notice' | 'Limitation Date';
  status: 'OVERDUE' | 'DUE TODAY' | 'DUE WITHIN 3 DAYS' | 'DUE THIS WEEK' | 'COMPLETED';
  priority: PriorityLevel;
  assignedLawyer: string;
  branchId?: string;
  branchName?: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  matterRef: string;
  clientName: string;
  assignedPerson: string;
  assignedTo?: string;
  priority: PriorityLevel;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Waiting' | 'Completed' | 'Cancelled';
  description: string;
  branchId?: string;
  branchName?: string;
}

export interface LegalDocumentRecord {
  id: string;
  title: string;
  category:
    | 'Pleading'
    | 'Motion'
    | 'Affidavit'
    | 'Written Address'
    | 'Contract'
    | 'Tenancy Agreement'
    | 'Deed of Assignment'
    | 'Court Order'
    | 'Judgment'
    | 'Evidence'
    | 'Exhibit'
    | 'Legal Opinion'
    | 'Notice'
    | 'Invoice'
    | 'Receipt'
    | 'Other';
  matterRef?: string;
  clientId?: string;
  propertyId?: string;
  tenantId?: string;
  dateUploaded: string;
  uploadedBy: string;
  fileSize: string;
  version: string;
  notes?: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  rawTemplate: string;
  placeholders: string[];
}

export interface CorrespondenceRecord {
  id: string;
  refNumber: string;
  date: string;
  direction: 'Incoming' | 'Outgoing';
  sender: string;
  recipient: string;
  subject: string;
  matterRef: string;
  method: 'Bailiff Service' | 'Hand Delivery' | 'Registered Post' | 'Courier' | 'Official Email';
  assignedLawyer: string;
  status: 'Received' | 'Delivered' | 'Pending Service' | 'Acknowledged';
}

export interface LegalResearchRecord {
  id: string;
  topic: string;
  legalIssue: string;
  statute: string;
  caseAuthority: string;
  citation: string;
  court: string;
  year: string;
  legalPrinciple: string;
  notes: string;
  relatedMatter?: string;
}

export interface AppointmentRecord {
  id: string;
  clientName: string;
  matterRef: string;
  lawyerName: string;
  date: string;
  time: string;
  location: string;
  purpose: string;
  type: 'Client Consultation' | 'Court' | 'Meeting' | 'Internal Meeting' | 'Mediation' | 'Negotiation';
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
}

/* ========================================================
   PROPERTY, LANDLORD & TENANT MANAGEMENT TYPES
======================================================== */

export type PropertyType =
  | 'Commercial Building'
  | 'Residential Plaza'
  | 'Block of Flats'
  | 'Office Complex'
  | 'Warehouse'
  | 'Industrial Estate'
  | 'Land Parcel'
  | 'Estate Development';

export interface PropertyRecord {
  id: string;
  propertyCode: string; // e.g. PROP/ABJ/001
  name: string;
  propertyType: PropertyType;
  address: string;
  state: string;
  lga: string;
  district: string;
  landlordId: string;
  landlordName: string;
  totalUnits: number;
  occupiedUnits: number;
  status: 'Active' | 'Occupied' | 'Vacant' | 'Under Dispute' | 'Under Maintenance' | 'Sold' | 'Leased';
  titleInformation: string;
  surveyNumber: string;
  assignedLawyer: string;
  relatedMatterRef?: string;
  notes?: string;
  branchId?: string;
  branchName?: string;
}

export interface LandlordRecord {
  id: string;
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  address: string;
  identification?: string;
  ownedPropertyIds: string[];
  totalProperties: number;
  bankDetails?: string;
  notes?: string;
}

export interface UnitRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string; // e.g. Flat 3B, Suite 102
  unitType: string;
  floor: string;
  rentAnnual: number;
  tenantId?: string;
  tenantName?: string;
  occupancyStatus: 'Occupied' | 'Vacant' | 'Reserved' | 'Maintenance' | 'Disputed';
  deposit: number;
  balanceOutstanding: number;
}

export interface TenantRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  emergencyContact: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  landlordId: string;
  landlordName: string;
  tenancyStart: string;
  tenancyEnd: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  rentAmount: number;
  rentFrequency: 'Annual' | 'Bi-Annual' | 'Quarterly' | 'Monthly';
  securityDeposit: number;
  serviceCharge: number;
  paymentStatus: 'Paid' | 'Partially Paid' | 'Outstanding' | 'Overdue';
  tenancyStatus: 'Active' | 'Expiring Soon' | 'Expired' | 'Renewed' | 'Disputed' | 'Vacated';
  assignedLawyer: string;
  relatedMatterRef?: string;
  notes?: string;
  branchId?: string;
  branchName?: string;
}

export interface TenancyAgreementRecord {
  id: string;
  agreementNumber: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  landlordName: string;
  tenantName: string;
  commencementDate: string;
  expiryDate: string;
  rentAnnual: number;
  frequency: string;
  securityDeposit: number;
  serviceCharge: number;
  noticeRequirement: string; // e.g. 6 Months Notice for Yearly Tenancy
  specialConditions: string;
  dateSigned: string;
  status: 'Active' | 'Under Renewal' | 'Terminated' | 'Expired';
}

export interface RentRecord {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyName: string;
  unitNumber: string;
  rentAmount: number;
  periodCovered: string;
  dueDate: string;
  amountPaid: number;
  outstandingBalance: number;
  paymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  receiptNumber?: string;
  status: 'Paid' | 'Partially Paid' | 'Outstanding' | 'Overdue';
}

export interface NoticeRecord {
  id: string;
  noticeType:
    | 'Demand for Rent Arrears'
    | 'Notice to Quit (Section 7 Recovery of Premises Act / State Law)'
    | 'Notice of Intention to Apply to Recover Possession (7 Days Notice / Form E / Form 7)'
    | 'Breach of Tenancy Covenant Notice'
    | 'Notice of Rent Review'
    | 'Property Inspection Notice'
    | string;
  propertyId: string;
  propertyName: string;
  tenantId?: string;
  tenantName: string;
  unitNumber?: string;
  landlordName?: string;
  dateIssued: string;
  dateServed?: string;
  serviceMethod: string;
  servedBy?: string;
  statutoryPeriod?: string;
  grounds?: string;
  courtCaseFiled?: boolean;
  courtSuitNumber?: string;
  effectiveDate?: string;
  responseDeadline?: string;
  expiryDate?: string;
  assignedLawyer?: string;
  status:
    | 'Drafted'
    | 'Served'
    | 'Awaiting Expiry'
    | 'Proceeding to Court'
    | 'Resolved / Vacated'
    | 'Expired'
    | 'Issued';
  relatedMatterRef?: string;
  documentTitle?: string;
}

export interface PropertyDisputeRecord {
  id: string;
  propertyName: string;
  landlordName: string;
  tenantName: string;
  matterRef: string;
  natureOfDispute:
    | 'Rent Arrears Recovery'
    | 'Recovery of Possession'
    | 'Unlawful Holding Over'
    | 'Damage to Tenement'
    | 'Service Charge Default'
    | 'Illegal Subletting'
    | 'Nuisance / Breach of Peace'
    | 'Title Dispute';
  dateStarted: string;
  currentStatus: 'Preliminary Notice' | 'Settlement Talks' | 'Court Proceedings' | 'Judgment Obtained' | 'Warrant of Possession Executed';
  assignedLawyer: string;
  courtCaseSuitNo?: string;
}

export interface PropertyTransactionRecord {
  id: string;
  propertyName?: string;
  propertyTitle?: string;
  transactionType:
    | 'Sale'
    | 'Purchase'
    | 'Commercial Lease'
    | 'Deed of Assignment'
    | 'Mortgage Perfection'
    | 'Purchase / Conveyancing'
    | 'Commercial Lease (10 Years)'
    | string;
  parties?: string;
  clientRole?: string;
  clientName?: string;
  otherPartyName?: string;
  transactionValue?: number;
  contractSum?: number;
  date?: string;
  dateInitiated?: string;
  assignedLawyer?: string;
  status:
    | 'Due Diligence'
    | 'Negotiation'
    | 'Drafting Agreement'
    | 'Execution'
    | 'Governor Consent / Registration'
    | 'Completed'
    | 'In Progress'
    | 'Concluded'
    | string;
  stage?: string;
  governorConsentStatus?: string;
  notes?: string;
  legalFees?: number;
  legalFee?: number;
}

export interface DueDiligenceRecord {
  id: string;
  propertyName: string;
  titleVerification: 'Verified (C of O / R of O Active)' | 'Pending Verification' | 'Defective Title';
  surveyVerification: 'Coordinated with Surveyor-General' | 'Pending Beacon Check' | 'Discrepancy Flagged';
  encumbranceSearch: 'Clear of Lis Pendens / Mortgages' | 'Active Mortgage Found' | 'Caution Registered';
  litigationSearch: 'No Pending Suit Found' | 'Active Court Dispute Discovered';
  inspectedBy: string;
  dateChecked: string;
  remarks: string;
}

export interface MaintenanceRecord {
  id: string;
  propertyName: string;
  unitNumber: string;
  requestTitle: string;
  reportedBy: string;
  dateReported: string;
  priority: PriorityLevel;
  estimatedCost: number;
  actualCost?: number;
  contractor: string;
  status: 'Reported' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
}

/* ========================================================
   BILLING, PAYMENTS, EXPENSES, AUDIT TRAIL
======================================================== */

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string; // e.g. INV/BBBC/2026/018
  clientId: string;
  clientName: string;
  matterRef?: string;
  matterReference?: string;
  dateIssued?: string;
  issueDate?: string;
  dueDate: string;
  description?: string;
  professionalFees?: number;
  courtFilingExpenses?: number;
  disbursements?: number;
  taxPercentage?: number; // e.g. 7.5% VAT (configurable)
  subtotal?: number;
  vat?: number;
  items?: Array<{ id?: string; description: string; amount: number; quantity?: number; unitPrice?: number }>;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Pending';
  branchId?: string;
  branchName?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  matterRef?: string;
  amount: number;
  date: string;
  method?: 'Bank Transfer' | 'Cash' | 'POS' | 'Direct Deposit' | 'Cheque';
  paymentMethod?: string;
  reference: string;
  receivedBy?: string;
  status?: string;
  notes?: string;
  branchId?: string;
  branchName?: string;
}

export interface ExpenseRecord {
  id: string;
  matterRef?: string;
  matterReference?: string;
  clientName?: string;
  date: string;
  amount: number;
  category:
    | 'Court Filing Fees'
    | 'Bailiff Service'
    | 'Transportation / Logistics'
    | 'Printing & Documentation'
    | 'Legal Research / Certified True Copies'
    | 'Property Inspection Expense'
    | 'Chambers Administration'
    | 'Court Fees'
    | 'Process Serving'
    | 'Travel'
    | 'Title Search'
    | 'Office / Admin'
    | 'Other';
  description: string;
  receiptNumber?: string;
  recordedBy?: string;
  isBillable?: boolean;
  status?: string;
  approvedBy?: string;
  branchId?: string;
  branchName?: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  action: string;
  module: string;
  details: string;
  branchId?: string;
  branchName?: string;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  category: 'Court Date' | 'Deadline' | 'Rent' | 'Intake' | 'Billing' | 'System';
  isRead: boolean;
  linkTab?: string;
}

export interface FirmProfile {
  firmName: string;
  tagline: string;
  principal: string;
  address: string;
  branchAddresses: string[];
  phone: string;
  altPhone: string;
  email: string;
  website: string;
  taxNumber: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  tinNumber: string;
}
