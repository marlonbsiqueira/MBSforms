export interface Answer {
  label: string;
  score: number; // 1 = healthy, 4 = critical
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
  questions: Question[];
  report: ReportTemplate[];
}

export interface ReportTemplate {
  minScore: number;
  maxScore: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  headline: string;
  summary: string;
  leakage: string;
  actions: string[];
}

export const categories: Category[] = [
  {
    id: 'financial',
    label: 'Financial Management',
    icon: '₿',
    description: 'Cash flow, margins, debt & financial reporting',
    questions: [
      {
        id: 'fin-1',
        text: 'How predictable is your company\'s monthly cash flow?',
        answers: [
          { label: 'Fully predictable — we forecast 90 days ahead', score: 1 },
          { label: 'Mostly predictable with minor surprises', score: 2 },
          { label: 'Frequently unpredictable and stressful', score: 3 },
          { label: 'We have no formal cash flow tracking', score: 4 },
        ],
      },
      {
        id: 'fin-2',
        text: 'How have your profit margins trended over the last 12 months?',
        answers: [
          { label: 'Growing consistently quarter-over-quarter', score: 1 },
          { label: 'Stable with minor fluctuations', score: 2 },
          { label: 'Gradually shrinking — we feel the pressure', score: 3 },
          { label: 'Declining sharply or unknown', score: 4 },
        ],
      },
      {
        id: 'fin-3',
        text: 'How is your company\'s debt and financial leverage managed?',
        answers: [
          { label: 'No significant debt — fully self-funded or low leverage', score: 1 },
          { label: 'Manageable debt within planned ratios', score: 2 },
          { label: 'Debt is growing and becoming a concern', score: 3 },
          { label: 'Debt is at critical levels threatening operations', score: 4 },
        ],
      },
      {
        id: 'fin-4',
        text: 'Do you have formal budget planning and cost control processes?',
        answers: [
          { label: 'Yes — full annual budget with monthly variance reviews', score: 1 },
          { label: 'Partially — some budgets exist but not consistently followed', score: 2 },
          { label: 'Informal only — management uses intuition', score: 3 },
          { label: 'No formal budget or cost control in place', score: 4 },
        ],
      },
      {
        id: 'fin-5',
        text: 'How accurate and timely are your financial reports (P&L, Balance Sheet, Cash Flow)?',
        answers: [
          { label: 'Real-time dashboards — data always available', score: 1 },
          { label: 'Reliable monthly reports within 5 business days', score: 2 },
          { label: 'Quarterly reports, often delayed or inaccurate', score: 3 },
          { label: 'No formal financial reporting exists', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Financial Foundation is Solid — Optimize for Scale',
        summary: 'Your financial controls are largely in place. The focus should be on automation, predictive analytics, and margin optimization to support the next growth phase.',
        leakage: 'Minimal — estimated 3–8% inefficiency in resource allocation',
        actions: [
          'Implement rolling 13-week cash flow forecasting',
          'Build a real-time financial dashboard for leadership',
          'Introduce margin analysis by product/service line',
          'Benchmark financial KPIs against industry peers',
          'Explore working capital optimization strategies',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Financial Control Gaps Are Eroding Profitability',
        summary: 'Significant financial blind spots exist that are quietly compressing margins and increasing risk. Structured financial management will unlock immediate improvements.',
        leakage: 'Moderate — estimated 10–20% of potential revenue being left on the table',
        actions: [
          'Implement weekly cash flow monitoring and alerts',
          'Conduct full pricing strategy review across all offerings',
          'Establish formal monthly financial close process',
          'Create budget vs. actuals review cadence with department heads',
          'Identify and eliminate the top 3 unnecessary fixed cost centers',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Financial Instability Is Threatening Business Continuity',
        summary: 'Your company faces serious financial management deficiencies. Without urgent intervention, cash flow crises or margin collapse could jeopardize operations within 12 months.',
        leakage: 'High — estimated 20–35% revenue leakage from poor financial control',
        actions: [
          'Conduct immediate cash flow intervention — map all outflows today',
          'Engage external CFO advisory to stabilize financial position',
          'Renegotiate top 5 supplier/vendor contracts for cost relief',
          'Implement strict expense authorization protocols immediately',
          'Build a 90-day financial recovery roadmap with weekly milestones',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Financial Risk — Immediate Executive Action Required',
        summary: 'Your business is operating without adequate financial visibility or controls. This represents a systemic threat to solvency and requires immediate, structured intervention at the executive level.',
        leakage: 'Critical — estimated 35%+ of revenue leakage from uncontrolled costs and poor financial decisions',
        actions: [
          'Halt non-essential spending and perform emergency cash audit within 48 hours',
          'Engage financial restructuring specialists immediately',
          'Implement daily cash position monitoring with CEO/CFO approval gates',
          'Map all liabilities and create creditor communication plan',
          'Develop 30-60-90 day financial stabilization plan with external advisory support',
        ],
      },
    ],
  },
  {
    id: 'operations',
    label: 'Operations / Efficiency',
    icon: '⚙',
    description: 'Process efficiency, bottlenecks & operational KPIs',
    questions: [
      {
        id: 'ops-1',
        text: 'Are your core operational processes documented and standardized?',
        answers: [
          { label: 'Fully documented with SOPs across all departments', score: 1 },
          { label: 'Mostly documented — some gaps in key areas', score: 2 },
          { label: 'Partially — critical processes depend on key individuals', score: 3 },
          { label: 'No formal documentation — everything runs on tribal knowledge', score: 4 },
        ],
      },
      {
        id: 'ops-2',
        text: 'How often do bottlenecks or breakdowns disrupt your operations?',
        answers: [
          { label: 'Rarely — exception-based with rapid resolution', score: 1 },
          { label: 'Occasionally — once or twice per quarter', score: 2 },
          { label: 'Frequently — at least once per month', score: 3 },
          { label: 'Daily — operations are perpetually firefighting', score: 4 },
        ],
      },
      {
        id: 'ops-3',
        text: 'Do you track operational KPIs and performance metrics?',
        answers: [
          { label: 'Yes — real-time dashboards for all key teams', score: 1 },
          { label: 'Some teams have metrics but not consistently', score: 2 },
          { label: 'Ad-hoc tracking — metrics gathered when there\'s a crisis', score: 3 },
          { label: 'No formal operational metrics in place', score: 4 },
        ],
      },
      {
        id: 'ops-4',
        text: 'How efficiently does your company utilize its resources (people, equipment, time)?',
        answers: [
          { label: 'Highly optimized — utilization reviewed and improved regularly', score: 1 },
          { label: 'Good — some waste exists but is manageable', score: 2 },
          { label: 'Significant waste — resource allocation is not well managed', score: 3 },
          { label: 'Resources are poorly allocated with major waste across operations', score: 4 },
        ],
      },
      {
        id: 'ops-5',
        text: 'How quickly and effectively does your company resolve operational problems?',
        answers: [
          { label: 'Same-day resolution with root cause analysis', score: 1 },
          { label: 'Within a week with documented follow-up', score: 2 },
          { label: 'Problems linger for weeks or months', score: 3 },
          { label: 'Many operational problems remain permanently unresolved', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Operations Are Largely Efficient — Focus on Continuous Improvement',
        summary: 'Your operational foundation is sound. The opportunity lies in applying lean methodologies, automation, and advanced analytics to move from good to exceptional.',
        leakage: 'Minimal — estimated 5–10% efficiency gains available through optimization',
        actions: [
          'Implement a continuous improvement (Kaizen) program',
          'Map and digitize remaining undocumented processes',
          'Set up predictive analytics for demand and capacity planning',
          'Introduce cross-functional process improvement teams',
          'Benchmark operational KPIs against best-in-class competitors',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Operational Inefficiencies Are Limiting Growth Capacity',
        summary: 'Recurring bottlenecks and inconsistent processes are absorbing management bandwidth and limiting scalability. Structured operational improvements will directly improve output and profitability.',
        leakage: 'Moderate — estimated 15–25% of capacity being lost to inefficiency',
        actions: [
          'Conduct full operational process mapping and waste identification',
          'Implement OKRs or KPI dashboards for all operational teams',
          'Standardize top 10 highest-impact processes with documented SOPs',
          'Create weekly operational review cadence with escalation protocols',
          'Identify and eliminate the single largest operational bottleneck',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Operational Breakdown Is Constraining Revenue and Customer Delivery',
        summary: 'Persistent operational chaos is actively limiting your ability to grow, retain customers, and manage costs. This requires an immediate operational transformation initiative.',
        leakage: 'High — estimated 25–40% of revenue capacity being destroyed by operational waste',
        actions: [
          'Engage operational excellence specialists for rapid assessment',
          'Implement emergency process stabilization for the top 3 critical workflows',
          'Conduct time-and-motion study to identify highest-impact waste areas',
          'Establish cross-functional operations war room for rapid problem resolution',
          'Build a 90-day operational transformation roadmap with CEO sponsorship',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Operational Crisis — Business Model at Risk',
        summary: 'Your operations are in critical condition with systemic failures across process, people, and systems. Without immediate transformation, the business faces escalating costs and customer loss.',
        leakage: 'Critical — estimated 40%+ of business value being destroyed by operational dysfunction',
        actions: [
          'Appoint an interim Chief Operating Officer or Operations Director immediately',
          'Halt growth initiatives until core operations are stabilized',
          'Implement daily operational standup with all department heads',
          'Bring in external operational consulting for emergency triage',
          'Develop 60-day operational rescue plan with weekly executive review',
        ],
      },
    ],
  },
  {
    id: 'sales',
    label: 'Sales / Revenue Growth',
    icon: '↗',
    description: 'Sales process, pipeline, conversion & revenue consistency',
    questions: [
      {
        id: 'sal-1',
        text: 'How structured and repeatable is your sales process?',
        answers: [
          { label: 'Fully defined stages with documented playbooks and scripts', score: 1 },
          { label: 'Partially structured — some stages are defined', score: 2 },
          { label: 'Informal — each salesperson does it their own way', score: 3 },
          { label: 'No defined sales process exists', score: 4 },
        ],
      },
      {
        id: 'sal-2',
        text: 'How consistent is your company\'s revenue month-over-month?',
        answers: [
          { label: 'Growing consistently — 10%+ MoM growth', score: 1 },
          { label: 'Stable — predictable within 10% variance', score: 2 },
          { label: 'Highly fluctuating — feast or famine cycles', score: 3 },
          { label: 'Declining — revenue is falling quarter over quarter', score: 4 },
        ],
      },
      {
        id: 'sal-3',
        text: 'What is your typical lead-to-customer conversion rate?',
        answers: [
          { label: 'Above 30% — highly effective qualification and closing', score: 1 },
          { label: '15–30% — solid conversion with some room for improvement', score: 2 },
          { label: '5–15% — significant leakage in the funnel', score: 3 },
          { label: 'Below 5% or unknown — the funnel is broken', score: 4 },
        ],
      },
      {
        id: 'sal-4',
        text: 'How do you manage and track your sales pipeline?',
        answers: [
          { label: 'CRM with full pipeline visibility, forecasting, and reports', score: 1 },
          { label: 'Basic CRM or spreadsheet tracking', score: 2 },
          { label: 'Manual tracking — notes and memory', score: 3 },
          { label: 'No pipeline tracking whatsoever', score: 4 },
        ],
      },
      {
        id: 'sal-5',
        text: 'How effective is your customer retention and expansion strategy?',
        answers: [
          { label: 'Strong retention program with upsell/cross-sell cadence', score: 1 },
          { label: 'Moderate — we retain most customers but with little strategy', score: 2 },
          { label: 'High churn — customers leave after first purchase', score: 3 },
          { label: 'No retention strategy — customers are treated as one-time transactions', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Sales Engine Is Working — Optimize for Velocity and Scale',
        summary: 'Your sales foundation is solid. The opportunity is in increasing deal velocity, expanding into new segments, and building a world-class sales culture.',
        leakage: 'Minimal — 5–10% additional revenue available through sales optimization',
        actions: [
          'Implement advanced CRM automation and lead scoring',
          'Develop a formal sales coaching and enablement program',
          'Build a customer success function to maximize LTV',
          'Create a referral and partner channel strategy',
          'Analyze and replicate your top 20% performers\' behaviors',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Sales Funnel Leakage Is Suppressing Revenue Potential',
        summary: 'Structural weaknesses in your sales process are costing you significant revenue. A disciplined sales transformation will produce rapid, measurable results.',
        leakage: 'Moderate — estimated 20–35% of potential revenue lost to funnel inefficiency',
        actions: [
          'Map and audit your full sales funnel to identify drop-off points',
          'Implement CRM discipline with mandatory stage tracking',
          'Develop a structured follow-up cadence for all active opportunities',
          'Train the team on consultative selling and objection handling',
          'Create a consistent revenue forecasting model reviewed weekly',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Revenue Growth Is Severely Constrained by Sales Dysfunction',
        summary: 'Your sales function lacks the structure and discipline to generate consistent, predictable revenue. This is limiting your ability to plan, invest, and grow sustainably.',
        leakage: 'High — estimated 35–50% of potential revenue being lost',
        actions: [
          'Hire or appoint a Sales Director to lead immediate transformation',
          'Implement an emergency 30-day sales process redesign sprint',
          'Deploy a CRM within 30 days — make it non-negotiable',
          'Conduct win/loss analysis on the last 20 opportunities',
          'Redefine your Ideal Customer Profile and focus all sales activity accordingly',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Revenue Crisis — Sales Function Needs Full Rebuild',
        summary: 'Your sales function is not capable of sustaining or growing the business. Without a fundamental rebuild of the sales architecture, revenue decline is inevitable.',
        leakage: 'Critical — estimated 50%+ of potential revenue inaccessible due to broken sales function',
        actions: [
          'Engage a fractional Chief Revenue Officer immediately',
          'Freeze all unprofitable sales activities and refocus on highest-margin segments',
          'Implement a basic 3-stage sales process within 2 weeks',
          'Establish daily sales accountability meetings with leadership',
          'Redesign sales compensation to align incentives with sustainable growth',
        ],
      },
    ],
  },
  {
    id: 'hr',
    label: 'HR / People / Leadership',
    icon: '◉',
    description: 'Team engagement, hiring, leadership & performance culture',
    questions: [
      {
        id: 'hr-1',
        text: 'How would you describe overall employee morale and engagement?',
        answers: [
          { label: 'High — team is motivated, aligned, and proactive', score: 1 },
          { label: 'Moderate — most are engaged but some disengagement exists', score: 2 },
          { label: 'Low — visible disengagement and lack of initiative', score: 3 },
          { label: 'Severe — toxic culture, conflicts, or mass disengagement', score: 4 },
        ],
      },
      {
        id: 'hr-2',
        text: 'How structured is your hiring and onboarding process?',
        answers: [
          { label: 'Fully structured — job profiles, multi-stage interviews, scored onboarding', score: 1 },
          { label: 'Basic structure — some defined steps but inconsistent', score: 2 },
          { label: 'Ad-hoc — whoever seems right gets hired with minimal process', score: 3 },
          { label: 'No formal hiring or onboarding process exists', score: 4 },
        ],
      },
      {
        id: 'hr-3',
        text: 'How effective is leadership communication and strategic alignment?',
        answers: [
          { label: 'Excellent — team knows the vision, strategy, and their role in it', score: 1 },
          { label: 'Good — leadership communicates regularly with some gaps', score: 2 },
          { label: 'Poor — misalignment and confusion about priorities', score: 3 },
          { label: 'Dysfunctional — leadership creates confusion or conflict', score: 4 },
        ],
      },
      {
        id: 'hr-4',
        text: 'Do you have a formal performance management and evaluation system?',
        answers: [
          { label: 'Yes — quarterly reviews with clear goals, OKRs, and feedback loops', score: 1 },
          { label: 'Annual reviews but somewhat informal', score: 2 },
          { label: 'Informal feedback only — no structured evaluation', score: 3 },
          { label: 'No performance evaluation system whatsoever', score: 4 },
        ],
      },
      {
        id: 'hr-5',
        text: 'What is your employee turnover rate compared to industry average?',
        answers: [
          { label: 'Very low — we retain top talent consistently', score: 1 },
          { label: 'At industry average — acceptable but room to improve', score: 2 },
          { label: 'Above average — we lose good people regularly', score: 3 },
          { label: 'Critical — turnover is constant and destabilizing operations', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'People Foundation Is Strong — Focus on High-Performance Culture',
        summary: 'Your HR and leadership fundamentals are working well. The next step is building elite talent density, succession planning, and culture systems that sustain performance at scale.',
        leakage: 'Minimal — focused investment in leadership development will yield 10–20% productivity gains',
        actions: [
          'Implement a leadership development and succession planning program',
          'Launch employee NPS (eNPS) measurement quarterly',
          'Develop a career pathing framework to retain high potentials',
          'Build a values-based recognition and rewards program',
          'Create a formal mentoring program for senior to junior talent transfer',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'People and Leadership Gaps Are Limiting Organizational Performance',
        summary: 'Inconsistencies in hiring, performance management, and leadership alignment are creating drag on productivity and innovation. Structured HR improvements will unlock significant organizational capacity.',
        leakage: 'Moderate — estimated 20–30% productivity loss from disengagement and poor people management',
        actions: [
          'Conduct employee engagement survey and build action plan within 60 days',
          'Design a structured onboarding program for new hires',
          'Implement quarterly performance reviews with SMART goal framework',
          'Define and communicate company values and strategic priorities to all staff',
          'Launch a manager effectiveness program for team leads',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'People Crisis Is Eroding Company Performance and Culture',
        summary: 'High turnover, low engagement, and leadership misalignment are significantly damaging your ability to execute. Without urgent intervention, you risk losing key talent and operational stability.',
        leakage: 'High — estimated 30–45% of organizational capacity being lost to people dysfunction',
        actions: [
          'Engage HR consulting firm for emergency culture and engagement assessment',
          'Identify and personally retain your top 10% performers immediately',
          'Implement a structured all-hands communication from CEO within 2 weeks',
          'Redesign compensation structure to align with market and performance',
          'Launch a leadership coaching program for all managers',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Organizational Crisis — Talent Collapse Risk',
        summary: 'Your organization faces a systemic people crisis that is actively destroying company value. Without immediate executive intervention, the business risks losing the human capital needed to operate.',
        leakage: 'Critical — people-related dysfunction is destroying an estimated 45%+ of organizational value',
        actions: [
          'Appoint a Chief People Officer or engage HR Director immediately',
          'Conduct confidential interviews with all key employees within 2 weeks',
          'Implement an emergency retention plan for mission-critical roles',
          'Engage executive coach for leadership team within 30 days',
          'Redesign organizational structure with clear accountability framework',
        ],
      },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics / Supply Chain',
    icon: '◈',
    description: 'Supply chain reliability, inventory & delivery performance',
    questions: [
      {
        id: 'log-1',
        text: 'How reliable is your supply chain in delivering materials/inputs on time?',
        answers: [
          { label: 'Very reliable — 95%+ on-time with contingency plans', score: 1 },
          { label: 'Mostly reliable with occasional disruptions', score: 2 },
          { label: 'Frequent disruptions impacting production or service', score: 3 },
          { label: 'Chronically unreliable — disruptions are the norm', score: 4 },
        ],
      },
      {
        id: 'log-2',
        text: 'How much visibility do you have into your inventory levels?',
        answers: [
          { label: 'Real-time visibility across all locations and SKUs', score: 1 },
          { label: 'Weekly updates with reasonable accuracy', score: 2 },
          { label: 'Monthly physical audits only', score: 3 },
          { label: 'No formal inventory tracking — we often discover shortages too late', score: 4 },
        ],
      },
      {
        id: 'log-3',
        text: 'How well optimized are your logistics and distribution costs?',
        answers: [
          { label: 'Fully optimized with regular carrier benchmarking', score: 1 },
          { label: 'Some optimization efforts underway', score: 2 },
          { label: 'Costs are high but not actively managed', score: 3 },
          { label: 'Logistics costs are uncontrolled and eroding margins', score: 4 },
        ],
      },
      {
        id: 'log-4',
        text: 'How dependent are you on a single supplier for critical inputs?',
        answers: [
          { label: 'Multiple qualified suppliers for all critical inputs', score: 1 },
          { label: '2–3 suppliers per category with backup plans', score: 2 },
          { label: 'Single supplier for some critical inputs — risk known', score: 3 },
          { label: 'Single-source dependency across most critical inputs — high fragility', score: 4 },
        ],
      },
      {
        id: 'log-5',
        text: 'How well do you meet committed delivery timelines to customers?',
        answers: [
          { label: 'On-time delivery 95%+ of the time', score: 1 },
          { label: 'Mostly on-time with minor delays communicated proactively', score: 2 },
          { label: 'Frequent delays impacting customer satisfaction', score: 3 },
          { label: 'Chronic delays causing customer loss and contract risk', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Supply Chain Is Resilient — Build for Competitive Advantage',
        summary: 'Your supply chain performs well. The opportunity is in leveraging supply chain excellence as a competitive differentiator through advanced analytics and strategic supplier partnerships.',
        leakage: 'Minimal — focused optimization can yield 5–12% cost reduction',
        actions: [
          'Implement supply chain control tower with real-time visibility',
          'Develop strategic partnership programs with key suppliers',
          'Build demand forecasting models to reduce safety stock costs',
          'Explore nearshoring opportunities to reduce lead times',
          'Implement supplier scorecards with quarterly business reviews',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Supply Chain Vulnerabilities Are Increasing Cost and Risk',
        summary: 'Gaps in inventory visibility, supplier diversification, or delivery performance are creating unnecessary cost and customer risk. A structured supply chain improvement program will reduce both.',
        leakage: 'Moderate — estimated 15–25% of supply chain costs attributable to inefficiency',
        actions: [
          'Implement inventory management system with min/max reorder points',
          'Conduct supplier risk assessment and qualify backup suppliers',
          'Build formal logistics cost benchmarking process',
          'Create SLA agreements with all key suppliers',
          'Implement delivery performance tracking and escalation process',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Supply Chain Failures Are Directly Impacting Revenue and Customers',
        summary: 'Persistent supply chain problems are creating customer dissatisfaction, operational disruption, and margin erosion. Urgent action is needed to stabilize and rebuild supply chain resilience.',
        leakage: 'High — estimated 25–40% cost and revenue impact from supply chain dysfunction',
        actions: [
          'Conduct emergency supplier audit and risk assessment',
          'Implement daily inventory and delivery status monitoring',
          'Qualify at least 2 alternative suppliers for critical inputs within 60 days',
          'Negotiate emergency supply agreements with key partners',
          'Engage supply chain consulting firm for rapid improvement program',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Supply Chain Breakdown — Business Continuity at Risk',
        summary: 'Your supply chain is in crisis with severe risks to business continuity. Without immediate intervention, the company faces production shutdowns, customer defection, and financial exposure.',
        leakage: 'Critical — supply chain crisis is destroying an estimated 40%+ of business value',
        actions: [
          'Appoint a Supply Chain Director or engage specialist firm immediately',
          'Conduct emergency inventory audit and identify critical shortage risks',
          'Activate all available supplier alternatives — prioritize over cost',
          'Communicate proactively with at-risk customers with recovery commitments',
          'Develop and execute 30-day supply chain stabilization plan',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing / Lead Generation',
    icon: '◎',
    description: 'Brand positioning, lead generation & marketing ROI',
    questions: [
      {
        id: 'mkt-1',
        text: 'Do you have a defined, documented marketing strategy?',
        answers: [
          { label: 'Yes — comprehensive strategy with ICP, channels, and KPIs', score: 1 },
          { label: 'Basic strategy — some elements defined but not holistic', score: 2 },
          { label: 'Ad-hoc — we try things without a clear strategy', score: 3 },
          { label: 'No marketing strategy exists', score: 4 },
        ],
      },
      {
        id: 'mkt-2',
        text: 'How effectively does your marketing generate a consistent pipeline of qualified leads?',
        answers: [
          { label: 'Consistent — marketing delivers a reliable volume of qualified leads', score: 1 },
          { label: 'Some channels work — lead quality varies', score: 2 },
          { label: 'Sporadic — occasional campaigns with inconsistent results', score: 3 },
          { label: 'Very few leads — marketing barely contributes to pipeline', score: 4 },
        ],
      },
      {
        id: 'mkt-3',
        text: 'Do you measure and optimize your marketing ROI?',
        answers: [
          { label: 'Full attribution tracking — we know the ROI of every channel', score: 1 },
          { label: 'Partial tracking — some channels measured, others not', score: 2 },
          { label: 'We spend on marketing but don\'t track returns', score: 3 },
          { label: 'No marketing measurement or ROI tracking at all', score: 4 },
        ],
      },
      {
        id: 'mkt-4',
        text: 'How clearly differentiated is your brand in the market?',
        answers: [
          { label: 'Crystal clear — customers choose us for specific, articulated reasons', score: 1 },
          { label: 'Somewhat clear — we have a positioning but it\'s not consistently communicated', score: 2 },
          { label: 'Unclear — we compete mostly on price', score: 3 },
          { label: 'No brand identity or differentiation — we are invisible in the market', score: 4 },
        ],
      },
      {
        id: 'mkt-5',
        text: 'How actively do you engage your target audience across channels?',
        answers: [
          { label: 'Multi-channel — content, social, email, events, and paid running consistently', score: 1 },
          { label: 'Active on 1–2 channels with reasonable consistency', score: 2 },
          { label: 'Minimal engagement — occasional posts or campaigns', score: 3 },
          { label: 'No active audience engagement — we wait for inbound inquiries', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Marketing Is Working — Scale What\'s Winning',
        summary: 'Your marketing function generates qualified demand effectively. The opportunity is in scaling top-performing channels, reducing CAC, and building a brand moat that competitors cannot replicate.',
        leakage: 'Minimal — 10–15% additional pipeline available through channel optimization',
        actions: [
          'Build a full-funnel attribution model to identify highest-ROI channels',
          'Implement account-based marketing for enterprise segments',
          'Develop a thought leadership content program to build authority',
          'Launch customer advocacy and referral marketing program',
          'Optimize paid media spend using cohort and lifetime value analysis',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Marketing Inconsistency Is Limiting Pipeline and Brand Growth',
        summary: 'Your marketing function has potential but lacks the structure and measurement rigor to be consistently effective. Bringing discipline to marketing will directly grow revenue pipeline.',
        leakage: 'Moderate — estimated 20–35% of potential customers not reached due to weak marketing',
        actions: [
          'Define and document your Ideal Customer Profile and value proposition',
          'Implement UTM tracking and marketing analytics dashboard',
          'Launch a content marketing program targeting top buyer questions',
          'Establish monthly marketing ROI review with leadership',
          'Create a 90-day lead generation campaign with clear success metrics',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Marketing Is Failing to Generate the Demand Your Business Needs',
        summary: 'Your marketing function is not contributing meaningfully to revenue growth. Weak brand positioning and lack of lead generation strategy are putting your sales pipeline at serious risk.',
        leakage: 'High — estimated 35–50% of addressable market unreachable without marketing transformation',
        actions: [
          'Hire a VP of Marketing or engage a fractional CMO within 30 days',
          'Conduct brand and positioning audit with customer interviews',
          'Launch minimum viable lead generation campaigns within 2 weeks',
          'Define 3 core marketing channels and invest consistently for 90 days',
          'Implement basic CRM + marketing automation integration',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Marketing Void — Brand Is Invisible, Pipeline Is Dry',
        summary: 'Your company has virtually no effective marketing presence. Without immediate investment in brand and lead generation, the business is entirely dependent on referrals and existing relationships which will eventually exhaust.',
        leakage: 'Critical — the business is inaccessible to most of its addressable market',
        actions: [
          'Engage marketing agency or CMO for emergency brand and lead gen foundation',
          'Launch LinkedIn company presence and content within 7 days',
          'Define your #1 target customer and build one clear message for them',
          'Allocate minimum marketing budget — even 5% of revenue — immediately',
          'Build 90-day marketing launch roadmap with CEO ownership',
        ],
      },
    ],
  },
  {
    id: 'technology',
    label: 'Technology / Systems',
    icon: '◻',
    description: 'System integration, data usage & technology investment',
    questions: [
      {
        id: 'tec-1',
        text: 'How well integrated are your core business systems (ERP, CRM, finance, operations)?',
        answers: [
          { label: 'Fully integrated — data flows seamlessly across all systems', score: 1 },
          { label: 'Mostly integrated — some manual data transfer still occurs', score: 2 },
          { label: 'Siloed — systems don\'t communicate, lots of manual work', score: 3 },
          { label: 'Disconnected — mostly manual processes with spreadsheets', score: 4 },
        ],
      },
      {
        id: 'tec-2',
        text: 'How effectively does your company use data to make business decisions?',
        answers: [
          { label: 'Data-driven culture — decisions backed by analytics and dashboards', score: 1 },
          { label: 'Some data use — key decisions reference data but not consistently', score: 2 },
          { label: 'Minimal — data is available but rarely used in decision-making', score: 3 },
          { label: 'Gut-feel driven — major decisions made without data', score: 4 },
        ],
      },
      {
        id: 'tec-3',
        text: 'How secure and reliable is your technology infrastructure?',
        answers: [
          { label: 'Enterprise-grade security with regular audits and DR planning', score: 1 },
          { label: 'Basic security measures and reasonable uptime', score: 2 },
          { label: 'Minimal security — some known vulnerabilities remain unaddressed', score: 3 },
          { label: 'Highly vulnerable — no security plan or backup systems', score: 4 },
        ],
      },
      {
        id: 'tec-4',
        text: 'How often does technology constrain your ability to grow or serve customers?',
        answers: [
          { label: 'Never — technology enables and accelerates growth', score: 1 },
          { label: 'Rarely — minor limitations that are being addressed', score: 2 },
          { label: 'Often — technology is a frequent bottleneck', score: 3 },
          { label: 'Daily — technology limitations are the #1 growth barrier', score: 4 },
        ],
      },
      {
        id: 'tec-5',
        text: 'How proactively does your company invest in technology modernization?',
        answers: [
          { label: 'Proactively — we invest strategically and evaluate new tools regularly', score: 1 },
          { label: 'Reactively — we upgrade when something breaks or is too slow', score: 2 },
          { label: 'Rarely — technology investment is always delayed', score: 3 },
          { label: 'Not at all — technology is seen as a cost, not an investment', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Technology Is an Enabler — Leverage It for Competitive Edge',
        summary: 'Your technology foundation supports the business effectively. The next frontier is leveraging AI, automation, and advanced analytics to create capabilities your competitors cannot easily replicate.',
        leakage: 'Minimal — AI and automation adoption could increase productivity 15–25%',
        actions: [
          'Develop a 3-year technology roadmap aligned with business strategy',
          'Pilot AI automation for top 3 highest-volume manual processes',
          'Build a data warehouse and executive analytics dashboard',
          'Conduct cybersecurity penetration test and gap assessment',
          'Evaluate AI-native tools to replace legacy systems',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Technology Gaps Are Creating Operational Drag and Data Blindness',
        summary: 'Siloed systems and underutilization of data are creating inefficiencies and limiting your leadership team\'s ability to make fast, informed decisions. A structured technology program will unlock significant capacity.',
        leakage: 'Moderate — estimated 15–30% productivity loss from technology inefficiency',
        actions: [
          'Map all core systems and identify integration gaps',
          'Implement business intelligence tool with executive dashboard',
          'Prioritize integration of top 3 most critical disconnected systems',
          'Conduct data governance workshop to define key metrics',
          'Launch automation pilot for highest-volume repetitive processes',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Technology Failures Are Actively Limiting Revenue and Operations',
        summary: 'Your technology infrastructure is constraining growth, creating security risks, and forcing your team to spend significant time on manual workarounds. An urgent technology transformation is required.',
        leakage: 'High — estimated 30–45% of operational capacity absorbed by technology limitations',
        actions: [
          'Conduct emergency technology audit with external specialists',
          'Implement ERP or core platform replacement project',
          'Deploy cybersecurity baseline: MFA, endpoint protection, backup',
          'Automate the single highest-volume manual workflow within 30 days',
          'Build business case for technology investment to board/investors',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Technology Crisis — Operations and Security at Severe Risk',
        summary: 'Your company\'s technology infrastructure represents a critical risk to business operations, data security, and competitive viability. Immediate, comprehensive intervention is non-negotiable.',
        leakage: 'Critical — technology dysfunction is estimated to be destroying 45%+ of business value',
        actions: [
          'Appoint CTO or engage technology transformation firm immediately',
          'Conduct emergency security audit — assess breach exposure now',
          'Implement minimum viable ERP/CRM within 60-day sprint',
          'Create technology governance committee with CEO sponsorship',
          'Develop 90-day technology stabilization plan with weekly CEO review',
        ],
      },
    ],
  },
  {
    id: 'organization',
    label: 'Organization / Structure',
    icon: '⬡',
    description: 'Org design, decision-making speed & cross-functional collaboration',
    questions: [
      {
        id: 'org-1',
        text: 'How clearly are roles, responsibilities, and decision rights defined across the organization?',
        answers: [
          { label: 'Crystal clear — org chart, job profiles, and RACI matrices exist', score: 1 },
          { label: 'Mostly clear with some overlapping responsibilities', score: 2 },
          { label: 'Significant overlap and confusion about who owns what', score: 3 },
          { label: 'Very unclear — confusion is constant and creates conflict', score: 4 },
        ],
      },
      {
        id: 'org-2',
        text: 'How effective and fast is decision-making in your company?',
        answers: [
          { label: 'Fast and delegated — decisions made at the right level', score: 1 },
          { label: 'Moderate speed — some decisions require escalation', score: 2 },
          { label: 'Slow — most decisions require senior leadership involvement', score: 3 },
          { label: 'Bottlenecked — everything goes through 1–2 people creating gridlock', score: 4 },
        ],
      },
      {
        id: 'org-3',
        text: 'Does your current organizational structure support your growth objectives?',
        answers: [
          { label: 'Perfectly aligned — structure was designed for our growth stage', score: 1 },
          { label: 'Mostly aligned with some areas needing adjustment', score: 2 },
          { label: 'Partially — the structure is becoming a constraint', score: 3 },
          { label: 'Not at all — the structure actively blocks growth', score: 4 },
        ],
      },
      {
        id: 'org-4',
        text: 'How effectively do different departments collaborate and share information?',
        answers: [
          { label: 'Seamlessly — cross-functional teams work without friction', score: 1 },
          { label: 'Mostly well — minor coordination friction exists', score: 2 },
          { label: 'Silos are significant — departments rarely share information', score: 3 },
          { label: 'Major conflicts and territorial behavior between departments', score: 4 },
        ],
      },
      {
        id: 'org-5',
        text: 'Do you have formal succession planning for key leadership roles?',
        answers: [
          { label: 'Yes — bench strength identified and development plans in place', score: 1 },
          { label: 'Informal — we have candidates in mind but no formal plan', score: 2 },
          { label: 'Not planned — we would struggle if a key leader left', score: 3 },
          { label: 'Single point of failure — the business depends on 1–2 people', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Organizational Design Is Sound — Prepare for Scale',
        summary: 'Your organizational structure supports effective operations today. Focus should be on evolving the structure to handle 2–5x growth without losing agility or culture.',
        leakage: 'Minimal — structure optimization can unlock 10–20% organizational productivity',
        actions: [
          'Design future-state org structure for next growth milestone',
          'Implement OKR framework company-wide for strategic alignment',
          'Build a formal leadership pipeline and succession program',
          'Evaluate span of control ratios across management layers',
          'Conduct cross-functional team effectiveness assessment',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Organizational Inefficiencies Are Slowing Execution and Decision-Making',
        summary: 'Structural ambiguity and collaboration friction are adding cost and slowing your ability to execute. Redesigning accountability structures will release significant organizational energy.',
        leakage: 'Moderate — estimated 20–30% of leadership and management time wasted on unclear accountability',
        actions: [
          'Conduct role clarity workshop — build RACI for core processes',
          'Redesign decision rights framework with clear escalation paths',
          'Launch monthly cross-functional leadership sync',
          'Review span of control and eliminate unnecessary management layers',
          'Define 3-year organization design roadmap aligned to strategy',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Organizational Structure Is Actively Blocking Business Performance',
        summary: 'Silos, unclear accountability, and bottlenecked decision-making are significantly impeding your ability to grow, innovate, and execute at pace. An organizational redesign is urgently needed.',
        leakage: 'High — organizational dysfunction is estimated to destroy 30–45% of strategic execution capacity',
        actions: [
          'Engage organizational design consultants for restructuring project',
          'Conduct all-hands transparency session on organizational challenges',
          'Implement emergency decision rights clarity for top 10 critical processes',
          'Flatten decision-making to reduce leadership bottlenecks within 30 days',
          'Launch cross-functional task forces to break down the worst silos',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Organizational Dysfunction — Strategy Cannot Be Executed',
        summary: 'Your organizational structure is fundamentally broken. The combination of extreme centralization, role confusion, and departmental conflict is preventing strategy from being executed at any meaningful level.',
        leakage: 'Critical — organizational crisis is preventing 45%+ of strategic potential from being realized',
        actions: [
          'Commission emergency organizational redesign with external advisors',
          'CEO to directly address organizational dysfunction in all-company meeting',
          'Eliminate all redundant approval layers — implement 48-hour change',
          'Separate conflicting departments and redesign reporting lines',
          'Create organizational transformation office with C-suite ownership',
        ],
      },
    ],
  },
  {
    id: 'customer',
    label: 'Customer Experience',
    icon: '◇',
    description: 'Customer satisfaction, NPS, journey design & complaint resolution',
    questions: [
      {
        id: 'cx-1',
        text: 'How do you systematically measure customer satisfaction?',
        answers: [
          { label: 'NPS and CSAT measured monthly with closed-loop follow-up', score: 1 },
          { label: 'Occasional surveys — not systematic', score: 2 },
          { label: 'Rarely — only when customers complain', score: 3 },
          { label: 'Never — customer satisfaction is not formally measured', score: 4 },
        ],
      },
      {
        id: 'cx-2',
        text: 'How quickly and effectively do you resolve customer complaints or issues?',
        answers: [
          { label: 'Same-day resolution with proactive follow-up', score: 1 },
          { label: 'Within a week with dedicated support team', score: 2 },
          { label: 'Weeks — complaints sit in queues or get lost', score: 3 },
          { label: 'Complaints are largely unresolved — customers leave frustrated', score: 4 },
        ],
      },
      {
        id: 'cx-3',
        text: 'Have you mapped your customer journey from first contact to advocacy?',
        answers: [
          { label: 'Fully mapped with touchpoint owners and improvement roadmap', score: 1 },
          { label: 'Partially mapped — key moments identified', score: 2 },
          { label: 'Informal understanding only', score: 3 },
          { label: 'No customer journey mapping has been done', score: 4 },
        ],
      },
      {
        id: 'cx-4',
        text: 'How consistent is your customer experience across all touchpoints and channels?',
        answers: [
          { label: 'Fully consistent — same quality regardless of channel', score: 1 },
          { label: 'Mostly consistent with minor variations', score: 2 },
          { label: 'Varies widely depending on team or channel', score: 3 },
          { label: 'No consistency — customer experience is unpredictable', score: 4 },
        ],
      },
      {
        id: 'cx-5',
        text: 'What is your estimated Net Promoter Score (NPS)?',
        answers: [
          { label: 'Above 50 — we have strong advocates driving referrals', score: 1 },
          { label: '20–50 — positive but with clear improvement areas', score: 2 },
          { label: '0–20 — neutral customers unlikely to refer or return', score: 3 },
          { label: 'Negative or unknown — detractors outnumber promoters', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Customer Experience Is a Strength — Turn It into a Growth Engine',
        summary: 'Your customers are satisfied and the experience is largely consistent. The opportunity is in transforming happy customers into active advocates and building a referral-driven growth engine.',
        leakage: 'Minimal — 10–20% additional revenue available from customer advocacy activation',
        actions: [
          'Launch a formal customer advocacy and referral program',
          'Implement a structured customer success team and cadence',
          'Develop personalized upsell/cross-sell journeys for top segments',
          'Build a customer advisory board for co-innovation',
          'Create a service recovery playbook to convert detractors to promoters',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'CX Inconsistencies Are Limiting Retention and Referral Growth',
        summary: 'Inconsistent experiences and measurement gaps are preventing you from fully retaining customers and unlocking referral growth. A CX improvement program will directly increase LTV.',
        leakage: 'Moderate — estimated 20–30% of potential LTV being lost to CX gaps',
        actions: [
          'Implement NPS measurement and quarterly customer review process',
          'Map the full customer journey and identify top 3 pain points',
          'Create a customer complaint escalation and resolution playbook',
          'Standardize onboarding experience across all customer segments',
          'Launch quarterly customer success review meetings with key accounts',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Poor Customer Experience Is Driving Churn and Damaging Reputation',
        summary: 'Significant CX failures are actively causing customer loss, negative word of mouth, and margin erosion from complaint handling costs. Urgent CX transformation is needed.',
        leakage: 'High — estimated 30–50% of LTV being destroyed by CX dysfunction',
        actions: [
          'Appoint a Head of Customer Experience within 30 days',
          'Immediately interview 10 recently churned customers to diagnose root causes',
          'Implement 48-hour complaint resolution SLA company-wide',
          'Conduct NPS survey within 2 weeks and share results with leadership team',
          'Build CX improvement roadmap with 90-day transformation milestones',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical CX Failure — Customer Loss Is Accelerating',
        summary: 'Your customer experience is in crisis. Without immediate and comprehensive intervention, the business faces accelerating churn, reputational damage, and the permanent loss of your customer base.',
        leakage: 'Critical — CX crisis is estimated to be destroying 50%+ of potential customer lifetime value',
        actions: [
          'CEO personally calls the 10 most at-risk customers within 48 hours',
          'Implement emergency service recovery protocol across all teams',
          'Engage customer experience consulting firm for rapid diagnostic',
          'Halt marketing spend until retention is stabilized',
          'Develop 60-day CX rescue plan with daily leadership accountability',
        ],
      },
    ],
  },
  {
    id: 'production',
    label: 'Industrial Production',
    icon: '▣',
    description: 'Production efficiency, downtime, quality control & planning',
    questions: [
      {
        id: 'pro-1',
        text: 'How would you describe your production line\'s Overall Equipment Effectiveness (OEE)?',
        answers: [
          { label: 'World-class — above 85% OEE with continuous improvement culture', score: 1 },
          { label: 'Good — 70–85% OEE with ongoing improvement programs', score: 2 },
          { label: 'Below target — 50–70% OEE with known bottlenecks', score: 3 },
          { label: 'Poor — below 50% or OEE not measured', score: 4 },
        ],
      },
      {
        id: 'pro-2',
        text: 'How frequently does your production experience unplanned downtime?',
        answers: [
          { label: 'Rarely — less than 1% of production time lost to unplanned stops', score: 1 },
          { label: 'Occasionally — 1–5% downtime with reactive maintenance', score: 2 },
          { label: 'Frequently — 5–15% downtime is impacting output targets', score: 3 },
          { label: 'Constantly — over 15% downtime is a persistent crisis', score: 4 },
        ],
      },
      {
        id: 'pro-3',
        text: 'What is your quality control and defect management approach?',
        answers: [
          { label: 'ISO-certified with Six Sigma or statistical process control', score: 1 },
          { label: 'Formal QC team with documented inspection processes', score: 2 },
          { label: 'Informal checks — quality depends on individual effort', score: 3 },
          { label: 'No formal quality control — defects discovered by customers', score: 4 },
        ],
      },
      {
        id: 'pro-4',
        text: 'How do you manage production planning and scheduling?',
        answers: [
          { label: 'Advanced ERP/MRP with demand-driven production scheduling', score: 1 },
          { label: 'Basic planning tool with weekly schedule updates', score: 2 },
          { label: 'Manual Excel-based planning with frequent revisions', score: 3 },
          { label: 'Reactive only — we produce based on whatever urgent orders arrive', score: 4 },
        ],
      },
      {
        id: 'pro-5',
        text: 'How well are raw material and production costs managed and controlled?',
        answers: [
          { label: 'Fully optimized — standard costing, variance analysis, and cost reduction programs', score: 1 },
          { label: 'Some control — we track major costs but not granularly', score: 2 },
          { label: 'Volatile — material costs frequently exceed budget', score: 3 },
          { label: 'Uncontrolled — we have no clear picture of production cost drivers', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Production Excellence Is a Competitive Strength — Deepen It',
        summary: 'Your production function operates at a high level. The focus should be on Industry 4.0 adoption, predictive maintenance, and lean manufacturing to achieve world-class operational performance.',
        leakage: 'Minimal — 5–12% additional output achievable through advanced manufacturing techniques',
        actions: [
          'Implement predictive maintenance using IoT sensors and analytics',
          'Launch Industry 4.0 assessment and roadmap',
          'Deploy real-time OEE monitoring across all production lines',
          'Pilot AI-driven demand forecasting and production scheduling',
          'Build supplier quality development program to reduce input defects',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Production Inefficiencies Are Limiting Output and Increasing Costs',
        summary: 'Downtime, quality gaps, and planning weaknesses are reducing production capacity and increasing cost per unit. A structured manufacturing improvement program will significantly improve output and margins.',
        leakage: 'Moderate — estimated 15–30% of production capacity being lost to inefficiency',
        actions: [
          'Implement OEE measurement and improvement program',
          'Launch preventive maintenance scheduling system',
          'Conduct quality defect root cause analysis and implement corrective actions',
          'Deploy production planning tool to replace manual scheduling',
          'Create weekly production performance review cadence with plant leadership',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Production Crisis Is Threatening Output Targets and Quality Standards',
        summary: 'Persistent production failures, high downtime, and quality issues are significantly reducing output and creating customer delivery risk. An urgent manufacturing transformation program is required.',
        leakage: 'High — estimated 30–45% of production capacity being destroyed by operational failures',
        actions: [
          'Engage manufacturing excellence consultants for rapid improvement event',
          'Implement emergency downtime tracking and root cause analysis',
          'Deploy interim quality control team to all production lines immediately',
          'Conduct Kaizen blitz on the highest-impact production bottleneck',
          'Build 90-day production stabilization plan with daily KPI tracking',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Manufacturing Breakdown — Production Viability at Risk',
        summary: 'Your production function is in crisis with systemic failures across efficiency, quality, and planning. Without immediate intervention, you risk inability to meet orders and potential plant shutdown scenarios.',
        leakage: 'Critical — production dysfunction is destroying an estimated 45%+ of manufacturing value',
        actions: [
          'Appoint dedicated Plant Director or engage manufacturing turnaround specialist',
          'Conduct emergency production audit with external engineering assessment',
          'Implement daily production standup with plant floor leadership',
          'Communicate customer delivery risk proactively and develop mitigation plan',
          'Develop and execute 60-day manufacturing rescue plan with CEO sponsorship',
        ],
      },
    ],
  },
  {
    id: 'service',
    label: 'Service Delivery',
    icon: '◰',
    description: 'Service quality, capacity management & delivery consistency',
    questions: [
      {
        id: 'svc-1',
        text: 'Are your service delivery processes formally documented and followed consistently?',
        answers: [
          { label: 'Fully documented with quality checklists and compliance monitoring', score: 1 },
          { label: 'Mostly documented — key processes exist in writing', score: 2 },
          { label: 'Informal — processes live in people\'s heads', score: 3 },
          { label: 'No documentation — every service delivery is improvised', score: 4 },
        ],
      },
      {
        id: 'svc-2',
        text: 'How consistent is the quality of your service delivery?',
        answers: [
          { label: 'Always consistent — quality is the same regardless of who delivers it', score: 1 },
          { label: 'Mostly consistent with occasional variability', score: 2 },
          { label: 'Variable — quality depends heavily on which team member delivers', score: 3 },
          { label: 'Very inconsistent — quality is unpredictable and customers notice', score: 4 },
        ],
      },
      {
        id: 'svc-3',
        text: 'How do you manage service capacity and resource allocation?',
        answers: [
          { label: 'Fully planned — capacity modeled 3+ months ahead with staffing buffers', score: 1 },
          { label: 'Partially planned — some capacity planning with reactive adjustment', score: 2 },
          { label: 'Reactive — we scramble when demand spikes', score: 3 },
          { label: 'No planning — we are perpetually either over or understaffed', score: 4 },
        ],
      },
      {
        id: 'svc-4',
        text: 'How often do you deliver services within the committed timeframes?',
        answers: [
          { label: 'Always on-time — we have a 95%+ on-time delivery rate', score: 1 },
          { label: 'Mostly on-time with proactive delay communication', score: 2 },
          { label: 'Frequent delays — customers often have to follow up', score: 3 },
          { label: 'Chronic delays — late delivery is the norm, not the exception', score: 4 },
        ],
      },
      {
        id: 'svc-5',
        text: 'How do you handle service failures, escalations, and difficult client situations?',
        answers: [
          { label: 'Formal escalation playbook with senior resolution team', score: 1 },
          { label: 'Basic process — we escalate to management when needed', score: 2 },
          { label: 'Ad-hoc — we deal with escalations case-by-case without a process', score: 3 },
          { label: 'No formal process — escalations are chaotic and often unresolved', score: 4 },
        ],
      },
    ],
    report: [
      {
        minScore: 5, maxScore: 9, severity: 'Low',
        headline: 'Service Delivery Is a Differentiator — Build on the Excellence',
        summary: 'Your service delivery function is performing at a high level. Focus on systemizing what works, reducing cost-to-serve through automation, and creating signature service experiences that drive loyalty.',
        leakage: 'Minimal — service excellence investment could increase NPS by 15–25 points',
        actions: [
          'Codify service delivery playbooks and create training program from them',
          'Implement service automation to reduce cost-to-serve',
          'Build formal client success program for top accounts',
          'Develop service innovation roadmap based on customer feedback',
          'Launch service quality certification program for all delivery team members',
        ],
      },
      {
        minScore: 10, maxScore: 14, severity: 'Moderate',
        headline: 'Service Inconsistencies Are Creating Client Risk and Churn',
        summary: 'Variability in service quality and capacity management challenges are putting client relationships at risk. A service standardization program will improve both client retention and operational efficiency.',
        leakage: 'Moderate — estimated 20–35% of client LTV at risk from service inconsistency',
        actions: [
          'Conduct service quality audit across all active client accounts',
          'Document and standardize top 10 most frequently delivered service processes',
          'Implement capacity planning model with 90-day forward view',
          'Launch service SLA tracking and reporting for all client accounts',
          'Create a client escalation playbook and train all client-facing staff',
        ],
      },
      {
        minScore: 15, maxScore: 17, severity: 'High',
        headline: 'Service Delivery Failures Are Causing Client Loss and Reputational Risk',
        summary: 'Persistent service delivery failures are resulting in client dissatisfaction, churn, and potential contract loss. An urgent service transformation is needed to retain your existing client base.',
        leakage: 'High — estimated 35–50% of client revenue at risk from service dysfunction',
        actions: [
          'Conduct emergency client satisfaction assessment across top 20 accounts',
          'Appoint dedicated Service Delivery Manager within 2 weeks',
          'Implement 48-hour response SLA for all client issues immediately',
          'Redesign service delivery workflow to eliminate top 3 failure points',
          'Build 90-day service recovery plan with CEO accountability',
        ],
      },
      {
        minScore: 18, maxScore: 20, severity: 'Critical',
        headline: 'Critical Service Crisis — Client Contracts and Revenue at Severe Risk',
        summary: 'Your service delivery function is in collapse. Without immediate and comprehensive intervention, the business faces mass client defection, contract termination, and irreparable reputational damage.',
        leakage: 'Critical — service crisis is estimated to be destroying 50%+ of client lifetime value',
        actions: [
          'CEO personally contacts all major clients within 48 hours with recovery commitment',
          'Engage service management consulting firm for emergency triage',
          'Halt new client onboarding until existing delivery is stabilized',
          'Implement daily service delivery war room with all department heads',
          'Develop and execute 30-day service emergency plan with board visibility',
        ],
      },
    ],
  },
];
