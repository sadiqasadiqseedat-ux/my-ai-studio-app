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
} from '../types';

import heroImg from '../assets/images/hero_humanitarian_action_1791205577913.jpg';
import aboutImg from '../assets/images/about_humanitarian_work_1791205706640.jpg';
import campaignImg from '../assets/images/campaign_food_water_1791205722039.jpg';
import healthcareImg from '../assets/images/programs_healthcare_aid_1791205733713.jpg';
import storyImg from '../assets/images/stories_hope_beneficiary_1791205748212.jpg';

export { heroImg, aboutImg, campaignImg, healthcareImg, storyImg };

export const initialOrgConfig: OrganizationConfig = {
  name: 'ZANJABEEL ISLAMIC CHARITY AND HUMANITARIAN FOUNDATION',
  tagline: 'Serving Humanity Through Faith, Compassion and Action.',
  location: 'Potiskum, Yobe State, Nigeria',
  addressPlaceholder: '[OFFICE ADDRESS: Potiskum, Yobe State, Nigeria]',
  phonePlaceholder: '[PHONE NUMBER: +234 ...]',
  emailPlaceholder: '[EMAIL ADDRESS: info@zanjabeelfoundation.org]',
  whatsappPlaceholder: '+2348000000000',
  registrationNumberPlaceholder: '[REGISTRATION NUMBER: CAC/IT/NO. ...]',
  bankNamePlaceholder: '[BANK NAME: E.g., Jaiz Bank / Stanbic IBTC / First Bank]',
  accountNamePlaceholder: '[ACCOUNT NAME: Zanjabeel Islamic Charity & Humanitarian Foundation]',
  accountNumberPlaceholder: '[ACCOUNT NUMBER: 0000000000]',
  paymentGatewayPlaceholder: '[PAYMENT GATEWAY: Authorized Online Portal Pending]',
};

export const coreValues = [
  { name: 'Faith', desc: 'Guided by Islamic principles of sincere service (Ikhlas) and universal compassion (Rahmah).' },
  { name: 'Compassion', desc: 'Showing genuine empathy and care for the needy, orphans, and vulnerable families.' },
  { name: 'Integrity', desc: 'Transparent management and accountable stewardship of all charitable funds and trust (Amanah).' },
  { name: 'Service', desc: 'Selfless dedication to uplifting community welfare and alleviating hardship with professionalism.' },
  { name: 'Dignity', desc: 'Delivering humanitarian assistance with utmost respect for the honor and privacy of recipients.' },
  { name: 'Hope', desc: 'Igniting optimism and sustainable pathways out of poverty and hardship for tomorrow.' },
  { name: 'Community', desc: 'Fostering collective brotherhood, mutual aid, and cooperative community resilience.' },
];

export const programsData: ProgramItem[] = [
  {
    id: 'orphans-vulnerable',
    title: 'Orphans & Vulnerable Persons',
    category: 'Vulnerable Care',
    shortDesc: 'Comprehensive guardianship, educational support, welfare, and basic sustenance for vulnerable children and individuals in need.',
    fullDesc: 'Inspired by the profound prophetic emphasis on caring for orphans, our program supports vulnerable orphans and persons with disabilities across Potiskum and neighboring communities. We provide nutritious food, clothing, seasonal support, moral mentorship, and educational grants so every child flourishes with dignity.',
    objectives: [
      'Provide regular household food baskets and nutritional assistance to orphan-headed families.',
      'Sponsor school enrolment, uniform provision, and scholastic supplies.',
      'Ensure access to basic medical screenings and healthcare subsidies.',
      'Promote moral, psycho-social, and spiritual nurturing within family-centered homes.'
    ],
    beneficiariesSummary: 'Targeting over [000+] vulnerable children and guardians across Yobe State.',
    iconName: 'HeartHandshake',
    suggestedDonation: '₦20,000 / month'
  },
  {
    id: 'food-basic-needs',
    title: 'Food & Basic Needs',
    category: 'Relief & Sustenance',
    shortDesc: 'Emergency and seasonal food parcel distribution, essential grocery supplies, and basic household assistance for indigent households.',
    fullDesc: 'Hunger and malnutrition severely impair human dignity and development. Our Food & Basic Needs wing coordinates dignity-first food distribution drives, supplying staple grains (rice, millet, maize, beans, cooking oil) directly to families facing severe economic deprivation.',
    objectives: [
      'Distribute staple nutrition packages to vulnerable households in marginalized areas.',
      'Deliver emergency food packs to displaced persons and families in acute distress.',
      'Support community soup kitchens and shared meal gatherings during peak hardship periods.'
    ],
    beneficiariesSummary: 'Targeting [000+] families across rural and suburban settlements in Potiskum.',
    iconName: 'Utensils',
    suggestedDonation: '₦15,000 / pack'
  },
  {
    id: 'education-support',
    title: 'Education Support',
    category: 'Education & Learning',
    shortDesc: 'Educational assistance, learning materials, scholarships, and instructional aid for disadvantaged and out-of-school learners.',
    fullDesc: 'Education is an undeniable right and the cornerstone of generational transformation. We work to break cycles of illiteracy by rehabilitating modest classrooms, distributing textbooks, school uniforms, writing materials, and awarding tuition scholarships to promising young minds.',
    objectives: [
      'Subsidize tuition fees and registration for primary and secondary students.',
      'Distribute school backpacks, notebooks, pens, and essential learning aids.',
      'Support remedial tutoring and literacy programs for out-of-school children.'
    ],
    beneficiariesSummary: 'Aiming to enroll and support [000+] vulnerable learners.',
    iconName: 'GraduationCap',
    suggestedDonation: '₦10,000 / term'
  },
  {
    id: 'healthcare-support',
    title: 'Healthcare Support',
    category: 'Health & Wellbeing',
    shortDesc: 'Medical outreach, prescription support, health screenings, and financial assistance for indigent patients requiring urgent care.',
    fullDesc: 'Access to basic healthcare should not depend on wealth. In partnership with local volunteer health professionals, Zanjabeel Foundation conducts free community medical checkups, provides essential prescription subsidies, and assists indigent families facing catastrophic medical bills.',
    objectives: [
      'Organize periodic free community medical consultations and diagnostic screenings.',
      'Supply subsidized or free basic medications for malaria, maternal health, and chronic illness.',
      'Provide emergency medical funding for urgent hospital surgeries and inpatient care.'
    ],
    beneficiariesSummary: 'Reaching [000+] patients with primary medical consultations and medication.',
    iconName: 'Stethoscope',
    suggestedDonation: '₦25,000 / patient'
  },
  {
    id: 'ramadan-eid-support',
    title: 'Ramadan & Eid Support',
    category: 'Seasonal Outreach',
    shortDesc: 'Iftar food baskets, Suhoor essentials, Zakat al-Fitr distribution, and festive Eid clothing for underserved households.',
    fullDesc: 'The blessed month of Ramadan brings a unique opportunity for shared joy and mercy. We mobilize resources to distribute pre-Ramadan food hampers, communal Iftar meals, and joyful Eid-ul-Fitr / Eid-ul-Adha packages to ensure no family is left behind in spiritual celebration.',
    objectives: [
      'Provide monthly Ramadan dry-ration packages (dates, flour, sugar, milk, grains).',
      'Distribute Zakat al-Fitr grains directly to qualifying recipients on time.',
      'Offer new Eid clothing and gift parcels to orphans and indigent children.'
    ],
    beneficiariesSummary: 'Bringing joy to [000+] families during holy festive seasons.',
    iconName: 'Moon',
    suggestedDonation: '₦30,000 / family'
  },
  {
    id: 'widows-vulnerable-families',
    title: 'Widows & Vulnerable Families',
    category: 'Empowerment & Welfare',
    shortDesc: 'Targeted welfare stipends, livelihood micro-grants, and psychosocial support to preserve the dignity of widow-headed households.',
    fullDesc: 'Widows often face overwhelming social and economic headwinds following the loss of their primary breadwinner. Our initiative provides a compassionate safety net, combining monthly living support with small seed grants and mentorship so women can operate home-based microenterprises.',
    objectives: [
      'Provide basic financial safety nets during critical periods of bereavement.',
      'Disburse small grants for petty trading, tailoring, and food processing.',
      'Offer group counseling, peer support networks, and legal guidance where needed.'
    ],
    beneficiariesSummary: 'Empowering [00+] resilient mothers and widow households.',
    iconName: 'Users',
    suggestedDonation: '₦50,000 / microgrant'
  },
  {
    id: 'emergency-relief',
    title: 'Emergency Relief',
    category: 'Crisis Response',
    shortDesc: 'Rapid humanitarian response during floods, fires, displacement, and unexpected local crises across Yobe State.',
    fullDesc: 'When disasters strike, prompt and organized compassion saves lives. Our emergency team coordinates rapid assessment and distributes essential relief materials including clean drinking water, temporary shelter mats, blankets, hygiene items, and ready-to-eat rations.',
    objectives: [
      'Deploy immediate 48-hour response kits to disaster-impacted families.',
      'Coordinate with community leaders and emergency authorities for efficient relief.',
      'Assist affected households with recovery supplies to restart their lives.'
    ],
    beneficiariesSummary: 'Ready response capacity for emergency relief scenarios.',
    iconName: 'AlertCircle',
    suggestedDonation: 'Custom Relief Contribution'
  },
  {
    id: 'islamic-education',
    title: 'Islamic Education',
    category: 'Faith & Morals',
    shortDesc: 'Qur’anic memorization support, authentic Islamic moral teaching, maktab resources, and learning materials for students.',
    fullDesc: 'Nurturing sound moral grounding and authentic religious knowledge builds peaceful, law-abiding, and compassionate citizens. We support traditional Tsangaya and Islamiyya learning centers with copies of the Holy Qur’an, learning mats, solar study lights, and teacher welfare stipends.',
    objectives: [
      'Distribute printed copies of the Holy Qur’an (Mushaf) and authentic Islamic literature.',
      'Support safe, clean, and well-lit study spaces for Tsangaya and Islamiyya pupils.',
      'Organize annual Qur’an recitation competitions and moral education seminars.'
    ],
    beneficiariesSummary: 'Fostering knowledge across [00+] learning circles and centers.',
    iconName: 'BookOpen',
    suggestedDonation: '₦10,000 / student sponsor'
  },
  {
    id: 'youth-skills-development',
    title: 'Youth & Skills Development',
    category: 'Empowerment',
    shortDesc: 'Vocational apprenticeships, digital literacy, carpentry, tailoring, and trade empowerment to cultivate self-reliance.',
    fullDesc: 'Idle potential is transformed when youth receive market-relevant vocational skills. We connect vulnerable youth to accredited local craftsmen and vocational mentors in fields such as solar installation, computer basics, tailoring, shoe craftsmanship, and modern masonry.',
    objectives: [
      'Sponsor youth for hands-on vocational and technical trade apprenticeships.',
      'Provide startup toolkits (e.g. sewing machines, electrical tool kits) upon graduation.',
      'Conduct financial literacy, ethics in business, and entrepreneurship seminars.'
    ],
    beneficiariesSummary: 'Equipping [00+] youth with sustainable livelihood capabilities.',
    iconName: 'Briefcase',
    suggestedDonation: '₦40,000 / toolkit'
  },
  {
    id: 'water-sanitation',
    title: 'Water & Sanitation (WASH)',
    category: 'Infrastructure & Health',
    shortDesc: 'Construction of community boreholes, hand pumps, water storage, hygiene sensitization, and public sanitation points.',
    fullDesc: 'Clean drinking water is both a life necessity and a continuous charity (Sadaqah Jariyah). Zanjabeel Foundation drills and rehabilitates solar-powered and manual boreholes in water-scarce rural villages and peri-urban wards around Potiskum, ending long journeys for water.',
    objectives: [
      'Drill boreholes and install solar-powered pumps in communities lacking clean water.',
      'Rehabilitate dysfunctional public water points and hand pumps.',
      'Conduct community hygiene workshops to combat preventable water-borne diseases.'
    ],
    beneficiariesSummary: 'Providing clean daily water access to thousands of community residents.',
    iconName: 'Droplet',
    suggestedDonation: '₦100,000 / borehole share'
  },
  {
    id: 'community-development',
    title: 'Community Development',
    category: 'Civic Resilience',
    shortDesc: 'Grassroots community dialogue, environmental sanitation, peaceful coexistence, and public amenities rehabilitation.',
    fullDesc: 'True sustainability comes from empowering communities to resolve common challenges collectively. We partner with local elders, youth leaders, and women groups to organize tree planting campaigns, community cleanups, and communal facility repairs.',
    objectives: [
      'Facilitate grassroots community consultations to identify priority local needs.',
      'Promote mutual peace, civic responsibility, and environmental stewardship.',
      'Encourage collective community self-help projects through matching support.'
    ],
    beneficiariesSummary: 'Partnering across [00+] wards and neighborhood development committees.',
    iconName: 'Building2',
    suggestedDonation: 'Custom Community Gift'
  }
];

export const featuredCampaign: CampaignItem = {
  id: 'potiskum-clean-water-project',
  title: 'Potiskum Rural Water & Clean Sanitation Initiative',
  category: 'Sadaqah Jariyah (Ongoing Charity)',
  tagline: 'Bringing reliable, clean, and safe drinking water to underserved rural communities.',
  description: 'In many remote settlements around Potiskum, families and school children still travel kilometers every morning to fetch turbid water from open streams. This campaign aims to drill solar-powered deep boreholes, build clean distribution taps, and establish community water committees for long-term maintenance.',
  targetAmountPlaceholder: '₦[TARGET AMOUNT]',
  raisedAmountPlaceholder: '₦[AMOUNT RAISED]',
  beneficiariesPlaceholder: '[NUMBER OF BENEFICIARIES]',
  progressPercent: 45,
  imageUrl: campaignImg,
  imageAlt: 'Community members celebrating access to clean, flowing water in Yobe State',
  urgent: true,
};

export const impactMetrics: ImpactStat[] = [
  {
    id: 'people-supported',
    metric: '[000+]',
    label: 'People Supported',
    detail: 'Direct humanitarian, medical, and emergency aid beneficiaries.',
    isPlaceholder: true,
  },
  {
    id: 'families-reached',
    metric: '[000+]',
    label: 'Families Reached',
    detail: 'Household food rations, winter relief, and Ramadan support.',
    isPlaceholder: true,
  },
  {
    id: 'educational-beneficiaries',
    metric: '[000+]',
    label: 'Educational Beneficiaries',
    detail: 'Students sponsored with school supplies, uniforms, and Qur’anic learning.',
    isPlaceholder: true,
  },
  {
    id: 'food-distributed',
    metric: '[000+]',
    label: 'Food Packages Distributed',
    detail: 'Nutritional food parcels delivered with honor and care.',
    isPlaceholder: true,
  },
  {
    id: 'communities-reached',
    metric: '[00+]',
    label: 'Communities Reached',
    detail: 'Wards and rural villages benefiting across Potiskum & Yobe State.',
    isPlaceholder: true,
  },
];

export const successStories: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'From Out-of-School to the Head of the Class',
    category: 'Education Support',
    summary: 'A resilient young boy in Potiskum returns to formal schooling through our community education sponsorship initiative.',
    fullStory: 'After the sudden loss of his father, 10-year-old Ibrahim had to leave school to help his mother sell small items in the neighborhood market. Through the Zanjabeel Foundation Education Support program, Ibrahim received a complete school kit, paid tuition, and uniform support. Today, he ranks among the top pupils in his primary class and aspires to become a medical doctor to serve his people.',
    location: 'Potiskum, Yobe State',
    date: '2026 Season',
    imageUrl: storyImg,
    imageAlt: 'Smiling student holding school books in classroom',
  },
  {
    id: 'story-2',
    title: 'Dignity Restored: Clean Water at the Center of the Village',
    category: 'Water & Sanitation',
    summary: 'How a solar borehole eliminated water-borne diseases and gave hours back to village mothers and children.',
    fullStory: 'For years, women in an outlying settlement walked over four kilometers each dawn to scoop murky water from dry riverbeds. Following the drilling of a solar-powered borehole and reticulation taps, over 800 community residents now enjoy fresh, potable water within minutes of their homes. School attendance among young girls increased immediately.',
    location: 'Yobe State Rural Outskirts',
    date: '2026 Initiative',
    imageUrl: campaignImg,
    imageAlt: 'Clear water flowing from newly installed community borehole',
  },
  {
    id: 'story-3',
    title: 'Empowering a Mother of Five Toward Economic Independence',
    category: 'Widows & Vulnerable Families',
    summary: 'A micro-grant and trading mentorship enabled Hajiya Maryam to establish a sustainable local grain processing enterprise.',
    fullStory: 'Following bereavement, Hajiya Maryam faced immense difficulties feeding her five children. Through our Vulnerable Families initiative, she was granted a ₦50,000 startup capital package and basic inventory management coaching. She now operates a flourishing small-scale grain processing stall, comfortably feeding her children and paying their school levies without dependency.',
    location: 'Potiskum Metropolitan',
    date: '2026 Impact',
    imageUrl: aboutImg,
    imageAlt: 'Empowered local women engaged in community enterprise',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Community Relief Gathering',
    category: 'Humanitarian Activities',
    caption: 'Volunteers and community elders during a dignified humanitarian consultation in Potiskum.',
    date: '2026',
    imageUrl: heroImg,
  },
  {
    id: 'gal-2',
    title: 'Classroom Scholastic Distribution',
    category: 'Education',
    caption: 'Distributing notebooks, pencils, and educational essentials to underserved school pupils.',
    date: '2026',
    imageUrl: aboutImg,
  },
  {
    id: 'gal-3',
    title: 'Potiskum Clean Borehole Well',
    category: 'Community Development',
    caption: 'Inauguration of clean community water access point in an underserved neighborhood.',
    date: '2026',
    imageUrl: campaignImg,
  },
  {
    id: 'gal-4',
    title: 'Community Health Screening Outreach',
    category: 'Healthcare',
    caption: 'Volunteer healthcare worker offering free preventive health consultation to an elder.',
    date: '2026',
    imageUrl: healthcareImg,
  },
  {
    id: 'gal-5',
    title: 'Education Beneficiary Portrait',
    category: 'Education',
    caption: 'A young learner proud of receiving learning materials and enrollment grant.',
    date: '2026',
    imageUrl: storyImg,
  },
  {
    id: 'gal-6',
    title: 'Ramadan Food Package Mobilization',
    category: 'Food Distribution',
    caption: 'Carefully packed staple nutrition bags awaiting distribution to vulnerable households.',
    date: '2026',
    imageUrl: heroImg,
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-ramadan-appeal',
    title: 'Preparing for Ramadan 1447 AH: Food Basket Appeal for Vulnerable Households in Potiskum',
    category: 'Humanitarian News',
    date: 'March 2026',
    readTime: '3 min read',
    excerpt: 'As the holy month approaches, the Foundation unveils its Ramadan Relief Plan targeting indigent families with essential dry food staples.',
    content: [
      'The holy month of Ramadan represents a period of heightened devotion, empathy, and collective brotherhood across the Muslim Ummah. For vulnerable families in Potiskum and nearby rural villages, rising food prices pose severe challenges to securing nutritious Suhoor and Iftar meals.',
      'In response, Zanjabeel Islamic Charity and Humanitarian Foundation has structured its annual Ramadan Relief campaign. Each parcel is thoughtfully curated to sustain a household of six for 30 days, containing 25kg of quality rice, 10kg beans, millet flour, vegetable oil, sugar, dates, and nutritional condiments.',
      '“Charity does not decrease wealth,” said a spokesperson for the Foundation, citing the prophetic teaching. “We call upon benevolent individuals and corporate partners to join hands with us in delivering dignified relief to those in genuine need.”'
    ],
    imageUrl: heroImg,
    author: 'Foundation Communications Desk',
  },
  {
    id: 'news-water-initiative',
    title: 'Addressing Water Scarcity: Strategic Assessment of Rural Settlements in Yobe State',
    category: 'Community Outreach',
    date: 'February 2026',
    readTime: '4 min read',
    excerpt: 'Field volunteers complete preliminary hydrological surveys to pinpoint high-need villages lacking safe drinking water.',
    content: [
      'Access to safe drinking water remains one of the most effective catalysts for poverty alleviation and public health. Our technical assessment team recently surveyed multiple outlying wards across Potiskum LGA.',
      'The assessment identified three target locations where residents currently rely on open water sources. In the upcoming phase, subject to authorized funding pledges, the Foundation will commence borehole drilling equipped with solar pumping infrastructure and sustainable water maintenance committees.',
      'Providing water is among the greatest forms of Sadaqah Jariyah in Islam, generating enduring reward while saving lives daily.'
    ],
    imageUrl: campaignImg,
    author: 'Humanitarian Field Operations',
  },
  {
    id: 'news-health-outreach',
    title: 'Free Community Health Screening Reaches Vulnerable Elders and Children',
    category: 'Healthcare',
    date: 'January 2026',
    readTime: '3 min read',
    excerpt: 'Volunteer medical practitioners partner with Zanjabeel Foundation to provide blood pressure checks, malaria tests, and health counsel.',
    content: [
      'Preventive medicine is crucial in communities where health centers are distant or financial barriers delay treatment. Last weekend, compassionate medical volunteers conducted a full-day free clinical outreach in Potiskum.',
      'Over 200 elders and nursing mothers received blood pressure and glucose screenings, pediatric assessments, and free prescriptions for common ailments. The initiative underscores the Foundation’s dedication to holistic human welfare in Northern Nigeria.'
    ],
    imageUrl: healthcareImg,
    author: 'Health Services Directorate',
  },
];

export const partnerList: PartnerItem[] = [
  {
    id: 'partner-1',
    name: '[PARTNER ORGANIZATION PLACEHOLDER 1]',
    type: 'Community Health Partner',
    description: 'Collaborating on free medical outreach and preventive health education.',
  },
  {
    id: 'partner-2',
    name: '[PARTNER ORGANIZATION PLACEHOLDER 2]',
    type: 'Educational Foundation Partner',
    description: 'Supporting scholastic material procurement and teacher training assistance.',
  },
  {
    id: 'partner-3',
    name: '[PARTNER ORGANIZATION PLACEHOLDER 3]',
    type: 'Humanitarian Aid Society',
    description: 'Coordinating emergency relief supplies and logistics in high-need rural areas.',
  },
  {
    id: 'partner-4',
    name: '[PARTNER ORGANIZATION PLACEHOLDER 4]',
    type: 'Islamic Philanthropy Network',
    description: 'Advising on strict Zakat calculation, governance standards, and Sadaqah distribution.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The dignity with which Zanjabeel Foundation delivered food supplies to our elderly neighbors showed true Islamic compassion without pride or ostentation.',
    name: '[COMMUNITY LEADER PLACEHOLDER]',
    role: 'Ward Elder & Traditional Council Member',
    community: 'Potiskum Central',
  },
  {
    id: 't-2',
    quote: 'Seeing out-of-school orphans return to class with new uniforms and backpacks brought tears of gratitude to our whole community.',
    name: '[HEAD TEACHER PLACEHOLDER]',
    role: 'Primary School Administrator',
    community: 'Potiskum Outskirts',
  },
  {
    id: 't-3',
    quote: 'Their commitment to transparency and direct delivery of humanitarian assistance to the most deserving gives donors complete confidence.',
    name: '[PATRON & SUPPORTER PLACEHOLDER]',
    role: 'Philanthropic Contributor',
    community: 'Yobe State',
  },
];

export const initialPledges: DonationPledgeRecord[] = [
  {
    id: 'pledge-demo-1',
    reference: 'ZNJ-842109',
    donorName: 'Alhaji Ibrahim Danladi',
    donorEmail: 'i.danladi@example.com',
    donorPhone: '+234 803 555 0192',
    cause: 'Water & Sanitation (Potiskum Borehole Project)',
    amount: 150000,
    frequency: 'Project Sponsorship',
    timestamp: '28 Feb 2026',
    status: 'Confirmed',
  },
  {
    id: 'pledge-demo-2',
    reference: 'ZNJ-519304',
    donorName: 'Hajiya Fatima Mohammed',
    donorEmail: 'fatima.m@example.com',
    donorPhone: '+234 812 444 8821',
    cause: 'Orphans & Vulnerable Persons Welfare',
    amount: 50000,
    frequency: 'Monthly',
    timestamp: '02 Mar 2026',
    status: 'Pending Verification',
  },
  {
    id: 'pledge-demo-3',
    reference: 'ZNJ-392817',
    donorName: 'Anonymous Donor (Fisabilillah)',
    donorEmail: 'donor.fisabilillah@example.com',
    donorPhone: '',
    cause: 'Food & Basic Needs Distribution',
    amount: 25000,
    frequency: 'One-Time',
    timestamp: '04 Mar 2026',
    status: 'Confirmed',
  },
];
