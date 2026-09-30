import { ChatMessage } from '../types';
import { INITIAL_WELLS, INITIAL_EVENTS, INITIAL_RISK_ALERT } from './seedData';

export const DRILLING_SUGGESTED_PROMPTS = [
  "What happened in nearby wells around 2450 m?",
  "Which wells had mud losses in Upper Sandstone?",
  "What mitigation worked previously in AA-05?",
  "Why was this risk alert generated for AA-12?",
  "Show wells most similar to AA-12 and why"
];

export class AiDrillingAssistantService {
  static async queryAssistant(userPrompt: string): Promise<ChatMessage> {
    const prompt = userPrompt.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Approaching 2450m / Depth query
    if (prompt.includes('2450') || prompt.includes('around') || prompt.includes('depth') || prompt.includes('happened in nearby')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `### 🔍 Institutional Memory Search: Depth Interval 2400–2500 m

At the current depth of **2450 m**, our offset intelligence engine identifies **3 severe historical events** in nearby wells penetrating the same Upper Sandstone member:

1. **Well AA-05 (2.3 km East)**:
   - Experienced **total mud loss of 45 bbl/hr** at **2420–2480 m**.
   - Initiated by normal circulating ECD exceeding depleted pore pressure gradient.
   - Incurred **14.5 hours NPT**.

2. **Well AA-09 (3.1 km West)**:
   - Encountered **28 bbl pit volume drop** at **2435–2490 m**.
   - Associated with micro-fracturing along Nahorkatiya fault splays.
   - Incurred **11.0 hours NPT**.

3. **Well AA-03 (3.4 km North)**:
   - Reported seepage losses (15 bbl/hr) at **2410–2465 m**.

> **Advisory:** Because AA-12 is currently at **2450 m** with 1.18 SG mud weight, it is directly inside this depleted fracture initiation envelope. Immediate pre-treatment with coarse bridging material is strongly indicated.`,
        citations: [
          {
            source: 'AA-05 DDR #24',
            depth: '2420–2480 m',
            event: 'Total Mud Loss (45 bbl/hr)',
            formation: 'Upper Sandstone',
            evidence: 'DDR Section 4.1: Sudden loss of returns when bit reached 2435m.'
          },
          {
            source: 'AA-09 DDR #18',
            depth: '2435–2490 m',
            event: 'Loss Seepage (28 bbl)',
            formation: 'Upper Sandstone',
            evidence: 'Active pit volume drop in 25 min interval during drilling.'
          },
          {
            source: 'AA-03 Well Completion Report',
            depth: '2410–2465 m',
            event: 'Seepage Mud Loss',
            formation: 'Upper Sandstone',
            evidence: 'WCR Section 3.2: Coarse sand grains in bottoms-up.'
          }
        ],
        suggestedPrompts: [
          "What mitigation worked previously in AA-05?",
          "Why was this risk alert generated for AA-12?",
          "Which wells had mud losses in Upper Sandstone?"
        ]
      };
    }

    // 2. Mud Loss in Upper Sandstone
    if (prompt.includes('mud loss') || prompt.includes('loss') || prompt.includes('upper sandstone')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `### 🌊 Historical Mud Losses in Upper Sandstone

Searching across **12 offset wells** in the Assam Asset, the **Upper Sandstone** formation is responsible for **68% of total loss events**:

- **AA-05**: Total loss (45 bbl/hr) at 2420–2480 m (Solved by 35 bbl CaCO3 LCM pill).
- **AA-09**: Partial loss (28 bbl) at 2435–2490 m (Solved by mica/nut-plug pill).
- **AA-02**: Dynamic loss (35 bbl/hr) at 2425–2470 m (Solved by fiber/crosslinked pill).
- **AA-03**: Seepage loss (15 bbl/hr) at 2410–2465 m (Solved by cellulosic fiber blend).

#### Key Reservoir Insight:
The Upper Sandstone exhibits high matrix porosity (22–24%) and pressure depletion (~0.98 SG eq.) due to long-term regional production. When drilling with mud weight > 1.16 SG, hydraulic ECD frequently exceeds the fracture gradient (1.20 SG).`,
        citations: [
          {
            source: 'AA-05 Geological Evaluation',
            depth: '2420–2480 m',
            event: 'Severe Mud Loss',
            formation: 'Upper Sandstone',
            evidence: 'Depleted reservoir pressure recorded at 0.98 SG equivalent.'
          },
          {
            source: 'AA-02 End of Well Report',
            depth: '2425–2470 m',
            event: 'Dynamic Losses',
            formation: 'Upper Sandstone',
            evidence: 'Fracture initiation observed under 1.22 SG mud column.'
          }
        ],
        suggestedPrompts: [
          "What mitigation worked previously in AA-05?",
          "What happened in nearby wells around 2450 m?",
          "Show wells most similar to AA-12 and why"
        ]
      };
    }

    // 3. Mitigation query
    if (prompt.includes('mitigation') || prompt.includes('remedy') || prompt.includes('action') || prompt.includes('worked')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `### 🛠️ Proven Historical Mitigation Protocol (Validated in AA-05)

When Well AA-05 encountered total mud loss at **2435 m**, the engineering team executed the following 4-stage mitigation procedure with **100% success**:

1. **Pill Formulation & Volume**:
   - Mixed **35 bbl LCM Pill**: Coarse Calcium Carbonate (25 ppb) + Medium Calcium Carbonate (15 ppb) in high-viscosity bentonite base.
2. **Placement & Soaking**:
   - Spotted across the 2420–2480 m interval through open-ended drill pipe.
   - Pulled bit 5 stands into casing and soaked under static conditions for **120 minutes**.
3. **Hydraulics Optimization**:
   - Reduced circulating flow rate from **2400 L/min to 2000 L/min** (-16%).
   - Diluted active mud weight from **1.20 SG to 1.15 SG**.
4. **Resumption**:
   - Resumed circulation at 1200 L/min staging up by 200 L/min every 15 mins. Zero losses observed to section TD (3180 m).`,
        citations: [
          {
            source: 'AA-05 DDR #24, Page 5',
            depth: '2435 m',
            event: 'LCM Pill Protocol',
            formation: 'Upper Sandstone',
            evidence: '35 bbl coarse+medium CaCO3 pill spotted at 04:30 hrs; soaked 2 hrs.'
          },
          {
            source: 'OIL Drilling Standards Operating Manual',
            depth: 'Standard',
            event: 'Depleted Sand Guidelines',
            formation: 'Barail / Tipam Members',
            evidence: 'Mandatory ECD reduction when crossing depleted sand boundaries.'
          }
        ],
        suggestedPrompts: [
          "Why was this risk alert generated for AA-12?",
          "What happened in nearby wells around 2450 m?",
          "Show wells most similar to AA-12 and why"
        ]
      };
    }

    // 4. Why risk alert generated
    if (prompt.includes('why') || prompt.includes('alert') || prompt.includes('risk') || prompt.includes('explain')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `### 🧠 Explainable AI: Why "ELEVATED RISK" Was Generated for AA-12

Rather than a black-box probability, this alert was synthesized from **multi-parameter convergence**:

1. **Spatial & Stratigraphic Overlap**:
   - AA-12 current depth is **2450 m**, perfectly centered inside the 2420–2480 m Upper Sandstone trouble zone.
2. **Offset Empirical Frequency**:
   - **4 out of 5 closest contextual offset wells** experienced loss events in this exact geological layer.
3. **Hydraulic ECD Signature**:
   - Current mud weight is **1.18 SG** and flow rate is **2380 L/min**, resulting in an estimated ECD of **1.21 SG**, which exceeds the 1.17 SG loss threshold proven in AA-05.
4. **Real-Time Telemetry Correlation**:
   - Standpipe pressure shows high-frequency micro-fluctuations (±85 psi) identical to the pre-breakdown signature in AA-05 DDR logs.`,
        citations: [
          {
            source: 'AA-12 Real-Time eRTMAC Stream',
            depth: '2450.4 m',
            event: 'ECD Exceedance',
            formation: 'Upper Sandstone',
            evidence: 'Flow rate 2380 L/min + 1.18 SG mud weight yields 1.21 SG dynamic ECD.'
          },
          {
            source: 'AA-05 Fracture Gradient Log',
            depth: '2430 m',
            event: 'Fracture Initiation',
            formation: 'Upper Sandstone',
            evidence: 'Formation breakdown observed at 1.19 SG equivalent.'
          }
        ],
        suggestedPrompts: [
          "What mitigation worked previously in AA-05?",
          "Show wells most similar to AA-12 and why",
          "Which wells had mud losses in Upper Sandstone?"
        ]
      };
    }

    // 5. Similarity breakdown query
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### 🎯 Contextual Offset Well Ranking for AA-12

Wells are ranked not merely by distance, but via our 5-factor **Contextual Similarity Engine**:

1. **AA-05 (Similarity: 92%)** — Distance: 2.3 km
   - *Formation Match:* 95% (Upper Sandstone, identical facies)
   - *Depth Overlap:* 91% (2420–2480 m target interval)
   - *Drilling Profile:* 89% (Directional S-type, similar BHA)
   - *Historical Events:* 94% (Encountered exact loss mechanism)

2. **AA-09 (Similarity: 87%)** — Distance: 3.1 km
   - *Formation Match:* 93% | *Depth Overlap:* 86% | *Historical Events:* 85%

3. **AA-03 (Similarity: 84%)** — Distance: 3.4 km
   - *Formation Match:* 92% | *Depth Overlap:* 82% | *Historical Events:* 83%

4. **AA-02 (Similarity: 89%)** — Distance: 1.0 km
   - *Geography Match:* 98% | *Formation Match:* 94% | *Depth Overlap:* 80%

> **Conclusion:** AA-05 and AA-02 provide the strongest analog intelligence for managing the current 2450 m interval.`,
      citations: [
        {
          source: 'eRTMAC Similarity Matrix',
          depth: '2450 m',
          event: 'Multi-Variate Correlation',
          formation: 'Upper Sandstone',
          evidence: 'Weighted score: 0.35 Formation + 0.25 Depth + 0.20 Geology + 0.20 Events.'
        }
      ],
      suggestedPrompts: [
        "What happened in nearby wells around 2450 m?",
        "What mitigation worked previously in AA-05?",
        "Why was this risk alert generated for AA-12?"
      ]
    };
  }
}
