import React, { useState } from 'react';
import {
  HeartHandshake,
  Utensils,
  GraduationCap,
  Stethoscope,
  Moon,
  Users,
  AlertCircle,
  BookOpen,
  Briefcase,
  Droplet,
  Building2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ProgramItem } from '../types';

interface ProgramsGridProps {
  programs: ProgramItem[];
  onSelectProgram: (program: ProgramItem) => void;
  onOpenDonateForProgram: (programTitle: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  programs,
  onSelectProgram,
  onOpenDonateForProgram,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 11 Programs' },
    { id: 'Vulnerable Care', label: 'Vulnerable Care' },
    { id: 'Education & Learning', label: 'Education & Learning' },
    { id: 'Relief & Sustenance', label: 'Relief & Sustenance' },
    { id: 'Health & Wellbeing', label: 'Health & Wellbeing' },
    { id: 'Infrastructure & Health', label: 'Water & WASH' },
  ];

  const filteredPrograms =
    filterCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === filterCategory || (filterCategory === 'Education & Learning' && p.category === 'Faith & Morals'));

  const renderProgramIcon = (name: string) => {
    const iconClass = 'w-6 h-6 text-emerald-800 transition-colors group-hover:text-amber-400';
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Stethoscope':
        return <Stethoscope className={iconClass} />;
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'AlertCircle':
        return <AlertCircle className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'Briefcase':
        return <Briefcase className={iconClass} />;
      case 'Droplet':
        return <Droplet className={iconClass} />;
      case 'Building2':
      default:
        return <Building2 className={iconClass} />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-stone-200" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Humanitarian Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            What We Do
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            From orphan care and emergency food aid to clean water installations and educational sponsorships, our 11 programs respond holistically to the humanitarian needs of Potiskum and Yobe State.
          </p>

          {/* Interactive filter tabs (clean segmented buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 bg-stone-100/90 rounded-lg max-w-fit mx-auto border border-stone-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 11 Interactive Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group relative bg-[#faf8f4] rounded-xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between hover:border-emerald-800/40"
            >
              <div>
                {/* Header Icon + Category metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-stone-200 flex items-center justify-center group-hover:bg-emerald-900 group-hover:border-emerald-900 transition-colors shadow-xs">
                    {renderProgramIcon(program.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-stone-500">
                    {program.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                  {program.title}
                </h3>

                {/* Short description */}
                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                  {program.shortDesc}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-stone-200/70 flex items-center justify-between">
                <button
                  onClick={() => onSelectProgram(program)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 group/btn transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <button
                  onClick={() => onOpenDonateForProgram(program.title)}
                  className="text-[11px] font-medium text-amber-700 hover:text-amber-800 hover:underline"
                >
                  Support Cause
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
