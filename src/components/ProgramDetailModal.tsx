import React from 'react';
import { X, CheckCircle, Heart, ArrowRight, BookOpen, Utensils, HeartHandshake, Stethoscope, Moon, Users, AlertCircle, Briefcase, Droplet, Building2 } from 'lucide-react';
import { ProgramItem } from '../types';

interface ProgramDetailModalProps {
  program: ProgramItem | null;
  onClose: () => void;
  onDonateForProgram: (programTitle: string) => void;
  onVolunteer: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onDonateForProgram,
  onVolunteer,
}) => {
  if (!program) return null;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-400" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-amber-400" />;
      case 'GraduationCap':
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-amber-400" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-amber-400" />;
      case 'Moon':
        return <Moon className="w-6 h-6 text-amber-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-400" />;
      case 'AlertCircle':
        return <AlertCircle className="w-6 h-6 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-amber-400" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-amber-400" />;
      case 'Building2':
      default:
        return <Building2 className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#043327] text-white p-6 border-b border-emerald-900/50 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-900 border border-amber-500/40 flex items-center justify-center shrink-0">
              {renderIcon(program.iconName)}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                {program.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                {program.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Program Overview
            </h4>
            <p className="text-stone-700 leading-relaxed text-sm">
              {program.fullDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-3">
              Strategic Key Objectives
            </h4>
            <ul className="space-y-2.5">
              {program.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-stone-700 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-normal">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-900">
                Beneficiary Reach Focus
              </p>
              <p className="text-xs text-stone-700 mt-0.5">{program.beneficiariesSummary}</p>
              {program.suggestedDonation && (
                <p className="text-xs text-amber-900 font-medium mt-1">
                  Sponsorship benchmark: <span className="font-bold">{program.suggestedDonation}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onDonateForProgram(program.title);
              }}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-md shadow-xs flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-300" />
              Sponsor This Program
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onClose();
              onVolunteer();
            }}
            className="text-stone-600 hover:text-emerald-800 font-medium flex items-center gap-1"
          >
            Join as field volunteer for this initiative
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-stone-700 hover:text-stone-950 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
