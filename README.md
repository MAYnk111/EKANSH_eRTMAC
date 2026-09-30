# eRTMAC – NWIS (Nearby Wells Intelligence System)
### Smart India Hackathon PS-26121 | Oil India Limited (OIL)

> **"Drilling Knowledge. In Real Time."**  
> *Turning every completed well into institutional intelligence for the next.*

---

## 🎯 Executive Overview

**eRTMAC – NWIS** is an enterprise-grade drilling institutional memory and real-time offset intelligence platform designed specifically for **Oil India Limited (OIL)** operations across the Assam & Assam-Arakan Basin (Nahorkatiya, Moran, and Dikom fields).

Rather than generic dashboards or black-box predictive models, eRTMAC-NWIS grounds all operational recommendations in deterministic multi-offset well analogs, stratigraphic lithology logs, daily drilling reports (DDRs), and depth-aware failure precedent memory.

---

## 🔬 Core Product Architecture & Workflow

```text
Historical Data (DDRs, WCRs, Mud Logs)
               +
   Real-Time eRTMAC Telemetry (1.0 Hz)
               ↓
     AI Document Intelligence (OCR)
               ↓
    Drilling Knowledge Graph (Ontology)
               ↓
     Contextual Offset Matching (92%)
               ↓
      Depth-Aware Risk Memory
               ↓
   Explainable AI Alert ("ELEVATED RISK")
               ↓
    Archival Historical Evidence (AA-05)
               ↓
      Recommended Action (CaCO3 Pill)
               ↓
        Rig Engineer Decision
               ↓
             Outcome
               ↓
      Continuous Institutional Learning
```

---

## 🚀 Key Modules & Capabilities

1. **Authentication & Multi-Role Governance**:
   - Oil India Limited enterprise authentication portal with persistent session.
   - Built-in personas: *Drilling Engineer*, *eRTMAC Operator*, *Operations Manager*, and *OIL Management*.
   - One-click demo role switching directly from the topbar or profile.

2. **Main Drilling Dashboard**:
   - Header with dynamic time-of-day greeting and user identity.
   - Live KPI cards calculated dynamically from database records (Total Wells, Offset Wells Analyzed, Active Risk Zones, Historical NPT Hours, Institutional Coverage).
   - Real-time **Active Well Panel (AA-12)** with live parameter telemetry (ROP, WOB, RPM, Torque, Flow Rate, Mud Weight, Standpipe Pressure, Gas Units).
   - Real-time depth progress bar and simulation stepping controls.

3. **Depth-Aware Risk Memory Engine**:
   - Detects when the active well's bit depth overlaps historical hazard intervals.
   - **Active Demo Scenario**: Well **AA-12** at **2450 m** inside the Upper Sandstone formation approaching the historical trouble zone (**2420–2480 m**).
   - Multi-offset convergence (4 of 5 offset wells experienced severe mud loss in this exact zone).

4. **Explainable AI Alert ("ELEVATED RISK")**:
   - Grounded explanation modal detailing *why* the alert was triggered.
   - Confidence rating (**82%**).
   - Exact historical evidence cards citing offset wells (AA-05, AA-09, AA-03, AA-02).
   - Proven mitigation protocols (e.g. 35-40 bbl CaCO3 coarse/medium LCM pill, ECD reduction).
   - Direct button to move risk to the Operations Board.

5. **Contextual Offset Well Engine**:
   - Non-Euclidean offset ranking using a 5-factor weighted matrix:
     - Formation Facies Match
     - Depth Overlap
     - Historical Incident Precedents
     - Drilling Profile & Trajectory
     - Geographic Proximity
   - Interactive breakdown showing factor scores for each offset well (e.g., AA-05: 92% match).

6. **Real Interactive GIS Map**:
   - Built with **Leaflet + OpenStreetMap** (zero fake image maps).
   - Active well marker with animated pulse ring.
   - Color-coded offset well markers with interactive popups.
   - Risk zone danger circles and selectable radius boundaries (3km, 5km, 10km, 20km).
   - Browser **Geolocation API integration** showing "Your Current Location".

7. **Drilling Knowledge Graph**:
   - Interactive SVG/Canvas ontology mapping:  
     `Well → Formation → Depth Window → Incident Event → Telemetry Parameter → Mitigation Protocol → Outcome → Source Document`.
   - Pan, zoom, node drag, and interactive inspector sidebar.

8. **AI Document Intelligence & Report Viewer**:
   - Ingestion of DDRs, WCRs, Mud Logs, and Operational Programs.
   - Multi-stage simulated extraction pipeline: Document Ingestion → OCR Text Extraction → Entity Extraction → Depth/Event Interval Parsing → Knowledge Graph Integration.
   - Comprehensive document viewer modal with extracted telemetry, mitigation notes, and explainable OCR citations.

9. **eRTMAC Live Telemetry Stream**:
   - Dedicated streaming page running at 1.0 Hz with real-time chart trends (Standpipe Pressure, Torque, ROP, Weight on Bit).
   - Pause/resume stream controls and depth stepping.
   - Clearly labeled *"SIMULATED eRTMAC STREAM"*.

10. **Operations Kanban Board**:
    - 5 functional operational columns: *Detected*, *Investigating*, *Action Required*, *Monitoring*, *Resolved*.
    - Moving cards persists state in Firestore / application storage.
    - Card creation modal for rig engineers.

11. **AI Drilling Assistant**:
    - Engineering chatbot grounded exclusively in Oil India offset well logs.
    - Pre-configured queries for quick testing.
    - Every response provides verifiable evidence citations with document source, depth interval, and formation context.

12. **Settings & Data Seeding**:
    - Live Cloud Firestore connection status.
    - **"Seed Synthetic Data to Firestore"** button to populate or re-seed collections.
    - Configurable alarm thresholds and unit preferences (Metric vs Oilfield).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Routing**: React Router v7
- **Motion & Micro-interactions**: Framer Motion
- **Icons**: Lucide React
- **Analytics Charts**: Recharts
- **GIS Maps**: Leaflet, React Leaflet, OpenStreetMap
- **Backend & Cloud**: Firebase (Authentication, Cloud Firestore, Firebase Storage)
- **Security**: Granular `firestore.rules` and `storage.rules`

---

## ⚡ Quick Start & Development

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
The repository includes `.env.example` and a default configured `.env` file:
```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyOilIndiaNWIS2026Secure001
VITE_FIREBASE_AUTH_DOMAIN=oil-india-ertmac-nwis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=oil-india-ertmac-nwis
VITE_FIREBASE_STORAGE_BUCKET=oil-india-ertmac-nwis.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=928374651029
VITE_FIREBASE_APP_ID=1:928374651029:web:a1b2c3d4e5f67890abcdef
```

> **Note on Hybrid Persistence**: When connected to your live Google Firebase project, data syncs directly with Cloud Firestore and Storage. If running with demo credentials or offline, the system seamlessly maintains resilient, stateful local persistence with zero crashes!

### 4. Running the Development Server
```bash
npm run dev
```

### 5. Production Build Verification
```bash
npm run build
```
This runs TypeScript checking (`tsc -b`) and Vite production bundle generation into `/dist`.

---

## 🧪 Evaluator Demo Walkthrough

1. **Sign In**: Launch the app and click any one-click persona on the login page (e.g. **Drilling Lead** or **eRTMAC Spec**).
2. **Review Active Trouble Zone**:
   - On the Dashboard, observe Active Well **AA-12** at **2450 m** inside Upper Sandstone.
   - Note the **"Historical Trouble Zone Approaching (2420–2480 m)"** card.
   - Click **"Examine Explainable Evidence & Mitigation"** to view the 4-offset grounded evidence and recommended CaCO3 pill recipe.
   - Click **"Move Risk to Operations Board"**.
3. **Explore GIS Proximity**:
   - Click **Nearby Wells Map** in the sidebar.
   - Adjust the radius slider (3km, 5km, 10km, 20km).
   - Click offset markers (**AA-05**, **AA-09**) to review popup profiles.
4. **Inspect Drilling Ontology**:
   - Navigate to **Knowledge Graph**. Click nodes (e.g. **Upper Sandstone**, **Event: Mud Loss**, **CaCO3 LCM Pill**) to inspect parameters in the right inspector.
5. **Simulate Real-time eRTMAC Stream**:
   - Navigate to **eRTMAC Live**. Watch the parameter ticks and real-time SPP and Torque chart trends.
   - Click **"Step +3m"** to simulate drilling ahead.
6. **Track Workflow on Kanban**:
   - Navigate to **Operations Board**. Note the card moved from the alert. Drag or move cards between *Investigating*, *Action Required*, *Monitoring*, and *Resolved*.
7. **Ask AI Drilling Assistant**:
   - Navigate to **AI Assistant** and click prompt: *"What happened in nearby wells around 2450 m?"* or *"What mitigation worked previously in AA-05?"*
   - Verify grounded citations referencing DDR page numbers and depth intervals.
8. **Document Ingestion**:
   - Navigate to **Reports / OCR** and upload a drilling report to see the 5-stage extraction pipeline.

---

## 📜 Compliance & Attribution
- Built for **Smart India Hackathon (SIH) Problem Statement PS-26121** for **Oil India Limited (OIL)**.
- All geological formations (Upper Sandstone, Barail Coal-Shale, Tipam Sandstone, Girujan Clay) and asset names (Assam Asset, Nahorkatiya, Moran) reflect realistic regional basin geology for demonstration purposes. Synthetic data is clearly labeled.
