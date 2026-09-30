export type UserRole = 
  | 'Drilling Engineer'
  | 'eRTMAC Operator'
  | 'Operations Manager'
  | 'OIL Management';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organization: string;
  avatar?: string;
  lastLogin?: string;
}

export interface Well {
  id: string;
  name: string;
  asset: string;
  field: string;
  latitude: number;
  longitude: number;
  totalDepth: number;
  currentDepth: number;
  formation: string;
  status: 'active' | 'drilling' | 'completed' | 'suspended' | 'offset';
  spudDate: string;
  rigName: string;
  operator: string;
  trajectory: 'Vertical' | 'Directional' | 'Horizontal';
  bhaType: string;
  mudType: string;
  historicalEventsCount: number;
  nptTotalHours: number;
  distanceFromActive?: number; // in km
  similarityScore?: number; // 0 - 100
  similarityBreakdown?: {
    geography: number;
    formation: number;
    depthOverlap: number;
    drillingProfile: number;
    historicalEvents: number;
  };
}

export type EventSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface WellEvent {
  id: string;
  wellId: string;
  wellName: string;
  eventType: 
    | 'Mud Loss'
    | 'Stuck Pipe'
    | 'Kick'
    | 'Torque Spike'
    | 'Wellbore Instability'
    | 'Cementing Issue'
    | 'NPT';
  depthStart: number;
  depthEnd: number;
  formation: string;
  severity: EventSeverity;
  description: string;
  parameters: {
    mudWeight?: string;
    flowRate?: string;
    torque?: string;
    rop?: string;
    standpipePressure?: string;
    rpm?: string;
    wob?: string;
    [key: string]: string | undefined;
  };
  mitigation: string;
  outcome: 'successful' | 'partial' | 'escalated';
  nptHours: number;
  date: string;
  sourceDocId?: string;
  sourceDocName?: string;
}

export interface DrillingTelemetry {
  timestamp: string;
  depth: number;
  rop: number; // m/hr
  wob: number; // kN or klbf
  rpm: number; // rpm
  torque: number; // kNm
  flowRate: number; // L/min or gpm
  mudWeight: number; // ppg or SG
  standpipePressure: number; // psi or bar
  gasUnits: number; // units
  status: 'Normal' | 'Elevated Risk' | 'Anomaly Detected' | 'Alarm';
}

export interface RiskAlert {
  id: string;
  wellId: string;
  wellName: string;
  currentDepth: number;
  troubleZoneStart: number;
  troubleZoneEnd: number;
  riskType: string;
  riskLevel: 'ELEVATED RISK' | 'CRITICAL RISK' | 'MODERATE RISK' | 'SAFE';
  severity: EventSeverity;
  confidence: number; // 0-100%
  whyAlert: string[];
  historicalEvidence: {
    wellName: string;
    depthRange: string;
    event: string;
    formation: string;
    mitigationUsed: string;
    outcome: string;
    similarity: number;
    sourceDoc: string;
  }[];
  recommendedAction: string;
  kanbanCardId?: string;
  status: 'active' | 'acknowledged' | 'in_progress' | 'resolved';
  createdAt: string;
}

export type DocumentType = 
  | 'WCR (Well Completion Report)'
  | 'DDR (Daily Drilling Report)'
  | 'Mud Log'
  | 'Geological Report'
  | 'Operational Report'
  | 'BHA & Casing Record';

export interface DocumentRecord {
  id: string;
  title: string;
  wellId: string;
  wellName: string;
  date: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl?: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'processing' | 'indexed' | 'ready';
  extractedData: {
    depthInterval?: string;
    formation?: string;
    detectedEvents?: string[];
    severity?: string;
    parameters?: Record<string, string>;
    mitigationApplied?: string;
    outcome?: string;
    entitiesCount?: number;
    citations?: string[];
  };
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'well' | 'formation' | 'depth' | 'event' | 'parameter' | 'mitigation' | 'outcome' | 'document';
  color?: string;
  category: string;
  details: {
    title: string;
    subtitle?: string;
    description?: string;
    metrics?: Record<string, string | number>;
    tags?: string[];
  };
  x?: number;
  y?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export type KanbanColumnId = 
  | 'detected'
  | 'investigating'
  | 'action_required'
  | 'monitoring'
  | 'resolved';

export interface KanbanCard {
  id: string;
  columnId: KanbanColumnId;
  risk: string;
  well: string;
  depth: string;
  severity: EventSeverity;
  confidence: number;
  assignedEngineer: string;
  timestamp: string;
  description: string;
  evidenceCount: number;
  recommendedAction: string;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
  link?: string;
  wellId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  citations?: {
    source: string;
    depth: string;
    event: string;
    formation: string;
    evidence: string;
  }[];
  suggestedPrompts?: string[];
}
