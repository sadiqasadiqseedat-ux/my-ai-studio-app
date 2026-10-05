/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { DonationModal } from './components/DonationModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { ImageLightbox } from './components/ImageLightbox';
import { AdminDashboard } from './components/AdminDashboard';

import { HeroSection } from './components/HeroSection';
import { WhoWeArePreview } from './components/WhoWeArePreview';
import { MissionVisionCards } from './components/MissionVisionCards';
import { ProgramsGrid } from './components/ProgramsGrid';
import { FeaturedCampaignSection } from './components/FeaturedCampaignSection';
import { ImpactSection } from './components/ImpactSection';
import { WhySupportUsSection } from './components/WhySupportUsSection';
import { HowYouCanHelpSection } from './components/HowYouCanHelpSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { GallerySection } from './components/GallerySection';
import { NewsSection } from './components/NewsSection';
import { PartnersSection, TestimonialsSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { DonationPage } from './components/DonationPage';
import { GetInvolvedPage } from './components/GetInvolvedPage';
import { PrivacyPolicyView, TermsOfUseView, DonationPolicyView, NotFoundView } from './components/PolicyPages';

import {
  initialOrgConfig,
  programsData,
  featuredCampaign,
  impactMetrics,
  successStories,
  galleryPhotos,
  newsArticles,
  partnerList,
  testimonials,
  coreValues,
  aboutImg,
  heroImg,
} from './data/mockData';

import {
  ProgramItem,
  CampaignItem,
  GalleryPhoto,
  NewsArticle,
  ImpactStat,
  SuccessStory,
  PartnerItem,
  Testimonial,
  OrganizationConfig,
  DonationPledgeRecord,
  ContactMessageRecord,
  VolunteerRecord,
} from './types';

import { Heart, Compass, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, MapPin, Users } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // 1. Organization Config state (persisted)
  const [orgConfig, setOrgConfig] = useState<OrganizationConfig>(() => {
    try {
      const saved = localStorage.getItem('znj_org_config');
      return saved ? JSON.parse(saved) : initialOrgConfig;
    } catch {
      return initialOrgConfig;
    }
  });

  // 2. Programs state (persisted)
  const [programs, setPrograms] = useState<ProgramItem[]>(() => {
    try {
      const saved = localStorage.getItem('znj_programs');
      return saved ? JSON.parse(saved) : programsData;
    } catch {
      return programsData;
    }
  });

  // 3. Featured Campaign state (persisted)
  const [campaign, setCampaign] = useState<CampaignItem>(() => {
    try {
      const saved = localStorage.getItem('znj_campaign');
      return saved ? JSON.parse(saved) : featuredCampaign;
    } catch {
      return featuredCampaign;
    }
  });

  // 4. News Articles state (persisted)
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('znj_articles');
      return saved ? JSON.parse(saved) : newsArticles;
    } catch {
      return newsArticles;
    }
  });

  // 5. Gallery Photos state (persisted)
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('znj_photos');
      return saved ? JSON.parse(saved) : galleryPhotos;
    } catch {
      return galleryPhotos;
    }
  });

  // 6. Success Stories state (persisted)
  const [stories, setStories] = useState<SuccessStory[]>(() => {
    try {
      const saved = localStorage.getItem('znj_stories');
      return saved ? JSON.parse(saved) : successStories;
    } catch {
      return successStories;
    }
  });

  // 7. Impact Metrics state (persisted)
  const [impactStats, setImpactStats] = useState<ImpactStat[]>(() => {
    try {
      const saved = localStorage.getItem('znj_impact');
      return saved ? JSON.parse(saved) : impactMetrics;
    } catch {
      return impactMetrics;
    }
  });

  // 8. Testimonials & Partners state (persisted)
  const [customTestimonials, setCustomTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('znj_testimonials');
      return saved ? JSON.parse(saved) : testimonials;
    } catch {
      return testimonials;
    }
  });

  const [customPartners, setCustomPartners] = useState<PartnerItem[]>(() => {
    try {
      const saved = localStorage.getItem('znj_partners');
      return saved ? JSON.parse(saved) : partnerList;
    } catch {
      return partnerList;
    }
  });

  // 9. Inbox Submissions state (persisted)
  const [pledges, setPledges] = useState<DonationPledgeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('znj_pledges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState<ContactMessageRecord[]>(() => {
    try {
      const saved = localStorage.getItem('znj_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>(() => {
    try {
      const saved = localStorage.getItem('znj_volunteers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgramModal, setSelectedProgramModal] = useState<ProgramItem | null>(null);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<GalleryPhoto | null>(null);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [donateDefaultCause, setDonateDefaultCause] = useState<string>('General Humanitarian Fund & Sadaqah');

  // Persistence handlers
  const updateOrgConfig = (cfg: OrganizationConfig) => {
    setOrgConfig(cfg);
    try {
      localStorage.setItem('znj_org_config', JSON.stringify(cfg));
    } catch {}
  };

  const updatePrograms = (progs: ProgramItem[]) => {
    setPrograms(progs);
    try {
      localStorage.setItem('znj_programs', JSON.stringify(progs));
    } catch {}
  };

  const updateCampaign = (c: CampaignItem) => {
    setCampaign(c);
    try {
      localStorage.setItem('znj_campaign', JSON.stringify(c));
    } catch {}
  };

  const updateArticles = (arts: NewsArticle[]) => {
    setArticles(arts);
    try {
      localStorage.setItem('znj_articles', JSON.stringify(arts));
    } catch {}
  };

  const updatePhotos = (p: GalleryPhoto[]) => {
    setPhotos(p);
    try {
      localStorage.setItem('znj_photos', JSON.stringify(p));
    } catch {}
  };

  const updateStories = (st: SuccessStory[]) => {
    setStories(st);
    try {
      localStorage.setItem('znj_stories', JSON.stringify(st));
    } catch {}
  };

  const updateImpactStats = (st: ImpactStat[]) => {
    setImpactStats(st);
    try {
      localStorage.setItem('znj_impact', JSON.stringify(st));
    } catch {}
  };

  const updateTestimonials = (t: Testimonial[]) => {
    setCustomTestimonials(t);
    try {
      localStorage.setItem('znj_testimonials', JSON.stringify(t));
    } catch {}
  };

  const updatePartners = (pt: PartnerItem[]) => {
    setCustomPartners(pt);
    try {
      localStorage.setItem('znj_partners', JSON.stringify(pt));
    } catch {}
  };

  const updatePledges = (pl: DonationPledgeRecord[]) => {
    setPledges(pl);
    try {
      localStorage.setItem('znj_pledges', JSON.stringify(pl));
    } catch {}
  };

  const updateMessages = (m: ContactMessageRecord[]) => {
    setMessages(m);
    try {
      localStorage.setItem('znj_messages', JSON.stringify(m));
    } catch {}
  };

  const updateVolunteers = (v: VolunteerRecord[]) => {
    setVolunteers(v);
    try {
      localStorage.setItem('znj_volunteers', JSON.stringify(v));
    } catch {}
  };

  // Inbox hook listeners
  const handleRecordPledge = (rec: DonationPledgeRecord) => {
    const updated = [rec, ...pledges];
    updatePledges(updated);
  };

  const handleSendMessage = (msg: ContactMessageRecord) => {
    const updated = [msg, ...messages];
    updateMessages(updated);
  };

  const handleRegisterVolunteer = (vol: VolunteerRecord) => {
    const updated = [vol, ...volunteers];
    updateVolunteers(updated);
  };

  // Failsafe Reset to Original Demo Data
  const handleResetAllData = () => {
    setOrgConfig(initialOrgConfig);
    setPrograms(programsData);
    setCampaign(featuredCampaign);
    setArticles(newsArticles);
    setPhotos(galleryPhotos);
    setStories(successStories);
    setImpactStats(impactMetrics);
    setCustomTestimonials(testimonials);
    setCustomPartners(partnerList);
    setPledges([]);
    setMessages([]);
    setVolunteers([]);

    localStorage.removeItem('znj_org_config');
    localStorage.removeItem('znj_programs');
    localStorage.removeItem('znj_campaign');
    localStorage.removeItem('znj_articles');
    localStorage.removeItem('znj_photos');
    localStorage.removeItem('znj_stories');
    localStorage.removeItem('znj_impact');
    localStorage.removeItem('znj_testimonials');
    localStorage.removeItem('znj_partners');
    localStorage.removeItem('znj_pledges');
    localStorage.removeItem('znj_messages');
    localStorage.removeItem('znj_volunteers');
  };

  const handleNavigate = (tab: string, programId?: string) => {
    if (tab === 'admin') {
      setAdminDashboardOpen(true);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (programId) {
      const found = programs.find((p) => p.id === programId);
      if (found) {
        setSelectedProgramModal(found);
      }
    }
  };

  const handleOpenDonateFor = (causeName: string) => {
    setDonateDefaultCause(causeName);
    setDonateModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-stone-800 antialiased font-sans selection:bg-emerald-900 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        config={orgConfig}
        onOpenDonate={() => {
          setDonateDefaultCause('General Humanitarian Fund & Sadaqah');
          setDonateModalOpen(true);
        }}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <HeroSection
              config={orgConfig}
              onOpenDonate={() => {
                setDonateDefaultCause('General Humanitarian Fund & Sadaqah');
                setDonateModalOpen(true);
              }}
              onExploreWork={() => handleNavigate('programs')}
            />
            <WhoWeArePreview onReadMore={() => handleNavigate('about')} />
            <MissionVisionCards onLearnMore={() => handleNavigate('mission')} />
            <ProgramsGrid
              programs={programs}
              onSelectProgram={(program) => setSelectedProgramModal(program)}
              onOpenDonateForProgram={handleOpenDonateFor}
            />
            <FeaturedCampaignSection
              campaign={campaign}
              onOpenDonate={() => handleOpenDonateFor(campaign.title)}
            />
            <ImpactSection
              impactStats={impactStats}
              onExploreReports={() => handleNavigate('impact')}
            />
            <WhySupportUsSection />
            <HowYouCanHelpSection
              onOpenDonate={() => {
                setDonateDefaultCause('General Humanitarian Fund & Sadaqah');
                setDonateModalOpen(true);
              }}
              onOpenVolunteer={() => handleNavigate('get-involved')}
              onOpenPartner={() => handleNavigate('get-involved')}
              onSponsorProject={() => handleNavigate('get-involved')}
            />
            <SuccessStoriesSection
              stories={stories}
              onOpenDonate={() => setDonateModalOpen(true)}
            />
            <GallerySection
              photos={photos}
              onOpenLightbox={(photo) => setSelectedGalleryPhoto(photo)}
            />
            <NewsSection
              articles={articles}
              onSelectArticle={() => handleNavigate('news')}
            />
            <PartnersSection
              partners={customPartners}
              onOpenPartnerInquiry={() => handleNavigate('get-involved')}
            />
            <TestimonialsSection testimonials={customTestimonials} />
            <ContactSection
              config={orgConfig}
              onSendMessage={handleSendMessage}
            />
          </>
        )}

        {/* Dedicated About Us Page */}
        {currentTab === 'about' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Who We Are
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mt-1">
                  About Zanjabeel Foundation
                </h1>
                <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
                <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
                  Founded with a deep commitment to Islamic values, compassionate humanitarian service, and grassroots community development in Potiskum, Yobe State, Nigeria.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div className="lg:col-span-6 relative">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 aspect-4/3 bg-stone-100">
                    <img
                      src={aboutImg}
                      alt="Zanjabeel Foundation field volunteers and students in Potiskum"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-5 text-stone-700 text-sm leading-relaxed">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    Our Origin & Purpose
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    Rooted in Potiskum, Dedicated to Human Dignity
                  </h2>
                  <p>
                    Zanjabeel Islamic Charity and Humanitarian Foundation was established in response to pressing socio-economic challenges confronting vulnerable households across Potiskum LGA and neighboring rural communities in Yobe State.
                  </p>
                  <p>
                    Our name “Zanjabeel” is drawn from the Holy Qur’an (Surah Al-Insan 76:17), evoking the pure, refreshing springs promised to the righteous—symbolizing restoration, healing, and life-giving hope for those in adversity.
                  </p>
                  <p>
                    We operate with strict administrative professionalism and Islamic governance. Every project, from community water boreholes to emergency food distributions and orphan sponsorship, is implemented directly on the ground by dedicated volunteers who know the communities intimately.
                  </p>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => handleNavigate('mission')}
                      className="px-5 py-2.5 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md hover:bg-emerald-900 transition-colors"
                    >
                      Read Mission & Vision
                    </button>
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="px-5 py-2.5 bg-white border border-stone-300 text-stone-700 font-semibold text-xs rounded-md hover:bg-stone-50 transition-colors"
                    >
                      Visit Our Secretariat
                    </button>
                  </div>
                </div>
              </div>

              {/* 7 Core Values Grid */}
              <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-xs mb-16">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                    Ethical Pillars
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                    Our Seven Core Values
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coreValues.map((val) => (
                    <div key={val.name} className="p-5 bg-stone-50 rounded-xl border border-stone-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        {val.name}
                      </span>
                      <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                  <div className="p-5 bg-emerald-900 text-white rounded-xl flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Our Promise
                    </span>
                    <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">
                      100% committed to dignity, transparency, and sustainable community empowerment in Yobe State.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Mission & Vision Page */}
        {currentTab === 'mission' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Strategic Compass
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mt-1">
                  Our Mission & Vision
                </h1>
                <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
                <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
                  Guided by Islamic principles of compassion, integrity, and sustainable human development.
                </p>
              </div>

              <MissionVisionCards />

              {/* Strategic Priorities */}
              <div className="mt-16 bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-xs max-w-4xl mx-auto space-y-6">
                <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                  Strategic Goals for Yobe State
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Eradicating Preventable Water Hardship:</strong> Expanding clean borehole wells in remote settlements across Potiskum to eliminate waterborne illness.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Supporting Orphans & Indigent Learners:</strong> Re-enrolling out-of-school children with full supplies, tuition support, and moral Islamic mentoring.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Restoring Family Resilience:</strong> Empowering widows and indigent household heads through livelihood starter micro-grants and vocational apprenticeships.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero-Ostentation Aid Delivery:</strong> Delivering food hampers and medical relief with privacy and respect, honoring the recipients&apos; human dignity.
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handleNavigate('programs')}
                    className="px-6 py-2.5 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md hover:bg-emerald-900 transition-colors"
                  >
                    View Our Programs
                  </button>
                  <button
                    onClick={() => {
                      setDonateDefaultCause('General Humanitarian Fund & Sadaqah');
                      setDonateModalOpen(true);
                    }}
                    className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold text-xs rounded-md hover:bg-amber-400 transition-colors"
                  >
                    Support This Vision
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Our Programs Page */}
        {currentTab === 'programs' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProgramsGrid
                programs={programs}
                onSelectProgram={(program) => setSelectedProgramModal(program)}
                onOpenDonateForProgram={handleOpenDonateFor}
              />
            </div>
          </div>
        )}

        {/* Dedicated Campaigns Page */}
        {currentTab === 'campaigns' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeaturedCampaignSection
                campaign={campaign}
                onOpenDonate={() => handleOpenDonateFor(campaign.title)}
              />

              {/* Secondary Active Appeal Cards */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">Seasonal Outreach</span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      Ramadan 1447 AH Food Basket Mobilization
                    </h3>
                    <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                      Targeting indigent families in Potiskum with 30-day staple nutrition packages containing rice, beans, flour, dates, sugar, and cooking oil.
                    </p>
                    <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-500">Package benchmark: </span>
                      <strong className="text-emerald-950">₦30,000 per family</strong>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">Status: Active Appeal</span>
                    <button
                      onClick={() => handleOpenDonateFor('Ramadan 1447 AH Food Basket Mobilization')}
                      className="px-4 py-2 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md hover:bg-emerald-900 transition-colors"
                    >
                      Sponsor Food Basket
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">Health Intervention</span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      Emergency Pediatric & Elder Medical Fund
                    </h3>
                    <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                      Subsidizing life-saving treatments, malaria prescriptions, and hospital surgical bills for indigent patients who cannot afford clinical fees.
                    </p>
                    <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-500">Target fund: </span>
                      <strong className="text-emerald-950">₦[AMOUNT PLACEHOLDER]</strong>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">Status: Ongoing Emergency</span>
                    <button
                      onClick={() => handleOpenDonateFor('Emergency Pediatric & Elder Medical Fund')}
                      className="px-4 py-2 bg-emerald-800 text-amber-300 font-semibold text-xs rounded-md hover:bg-emerald-900 transition-colors"
                    >
                      Contribute to Fund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Our Impact Page */}
        {currentTab === 'impact' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ImpactSection
                impactStats={impactStats}
                onExploreReports={() => {}}
              />

              {/* Accountability & Transparency Section */}
              <div className="mt-16 bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm max-w-4xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Responsible Stewardship (Amanah)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  Accountability & Transparency
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  Zanjabeel Islamic Charity and Humanitarian Foundation values the trust of every donor. We intend to provide appropriate periodic updates about projects, activities, and verified impact.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <h4 className="font-bold text-xs text-stone-900">Annual Audit Reports</h4>
                    <p className="text-[11px] text-stone-500">Independent financial accounting dossier.</p>
                    <span className="text-[10px] text-emerald-800 font-medium">[Scheduled for verified publication]</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <h4 className="font-bold text-xs text-stone-900">Project Completion Briefs</h4>
                    <p className="text-[11px] text-stone-500">Photographic & GPS logs of borehole wells.</p>
                    <span className="text-[10px] text-emerald-800 font-medium">[Dispatched to verified sponsors]</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <h4 className="font-bold text-xs text-stone-900">Financial Updates</h4>
                    <p className="text-[11px] text-stone-500">Quarterly income & allocation disclosures.</p>
                    <span className="text-[10px] text-emerald-800 font-medium">[Available upon formal request]</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">To request project-specific accounting, email our secretariat:</span>
                  <span className="font-mono font-semibold text-emerald-950">{orgConfig.emailPlaceholder}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Donate Page */}
        {currentTab === 'donate' && (
          <DonationPage
            config={orgConfig}
            onOpenModal={() => setDonateModalOpen(true)}
            onRecordPledge={handleRecordPledge}
          />
        )}

        {/* Dedicated Get Involved Page */}
        {currentTab === 'get-involved' && (
          <GetInvolvedPage
            config={orgConfig}
            onOpenDonate={() => setDonateModalOpen(true)}
            onRegisterVolunteer={handleRegisterVolunteer}
            onContactMessage={handleSendMessage}
          />
        )}

        {/* Dedicated Photo Gallery Page */}
        {currentTab === 'gallery' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <GallerySection
                photos={photos}
                onOpenLightbox={(photo) => setSelectedGalleryPhoto(photo)}
              />
            </div>
          </div>
        )}

        {/* Dedicated News & Updates Archive */}
        {currentTab === 'news' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <NewsSection articles={articles} />
            </div>
          </div>
        )}

        {/* Dedicated Partners & Supporters Page */}
        {currentTab === 'partners' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PartnersSection
                partners={customPartners}
                onOpenPartnerInquiry={() => handleNavigate('get-involved')}
              />
            </div>
          </div>
        )}

        {/* Dedicated Contact Page */}
        {currentTab === 'contact' && (
          <div className="py-14 sm:py-20 bg-[#faf8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactSection
                config={orgConfig}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        )}

        {/* Legal & Policy Pages */}
        {currentTab === 'privacy' && (
          <PrivacyPolicyView
            config={orgConfig}
            onNavigateHome={() => handleNavigate('home')}
            onExplorePrograms={() => handleNavigate('programs')}
          />
        )}

        {currentTab === 'terms' && (
          <TermsOfUseView
            config={orgConfig}
            onNavigateHome={() => handleNavigate('home')}
            onExplorePrograms={() => handleNavigate('programs')}
          />
        )}

        {currentTab === 'donation-policy' && (
          <DonationPolicyView
            config={orgConfig}
            onNavigateHome={() => handleNavigate('home')}
            onExplorePrograms={() => handleNavigate('programs')}
          />
        )}

        {currentTab === '404' && (
          <NotFoundView
            config={orgConfig}
            onNavigateHome={() => handleNavigate('home')}
            onExplorePrograms={() => handleNavigate('programs')}
          />
        )}
      </main>

      {/* Reusable Modals & Overlays */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        config={orgConfig}
        defaultCause={donateDefaultCause}
        onRecordPledge={handleRecordPledge}
      />

      <ProgramDetailModal
        program={selectedProgramModal}
        onClose={() => setSelectedProgramModal(null)}
        onDonateForProgram={handleOpenDonateFor}
        onVolunteer={() => handleNavigate('get-involved')}
      />

      <ImageLightbox
        photo={selectedGalleryPhoto}
        photos={photos}
        onClose={() => setSelectedGalleryPhoto(null)}
        onSelectPhoto={(photo) => setSelectedGalleryPhoto(photo)}
      />

      {/* Comprehensive Superadmin Dashboard (Can Change, Delete, or Upload Anything) */}
      {adminDashboardOpen && (
        <AdminDashboard
          config={orgConfig}
          onUpdateConfig={updateOrgConfig}
          programs={programs}
          onUpdatePrograms={updatePrograms}
          campaign={campaign}
          onUpdateCampaign={updateCampaign}
          articles={articles}
          onUpdateArticles={updateArticles}
          photos={photos}
          onUpdatePhotos={updatePhotos}
          stories={stories}
          onUpdateStories={updateStories}
          impactStats={impactStats}
          onUpdateImpactStats={updateImpactStats}
          testimonials={customTestimonials}
          onUpdateTestimonials={updateTestimonials}
          partners={customPartners}
          onUpdatePartners={updatePartners}
          pledges={pledges}
          onUpdatePledges={updatePledges}
          messages={messages}
          onUpdateMessages={updateMessages}
          volunteers={volunteers}
          onUpdateVolunteers={updateVolunteers}
          onResetAllData={handleResetAllData}
          onClose={() => setAdminDashboardOpen(false)}
        />
      )}

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat config={orgConfig} />

      {/* Global Professional Footer */}
      <Footer
        config={orgConfig}
        onNavigate={handleNavigate}
        onOpenDonate={() => {
          setDonateDefaultCause('General Humanitarian Fund & Sadaqah');
          setDonateModalOpen(true);
        }}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />
    </div>
  );
}
