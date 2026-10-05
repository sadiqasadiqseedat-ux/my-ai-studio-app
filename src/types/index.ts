export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  objectives: string[];
  beneficiariesSummary: string;
  iconName: string;
  suggestedDonation?: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  targetAmountPlaceholder: string;
  raisedAmountPlaceholder: string;
  beneficiariesPlaceholder: string;
  progressPercent: number;
  imageUrl: string;
  imageAlt: string;
  urgent: boolean;
}

export interface ImpactStat {
  id: string;
  metric: string;
  label: string;
  detail: string;
  isPlaceholder: boolean;
}

export interface SuccessStory {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullStory: string;
  location: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption: string;
  date: string;
  imageUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  author: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  community: string;
}

export interface OrganizationConfig {
  name: string;
  tagline: string;
  location: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  whatsappPlaceholder: string;
  registrationNumberPlaceholder: string;
  bankNamePlaceholder: string;
  accountNamePlaceholder: string;
  accountNumberPlaceholder: string;
  paymentGatewayPlaceholder: string;
}

export interface DonationPledgeRecord {
  id: string;
  reference: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  cause: string;
  amount: number;
  frequency: string;
  timestamp: string;
  status: 'Pending Verification' | 'Confirmed' | 'Archived';
}

export interface ContactMessageRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface VolunteerRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  interest: string;
  availability: string;
  experience?: string;
  timestamp: string;
}

