import React, { useState, useEffect } from 'react';
import { 
  FileText, UploadCloud, Search, Eye, Filter, 
  Layers, CheckCircle2, Clock, AlertTriangle, Calendar 
} from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { DocumentRecord, Well, DocumentType } from '../types';
import { DocumentUploader } from '../components/documents/DocumentUploader';
import { DocumentViewerModal } from '../components/documents/DocumentViewerModal';
import { useAuth } from '../context/AuthContext';
import { RiskBadge } from '../components/common/RiskBadge';

export const ReportsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [wells, setWells] = useState<Well[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const loadData = async () => {
    const docs = await dataStorage.getDocuments();
    const w = await dataStorage.getWells();
    setDocuments(docs);
    setWells(w);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = async (file: File, wellId: string, docType: DocumentType) => {
    await dataStorage.uploadDocument(
      file,
      wellId,
      docType,
      currentUser?.displayName || 'OIL Drilling Specialist'
    );
    await loadData();
  };

  const filteredDocs = documents.filter(d => {
    const matchesSearch = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.wellName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || d.documentType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>AI Document Intelligence & Archival Repository</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated OCR and entity-event extraction for WCR, DDR, Mud Logs, and Drilling Programs.
          </p>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-oil-navy-950 px-3 py-1.5 rounded-lg border border-oil-navy-800">
          Cloud Storage & Firestore Sync
        </span>
      </div>

      {/* Document Uploader */}
      <DocumentUploader wells={wells} onUpload={handleUpload} />

      {/* Document Repository List */}
      <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-oil-navy-800 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Indexed Drilling Documents</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              {filteredDocs.length} Reports
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="bg-oil-navy-950 border border-oil-navy-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="bg-oil-navy-950 border border-oil-navy-700 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">All Document Types</option>
              <option value="DDR (Daily Drilling Report)">DDR (Daily Drilling Report)</option>
              <option value="WCR (Well Completion Report)">WCR (Well Completion Report)</option>
              <option value="Operational Report">Operational Report</option>
              <option value="Mud Log">Mud Log</option>
            </select>
          </div>
        </div>

        {/* Documents Grid / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-oil-navy-950/80 border border-oil-navy-800 hover:border-cyan-500/50 rounded-xl p-4.5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                    {doc.documentType}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{doc.fileSize}</span>
                </div>

                <h4 className="font-bold text-white text-sm mt-2 line-clamp-1">
                  {doc.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                  <span>Well: <strong className="text-cyan-400">{doc.wellName}</strong></span>
                  <span>• Date: {doc.date}</span>
                </div>

                {/* Extracted Highlights */}
                <div className="mt-3 p-3 bg-oil-navy-900/80 rounded-lg border border-oil-navy-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Interval Parsed:</span>
                    <strong className="text-white font-mono">{doc.extractedData.depthInterval || 'N/A'}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Formation:</span>
                    <span className="text-cyan-300 font-mono truncate max-w-[160px]">{doc.extractedData.formation || 'N/A'}</span>
                  </div>
                  {doc.extractedData.detectedEvents && (
                    <div className="pt-1 flex flex-wrap gap-1">
                      {doc.extractedData.detectedEvents.map((ev, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-mono">
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-oil-navy-800/80 text-xs">
                <span className="text-[10px] text-slate-500">By {doc.uploadedBy}</span>
                <button
                  onClick={() => {
                    setSelectedDoc(doc);
                    setShowViewer(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Extracted Memory</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viewer Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
      />
    </div>
  );
};
