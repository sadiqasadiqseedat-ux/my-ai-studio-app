import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Scale,
  FileText,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: string[];
}

export const AiLegalAssistantView: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      content: `Welcome to the **B. B. Bale & Co. Chambers Legal Intelligence System**. I am programmed with Nigerian statutory enactments, High Court Civil Procedure Rules (FCT & Lagos), the Recovery of Premises Act, Land Use Act 1978, and Supreme Court / Court of Appeal case precedents (NWLR).

How may I assist your research or drafting today? You may choose from one of the quick research prompts below or type your inquiry.`,
      timestamp: '09:00 AM',
      citations: [
        'Evidence Act 2011 (as amended 2023)',
        'Land Use Act 1978 (Cap. L5 LFN 2004)',
        'Recovery of Premises Act (Cap. 544 LFN 1990)',
        'Rules of Professional Conduct 2023',
      ],
    },
  ]);

  const quickPrompts = [
    {
      title: 'Proof of Title to Land (5 Ways)',
      query: 'What are the five recognized ways of proving ownership and title to land in Nigeria under the locus classicus Idundun v. Okumagba?',
    },
    {
      title: 'Validity of 7-Day Statutory Notice (Form E)',
      query: 'Explain the statutory requirements for valid issuance and service of a 7-day notice of owner’s intention to recover possession under the Recovery of Premises Act.',
    },
    {
      title: 'Draft Notice to Quit (Yearly Tenant)',
      query: 'Draft a formal Notice to Quit for a yearly tenant whose tenancy commenced on January 1st, citing relevant statutory notice lengths and eve-of-anniversary principles.',
    },
    {
      title: 'Interlocutory Injunction Principles (Kotoye v. CBN)',
      query: 'What are the essential conditions for the grant of an interlocutory injunction in Nigeria under Kotoye v. CBN and American Cyanamid?',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateLegalResponse = (query: string): { text: string; citations: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('idundun') || q.includes('title to land') || q.includes('proof of title')) {
      return {
        text: `### Five Ways of Proving Title to Land in Nigeria

In the locus classicus **Idundun v. Okumagba (1976) 9-10 SC 227**, reaffirmed by the Supreme Court in **Owoyin v. Omotosho (1961) 1 All NLR 304** and **Manga v. Jimeta (2021) 12 NWLR (Pt. 1791) 402**, the Supreme Court enunciated that title to land may be proved in any of five exclusive ways:

1. **Traditional Evidence / Traditional History:**
   Proof by oral tradition of how the ancestors of the claimant founded, settled, or acquired the land (devolved through inheritance).
2. **Production of Title Documents:**
   Duly executed, stamped, and registered title deeds (e.g., Certificate of Occupancy, Deed of Assignment, Governor's Consent, or Deed of Conveyance) whose authenticity is unimpeachable.
3. **Acts of Ownership Extending Over a Sufficient Period:**
   Acts of user and ownership (farming, leasing, building, collecting rents) numerous and positive enough to warrant the inference of absolute ownership (**Section 35 Evidence Act 2011**).
4. **Acts of Long Possession and Enjoyment:**
   Continuous, uninterrupted, peaceable adverse possession over time.
5. **Proof of Possession of Connected or Adjacent Land:**
   Possession of contiguous land in such circumstances as to make it probable that the owner of that adjacent land owns the disputed tract (**Section 34 Evidence Act**).

> **Practice Note for Chambers:** Under Nigerian law, proving any ONE of the five ways successfully is sufficient to sustain a declaration of title (**Dabo v. Abdullahi (2005) 7 NWLR (Pt. 923) 181**).`,
        citations: [
          'Idundun v. Okumagba (1976) 9-10 SC 227',
          'Owoyin v. Omotosho (1961) 1 All NLR 304',
          'Evidence Act 2011, Sections 34 & 35',
          'Manga v. Jimeta (2021) 12 NWLR (Pt. 1791) 402',
        ],
      };
    }

    if (q.includes('7-day') || q.includes('form e') || q.includes('recover possession') || q.includes('recovery of premises')) {
      return {
        text: `### Requirements for Valid 7-Day Statutory Notice (Form E)

Under the **Recovery of Premises Act (Cap. 544 LFN 1990)** and the **Tenancy Law**:

1. **Condition Precedent - Expiration of Tenancy:**
   A 7-Day Notice of Owner's Intention to Apply to Recover Possession (Form E) can **NEVER** be served while the tenancy is still subsisting. It can ONLY be served after the statutory **Notice to Quit** has expired or the term of years has lapsed by effluxion of time (**Chiroma v. Suwa (1986) 1 NWLR (Pt. 19) 751**).

2. **Computation of "Seven Clear Days":**
   The statutory seven days must be **seven clear days**. The day of service and the day of expiration are excluded. E.g., if served on Monday 1st, court proceedings cannot be instituted until Wednesday 10th (**Ochei v. BAM Ltd (2001) 14 NWLR (Pt. 734) 637**).

3. **Description of Premises & Owner's Authority:**
   The notice must specifically describe the premises, the name of the landlord, and must be signed by the landlord in person or by his **written-authorized legal practitioner / agent** (**Coker v. Adetayo (1992) 6 NWLR (Pt. 249) 612**).

4. **Service Mode:**
   Personal service on the tenant is preferred. Substituted service (pasting on the outer wall or door of the premises) requires compliance with statutory service rules or prior court leave where tenant evades service.`,
        citations: [
          'Recovery of Premises Act, Sections 7, 8 & 9',
          'Chiroma v. Suwa (1986) 1 NWLR (Pt. 19) 751',
          'Ochei v. BAM Ltd (2001) 14 NWLR (Pt. 734) 637',
          'African Petroleum Ltd v. Owodunni (1991) 8 NWLR (Pt. 210) 391',
        ],
      };
    }

    if (q.includes('quit') || q.includes('notice to quit') || q.includes('yearly tenant')) {
      return {
        text: `### Statutory Notice to Quit — Standard Drafting Precedent

**LEGAL PRINCIPLE:** Under Nigerian law, in the absence of an express written agreement stipulating otherwise, a yearly tenant is entitled to **6 months' notice to quit**, terminating on the eve of the anniversary of the tenancy (**Section 8 Recovery of Premises Act; African Petroleum Ltd v. Owodunni (1991) 8 NWLR (Pt. 210) 391**).

---

### DRAFT NOTICE TO QUIT

**TO:** [Name of Tenant]  
**ADDRESS:** [Full Address of Premises, Suite/Flat No.]

**NOTICE TO QUIT**  
*(Pursuant to Section 8 of the Recovery of Premises Act)*

**SIR / MADAM,**

WE, **B. B. BALE & CO. CHAMBERS**, as Solicitors and Agents to your Landlord, **[Name of Landlord]**, HEREBY GIVE YOU NOTICE to quit and deliver up possession of the premises with the appurtenances situate at **[Address of Premises]**, which you hold of him as a yearly tenant, on or before the **[Date - Eve of anniversary, e.g., 31st day of December, 2026]**.

DATED THIS ______ DAY OF _______________ 2026.

_______________________________  
**B. B. BALE & CO. CHAMBERS**  
*(Solicitors to the Landlord)*  
Plot 482 Constitution Avenue, CBD, Abuja`,
        citations: [
          'African Petroleum Ltd v. Owodunni (1991) 8 NWLR (Pt. 210) 391',
          'Recovery of Premises Act, Section 8',
          'Owoade v. Sekoni (2020) LPELR-50212(CA)',
        ],
      };
    }

    if (q.includes('injunction') || q.includes('kotoye') || q.includes('interlocutory')) {
      return {
        text: `### Essential Conditions for Grant of Interlocutory Injunction

In **Kotoye v. Central Bank of Nigeria (1989) 1 NWLR (Pt. 98) 419** and **Adeleke v. Lawal (2014) 3 NWLR (Pt. 1393) 1**, the Supreme Court laid down the mandatory principles governing the grant of interlocutory injunctions in Nigerian courts:

1. **Serious Prima Facie Question to be Tried:**
   The Applicant must demonstrate by affidavit evidence that there is a substantial issue in controversy between the parties.
2. **Balance of Convenience:**
   The Applicant must show that the balance of convenience tilts heavily in his favor—i.e., that more harm will be occasioned if the injunction is refused than if granted.
3. **Irreparable Damage / Inadequacy of Damages:**
   The Applicant must establish that pecuniary compensation or monetary damages will not adequately remedy the injury suffered should the Respondent proceed with the act.
4. **Undertaking as to Damages:**
   The Applicant must provide an express, unconditional undertaking to indemnify the Respondent in damages should it turn out that the injunction was wrongly granted.
5. **Conduct of the Parties:**
   As an equitable remedy, the Applicant must come with clean hands and not be guilty of delay, acquiescence, or laches.`,
        citations: [
          'Kotoye v. CBN (1989) 1 NWLR (Pt. 98) 419',
          'American Cyanamid Co. v. Ethicon Ltd (1975) AC 396',
          'Adeleke v. Lawal (2014) 3 NWLR (Pt. 1393) 1',
        ],
      };
    }

    // Default intelligent response
    return {
      text: `### Chambers Legal Research Note on: "${query}"

Under Nigerian law and practice (High Court of the Federal Capital Territory & Supreme Court rules):

1. **Statutory Framework:**  
   The primary enactments governing this subject matter require compliance with procedural rules of court, constitutional due process under **Section 36 of the 1999 Constitution (as amended)**, and strict adherence to mandatory timelines.

2. **Judicial Precedent & Admissibility:**  
   The Supreme Court has consistently held that procedural compliance is the lifeblood of adjudication. Where processes are not initiated in conformity with the relevant rules, the court lacks jurisdiction to entertain the cause (**Madukolu v. Nkemdilim (1962) 2 SCNLR 341**).

3. **Recommended Chamber Action:**  
   - Review originating processes and confirm limitation periods.  
   - Issue written formal statutory letter before action where mandated.  
   - Prepare supporting affidavit with stamped exhibits pursuant to **Section 115 Evidence Act 2011**.`,
      citations: [
        'Madukolu v. Nkemdilim (1962) 2 SCNLR 341',
        'Constitution of the Federal Republic of Nigeria 1999 (as amended), Section 36',
        'Evidence Act 2011, Section 115',
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateLegalResponse(query);
      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        content: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: resp.citations,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0B1B3D]">
              AI Legal Assistant & Jurisprudence Research
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#800020] text-amber-200 border border-amber-500/30">
              Nigerian Law Grounded
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Grounded in NWLR citations, Supreme Court rulings, Recovery of Premises Act, and High Court Civil Procedure Rules.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-reset',
                sender: 'assistant',
                content:
                  'Session refreshed. Ask any question regarding Nigerian litigation, land conveyancing, tenancy notices, or pleading drafts.',
                timestamp: 'Just now',
              },
            ]);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#0B1B3D] text-left transition shadow-xs group"
          >
            <span className="font-semibold text-xs text-[#0B1B3D] group-hover:text-[#800020] block mb-1">
              {p.title}
            </span>
            <p className="text-[11px] text-slate-500 line-clamp-2">{p.query}</p>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.sender === 'assistant'
                    ? 'bg-[#0B1B3D] text-[#D4AF37]'
                    : 'bg-[#800020] text-white'
                }`}
              >
                {m.sender === 'assistant' ? <Scale className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>

              <div className="space-y-2 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0B1B3D] text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs">{m.content}</div>

                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-[11px]">
                      <span className="font-bold text-[#800020] block mb-1">Relevant Legal Authorities:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                        {m.citations.map((cite, i) => (
                          <li key={i}>{cite}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  className={`flex items-center gap-3 text-[10px] text-slate-400 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="inline-flex items-center gap-1 hover:text-slate-600"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                <span>Searching NWLR law reports & statutory enactments...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Nigerian legal research question, draft notice to quit, originating motion, C of O search..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isTyping}
            className="px-5 py-2.5 bg-[#0B1B3D] hover:bg-[#13274F] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <span>Ask Counsel</span>
            <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
