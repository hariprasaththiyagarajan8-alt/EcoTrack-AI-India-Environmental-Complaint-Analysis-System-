# EcoTrack AI – India-Focused Environmental Complaint Analysis System

EcoTrack AI is an end-to-end full-stack environmental complaint analysis system specifically designed for environmental conditions in India.

The application analyzes environmental complaints written in natural language, predicts the category using a machine learning model (TF-IDF + Logistic Regression), extracts key environmental indicators and Indian location entities (States, Union Territories, Districts, and Landmarks), and provides an administrator dashboard for monitoring environmental complaints across Indian states, districts, cities, towns, and villages.

---

## 1. System Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Recharts, Lucide Icons
- **Backend (Python)**: FastAPI, Pydantic, SQLAlchemy ORM, Uvicorn
- **NLP & Machine Learning**: Scikit-Learn, TF-IDF Vectorizer (unigram & bigram), Multinomial Logistic Regression, NLTK/spaCy
- **Entity Extraction**: Gazetteer matching 28 Indian States, 8 Union Territories, 700+ Districts, and Indian environmental landmarks
- **Database**: PostgreSQL (with SQLAlchemy migration and indexing)
- **Live Preview Engine**: Express + TypeScript in `server.ts` mounting Vite middleware with identical REST API endpoints and native ML engine.

---

## 2. All 18 Indian Environmental Complaint Categories

1. **Air Pollution** (Vehicular emissions, industrial smoke, urban smog, brick kilns)
2. **Water Pollution** (Chemical effluents, lake frothing, drain discharges)
3. **Noise Pollution** (Loudspeakers after 10 PM, un-silenced DG sets, industrial machinery)
4. **Illegal Waste Dumping** (Debris dumping on lake beds, vacant plots, ring roads)
5. **Plastic Pollution** (Single-use carry bags, thermocol, packaging choking storm drains)
6. **Sewage and Drainage Pollution** (Overflowing trunk sewers, open nallahs, cesspools)
7. **Industrial Pollution** (Unscrubbed chimney emissions, untamed acid effluent)
8. **River and Lake Pollution** (Ganga, Yamuna, Bellandur, Cooum river contamination)
9. **Groundwater Contamination** (Landfill leachate, fluorosis, borewell salinity)
10. **Deforestation and Tree Cutting** (Illegal tree felling without transit permits)
11. **Soil Pollution** (Electroplating sludge, acid pickling liquor on farmland)
12. **Agricultural Burning and Crop Residue Burning** (Parali/stubble burning)
13. **Construction Dust Pollution** (Uncovered trucks, missing anti-smog water cannons)
14. **Solid Waste Management Issues** (Overflowing community vats, rotting garbage)
15. **Hazardous Waste Disposal** (Chemical drums, hospital bio-medical waste)
16. **Coastal and Marine Pollution** (Tar balls, bilge oil, fishing gear on beaches)
17. **Environmental Damage to Wildlife and Biodiversity** (Encroachments in eco-sensitive zones)
18. **Other Environmental Issues** (Quarry blasting vibrations, slope instability)

---

## 3. Local Setup Instructions (VS Code & Terminal)

### Prerequisites
- Python 3.10+
- PostgreSQL 14+
- Node.js 20+

### Step 1: Clone and Set Up Python Virtual Environment
```bash
# In the project root
python3 -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows (cmd/PowerShell):
.\venv\Scripts\activate

# Install Python requirements
pip install -r backend/requirements.txt
```

### Step 2: Configure PostgreSQL Database
Create a database in PostgreSQL:
```sql
CREATE DATABASE ecotrack_ai_db;
```
Configure environment variables or create a `.env` file:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/ecotrack_ai_db
JWT_SECRET=your_super_secret_jwt_key_2026
```

Initialize the database tables and seed administrator account:
```bash
python -m backend.database.init_db
```

### Step 3: Train the NLP & Machine Learning Model
Train the Scikit-learn TF-IDF + Logistic Regression pipeline on the curated Indian dataset:
```bash
python -m backend.nlp.train
```
This generates the serialized model artifact at `backend/nlp/model_artifacts.pkl` and outputs genuine evaluation metrics (Accuracy, Precision, Recall, F1, Confusion Matrix).

### Step 4: Run the FastAPI Server
```bash
uvicorn backend.main:app --reload --port 8000
```
Swagger UI documentation will be available at: `http://localhost:8000/docs`

### Step 5: Start the React Frontend
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 4. Default Administrator Credentials

- **Email**: `admin@ecotrack.gov.in`
- **Password**: `EcoTrack#2026`
- **Role**: Administrator / Central Environmental Monitoring Authority

---

## 5. Running Tests

Run the backend unit test suite:
```bash
pytest backend/tests
```

---

## 6. Official Disclaimer

The statistics, metrics, and recommendations provided by EcoTrack AI reflect **reported citizen complaints** analyzed through natural language processing and machine learning algorithms. They are intended for prioritization, administrative workflow routing, and grievance tracking, and do not constitute certified ambient pollution measurements or official environmental rankings by the Central Pollution Control Board (CPCB) or State Pollution Control Boards (SPCBs).
