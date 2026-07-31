"use client";
import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, Save } from 'lucide-react';

interface ExtractedItem {
  id: string;
  docId: string;
  sectionRef: string;
  category: 'fact' | 'decision' | 'assumption' | 'risk' | 'open_question' | 'action_item';
  status: 'fact' | 'assumption' | 'unresolved';
  content: string;
  approvalStatus?: 'approved' | 'rejected';
}

interface Conflict {
  id: string;
  description: string;
  resolution?: string;
}

export default function ProjectAnalyzer() {
  const [documents, setDocuments] = useState<{ id: string; name: string; content: string }[]>([]);
  const [items, setItems] = useState<ExtractedItem[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3 - documents.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocuments((prev) => [
          ...prev,
          { id: `doc_${Date.now()}_${Math.random()}`, name: file.name, content: event.target?.result as string }
        ]);
      };
      reader.readAsText(file);
    });
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setItems([
        { id: '1', docId: documents[0]?.id || '1', sectionRef: 'Section 1', category: 'fact', status: 'fact', content: 'Database migration scheduled for Q3.' },
        { id: '2', docId: documents[0]?.id || '1', sectionRef: 'Section 3', category: 'action_item', status: 'unresolved', content: 'Conduct risk audit on PII storage.' }
      ]);
      setConflicts([
        { id: 'c1', description: 'Doc 1 specifies PostgreSQL, but Doc 2 mentions MongoDB.' }
      ]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 font-sans">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Project Document Analyzer & Action Review</h1>
        <p className="text-gray-600 text-sm">Upload up to 3 text documents to extract, review, and align project knowledge.</p>
      </header>

      <section className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[120px]">
            {documents[idx] ? (
              <div className="space-y-1">
                <FileText className="mx-auto text-blue-600" />
                <p className="font-medium text-sm text-gray-800 truncate max-w-[180px]">{documents[idx].name}</p>
              </div>
            ) : (
              <label className="cursor-pointer space-y-1">
                <Upload className="mx-auto text-gray-400" />
                <span className="text-xs text-gray-500 block">Upload Document {idx + 1}</span>
                <input type="file" onChange={handleFileUpload} accept=".txt,.md,.json,.csv" className="hidden" />
              </label>
            )}
          </div>
        ))}
      </section>

      {documents.length > 0 && items.length === 0 && (
        <button onClick={runAnalysis} disabled={isAnalyzing} className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">
          {isAnalyzing ? 'Analyzing Documents...' : 'Run Extraction Workflow'}
        </button>
      )}

      {items.length > 0 && (
        <div className="space-y-6">
          {conflicts.length > 0 && (
            <div className="border border-amber-200 bg-amber-50 p-4 rounded-md space-y-3">
              <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" /> Detected Conflicts ({conflicts.length})
              </h3>
              {conflicts.map((conflict) => (
                <div key={conflict.id} className="bg-white p-3 rounded border border-amber-200 text-sm space-y-2">
                  <p className="text-gray-800">{conflict.description}</p>
                  <input type="text" placeholder="Provide resolution or explanation..." className="w-full border rounded p-1 text-xs" />
                </div>
              ))}
            </div>
          )}

          <div className="border rounded-lg overflow-hidden bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-gray-700">Category</th>
                  <th className="p-3 text-gray-700">Content</th>
                  <th className="p-3 text-gray-700">Source & Section</th>
                  <th className="p-3 text-gray-700">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-800">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold capitalize">{item.category.replace('_', ' ')}</td>
                    <td className="p-3">{item.content}</td>
                    <td className="p-3 text-xs text-gray-500">{item.sectionRef}</td>
                    <td className="p-3">
                      <select value={item.status} onChange={(e) => {
                        const val = e.target.value as any;
                        setItems(items.map(i => i.id === item.id ? { ...i, status: val } : i));
                      }} className="border rounded text-xs p-1 bg-white">
                        <option value="fact">Fact</option>
                        <option value="assumption">Assumption</option>
                        <option value="unresolved">Unresolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={() => alert("Summary Saved Successfully!")} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700">
            <Save className="w-4 h-4" /> Save Reviewed Summary
          </button>
        </div>
      )}
    </div>
  );
}