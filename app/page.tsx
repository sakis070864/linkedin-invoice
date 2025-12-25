"use client"; // ΑΠΑΡΑΙΤΗΤΟ για το Next.js

/**
 * APPLICATION OVERVIEW:
 * This is a high-fidelity Senior Software Engineer Demo showcasing a "Logistics AI Automation Pipeline".
 * * CORE FUNCTIONALITY:
 * 1. Data Extraction: Simulates an AI/OCR engine that parses logistics invoices.
 * 2. Real-time Auditing: Provides a terminal interface showing Node.js execution logs during processing.
 * 3. Data Visualization: Displays extracted data in a modern dashboard with a professional invoice preview.
 * 4. Export System: Allows users to export verified data into PDF and CSV formats.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Play, CheckCircle, FileText, Download, Terminal, 
  Loader2, AlertCircle, Edit3, FileSpreadsheet, FileJson, 
  ChevronDown, Mail, HardDrive, LayoutDashboard, Zap, X, Eye, ShieldCheck,
  Printer, Building2, User, HelpCircle, Info, Linkedin
} from 'lucide-react';

// Industry Standard sample data for the demo
const INDUSTRY_SAMPLE_DATA = [
  { 
    id: 'INV-2023-001', 
    date: '2023-12-01', 
    client: 'Global Logistics Corp', 
    address: '123 Logistics Way, Rotterdam, NL',
    amount: '€1,240.50', 
    status: 'Verified',
    seller: {
      name: 'North Sea Shipping Ltd',
      address: 'Port Quay 12, Rotterdam, NL',
      vat: 'NL800123456',
      email: 'ops@northseaship.com',
      color: 'bg-blue-600'
    },
    items: [
      { desc: 'Container Freight (20ft)', qty: 1, price: 850.00 },
      { desc: 'Customs Clearance Fee', qty: 1, price: 142.40 },
      { desc: 'Insurance Premium', qty: 1, price: 248.10 }
    ],
    details: { vat: '€248.10', subtotal: '€992.40', confidence: '99.2%', method: 'OCR-v4', terms: 'Net 30' }
  },
  { 
    id: 'INV-2023-002', 
    date: '2023-12-05', 
    client: 'FastShip Ltd', 
    address: '45 port Terminal, Hamburg, DE',
    amount: '€890.00', 
    status: 'Verified',
    seller: {
      name: 'Hamburg Express Gmbh',
      address: 'Elbe Str. 88, Hamburg, DE',
      vat: 'DE100987654',
      email: 'billing@hamburg-express.de',
      color: 'bg-red-600'
    },
    items: [
      { desc: 'Express Courier Delivery', qty: 10, price: 71.20 },
      { desc: 'Fuel Surcharge', qty: 1, price: 178.00 }
    ],
    details: { vat: '€178.00', subtotal: '€712.00', confidence: '98.5%', method: 'LLM-Extract', terms: 'Due on Receipt' }
  },
  { 
    id: 'INV-2023-003', 
    date: '2023-12-10', 
    client: 'Euro Freight Services', 
    address: 'Industrial Zone B, Piraeus, GR',
    amount: '€2,100.25', 
    status: 'Verified',
    seller: {
      name: 'Piraeus Port Services SA',
      address: 'Akti Miaouli 5, Piraeus, GR',
      vat: 'EL099887766',
      email: 'accounting@piraeus-port.gr',
      color: 'bg-emerald-600'
    },
    items: [
      { desc: 'LTL Shipping Services', qty: 2, price: 650.00 },
      { desc: 'Warehouse Storage (Monthly)', qty: 1, price: 380.20 },
      { desc: 'Hazardous Material Handling', qty: 1, price: 420.05 }
    ],
    details: { vat: '€420.05', subtotal: '€1,680.20', confidence: '99.8%', method: 'Hybrid-AI', terms: 'Net 15' }
  },
];

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [inputMode, setInputMode] = useState('standard'); 
  const [customInput, setCustomInput] = useState("INV-X1, INV-X2");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const linkedinProfileUrl = "https://www.linkedin.com/in/sakis-athan/";

  // Διόρθωση: Προσθήκη τύπων στις παραμέτρους
  const addLog = (message: string, type: string = 'info') => {
    setLogs((prev) => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Διόρθωση: Προσθήκη τύπου στην παράμετρο format
  const handleExport = (format: string) => {
    setIsExporting(true);
    setShowExportMenu(false);
    setTimeout(() => {
      setIsExporting(false);
      const displayFormat = format.toUpperCase() === 'CVS' ? 'CSV' : format.toUpperCase();
      setNotification(`Saved as ${displayFormat}!`);
      setTimeout(() => setNotification(null), 4000);
    }, 1500);
  };

  const runSimulation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setLogs([]);
    setResults([]);
    setProgress(0);
    setNotification(null);

    const dataToProcess = inputMode === 'standard' 
      ? INDUSTRY_SAMPLE_DATA 
      : customInput.split(',').map((item, index) => ({
          id: item.trim() || `DATA-${index + 1}`,
          date: new Date().toISOString().split('T')[0],
          client: 'Private Client',
          address: 'Customer Address Not Specified',
          amount: `€${(Math.random() * 2000).toFixed(2)}`,
          status: 'Verified',
          seller: {
            name: 'Generic AI Automated Seller',
            address: 'Digital Cloud Infrastructure',
            vat: 'AI-VAT-000',
            email: 'automated@system.ai',
            color: 'bg-slate-700'
          },
          items: [{ desc: 'Automated Processing Service', qty: 1, price: 1000.00 }],
          details: { vat: '€240.00', subtotal: '€1000.00', confidence: '97.4%', method: 'AI-Scan', terms: 'Custom' }
        }));

    const simulationSteps = [
      { msg: 'Initializing Node.js automation engine...', delay: 500, prog: 10 },
      { msg: `Detected ${dataToProcess.length} records for processing...`, delay: 1000, prog: 25 },
      { msg: 'Analyzing document structure with AI/OCR...', delay: 1500, prog: 40 },
      { msg: 'Extracting line items and financial data...', delay: 2000, prog: 60, type: 'success' },
      { msg: 'Cross-checking with CRM records...', delay: 2500, prog: 80 },
      { msg: 'Validation successful. Mapping results...', delay: 3000, prog: 95, type: 'success' },
      { msg: 'Process completed. High-fidelity data ready.', delay: 3500, prog: 100, type: 'final' },
    ];

    simulationSteps.forEach((step: any) => {
      setTimeout(() => {
        addLog(step.msg, step.type || 'info');
        setProgress(step.prog);
        if (step.type === 'final') {
          setResults(dataToProcess);
          setIsProcessing(false);
        }
      }, step.delay);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 relative overflow-x-hidden text-[15px]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-8 right-8 z-[110] animate-bounce-in">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* User Help Guide Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowHelp(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <HelpCircle className="text-blue-400 w-6 h-6" />
              </div>
              <button onClick={() => setShowHelp(false)} className="p-1 hover:bg-slate-800 rounded-full text-slate-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">What is this App?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                This app is an example of how <span className="text-blue-400 font-bold">Artificial Intelligence (AI)</span> can 
                make life easier in the <span className="text-white font-semibold">transport and shipping industry</span>. It automatically "reads" complex delivery papers and invoices, 
                checks them for mistakes, and organizes all the information into a neat list. 
                In short, it saves time by doing the heavy paperwork for you, quickly and accurately.
              </p>
            </div>

            <h3 className="text-lg font-bold text-white mb-4 border-t border-slate-800 pt-4">How to use this Demo</h3>
            <div className="space-y-4 text-sm text-slate-400 text-left">
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-400 shrink-0">1</span>
                <p><span className="text-slate-200 font-bold">Choose Mode:</span> Select <span className="text-blue-400">Standard</span> for sample data or <span className="text-blue-400">Custom</span> to type your own IDs.</p>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-400 shrink-0">2</span>
                <p><span className="text-slate-200 font-bold">Start Engine:</span> Click the <span className="italic">"Run Automation Test"</span> box to initiate AI extraction.</p>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-400 shrink-0">3</span>
                <p><span className="text-slate-200 font-bold">Audit Logs:</span> Watch the <span className="text-emerald-400 font-mono">Terminal Logs</span> to see real-time Node.js script execution.</p>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-400 shrink-0">4</span>
                <p><span className="text-slate-200 font-bold">View Factura:</span> Once complete, <span className="text-blue-400 underline">click any row</span> to preview the high-fidelity invoice.</p>
              </div>
            </div>

            <button 
              onClick={() => setShowHelp(false)}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-900/40"
            >
              Got it, let's go!
            </button>

            {/* LinkedIn Connection Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500">
                For more information, contact{" "}
                <a 
                  href={linkedinProfileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-300 hover:underline font-bold transition-colors inline-flex items-center gap-1"
                >
                  sakis <Linkedin className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Invoice Modal (Factura) */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedInvoice(null)}></div>
          
          <div className="relative bg-white text-slate-900 w-full max-w-2xl rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center no-print">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('pdf')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  <Printer className="w-4 h-4" /> Save as PDF
                </button>
                <button 
                  onClick={() => handleExport('csv')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" /> Save as CSV
                </button>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white font-serif">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-10 h-10 ${selectedInvoice.seller.color} rounded flex items-center justify-center text-white`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold font-sans tracking-tight uppercase">
                        {selectedInvoice.seller.name.split(' ')[0]} <span className="text-blue-600">{selectedInvoice.seller.name.split(' ')[1] || ''}</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-sans leading-relaxed">
                    <p className="font-bold text-slate-800 uppercase">{selectedInvoice.seller.name}</p>
                    <p>{selectedInvoice.seller.address}</p>
                    <p>VAT ID: {selectedInvoice.seller.vat}</p>
                    <p className="mt-1 font-medium">{selectedInvoice.seller.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-2 font-sans">Invoice</h2>
                  <p className="text-lg font-bold font-sans">#{selectedInvoice.id}</p>
                  <p className="text-xs text-slate-500 font-sans mt-1">Date: {selectedInvoice.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12 font-sans">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Bill To</h3>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900 text-base">{selectedInvoice.client}</p>
                    <p className="text-slate-500 mt-1">{selectedInvoice.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Payment Info</h3>
                  <div className="text-sm space-y-1 text-slate-600">
                    <p><span className="text-slate-400">Terms:</span> {selectedInvoice.details.terms}</p>
                    <p><span className="text-slate-400">Due Date:</span> 30 Days from Issue</p>
                    <p><span className="text-slate-400">Currency:</span> EUR (€)</p>
                  </div>
                </div>
              </div>

              <table className="w-full mb-12 font-sans">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-[10px] uppercase tracking-wider text-slate-500">
                    <th className="py-3 text-left">Description</th>
                    <th className="py-3 text-center w-20">Qty</th>
                    <th className="py-3 text-right w-32">Unit Price</th>
                    <th className="py-3 text-right w-32">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoice.items.map((item: any, i: number) => (
                    <tr key={i} className="text-sm text-slate-800">
                      <td className="py-4 font-medium">{item.desc}</td>
                      <td className="py-4 text-center text-slate-500">{item.qty}</td>
                      <td className="py-4 text-right text-slate-500">€{item.price.toFixed(2)}</td>
                      <td className="py-4 text-right font-bold">€{(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-12 font-sans">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium">{selectedInvoice.details.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tax (VAT 24%)</span>
                    <span className="font-medium">{selectedInvoice.details.vat}</span>
                  </div>
                  <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center">
                    <span className="text-base font-bold uppercase">Amount Due</span>
                    <span className={`text-2xl font-black ${selectedInvoice.seller.color.replace('bg-', 'text-')}`}>{selectedInvoice.amount}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 flex items-center justify-between font-sans">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full flex items-center justify-center rotate-[-15deg]">
                    <div className="text-[10px] font-black text-emerald-600 leading-tight text-center uppercase">
                      AI<br/>Verified
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-relaxed max-w-[200px]">
                    This document was processed by Node.js Engine {selectedInvoice.details.method} with {selectedInvoice.details.confidence} accuracy score.
                  </div>
                </div>
                <div className="text-right italic text-slate-300 text-xs uppercase tracking-tighter font-bold">
                  Processed by Sakis Automation Engine
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center no-print">
               <button className="bg-slate-900 text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-all shadow-xl">
                 Confirm and Sync to ERP
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout Header */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Logistics AI Automation Playground
          </h1>
          <p className="text-slate-400 mt-2 tracking-tight font-bold">Senior Engineer Demo: Data Extraction & Pipeline Automation</p>
        </div>
        <div className="flex gap-4">
          
          {/* HIGH ATTENTION Quick Guide Button with PULSE and LARGE Yellow Beam */}
          <button 
            onClick={() => setShowHelp(true)}
            className="relative p-[1.5px] overflow-hidden rounded-lg group transition-transform active:scale-95 shadow-[0_0_25px_rgba(234,179,8,0.2)] animate-button-pulse"
          >
            {/* The LARGE Yellow Beam (axtida) */}
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#EAB308_50%,transparent_65%,transparent_100%)]" />
            
            {/* The Button Body: Matching dark background + blue line border */}
            <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-[7px] bg-slate-950 border border-blue-400/40 text-blue-400 font-black text-sm group-hover:bg-slate-900 transition-colors">
              <HelpCircle className="w-4 h-4" /> 
              Quick Guide
            </div>
          </button>

          <a href={linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0077b5] hover:bg-[#005c8a] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg text-sm flex items-center gap-2">
            <Linkedin className="w-4 h-4" /> View LinkedIn Profile
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interaction Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-white font-bold">
                <Edit3 className="w-5 h-5 text-blue-400" />
                Live Demo Control
              </h2>
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setInputMode('standard')} className={`px-3 py-1 text-[10px] rounded-md transition-all font-bold ${inputMode === 'standard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>STANDARD</button>
                <button onClick={() => setInputMode('custom')} className={`px-3 py-1 text-[10px] rounded-md transition-all font-bold ${inputMode === 'custom' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>CUSTOM</button>
              </div>
            </div>

            {inputMode === 'custom' ? (
              <div className="mb-4">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 block font-bold">Input Sample IDs</label>
                <textarea 
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full bg-black border border-slate-700 rounded-xl p-3 text-sm font-mono text-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none h-20 resize-none font-bold"
                />
              </div>
            ) : (
              <div className="mb-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-center">
                <p className="text-xs text-slate-400 italic font-bold">"Simulating multi-vendor parsing engine."</p>
              </div>
            )}
            
            <div onClick={runSimulation} className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${isProcessing ? 'border-slate-700 bg-slate-900/20 pointer-events-none' : 'border-slate-700 hover:border-blue-500 hover:bg-blue-500/5'}`}>
              {isProcessing ? (
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-blue-400 font-bold">Processing Engine Active...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Play className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <p className="font-black text-sm uppercase tracking-widest text-white">Run Automation Test</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 font-mono">
                <span>OCR THROUGHPUT</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Terminal View */}
          <div className="bg-black rounded-2xl p-4 border border-slate-800 font-mono text-[11px] h-[200px] flex flex-col shadow-2xl text-slate-400">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-slate-600 uppercase text-[9px] font-bold">
              <Terminal className="w-3 h-3" /> Execution Logs
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
              {logs.length === 0 && <span className="text-slate-800 italic">Waiting for command...</span>}
              {logs.map((log: any, i: number) => (
                <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-bottom-1">
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className={log.type === 'success' ? 'text-emerald-400 font-bold' : log.type === 'final' ? 'text-blue-400 font-black' : 'text-slate-400'}>{log.message}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* Results View */}
        <div className="lg:col-span-7 space-y-6 text-slate-200">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col shadow-xl min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-white font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Extraction Results
              </h2>
              {results.length > 0 && (
                <div className="relative">
                  <button onClick={() => setShowExportMenu(!showExportMenu)} disabled={isExporting} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md font-bold">
                     {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                     Export Data <ChevronDown className="w-3 h-3" />
                  </button>
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-3 text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 font-bold text-slate-200">
                        <FileSpreadsheet className="w-3 h-3 text-emerald-400" /> Save as CSV
                      </button>
                      <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-3 text-xs hover:bg-slate-800 border-t border-slate-800 transition-colors flex items-center gap-2 font-bold text-slate-200">
                        <FileText className="w-3 h-3 text-blue-400" /> Save as PDF
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px] tracking-widest font-black">
                      <th className="py-3 px-4">Invoice ID</th>
                      <th className="py-3 px-4">Issuer</th>
                      <th className="py-3 px-4 text-right">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {results.map((row: any, i: number) => (
                      <tr key={i} onClick={() => setSelectedInvoice(row)} className="hover:bg-blue-500/10 cursor-pointer transition-all animate-in fade-in slide-in-from-left-2 group" style={{animationDelay: `${i * 100}ms`}}>
                        <td className="py-4 px-4 font-mono text-blue-400 font-black group-hover:underline">{row.id}</td>
                        <td className="py-4 px-4 font-bold text-white">{row.seller.name}</td>
                        <td className="py-4 px-4 text-right">
                          <div className={`p-2 rounded-lg inline-block transition-colors ${row.seller.color}`}>
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl p-12">
                <Info className="w-12 h-12 mb-3 opacity-10" />
                <p className="text-sm italic uppercase tracking-widest font-black opacity-30 text-center">Awaiting data processing</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 text-center text-slate-300 text-[11px] uppercase tracking-widest font-bold pb-10">
        &copy; 2024 Developed by Sakis - Senior Software Engineer | JS/Node.js Business Automation Specialist
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-in { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        
        /* Pulse Animation for the entire button container */
        @keyframes pulse-button {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(234, 179, 8, 0.1); }
          50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(234, 179, 8, 0.4); }
        }
        .animate-button-pulse {
          animation: pulse-button 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}