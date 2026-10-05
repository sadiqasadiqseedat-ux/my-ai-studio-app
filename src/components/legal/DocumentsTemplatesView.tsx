import React, { useState } from 'react';
import {
  FileText,
  Search,
  Upload,
  Download,
  Eye,
  Plus,
  Copy,
  Check,
  Printer,
  X,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { LegalDocumentRecord, LegalTemplate } from '../../types/legal';

interface DocumentsTemplatesViewProps {
  documents: LegalDocumentRecord[];
  templates: LegalTemplate[];
  onUploadDocument: (doc: LegalDocumentRecord) => void;
  onDeleteDocument: (id: string) => void;
}

export const DocumentsTemplatesView: React.FC<DocumentsTemplatesViewProps> = ({
  documents,
  templates,
  onUploadDocument,
  onDeleteDocument,
}) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Template generation state
  const [activeTemplate, setActiveTemplate] = useState<LegalTemplate | null>(null);
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCat, setNewDocCat] = useState('Pleading');
  const [newDocMatter, setNewDocMatter] = useState('BBBC/2026/001');

  const categories = [
    'All',
    'Pleading',
    'Motion',
    'Affidavit',
    'Tenancy Agreement',
    'Deed of Assignment',
    'Notice',
    'Court Order',
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.matterRef && doc.matterRef.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (tpl: LegalTemplate) => {
    setActiveTemplate(tpl);
    const initialMap: Record<string, string> = {
      '[CLIENT NAME]': 'Alhaji Garba Danladi',
      '[TENANT NAME]': 'TechBridge Solutions Ltd',
      '[PREMISES ADDRESS]': 'Suite 301, Horizon Commercial Plaza, Aminu Kano Crescent, Wuse 2, Abuja',
      '[LANDLORD NAME]': 'Horizon Properties & Developments Ltd',
      '[DATE OF DETERMINATION]': '31st December 2025',
      '[DATE OF EXPIRY]': '31st December 2025',
      '[DATE OF NOTICE]': '28th June 2025',
      '[COURT NAME]': 'High Court of the Federal Capital Territory, Abuja',
      '[DEBT AMOUNT IN NAIRA]': '14,500,000',
      '[CURRENT DATE]': new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      '[LAWYER NAME]': 'Barr. B. B. Bale, SAN',
      '[MATTER NUMBER]': 'BBBC/2026/002',
    };
    setPlaceholderValues(initialMap);

    let content = tpl.rawTemplate;
    Object.entries(initialMap).forEach(([k, v]) => {
      content = content.split(k).join(v);
    });
    setGeneratedContent(content);
  };

  const handleGenerate = () => {
    if (!activeTemplate) return;
    let content = activeTemplate.rawTemplate;
    Object.entries(placeholderValues).forEach(([k, v]) => {
      content = content.split(k).join(v);
    });
    setGeneratedContent(content);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LegalDocumentRecord = {
      id: 'DOC-' + Date.now(),
      title: newDocTitle,
      category: newDocCat as any,
      matterRef: newDocMatter,
      dateUploaded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      uploadedBy: 'Hadiza Mohammed, Esq.',
      fileSize: '1.4 MB',
      version: '1.0',
    };
    onUploadDocument(created);
    setShowUploadModal(false);
    setNewDocTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Document Repository & Statutory Templates
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Secure digital archives for pleadings, affidavits, tenancy agreements, and automatic legal document generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'documents'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Document Archive ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'templates'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Template Generator ({templates.length})
            </button>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Document File Archive */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search documents by title or matter ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                    selectedCategory === cat
                      ? 'bg-[#0B1B3D] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Document Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Matter Reference</th>
                    <th className="p-3.5">Date Uploaded</th>
                    <th className="p-3.5">Version & Size</th>
                    <th className="p-3.5">Uploaded By</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0B1B3D] shrink-0" />
                          <span className="font-bold text-slate-900">{doc.title}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-[#0B1B3D]">
                        {doc.matterRef || 'General Archive'}
                      </td>
                      <td className="p-3.5 text-slate-600">{doc.dateUploaded}</td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                        {doc.version} ({doc.fileSize})
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">{doc.uploadedBy}</td>
                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => alert(`Document Preview: ${doc.title} [Chambers Vault Verification OK]`)}
                          className="p-1.5 text-slate-500 hover:text-[#0B1B3D] rounded hover:bg-slate-100"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => alert(`Downloading signed copy of: ${doc.title}`)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-emerald-50"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Document Template Library & Automatic Populator */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Template Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Approved Chambers Legal Templates
            </h3>
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeTemplate?.id === tpl.id
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={activeTemplate?.id === tpl.id ? 'text-[#D4AF37] font-bold' : 'text-slate-400'}>
                    {tpl.category}
                  </span>
                  <span className="font-mono text-[9px] opacity-70">{tpl.id}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm">{tpl.title}</h4>
                <p className={`text-[11px] mt-1 line-clamp-2 ${activeTemplate?.id === tpl.id ? 'text-slate-200' : 'text-slate-500'}`}>
                  {tpl.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Template Generator Workspace */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            {activeTemplate ? (
              <>
                <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Document Generator</span>
                    <h3 className="font-heading font-bold text-base text-slate-900">{activeTemplate.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 bg-[#0B1B3D] text-[#D4AF37] hover:bg-[#1E3A8A] rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Document</span>
                    </button>
                  </div>
                </div>

                {/* Placeholders Editor */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Automatic Verification & Placeholders Inputs
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTemplate.placeholders.map((ph) => (
                      <div key={ph}>
                        <label className="block text-[10px] font-mono font-semibold text-slate-600 mb-0.5">{ph}</label>
                        <input
                          type="text"
                          value={placeholderValues[ph] || ''}
                          onChange={(e) => {
                            const updated = { ...placeholderValues, [ph]: e.target.value };
                            setPlaceholderValues(updated);
                            let content = activeTemplate.rawTemplate;
                            Object.entries(updated).forEach(([k, v]) => {
                              content = content.split(k).join(v);
                            });
                            setGeneratedContent(content);
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Review Area (Mandatory Lawyer Review) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">Draft Document Review Stage</span>
                    <span className="text-amber-800 font-medium">⚠️ Lawyer review required before professional issuance</span>
                  </div>
                  <textarea
                    rows={12}
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-xl font-serif-legal text-xs leading-relaxed text-slate-900 bg-white"
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <FileCheck className="w-12 h-12 mx-auto stroke-1" />
                <p className="font-semibold text-slate-600 text-sm">Select a Legal Template to Begin</p>
                <p className="text-xs">Select Notice to Quit, Form 7 Owner’s Intention, or Demand Letter from the list on the left.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Upload Document to Vault</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Originating Summons with 14 Exhibits"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newDocCat}
                    onChange={(e) => setNewDocCat(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Pleading">Pleading</option>
                    <option value="Motion">Motion</option>
                    <option value="Affidavit">Affidavit</option>
                    <option value="Tenancy Agreement">Tenancy Agreement</option>
                    <option value="Deed of Assignment">Deed of Assignment</option>
                    <option value="Notice">Notice</option>
                    <option value="Court Order">Court Order</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Matter Reference</label>
                  <input
                    type="text"
                    value={newDocMatter}
                    onChange={(e) => setNewDocMatter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-500 hover:border-[#0B1B3D] cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="font-semibold text-slate-700">Click to select PDF or Word document</p>
                <p className="text-[10px] text-slate-400 mt-1">Encrypted and hashed into Chambers digital vault</p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
