import { Well, WellEvent, RiskAlert, KanbanCard, DocumentRecord, KnowledgeNode, KnowledgeEdge, NotificationItem } from '../types';

export const INITIAL_WELLS: Well[] = [
  {
    id: 'well-aa-12',
    name: 'AA-12',
    asset: 'Assam Asset',
    field: 'Nahorkatiya Core',
    latitude: 27.2854,
    longitude: 95.3421,
    totalDepth: 3200,
    currentDepth: 2450,
    formation: 'Upper Sandstone',
    status: 'active',
    spudDate: '2026-08-15',
    rigName: 'OIL-Rig-09 (Super Single)',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Motor + MWD + LWD Combo',
    mudType: 'KCL-Polymer WBM (1.18 SG)',
    historicalEventsCount: 2,
    nptTotalHours: 4.5,
    distanceFromActive: 0,
    similarityScore: 100,
    similarityBreakdown: {
      geography: 100,
      formation: 100,
      depthOverlap: 100,
      drillingProfile: 100,
      historicalEvents: 100
    }
  },
  {
    id: 'well-aa-05',
    name: 'AA-05',
    asset: 'Assam Asset',
    field: 'Nahorkatiya South',
    latitude: 27.2942,
    longitude: 95.3615,
    totalDepth: 3180,
    currentDepth: 3180,
    formation: 'Upper Sandstone',
    status: 'completed',
    spudDate: '2024-03-10',
    rigName: 'OIL-Rig-04',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Rotary Steerable RSS + LWD',
    mudType: 'KCL-Glycol WBM (1.16-1.22 SG)',
    historicalEventsCount: 8,
    nptTotalHours: 36.5,
    distanceFromActive: 2.3,
    similarityScore: 92,
    similarityBreakdown: {
      geography: 94,
      formation: 95,
      depthOverlap: 91,
      drillingProfile: 89,
      historicalEvents: 94
    }
  },
  {
    id: 'well-aa-09',
    name: 'AA-09',
    asset: 'Assam Asset',
    field: 'Moran West',
    latitude: 27.2680,
    longitude: 95.3210,
    totalDepth: 3350,
    currentDepth: 3350,
    formation: 'Upper Sandstone',
    status: 'completed',
    spudDate: '2024-11-02',
    rigName: 'OIL-Rig-06',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Mud Motor + MWD',
    mudType: 'High-Inhibitive Polymer WBM',
    historicalEventsCount: 6,
    nptTotalHours: 28.0,
    distanceFromActive: 3.1,
    similarityScore: 87,
    similarityBreakdown: {
      geography: 88,
      formation: 93,
      depthOverlap: 86,
      drillingProfile: 84,
      historicalEvents: 85
    }
  },
  {
    id: 'well-aa-03',
    name: 'AA-03',
    asset: 'Assam Asset',
    field: 'Nahorkatiya North',
    latitude: 27.3110,
    longitude: 95.3580,
    totalDepth: 3050,
    currentDepth: 3050,
    formation: 'Upper Sandstone',
    status: 'completed',
    spudDate: '2023-09-18',
    rigName: 'OIL-Rig-02',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    bhaType: 'Conventional Rotary Assembly',
    mudType: 'Bentonite-Polymer WBM',
    historicalEventsCount: 5,
    nptTotalHours: 22.5,
    distanceFromActive: 3.4,
    similarityScore: 84,
    similarityBreakdown: {
      geography: 85,
      formation: 92,
      depthOverlap: 82,
      drillingProfile: 78,
      historicalEvents: 83
    }
  },
  {
    id: 'well-aa-17',
    name: 'AA-17',
    asset: 'Assam Asset',
    field: 'Dikom Extension',
    latitude: 27.3350,
    longitude: 95.2890,
    totalDepth: 3420,
    currentDepth: 3420,
    formation: 'Barail Coal-Shale',
    status: 'completed',
    spudDate: '2025-01-14',
    rigName: 'OIL-Rig-08',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Motor + Caliper + LWD',
    mudType: 'KCL-PHPA Inhibited WBM',
    historicalEventsCount: 9,
    nptTotalHours: 48.0,
    distanceFromActive: 7.6,
    similarityScore: 78,
    similarityBreakdown: {
      geography: 72,
      formation: 76,
      depthOverlap: 85,
      drillingProfile: 81,
      historicalEvents: 77
    }
  },
  {
    id: 'well-aa-08',
    name: 'AA-08',
    asset: 'Assam Asset',
    field: 'Moran Central',
    latitude: 27.2410,
    longitude: 95.2950,
    totalDepth: 3280,
    currentDepth: 3280,
    formation: 'Tipam Sandstone',
    status: 'completed',
    spudDate: '2024-07-22',
    rigName: 'OIL-Rig-05',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    bhaType: 'Rotary Assembly with Roller Cone',
    mudType: 'Dispersed Lignite WBM',
    historicalEventsCount: 4,
    nptTotalHours: 14.0,
    distanceFromActive: 6.8,
    similarityScore: 74,
    similarityBreakdown: {
      geography: 76,
      formation: 68,
      depthOverlap: 80,
      drillingProfile: 72,
      historicalEvents: 73
    }
  },
  {
    id: 'well-aa-02',
    name: 'AA-02',
    asset: 'Assam Asset',
    field: 'Nahorkatiya Core',
    latitude: 27.2790,
    longitude: 95.3490,
    totalDepth: 2950,
    currentDepth: 2950,
    formation: 'Upper Sandstone',
    status: 'completed',
    spudDate: '2023-05-12',
    rigName: 'OIL-Rig-01',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    bhaType: 'Pendulum Assembly',
    mudType: 'KCL-Polymer WBM',
    historicalEventsCount: 3,
    nptTotalHours: 9.5,
    distanceFromActive: 1.0,
    similarityScore: 89,
    similarityBreakdown: {
      geography: 98,
      formation: 94,
      depthOverlap: 80,
      drillingProfile: 82,
      historicalEvents: 91
    }
  },
  {
    id: 'well-aa-15',
    name: 'AA-15',
    asset: 'Assam Asset',
    field: 'Tengakhat Block',
    latitude: 27.3520,
    longitude: 95.3850,
    totalDepth: 3600,
    currentDepth: 3600,
    formation: 'Kopili Formation',
    status: 'completed',
    spudDate: '2025-04-05',
    rigName: 'OIL-Rig-11',
    operator: 'Oil India Limited',
    trajectory: 'Horizontal',
    bhaType: 'Point-the-Bit RSS + Geosteering',
    mudType: 'Synthetic Oil-Based Mud (SOBM)',
    historicalEventsCount: 11,
    nptTotalHours: 64.0,
    distanceFromActive: 8.5,
    similarityScore: 68,
    similarityBreakdown: {
      geography: 65,
      formation: 58,
      depthOverlap: 74,
      drillingProfile: 79,
      historicalEvents: 66
    }
  },
  {
    id: 'well-aa-21',
    name: 'AA-21',
    asset: 'Assam Asset',
    field: 'Shalmari Fault Block',
    latitude: 27.2250,
    longitude: 95.3780,
    totalDepth: 3150,
    currentDepth: 3150,
    formation: 'Girujan Clay',
    status: 'completed',
    spudDate: '2025-08-19',
    rigName: 'OIL-Rig-03',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Steerable Motor + MWD',
    mudType: 'Glycol Inhibited WBM',
    historicalEventsCount: 7,
    nptTotalHours: 31.0,
    distanceFromActive: 7.5,
    similarityScore: 71,
    similarityBreakdown: {
      geography: 73,
      formation: 62,
      depthOverlap: 78,
      drillingProfile: 75,
      historicalEvents: 69
    }
  },
  {
    id: 'well-aa-07',
    name: 'AA-07',
    asset: 'Assam Asset',
    field: 'Moran Deep',
    latitude: 27.2510,
    longitude: 95.3050,
    totalDepth: 3800,
    currentDepth: 3800,
    formation: 'Barail Arenaceous',
    status: 'completed',
    spudDate: '2024-05-18',
    rigName: 'OIL-Rig-07',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'RSS + Sonic LWD',
    mudType: 'KCL-Polymer with LCM Blend',
    historicalEventsCount: 12,
    nptTotalHours: 52.0,
    distanceFromActive: 5.3,
    similarityScore: 76,
    similarityBreakdown: {
      geography: 79,
      formation: 74,
      depthOverlap: 77,
      drillingProfile: 76,
      historicalEvents: 75
    }
  },
  {
    id: 'well-aa-18',
    name: 'AA-18',
    asset: 'Assam Asset',
    field: 'Dikom South',
    latitude: 27.3200,
    longitude: 95.3120,
    totalDepth: 3250,
    currentDepth: 3250,
    formation: 'Upper Sandstone',
    status: 'completed',
    spudDate: '2025-02-28',
    rigName: 'OIL-Rig-10',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'Motor Assembly with Shock Sub',
    mudType: 'Polymer Water Based Mud',
    historicalEventsCount: 6,
    nptTotalHours: 19.5,
    distanceFromActive: 4.8,
    similarityScore: 82,
    similarityBreakdown: {
      geography: 81,
      formation: 89,
      depthOverlap: 83,
      drillingProfile: 79,
      historicalEvents: 80
    }
  },
  {
    id: 'well-aa-24',
    name: 'AA-24',
    asset: 'Assam Asset',
    field: 'Jeypore Sub-thrust',
    latitude: 27.2010,
    longitude: 95.4120,
    totalDepth: 4100,
    currentDepth: 4100,
    formation: 'Disang Group',
    status: 'completed',
    spudDate: '2025-10-10',
    rigName: 'OIL-Rig-12 (Heavy Duty)',
    operator: 'Oil India Limited',
    trajectory: 'Directional',
    bhaType: 'High-Torque Motor + Imaging LWD',
    mudType: 'High Density Invert Emulsion Mud',
    historicalEventsCount: 14,
    nptTotalHours: 88.0,
    distanceFromActive: 11.5,
    similarityScore: 61,
    similarityBreakdown: {
      geography: 55,
      formation: 52,
      depthOverlap: 69,
      drillingProfile: 74,
      historicalEvents: 56
    }
  }
];

export const INITIAL_EVENTS: WellEvent[] = [
  {
    id: 'evt-01',
    wellId: 'well-aa-05',
    wellName: 'AA-05',
    eventType: 'Mud Loss',
    depthStart: 2420,
    depthEnd: 2480,
    formation: 'Upper Sandstone',
    severity: 'high',
    description: 'Sudden total loss of returns (approx. 45 bbl/hr) observed during drilling 8-1/2" section with 1.20 SG mud weight.',
    parameters: {
      mudWeight: '1.20 SG (10.0 ppg)',
      flowRate: '2400 L/min',
      torque: '16.5 kNm',
      rop: '14.2 m/hr',
      standpipePressure: '2850 psi'
    },
    mitigation: 'Pumed 35 bbl coarse + medium calcium carbonate LCM pill (40 ppb). Reduced mud weight to 1.15 SG and flow rate to 2000 L/min. Waited on pill for 2 hours before resuming drilling with tight volume monitoring.',
    outcome: 'successful',
    nptHours: 14.5,
    date: '2024-03-24',
    sourceDocId: 'doc-aa05-ddr-24',
    sourceDocName: 'AA-05_DDR_20240324.pdf'
  },
  {
    id: 'evt-02',
    wellId: 'well-aa-09',
    wellName: 'AA-09',
    eventType: 'Mud Loss',
    depthStart: 2435,
    depthEnd: 2490,
    formation: 'Upper Sandstone',
    severity: 'high',
    description: 'Active pit volume drop of 28 bbl within 25 minutes upon penetrating sub-layer micro-fractured sand zone.',
    parameters: {
      mudWeight: '1.21 SG',
      flowRate: '2350 L/min',
      torque: '15.8 kNm',
      rop: '16.0 m/hr',
      standpipePressure: '2900 psi'
    },
    mitigation: 'Spotted mica and walnut shell nut-plug pill (30 ppb). Kept string reciprocating continuously to avoid differential sticking while healing thief zone.',
    outcome: 'successful',
    nptHours: 11.0,
    date: '2024-11-18',
    sourceDocId: 'doc-aa09-ddr-18',
    sourceDocName: 'AA-09_DDR_20241118.pdf'
  },
  {
    id: 'evt-03',
    wellId: 'well-aa-03',
    wellName: 'AA-03',
    eventType: 'Mud Loss',
    depthStart: 2410,
    depthEnd: 2465,
    formation: 'Upper Sandstone',
    severity: 'medium',
    description: 'Seepage mud losses (15 bbl/hr) observed with fluctuating standpipe pressure. Bottoms-up samples showed coarse sand grains.',
    parameters: {
      mudWeight: '1.19 SG',
      flowRate: '2200 L/min',
      torque: '14.0 kNm',
      rop: '12.5 m/hr',
      standpipePressure: '2720 psi'
    },
    mitigation: 'Added cellulosic fiber blend directly to active mud system. Reduced circulation rate by 15% and maintained controlled ROP.',
    outcome: 'successful',
    nptHours: 6.0,
    date: '2023-10-04',
    sourceDocId: 'doc-aa03-wcr',
    sourceDocName: 'AA-03_Well_Completion_Report.pdf'
  },
  {
    id: 'evt-04',
    wellId: 'well-aa-17',
    wellName: 'AA-17',
    eventType: 'Stuck Pipe',
    depthStart: 2510,
    depthEnd: 2545,
    formation: 'Barail Coal-Shale',
    severity: 'critical',
    description: 'Differential sticking occurred during 15-minute connection after prolonged static condition with high overbalance in permeable coal section.',
    parameters: {
      mudWeight: '1.25 SG',
      torque: '24.0 kNm (Off-bottom)',
      rop: '8.0 m/hr',
      standpipePressure: '3100 psi'
    },
    mitigation: 'Spotted 50 bbl oil-based spotting fluid pill soaked for 4 hours. Jarred down with 80 klbf jar impact while torquing left-hand. String freed after 18 hours.',
    outcome: 'partial',
    nptHours: 26.0,
    date: '2025-02-04',
    sourceDocId: 'doc-aa17-npt',
    sourceDocName: 'AA-17_NPT_Investigation_Report.pdf'
  },
  {
    id: 'evt-05',
    wellId: 'well-aa-05',
    wellName: 'AA-05',
    eventType: 'Torque Spike',
    depthStart: 2490,
    depthEnd: 2530,
    formation: 'Upper Sandstone',
    severity: 'medium',
    description: 'Erratic torque fluctuations reaching 21 kNm with stick-slip severity index > 60% caused by interbedded hard siltstone stringers.',
    parameters: {
      torque: '21.0 kNm',
      rpm: '120 rpm',
      wob: '180 kN',
      rop: '7.5 m/hr'
    },
    mitigation: 'Optimized WOB from 180 kN to 135 kN and increased rotary speed to 150 RPM. Injected anti-wear drilling lubricant to mud system (2% vol).',
    outcome: 'successful',
    nptHours: 3.5,
    date: '2024-03-27',
    sourceDocId: 'doc-aa05-ddr-27',
    sourceDocName: 'AA-05_DDR_20240327.pdf'
  },
  {
    id: 'evt-06',
    wellId: 'well-aa-02',
    wellName: 'AA-02',
    eventType: 'Mud Loss',
    depthStart: 2425,
    depthEnd: 2470,
    formation: 'Upper Sandstone',
    severity: 'high',
    description: 'Dynamic losses of 35 bbl/hr upon starting pumps after BHA trip. Low fracture gradient depleted zone.',
    parameters: {
      mudWeight: '1.22 SG',
      flowRate: '2450 L/min',
      standpipePressure: '2800 psi'
    },
    mitigation: 'Dropped pump rate, spotted engineered fiber/carbonate crosslinked pill. Conditioned mud weight down to 1.17 SG.',
    outcome: 'successful',
    nptHours: 8.5,
    date: '2023-05-29',
    sourceDocId: 'doc-aa02-ddr',
    sourceDocName: 'AA-02_DDR_20230529.pdf'
  },
  {
    id: 'evt-07',
    wellId: 'well-aa-08',
    wellName: 'AA-08',
    eventType: 'Wellbore Instability',
    depthStart: 2150,
    depthEnd: 2210,
    formation: 'Tipam Sandstone',
    severity: 'medium',
    description: 'Cavings and tight hole conditions on trips due to underbalanced shale micro-fracturing.',
    parameters: {
      mudWeight: '1.12 SG',
      flowRate: '2100 L/min'
    },
    mitigation: 'Increased mud weight to 1.18 SG with potassium chloride additive for shale inhibition.',
    outcome: 'successful',
    nptHours: 7.0,
    date: '2024-08-03',
    sourceDocId: 'doc-aa08-wcr',
    sourceDocName: 'AA-08_Geological_Log.pdf'
  }
];

export const INITIAL_RISK_ALERT: RiskAlert = {
  id: 'alert-aa12-001',
  wellId: 'well-aa-12',
  wellName: 'AA-12',
  currentDepth: 2450,
  troubleZoneStart: 2420,
  troubleZoneEnd: 2480,
  riskType: 'Mud Loss',
  riskLevel: 'ELEVATED RISK',
  severity: 'high',
  confidence: 82,
  whyAlert: [
    '4 of 5 contextual offset wells (AA-05, AA-09, AA-03, AA-02) experienced partial-to-total mud losses in this exact depth interval (2420–2480 m).',
    'Current drill bit is penetrating Upper Sandstone high-porosity channel with depleted pore pressure (~0.98 SG equivalent).',
    'Active mud weight (1.18 SG) exceeds the offset fracture initiation gradient observed in AA-05 (1.17 SG equivalent).',
    'Real-time standpipe pressure shows micro-fluctuations (±85 psi) and pit volume trend is flattening, matching pre-loss signature of AA-05.'
  ],
  historicalEvidence: [
    {
      wellName: 'AA-05',
      depthRange: '2420–2480 m',
      event: 'Total Mud Loss (45 bbl/hr)',
      formation: 'Upper Sandstone',
      mitigationUsed: '35 bbl coarse + medium calcium carbonate LCM pill (40 ppb), reduced mud weight to 1.15 SG and flow rate to 2000 L/min.',
      outcome: 'Lost circulation arrested in 2.5 hrs. Safe drilling resumed.',
      similarity: 92,
      sourceDoc: 'AA-05_DDR_20240324.pdf (Page 4)'
    },
    {
      wellName: 'AA-09',
      depthRange: '2435–2490 m',
      event: 'Pit Volume Drop (28 bbl)',
      formation: 'Upper Sandstone',
      mitigationUsed: 'Spotted mica and walnut shell nut-plug pill (30 ppb) while reciprocating pipe.',
      outcome: 'Losses reduced to zero. 11 hrs NPT.',
      similarity: 87,
      sourceDoc: 'AA-09_DDR_20241118.pdf (Page 2)'
    },
    {
      wellName: 'AA-03',
      depthRange: '2410–2465 m',
      event: 'Seepage Losses (15 bbl/hr)',
      formation: 'Upper Sandstone',
      mitigationUsed: 'Cellulosic fiber blend added to active pits; reduced flow rate 15%.',
      outcome: 'Controlled drilling completed.',
      similarity: 84,
      sourceDoc: 'AA-03_Well_Completion_Report.pdf (Section 3.2)'
    },
    {
      wellName: 'AA-02',
      depthRange: '2425–2470 m',
      event: 'Dynamic Losses (35 bbl/hr)',
      formation: 'Upper Sandstone',
      mitigationUsed: 'Engineered fiber/carbonate crosslinked pill, adjusted mud weight to 1.17 SG.',
      outcome: 'Circulation restored.',
      similarity: 89,
      sourceDoc: 'AA-02_DDR_20230529.pdf (Page 3)'
    }
  ],
  recommendedAction: 'Proactively prepare 40 bbl CaCO3 (coarse/medium) LCM pill on surface. Reduce flow rate from 2400 L/min to 2100 L/min. Condition active mud weight down from 1.18 SG toward 1.15 SG to decrease Equivalent Circulating Density (ECD) below 1.20 SG.',
  kanbanCardId: 'card-01',
  status: 'active',
  createdAt: '2026-09-30T10:15:00Z'
};

export const INITIAL_KANBAN_CARDS: KanbanCard[] = [
  {
    id: 'card-01',
    columnId: 'action_required',
    risk: 'Elevated Mud Loss Risk (Approaching Trouble Zone)',
    well: 'AA-12',
    depth: '2420–2480 m',
    severity: 'high',
    confidence: 82,
    assignedEngineer: 'B. Borah (Drilling Lead)',
    timestamp: '15 mins ago',
    description: 'Offset wells AA-05, AA-09, AA-03 experienced severe mud loss in this Upper Sandstone sand body. Current depth 2450 m is within prime risk zone.',
    evidenceCount: 4,
    recommendedAction: 'Stage 40 bbl LCM pill at mud pits; reduce pump rate to 2100 L/min; adjust mud weight target to 1.15 SG.',
    tags: ['Upper Sandstone', 'Loss Zone', 'AA-05 Match']
  },
  {
    id: 'card-02',
    columnId: 'investigating',
    risk: 'Differential Sticking Risk (Static Interval)',
    well: 'AA-12',
    depth: '2450 m',
    severity: 'medium',
    confidence: 76,
    assignedEngineer: 'P. Saikia (eRTMAC Spec)',
    timestamp: '1 hour ago',
    description: 'Permeable sand interval with 0.20 SG overbalance. Pipe must not remain stationary for >5 minutes during survey.',
    evidenceCount: 2,
    recommendedAction: 'Continuous string rotation (minimum 25 RPM) during survey recording.',
    tags: ['Differential Sticking', 'Overbalance']
  },
  {
    id: 'card-03',
    columnId: 'detected',
    risk: 'Torque Fluctuations (Interbedded Siltstone)',
    well: 'AA-12',
    depth: '2448–2452 m',
    severity: 'low',
    confidence: 68,
    assignedEngineer: 'R. Gogoi (Mud Engineer)',
    timestamp: '2 hours ago',
    description: 'Minor torque micro-spikes detected on top drive telemetry. Matches lithology transition in AA-05.',
    evidenceCount: 3,
    recommendedAction: 'Add 1.5% lubricity bead additive; monitor stick-slip index.',
    tags: ['Torque Spike', 'Lubricity']
  },
  {
    id: 'card-04',
    columnId: 'monitoring',
    risk: 'Gas Kick Potential (Barail Coal Boundary)',
    well: 'AA-12',
    depth: '2650–2700 m (Anticipated)',
    severity: 'high',
    confidence: 79,
    assignedEngineer: 'D. Kalita (Operations Mgr)',
    timestamp: '5 hours ago',
    description: 'Barail formation contact anticipated at ~2650 m. Offset AA-17 recorded gas show (380 units).',
    evidenceCount: 3,
    recommendedAction: 'Pre-check choke manifold and degassing unit before crossing 2600 m.',
    tags: ['Kick Watch', 'Barail Coal']
  },
  {
    id: 'card-05',
    columnId: 'resolved',
    risk: 'Surface Casing Shoe Leak-off Test (LOT)',
    well: 'AA-12',
    depth: '920 m',
    severity: 'medium',
    confidence: 95,
    assignedEngineer: 'B. Borah (Drilling Lead)',
    timestamp: '3 days ago',
    description: 'LOT completed successfully at 13-3/8" shoe. Achieved 1.48 SG equivalent mud weight.',
    evidenceCount: 2,
    recommendedAction: 'Casing shoe integrity confirmed. Proceeded with 8-1/2" hole section.',
    tags: ['LOT', 'Shoe Integrity', 'Completed']
  }
];

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-aa05-ddr-24',
    title: 'AA-05 Daily Drilling Report - Mud Loss Event',
    wellId: 'well-aa-05',
    wellName: 'AA-05',
    date: '2024-03-24',
    documentType: 'DDR (Daily Drilling Report)',
    fileName: 'AA-05_DDR_20240324_MudLoss.pdf',
    fileSize: '2.8 MB',
    uploadedBy: 'OIL eRTMAC Archives',
    uploadedAt: '2026-09-15T08:30:00Z',
    status: 'ready',
    extractedData: {
      depthInterval: '2420–2480 m',
      formation: 'Upper Sandstone (Assam Asset)',
      detectedEvents: ['Mud Loss', 'Total Returns Loss', 'NPT 14.5 hrs'],
      severity: 'High',
      parameters: {
        'Mud Weight': '1.20 SG',
        'Flow Rate': '2400 L/min',
        'Loss Rate': '45 bbl/hr',
        'Circulating Pressure': '2850 psi'
      },
      mitigationApplied: '35 bbl coarse + medium calcium carbonate LCM pill (40 ppb). Reduced mud weight to 1.15 SG and flow rate to 2000 L/min. Waited on pill for 2 hours.',
      outcome: 'Circulation fully restored. Resumed drilling at 2480 m with zero further losses.',
      entitiesCount: 28,
      citations: [
        'DDR Section 4.1: "Sudden pit level drop 45 bbl in pit #2 at 2435m depth"',
        'Mud Log Section 8: "Porosity spike to 24% in Upper Sandstone interval"',
        'Shift Supervisor Note: "Pill spotted at 04:30 hrs, static soaking 120 mins"'
      ]
    }
  },
  {
    id: 'doc-aa09-ddr-18',
    title: 'AA-09 Daily Drilling Report - Sub-layer Loss & Pill Spotting',
    wellId: 'well-aa-09',
    wellName: 'AA-09',
    date: '2024-11-18',
    documentType: 'DDR (Daily Drilling Report)',
    fileName: 'AA-09_DDR_20241118_LossSeepage.pdf',
    fileSize: '3.1 MB',
    uploadedBy: 'OIL eRTMAC Archives',
    uploadedAt: '2026-09-15T09:12:00Z',
    status: 'ready',
    extractedData: {
      depthInterval: '2435–2490 m',
      formation: 'Upper Sandstone',
      detectedEvents: ['Partial Mud Loss', 'Seepage', 'NPT 11.0 hrs'],
      severity: 'High',
      parameters: {
        'Mud Weight': '1.21 SG',
        'Flow Rate': '2350 L/min',
        'Loss Volume': '28 bbl total'
      },
      mitigationApplied: 'Spotted mica and walnut shell nut-plug pill (30 ppb) while reciprocating pipe continuously.',
      outcome: 'Losses reduced to zero. Successfully reached 2550 m casing point.',
      entitiesCount: 22,
      citations: [
        'DDR Section 3.2: "Mud loss detected at 2442 m during bit replacement run"',
        'Geological Section: "Sub-layer micro-fracturing along Nahorkatiya fault splays"'
      ]
    }
  },
  {
    id: 'doc-aa03-wcr',
    title: 'AA-03 Well Completion Report (WCR) - Comprehensive Post-Well Evaluation',
    wellId: 'well-aa-03',
    wellName: 'AA-03',
    date: '2023-11-05',
    documentType: 'WCR (Well Completion Report)',
    fileName: 'AA-03_Well_Completion_Report_Final.pdf',
    fileSize: '14.5 MB',
    uploadedBy: 'OIL Geological Dept',
    uploadedAt: '2026-09-12T14:20:00Z',
    status: 'ready',
    extractedData: {
      depthInterval: '0–3050 m',
      formation: 'All Formations (Tipam, Upper Sandstone, Barail)',
      detectedEvents: ['Mud Loss at 2410m', 'Tight Hole at 1850m'],
      severity: 'Medium',
      parameters: {
        'Final TD': '3050 m',
        'Average ROP': '13.8 m/hr',
        'Total NPT': '22.5 hrs'
      },
      mitigationApplied: 'Cellulosic fiber blend in active pits; disciplined ECD management.',
      outcome: 'Well placed on production at 140 m3/day crude oil.',
      entitiesCount: 64,
      citations: [
        'WCR Chapter 5, Page 42: "Upper Sandstone interval exhibited weak formation integrity"',
        'WCR Chapter 8: "Recommend pre-treating active system with coarse CaCO3 for subsequent offset wells"'
      ]
    }
  },
  {
    id: 'doc-aa12-prog',
    title: 'AA-12 Approved Drilling & Geological Program',
    wellId: 'well-aa-12',
    wellName: 'AA-12',
    date: '2026-08-01',
    documentType: 'Operational Report',
    fileName: 'AA-12_Approved_Drilling_Program_OIL.pdf',
    fileSize: '8.4 MB',
    uploadedBy: 'OIL Directorate of Operations',
    uploadedAt: '2026-08-10T11:00:00Z',
    status: 'ready',
    extractedData: {
      depthInterval: '0–3200 m (Planned)',
      formation: 'Upper Sandstone Primary Target',
      detectedEvents: ['Planned Well', 'Active eRTMAC Stream'],
      severity: 'Low',
      parameters: {
        'Planned TD': '3200 m',
        'Target Mud Weight': '1.16–1.18 SG',
        'Casing Point': '2550 m (7" Liner)'
      },
      mitigationApplied: 'Nearby Wells Intelligence System (NWIS) offset advisory mandatory for 2400-2600m interval.',
      outcome: 'Currently drilling at 2450 m.',
      entitiesCount: 45,
      citations: [
        'Section 6.4: "Adhere to eRTMAC NWIS offset risk memory alerts for 2420-2480m interval"'
      ]
    }
  }
];

export const INITIAL_KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: 'node-well-aa12',
    label: 'Well AA-12',
    type: 'well',
    category: 'Active Well',
    details: {
      title: 'AA-12 (Active Rig OIL-09)',
      subtitle: 'Assam Asset - Nahorkatiya Core',
      description: 'Currently drilling at 2450 m. Approaching historical Upper Sandstone trouble zone.',
      metrics: {
        'Current Depth': '2450 m',
        'Total Planned': '3200 m',
        'Mud Weight': '1.18 SG',
        'Formation': 'Upper Sandstone'
      },
      tags: ['Active', 'eRTMAC Live', 'High Priority']
    }
  },
  {
    id: 'node-well-aa05',
    label: 'Well AA-05',
    type: 'well',
    category: 'Offset Well (92% Match)',
    details: {
      title: 'AA-05 (Completed Offset)',
      subtitle: 'Distance 2.3 km East',
      description: 'Highest contextual offset match. Experienced 45 bbl/hr total mud loss in Upper Sandstone at 2420–2480 m.',
      metrics: {
        'Total Depth': '3180 m',
        'Similarity': '92%',
        'NPT Incurred': '36.5 hrs',
        'Events': 8
      },
      tags: ['Offset', '92% Similarity', 'Critical Evidence']
    }
  },
  {
    id: 'node-formation-upper-sand',
    label: 'Upper Sandstone',
    type: 'formation',
    category: 'Geological Formation',
    details: {
      title: 'Upper Sandstone Formation',
      subtitle: 'Barail / Tipam Transition Member',
      description: 'Sub-faulted porous reservoir sandstone with high permeability (80-250 mD). Depleted pore pressure creates low fracture resistance.',
      metrics: {
        'Average Porosity': '22%',
        'Pore Pressure': '0.98 SG eq.',
        'Fracture Grad': '1.24 SG eq.',
        'Known Losses': '4 Wells'
      },
      tags: ['Reservoir Sand', 'Loss Prone', 'High Permeability']
    }
  },
  {
    id: 'node-depth-interval',
    label: '2420–2480 m Interval',
    type: 'depth',
    category: 'Depth Interval',
    details: {
      title: 'Trouble Zone: 2420–2480 m',
      subtitle: 'Critical Depth Window',
      description: 'Historical trouble zone where 4 offset wells encountered mud loss events. High sensitivity to equivalent circulating density.',
      metrics: {
        'Top': '2420 m',
        'Base': '2480 m',
        'Historical Incidents': 4,
        'Risk Rating': 'Elevated'
      },
      tags: ['Trouble Zone', 'Target Window']
    }
  },
  {
    id: 'node-event-mudloss',
    label: 'Event: Mud Loss',
    type: 'event',
    category: 'Drilling Incident',
    details: {
      title: 'Severe Mud Loss Event',
      subtitle: 'Uncontrolled Pit Volume Drop',
      description: 'Mud loss caused by exceeding depleted sandstone fracture initiation gradient under standard circulating rates.',
      metrics: {
        'Avg Loss Rate': '35–45 bbl/hr',
        'Average NPT': '16.5 hrs',
        'Confidence': '82%'
      },
      tags: ['Mud Loss', 'NPT Driver', 'Fracture Induced']
    }
  },
  {
    id: 'node-param-mudweight',
    label: 'Parameter: Mud Wt 1.18+ SG',
    type: 'parameter',
    category: 'Telemetry / Parameter',
    details: {
      title: 'High ECD / Mud Weight Trigger',
      subtitle: 'Critical Parameter Driver',
      description: 'ECD above 1.20 SG initiates micro-fracturing in depleted sand grains. Optimum drilling window is 1.14–1.16 SG.',
      metrics: {
        'Safe MW': '1.14–1.16 SG',
        'Critical Threshold': '> 1.18 SG',
        'Flow Threshold': '> 2200 L/min'
      },
      tags: ['ECD', 'Hydraulics', 'Mud Weight']
    }
  },
  {
    id: 'node-mitigation-lcm',
    label: 'Mitigation: CaCO3 LCM Pill',
    type: 'mitigation',
    category: 'Engineering Mitigation',
    details: {
      title: 'CaCO3 Engineered LCM Pill',
      subtitle: 'Proven Field Mitigation Protocol',
      description: 'Pumping 35-40 bbl coarse/medium calcium carbonate pill (40 ppb) with controlled soak successfully healed the fracture in AA-05.',
      metrics: {
        'Success Rate': '94%',
        'Pill Volume': '35–40 bbl',
        'Soak Time': '120 mins',
        'Recovery Time': '< 3 hrs'
      },
      tags: ['CaCO3 Pill', 'Bridging', 'Proven Solution']
    }
  },
  {
    id: 'node-outcome-recovery',
    label: 'Outcome: Total Loss Arrested',
    type: 'outcome',
    category: 'Operational Outcome',
    details: {
      title: 'Successful Loss Arrest & Recovery',
      subtitle: 'Zero Further Loss to TD',
      description: 'Full circulation restored. 8-1/2" hole drilled to casing point at 2550 m without additional NPT.',
      metrics: {
        'Status': 'Successful',
        'Saved NPT': '42+ hrs',
        'Well Placed on Prod': 'Yes'
      },
      tags: ['Recovery', 'Zero Loss', 'Objective Met']
    }
  },
  {
    id: 'node-document-source',
    label: 'Report: AA-05 DDR #24',
    type: 'document',
    category: 'Evidence Source',
    details: {
      title: 'AA-05 Daily Drilling Report #24',
      subtitle: 'Primary Archival Source',
      description: 'Official signed operational daily drilling report documenting pump rates, pill composition, and hourly recovery timeline.',
      metrics: {
        'Date': '2024-03-24',
        'Doc ID': 'doc-aa05-ddr-24',
        'Pages': 6
      },
      tags: ['DDR', 'Primary Source', 'Audited']
    }
  }
];

export const INITIAL_KNOWLEDGE_EDGES: KnowledgeEdge[] = [
  { id: 'edge-1', source: 'node-well-aa12', target: 'node-formation-upper-sand', label: 'Drilling Inside' },
  { id: 'edge-2', source: 'node-well-aa05', target: 'node-formation-upper-sand', label: 'Historical Penetration' },
  { id: 'edge-3', source: 'node-formation-upper-sand', target: 'node-depth-interval', label: 'Contains Interval' },
  { id: 'edge-4', source: 'node-depth-interval', target: 'node-event-mudloss', label: 'Known Trouble Event' },
  { id: 'edge-5', source: 'node-event-mudloss', target: 'node-param-mudweight', label: 'Triggered By High ECD' },
  { id: 'edge-6', source: 'node-event-mudloss', target: 'node-mitigation-lcm', label: 'Mitigated By' },
  { id: 'edge-7', source: 'node-mitigation-lcm', target: 'node-outcome-recovery', label: 'Led To Outcome' },
  { id: 'edge-8', source: 'node-well-aa05', target: 'node-document-source', label: 'Documented In' },
  { id: 'edge-9', source: 'node-document-source', target: 'node-mitigation-lcm', label: 'Records Protocol' },
  { id: 'edge-10', source: 'node-well-aa12', target: 'node-well-aa05', label: '92% Contextual Similarity' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🔴 ELEVATED RISK: Historical Trouble Zone Approaching',
    message: 'Active Well AA-12 (2450 m) is within 0-30m of historical mud loss zone (2420-2480 m) identified in 4 offset wells.',
    type: 'critical',
    timestamp: '10 mins ago',
    read: false,
    link: '/risk-analysis',
    wellId: 'well-aa-12'
  },
  {
    id: 'notif-2',
    title: '🟡 Contextual Offset Match Found: AA-05 (92%)',
    message: 'NWIS similarity engine indexed AA-05 as highest offset analog for AA-12 in Upper Sandstone.',
    type: 'warning',
    timestamp: '35 mins ago',
    read: false,
    link: '/nearby-map',
    wellId: 'well-aa-05'
  },
  {
    id: 'notif-3',
    title: '🟢 Operations Board Card Updated',
    message: 'Card "Elevated Mud Loss Risk" moved to Action Required by Drilling Lead B. Borah.',
    type: 'info',
    timestamp: '1 hour ago',
    read: true,
    link: '/operations'
  },
  {
    id: 'notif-4',
    title: '📄 New Document Indexed: AA-05 DDR #24',
    message: 'AI Document Intelligence pipeline extracted 28 entities and mitigation parameters from AA-05 report.',
    type: 'success',
    timestamp: '3 hours ago',
    read: true,
    link: '/reports'
  }
];
