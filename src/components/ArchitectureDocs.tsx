import React from 'react';
import { Terminal, Database, Cpu, Layers, FileCode2, Server, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const ArchitectureDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-2">
          <span>System Architecture & Engineering Specification</span>
          <span aria-hidden="true">·</span>
          <span>Dual-Engine Implementation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          EcoTrack AI Architecture & Python Backend Guide
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
          EcoTrack AI is built with a production-ready dual-engine architecture: a high-performance 
          live preview Node/TypeScript server for instant browser evaluation, alongside a complete 
          Python FastAPI, PostgreSQL, and Scikit-learn machine learning codebase organized in the 
          <code className="font-mono text-emerald-800 font-semibold mx-1">/backend</code> directory.
        </p>
      </div>

      {/* Architecture Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">NLP & ML Classification</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            TF-IDF feature extraction (unigrams and bigrams, sublinear scaling) paired with 
            multinomial Logistic Regression, trained specifically on labeled Indian environmental complaints across all 18 categories.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800 mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">PostgreSQL & SQLAlchemy</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict relational schema with tables for Administrators, Environmental Complaints, Notes, 
            Audit History, and Model Evaluations with composite indexation on state and district.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mb-3">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">FastAPI REST Services</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-speed asynchronous Python endpoints with Pydantic request/response validation, 
            JWT administrative authorization, and automated Swagger documentation.
          </p>
        </div>
      </div>

      {/* Directory Structure */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-emerald-700" />
          <span>Project Directory Structure</span>
        </h2>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`ecotrack-ai/
├── backend/
│   ├── api/                     # FastAPI route handlers
│   ├── database/
│   │   ├── database.py          # SQLAlchemy PostgreSQL engine & SessionLocal
│   │   └── init_db.py           # Table initialization & default admin seeding
│   ├── dataset/
│   │   └── india_environmental_complaints.csv # Labeled Indian complaints
│   ├── models/
│   │   └── models.py            # SQLAlchemy models (Administrators, Complaints, Notes, History)
│   ├── nlp/
│   │   ├── ner.py               # spaCy / rule-based Indian geographic NER
│   │   ├── pipeline.py          # TF-IDF + Logistic Regression scikit-learn pipeline
│   │   └── train.py             # Model training, validation, and evaluation script
│   ├── schemas/
│   │   └── schemas.py           # Pydantic validation models
│   ├── main.py                  # FastAPI application entry point
│   ├── requirements.txt         # Pinned Python package dependencies
│   └── README.md                # Comprehensive backend execution guide
├── src/
│   ├── components/              # React components (Header, Dashboard, Form, Tracker)
│   ├── data/
│   │   ├── indiaGeo.ts          # 36 States/UTs, 700+ Districts, Hotspots
│   │   └── seedComplaints.ts    # Seed dataset covering 18 categories
│   ├── nlp/
│   │   └── nlpEngine.ts         # TypeScript ML engine for live preview
│   ├── types/
│   │   └── environmental.ts     # TypeScript interfaces and contracts
│   ├── App.tsx                  # Main application router
│   ├── index.css                # Tailwind CSS v4 design rules
│   └── main.tsx                 # React DOM mount
├── server.ts                    # Full-stack Node/Express server with Vite middlewares
├── package.json
└── README.md`}
        </pre>
      </div>

      {/* Local Execution Instructions */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-700" />
          <span>How to Run the Python FastAPI & PostgreSQL Backend Locally (VS Code)</span>
        </h2>

        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Step 1: Create and Activate Python Virtual Environment</h3>
            <pre className="p-3 bg-slate-100 rounded-lg font-mono text-slate-800">
{`# Create virtual environment
python3 -m venv venv

# Activate (Linux / macOS):
source venv/bin/activate

# Activate (Windows PowerShell):
.\\venv\\Scripts\\Activate.ps1

# Install required Python packages:
pip install -r backend/requirements.txt`}
            </pre>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1">Step 2: Initialize Database and Seed Tables</h3>
            <pre className="p-3 bg-slate-100 rounded-lg font-mono text-slate-800">
{`# Ensure PostgreSQL is running locally, then initialize schema:
export DATABASE_URL="postgresql://postgres:password@localhost:5432/ecotrack_ai_db"
python -m backend.database.init_db`}
            </pre>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1">Step 3: Train Scikit-Learn Model & Generate Evaluation Artifacts</h3>
            <pre className="p-3 bg-slate-100 rounded-lg font-mono text-slate-800">
{`python -m backend.nlp.train`}
            </pre>
            <p className="mt-1 text-slate-500">
              Outputs genuine Accuracy, Macro F1, Precision, Recall, and Confusion Matrix, saving artifacts to <code className="font-mono">backend/nlp/model_artifacts.pkl</code>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1">Step 4: Launch the FastAPI REST Server</h3>
            <pre className="p-3 bg-slate-100 rounded-lg font-mono text-slate-800">
{`uvicorn backend.main:app --reload --port 8000`}
            </pre>
            <p className="mt-1 text-slate-500">
              Interactive API documentation will be available at: <code className="font-mono text-emerald-800">http://localhost:8000/docs</code>
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview Architecture Note */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-950">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-emerald-900">Live AI Studio Preview Mode</span>
          <span>
            Since the AI Studio sandbox environment runs Node.js without pre-installed system Python packages, 
            the application in preview runs on the Express + TypeScript full-stack engine (<code className="font-mono font-semibold">server.ts</code>) 
            with an identical REST API, real-time TF-IDF & Logistic Regression model, Indian geographic entity extraction, and persistence. 
            All Python FastAPI and PostgreSQL source files are preserved and ready for immediate deployment.
          </span>
        </div>
      </div>
    </div>
  );
};
