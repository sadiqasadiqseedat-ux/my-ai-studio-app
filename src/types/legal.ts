/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ========================================================
   CONSOLIDATED USER ROLES (EXACTLY 5 ROLES)
======================================================== */
export type UserRole =
  | 'PRINCIPAL PARTNER'
  | 'Managing Partner'
  | 'Principal Partner'
  | 'HEAD OF CHAMBER'
  | 'Partner'
  | 'ADMINISTRATOR / SECRETARY'
  | 'Administrator'
  | 'Litigation Secretary'
  | 'ACCOUNT OFFICER'
  | 'Accounts Officer'
  | 'COUNSEL / STAFF'
  | 'Associate / Counsel'
  | 'Property/Facility Officer'
  | 'Clerk';

export type CounselAvailabilityStatus =
  | 'In Court'
  | 'In Office'
  | 'Available'
  | 'Out of Office';

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
  headOfChamberName?: string;
  status?: 'Active' | 'Archived';
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
  availabilityStatus?: CounselAvailabilityStatus;
  currentCourtLocation?: string;
  isPubliclyListed?: boolean;
  bio?: string;
  practiceAreas?: string[];
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
  clientPhone?: string;
  clientEmail?: string;
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
  clientVisibleStatus?: string;
  clientProgressHistory?: Array<{
    date: string;
    stage: string;
    description: string;
    isPublic: boolean;
  }>;
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

export type CaseAssignmentStatus =
  | 'Unassigned'
  | 'Assignment Pending'
  | 'Assigned'
  | 'Accepted'
  | 'Rejected'
  | 'Reassignment Requested'
  | 'Reassigned'
  | 'Completed'
  | 'Closed';

export interface CaseRecord {
  id: string;
  suitNumber: string; // e.g. FHC/ABJ/CS/104/2026
  matterRef: string;
  clientId: string;
  clientName: string;
  clientPhone?: string;
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
  // Assignment System
  assignmentStatus?: CaseAssignmentStatus;
  assignedCounselId?: string;
  assignedCounselName?: string;
  assignedBy?: string;
  assignmentDate?: string;
  rejectionReason?: string;
  reassignmentNotes?: string;
  clientVisibleStatus?: string;
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
  branchId?: string;
  branchName?: string;
  isClientVisible?: boolean;
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
  partyName?: string;
  sender?: string;
  recipient?: string;
  subject: string;
  method?: string;
  modeOfDelivery?: string;
  receivedOrDispatchedBy?: string;
  matterRef?: string;
  status: 'Received' | 'Dispatched' | 'Action Pending' | 'Filed' | 'Delivered' | 'Acknowledged' | string;
  branchId?: string;
  branchName?: string;
}

export interface LegalResearchRecord {
  id: string;
  citation: string; // e.g. (2021) 12 NWLR (Pt. 1791) 402
  court: 'Supreme Court' | 'Court of Appeal' | 'Federal High Court' | 'High Court FCT / State' | 'National Industrial Court' | 'Sharia Court of Appeal' | string;
  parties?: string;
  year?: number | string;
  subjectMatter?: string;
  topic?: string;
  caseAuthority?: string;
  legalPrinciple?: string;
  principlesSummary?: string;
  statute?: string;
  statutesInterpreted?: string[];
  relatedMatter?: string;
  addedBy?: string;
  branchId?: string;
  branchName?: string;
}

export interface AppointmentRecord {
  id: string;
  clientName: string;
  lawyerName: string;
  date: string;
  time: string;
  location: string;
  purpose: string;
  type: 'Client Consultation' | 'Court' | 'Meeting' | 'Internal Meeting' | 'Mediation' | 'Negotiation' | 'Pre-Trial Preparation' | 'Client Strategy Session' | string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  matterRef?: string;
  branchId?: string;
  branchName?: string;
}

export interface PropertyDisputeRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  disputeType: string;
  partiesInvolved: string;
  courtSuitNumber?: string;
  status: 'Pre-Action' | 'Litigation Ongoing' | 'Mediation' | 'Resolved';
  dateNoticed: string;
  assignedCounsel: string;
  description: string;
  nextStep: string;
  branchId?: string;
  branchName?: string;
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
  propertyCode: string; // e.g. PROP/ABJ/001 or BBC-PROP-2026-00045
  name: string;
  propertyType: PropertyType;
  address: string;
  state: string;
  lga: string;
  district: string;
  landlordId: string;
  landlordName: string;
  landlordPhone?: string;
  landlordEmail?: string;
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
  // Activity Timeline for Landlord Tracking
  activityTimeline?: Array<{
    date: string;
    title: string;
    description: string;
  }>;
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
  branchId?: string;
  branchName?: string;
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
  tenantCode?: string; // e.g. BBC-TEN-2026-0012
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
  noticeRequirement: string;
  specialConditions: string;
  dateSigned: string;
  status: 'Active' | 'Under Renewal' | 'Terminated' | 'Expired';
  branchId?: string;
  branchName?: string;
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
  branchId?: string;
  branchName?: string;
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
  branchId?: string;
  branchName?: string;
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
  branchId?: string;
  branchName?: string;
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
   BILLING, PAYMENTS, VERIFICATION & AUDIT TRAIL
======================================================== */
export type PaymentVerificationStatus =
  | 'Invoice Generated'
  | 'Awaiting Payment'
  | 'Payment Submitted'
  | 'Payment Verification Pending'
  | 'Payment Verified'
  | 'Payment Rejected'
  | 'Payment Cancelled'
  | 'Refunded';

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string; // e.g. INV/BBBC/2026/018 or BBC-INV-2026-000125
  clientId?: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  matterRef?: string;
  matterReference?: string;
  consultationCode?: string;
  dateIssued?: string;
  issueDate?: string;
  dueDate: string;
  description?: string;
  professionalFees?: number;
  courtFilingExpenses?: number;
  disbursements?: number;
  taxPercentage?: number;
  subtotal?: number;
  vat?: number;
  items?: Array<{ id?: string; description: string; amount: number; quantity?: number; unitPrice?: number }>;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  paymentReference?: string;
  paymentStatus?: PaymentVerificationStatus;
  status: 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Pending';
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
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
  verificationStatus?: PaymentVerificationStatus;
  notes?: string;
  proofDocumentUrl?: string;
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
  category: 'Court Date' | 'Deadline' | 'Rent' | 'Intake' | 'Billing' | 'Assignment' | 'Approval' | 'System';
  isRead: boolean;
  linkTab?: string;
  targetRole?: UserRole | 'ALL';
  targetUserId?: string;
  branchId?: string;
}

/* ========================================================
   PUBLIC PORTAL, CONSULTATION & NOTICE BOARD TYPES
======================================================== */
export interface ConsultationApplication {
  id: string;
  code: string; // e.g. BBC-CONS-2026-000125
  invoiceNumber: string; // e.g. BBC-INV-2026-000125
  paymentCode: string; // e.g. BBC-PAY-2026-00125
  applicantName: string;
  phone: string;
  email: string;
  consultationType: string;
  consultationMethod: 'In-Chambers (Physical)' | 'Virtual (Zoom / Teams)' | 'Telephone';
  preferredDate: string;
  preferredTime: string;
  enquiryDetails: string;
  uploadedDocuments?: string[];
  feeAmount: number;
  paymentStatus: PaymentVerificationStatus;
  paymentMethod?: string;
  paymentReferenceSubmitted?: string;
  paymentDateSubmitted?: string;
  paymentProofUrl?: string;
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status:
    | 'Application Received'
    | 'Invoice Generated'
    | 'Payment Submitted'
    | 'Payment Verification Pending'
    | 'Payment Verified'
    | 'Consultation Confirmed'
    | 'Awaiting Consultation'
    | 'Matter Opening'
    | 'Concluded';
  linkedMatterRef?: string;
  createdAt: string;
  branchId: string;
  branchName: string;
}

export interface ApprovalRequest {
  id: string;
  requestingUserId: string;
  requestingUserName: string;
  requestingUserRole: UserRole;
  actionTitle: string;
  recordType: 'Case Assignment' | 'Fee Waiver / Discount' | 'Public Announcement' | 'Branch Operation' | 'Court Filing' | 'Settlement';
  recordId: string;
  recordReference: string;
  description: string;
  requestedAt: string;
  status: 'Awaiting Principal Partner Approval' | 'Approved' | 'Rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComment?: string;
  branchId: string;
  branchName: string;
}

export interface PublicNoticeItem {
  id: string;
  title: string;
  content: string;
  category: 'General Notice' | 'Court Recess' | 'Chambers Holiday' | 'Statutory Update' | 'Practice Direction';
  datePosted: string;
  expiresAt?: string;
  isPublished: boolean;
  postedBy: string;
}

export interface ChambersOfficeHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  specialNotes?: string;
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
  consultationFeeGeneral?: number;
  consultationFeeSeniorCounsel?: number;
  consultationFeeSAN?: number;
}
