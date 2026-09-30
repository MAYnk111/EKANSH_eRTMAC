import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { DocumentType, Well } from '../../types';

interface DocumentUploaderProps {
  wells: Well[];
  onUpload: (file: File, wellId: string, docType: DocumentType) => Promise<void>;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ wells, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedWellId, setSelectedWellId] = useState<string>(wells[0]?.id || 'well-aa-05');
  const [docType, setDocType] = useState<DocumentType>('DDR (Daily Drilling Report)');
  const [uploading, setUploading] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const pipelineStages = [
    'Document Ingestion & Cloud Upload',
    'OCR & Structural Text Extraction',
    'Drilling Entity Extraction (Wells, Formations, Rigs)',
    'Depth & Event Interval Parsing (2420–2480 m)',
    'Ontology Mapping to Institutional Knowledge Graph'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSuccess(false);
      setPipelineStep(0);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setSuccess(false);

    try {
      // Simulate/trigger extraction pipeline stages
      for (let i = 1; i <= pipelineStages.length; i++) {
        setPipelineStep(i);
        await new Promise(r => setTimeout(r, 400));
      }

      await onUpload(selectedFile, selectedWellId, docType);
      setSuccess(true);
      setSelectedFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-oil-navy-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            AI Document Intelligence Ingestion
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload DDR, WCR, Mud Logs or Geological Reports to parse institutional trouble memory.
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
          OCR & Knowledge Pipeline
        </span>
      </div>

      <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Target Well</label>
            <select
              value={selectedWellId}
              onChange={e => setSelectedWellId(e.target.value)}
              className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
            >
              {wells.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.formation})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Document Type</label>
            <select
              value={docType}
              onChange={e => setDocType(e.target.value as DocumentType)}
              className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
            >
              <option value="DDR (Daily Drilling Report)">DDR (Daily Drilling Report)</option>
              <option value="WCR (Well Completion Report)">WCR (Well Completion Report)</option>
              <option value="Mud Log">Mud Log</option>
              <option value="Geological Report">Geological Report</option>
              <option value="Operational Report">Operational Report</option>
              <option value="BHA & Casing Record">BHA & Casing Record</option>
            </select>
          </div>
        </div>

        {/* Drag Drop Area */}
        <div className="border-2 border-dashed border-oil-navy-700 hover:border-cyan-500/60 rounded-xl p-6 text-center cursor-pointer bg-oil-navy-950/60 transition-colors">
          <input
            type="file"
            id="doc-upload-input"
            accept=".pdf,.doc,.docx,.csv,.xlsx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="doc-upload-input" className="cursor-pointer block space-y-2">
            <FileText className="w-10 h-10 text-cyan-400 mx-auto" />
            <div className="text-sm font-semibold text-slate-200">
              {selectedFile ? selectedFile.name : 'Choose a drilling report or drag here'}
            </div>
            <p className="text-[11px] text-slate-500">
              Supported formats: PDF, Word, CSV, Excel, TXT (up to 50MB)
            </p>
          </label>
        </div>

        {/* Pipeline Stepper animation if uploading */}
        {uploading && (
          <div className="bg-oil-navy-950 p-4 rounded-xl border border-oil-navy-800 space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide block">
              Document Processing Pipeline:
            </span>
            <div className="space-y-1.5">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {pipelineStep > i ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : pipelineStep === i + 1 ? (
                    <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-oil-navy-700 shrink-0" />
                  )}
                  <span className={pipelineStep >= i + 1 ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Document successfully indexed! Extracted 18 entities and connected to Knowledge Graph.</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              !selectedFile || uploading
                ? 'bg-oil-navy-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Report...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload & Extract Drilling Memory
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
