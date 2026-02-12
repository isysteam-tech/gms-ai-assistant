import { memo, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
//import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
//import { Checkbox } from "./ui/checkbox";
import { 
  Bot, 
  User, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  AlertCircle,
  DollarSign,
  FileText,
  Upload,
  Sparkles,
  Zap,
  Brain,
  Camera,
  Mic,
  MicOff,
  Loader2,
  Shield,
  Building,
  CreditCard,
  Users,
  TrendingUp,
  Globe,
  Scan,
  Eye,
  Lock,
  MessageSquare,
  FormInput,
  ArrowLeftRight,
  Target,
  Calendar,
  Phone,
  Mail,
  Download,
  CheckSquare,
  Clock,
  Award,
  AlertTriangle,
  Info
} from "lucide-react";

interface StageCompletion {
  id: string;
  name: string;
  percentage: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'verified';
  fields: Array<{
    name: string;
    completed: boolean;
    confidence?: 'high' | 'medium' | 'low';
    source?: 'user' | 'myinfo' | 'acra' | 'iras' | 'wsg' | 'ai';
  }>;
}

interface TriageLane {
  type: 'fast-track' | 'guided';
  score: number;
  reasons: string[];
  sla: string;
  reviewer: string;
  estimatedTime: string;
}

interface UnifiedData {
  // Common fields
  intent: 'application' | 'claim' | 'general' | null;
  progress: number;
  currentPhase: string;
  triageLane?: TriageLane;
  completenessScore: number;
  
  // Stage-specific completion tracking
  stageCompletions: StageCompletion[];
  
  // API Integration Status
  apiIntegrations: {
    myInfo: { status: 'pending' | 'success' | 'failed', confidence: number, timestamp?: string };
    acra: { status: 'pending' | 'success' | 'failed', confidence: number, timestamp?: string };
    iras: { status: 'pending' | 'success' | 'failed', confidence: number, timestamp?: string };
    wsg: { status: 'pending' | 'success' | 'failed', confidence: number, timestamp?: string };
  };
  
  // Application data
  companyInfo: {
    uen: string;
    name: string;
    registeredAddress: string;
    mailingAddress: string;
    businessType: string;
    incorporationDate: string;
    sector: string;
    employeeCount: number;
    annualRevenue: number;
    paidUpCapital: number;
    verified: boolean;
    sources: Record<string, string>;
  };
  contactPerson: {
    name: string;
    nric: string;
    designation: string;
    email: string;
    phone: string;
    isAuthorizedSignatory: boolean;
    verified: boolean;
    sources: Record<string, string>;
  };
  projectDetails: {
    title: string;
    description: string;
    objectives: string[];
    timeline: string;
    totalCost: number;
    requestedAmount: number;
    fundingComponents: Array<{
      component: string;
      amount: number;
      percentage: number;
    }>;
  };
  
  // Claim data
  claimInfo: {
    trancheId: string;
    claimType: 'milestone' | 'reimbursement' | 'progress';
    amount: number;
    description: string;
    milestoneCompleted?: string;
    completionPercentage?: number;
  };
  lineItems: Array<{
    description: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    category: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    size: number;
    status: 'uploading' | 'uploaded' | 'processing' | 'verified' | 'rejected';
  }>;
}

interface Message {
  id: string;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
  data?: any;
  suggestions?: string[];
  actionButtons?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'outline' | 'secondary';
    icon?: any;
  }>;
  intent?: 'application' | 'claim' | 'general';
}

interface UnifiedAIAssistantProps {
  onComplete: (data: UnifiedData, type: 'application' | 'claim') => void;
  onClose: () => void;
  initialIntent?: 'application' | 'claim';
  projectId?: string;
  projectName?: string;
  schemeId?: string;
  schemeName?: string;
}

export const UnifiedAIAssistant = memo(function UnifiedAIAssistant({
  onComplete,
  onClose,
  initialIntent,
  projectId,
  projectName,
  schemeId,
  schemeName
}: UnifiedAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'form'>('chat');
  const [data, setData] = useState<UnifiedData>({
    intent: initialIntent || null,
    progress: 0,
    currentPhase: "Getting Started",
    completenessScore: 0,
    stageCompletions: [],
    apiIntegrations: {
      myInfo: { status: 'pending', confidence: 0 },
      acra: { status: 'pending', confidence: 0 },
      iras: { status: 'pending', confidence: 0 },
      wsg: { status: 'pending', confidence: 0 }
    },
    companyInfo: { 
      verified: false, 
      sources: {},
      uen: '', name: '', registeredAddress: '', mailingAddress: '',
      businessType: '', incorporationDate: '', sector: '',
      employeeCount: 0, annualRevenue: 0, paidUpCapital: 0
    },
    contactPerson: { 
      verified: false, 
      sources: {},
      name: '', nric: '', designation: '', email: '', phone: '', isAuthorizedSignatory: false
    },
    projectDetails: { 
      title: '', description: '', objectives: [], timeline: '',
      totalCost: 0, requestedAmount: 0, fundingComponents: []
    },
    claimInfo: {
      trancheId: '', claimType: 'milestone', amount: 0, description: ''
    },
    lineItems: [],
    documents: []
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applicationStages = useMemo(() => [
    {
      id: 'company',
      name: 'Company Information',
      fields: ['uen', 'name', 'registeredAddress', 'businessType', 'sector', 'employeeCount', 'paidUpCapital']
    },
    {
      id: 'contact', 
      name: 'Contact Person',
      fields: ['name', 'nric', 'email', 'phone', 'designation']
    },
    {
      id: 'project',
      name: 'Project Details', 
      fields: ['title', 'description', 'objectives', 'timeline', 'totalCost']
    },
    {
      id: 'funding',
      name: 'Funding & Budget',
      fields: ['requestedAmount', 'fundingComponents']
    },
    {
      id: 'eligibility',
      name: 'Eligibility & Compliance',
      fields: ['wsgCheck', 'ctcStatus', 'unionStatus']
    },
    {
      id: 'documents',
      name: 'Supporting Documents',
      fields: ['businessProfile', 'financialStatements', 'projectProposal']
    }
  ], []);

  const claimStages = useMemo(() => [
    {
      id: 'claim-type',
      name: 'Claim Information',
      fields: ['claimType', 'amount', 'description']
    },
    {
      id: 'expenses',
      name: 'Expenses & Line Items', 
      fields: ['lineItems', 'totalAmount']
    },
    {
      id: 'documents',
      name: 'Supporting Documents',
      fields: ['invoices', 'receipts', 'proofOfPayment']
    },
    {
      id: 'verification',
      name: 'Verification & Review',
      fields: ['compliance', 'validation']
    }
  ], []);

  const phaseMap = useMemo(() => ({
    application: [
      { phase: "Pre-Screen & Triage", weight: 10 },
      { phase: "One-Tap Verification", weight: 15 },
      { phase: "Company Information", weight: 20 },
      { phase: "Project Planning", weight: 25 },
      { phase: "Financial Details", weight: 15 },
      { phase: "Document Collection", weight: 10 },
      { phase: "Review & Submit", weight: 5 }
    ],
    claim: [
      { phase: "Getting Started", weight: 15 },
      { phase: "Claim Type Selection", weight: 15 },
      { phase: "Project Context", weight: 20 },
      { phase: "Financial Information", weight: 25 },
      { phase: "Document Processing", weight: 15 },
      { phase: "Review & Submit", weight: 10 }
    ]
  }), []);

  const initializeStageCompletions = useCallback((intent: 'application' | 'claim') => {
    const stages = intent === 'application' ? applicationStages : claimStages;
    const stageCompletions = stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      percentage: 0,
      status: 'not-started' as const,
      fields: stage.fields.map(field => ({
        name: field,
        completed: false
      }))
    }));
    
    setData(prev => ({ ...prev, stageCompletions }));
  }, [applicationStages, claimStages]);

  const calculateStageCompletion = useCallback((stageId: string, fieldName: string, completed: boolean, source?: string, confidence?: 'high' | 'medium' | 'low') => {
    setData(prev => {
      const newStageCompletions = prev.stageCompletions.map(stage => {
        if (stage.id === stageId) {
          const newFields = stage.fields.map(field => 
            field.name === fieldName 
              ? { ...field, completed, source: source as any, confidence }
              : field
          );
          const completedFields = newFields.filter(f => f.completed).length;
          const percentage = Math.round((completedFields / newFields.length) * 100);
          const status = percentage === 0 ? 'not-started' : 
                       percentage === 100 ? 'completed' : 'in-progress';
          
          return {
            ...stage,
            fields: newFields,
            percentage,
            status: status as any
          };
        }
        return stage;
      });

      // Calculate overall completeness score
      const totalFields = newStageCompletions.reduce((sum, stage) => sum + stage.fields.length, 0);
      const completedFields = newStageCompletions.reduce((sum, stage) => 
        sum + stage.fields.filter(f => f.completed).length, 0);
      const completenessScore = Math.round((completedFields / totalFields) * 100);

      return {
        ...prev,
        stageCompletions: newStageCompletions,
        completenessScore
      };
    });
  }, []);

  const initializeWithIntent = useCallback((intent: 'application' | 'claim') => {
    setData(prev => ({ ...prev, intent, progress: 5 }));
    initializeStageCompletions(intent);
    
    if (intent === 'application') {
      addAIMessage(
        `🏢 Grant Application Assistant Activated

${schemeName ? `I'll help you apply for: ${schemeName}` : "I'll help you with your grant application."}

🚀 NEW: Enhanced AI Experience
• Pre-Screen & Triage - 5-minute assessment for Fast-Track or Guided lane
• One-Tap Verification - Instant MyInfo + ACRA + IRAS + WSG integration
• Stage-by-Stage Progress - Real-time completion tracking
• Smart Document Processing - AI analysis and validation

Let's start with a quick pre-screen assessment to determine the best path for you:`,
        [],
        [
          {
            label: "🏃‍♂️ Start Pre-Screen (5 min)",
            action: () => handlePreScreenAssessment(),
            variant: 'default' as const,
            icon: Target
          },
          {
            label: "⚡ One-Tap Government Verification",
            action: () => handleOneTapVerification(),
            variant: 'outline' as const,
            icon: Zap
          }
        ]
      );
    } else {
      addAIMessage(
        `💰 Claims Assistant Activated

${projectName ? `I'll help you submit a claim for: ${projectName}` : "I'll help you submit your claim."}

I can process:
• Milestone completion claims
• Reimbursement claims  
• Progress payment claims

I'll use AI to:
• Analyze your documents automatically
• Extract line items and amounts
• Validate against project requirements
• Ensure compliance with funding rules

What type of claim would you like to submit?`,
        [
          "Milestone completion claim",
          "Reimbursement claim", 
          "Progress payment claim"
        ]
      );
    }
  }, [initializeStageCompletions, schemeName, projectName]);

  useEffect(() => {
    // Initialize conversation
    if (initialIntent) {
      initializeWithIntent(initialIntent);
    } else {
      addAIMessage(
        `🤖 Hello! I'm your Unified AI Assistant

I can help you with:
• 🏢 Grant Applications - Apply for funding with government API integration
• 💰 Claims Submission - Submit milestone and reimbursement claims
• ❓ General Assistance - Answer questions about grants and processes

What would you like to do today? You can simply tell me in your own words!`,
        [
          "I want to apply for a grant",
          "I need to submit a claim", 
          "Help me find suitable funding",
          "I have questions about my application"
        ]
      );
    }
  }, [initialIntent, initializeWithIntent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreScreenAssessment = () => {
    updateProgress("Pre-Screen & Triage", 'application');
    
    addAIMessage(
      `🎯 Pre-Screen & Triage Assessment

This 5-minute assessment will determine if you qualify for our Fast-Track lane (streamlined process) or Guided lane (additional support).

Quick Assessment Questions:

1️⃣ Company Status: Is your company registered in Singapore with a valid UEN?

2️⃣ Employee Count: How many local employees (citizens/PRs) do you have?

3️⃣ Funding History: Have you received similar government grants in the past 3 years?

4️⃣ Union Status: Is your company unionised and do you have a CTC formed?

You can answer all at once or one by one. I'll analyze your responses and route you to the optimal lane!`,
      [
        "Yes to all - we're established with 15+ local employees, no recent grants, have CTC",
        "Mixed - we're registered but small team, some complications",
        "Let me answer each question individually"
      ]
    );
  };

  const handleOneTapVerification = () => {
    updateProgress("One-Tap Verification", 'application');
    
    addSystemMessage("🔄 Initiating One-Tap Government Verification\n\nOrchestrating multiple API calls...");
    
    addAIMessage(
      `⚡ One-Tap Government Integration Starting

I'll now perform comprehensive verification by calling:
• MyInfo API - Personal identity and contact details  
• ACRA/UEN API - Company registration and business profile
• IRAS API - Tax compliance and financial information
• WSG API - Blacklist check and eligibility verification

This usually takes 30-60 seconds. I'll show you real-time progress and confidence scores for each integration.`,
      [],
      [
        {
          label: "🚀 Start One-Tap Verification",
          action: () => executeOneTapVerification(),
          variant: 'default' as const,
          icon: Zap
        }
      ]
    );
  };

  const executeOneTapVerification = () => {
    // Simulate progressive API calls with real-time updates
    
    // MyInfo API Call
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        apiIntegrations: {
          ...prev.apiIntegrations,
          myInfo: { status: 'success', confidence: 95, timestamp: new Date().toISOString() }
        }
      }));
      
      addSystemMessage("✅ MyInfo API - Identity verified (95% confidence)");
      
      const personalData = {
        name: "David Tan Wei Ming",
        nric: "S1234567A", 
        email: "david.tan@company.sg",
        phone: "+65 9123 4567"
      };
      
      setData(prev => ({
        ...prev,
        contactPerson: {
          ...prev.contactPerson,
          ...personalData,
          verified: true,
          sources: { ...prev.contactPerson.sources, name: 'myinfo', nric: 'myinfo', email: 'myinfo', phone: 'myinfo' }
        }
      }));

      // Update stage completion
      calculateStageCompletion('contact', 'name', true, 'myinfo', 'high');
      calculateStageCompletion('contact', 'nric', true, 'myinfo', 'high');
      calculateStageCompletion('contact', 'email', true, 'myinfo', 'high');
      calculateStageCompletion('contact', 'phone', true, 'myinfo', 'high');
      
    }, 1000);

    // ACRA API Call
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        apiIntegrations: {
          ...prev.apiIntegrations,
          acra: { status: 'success', confidence: 98, timestamp: new Date().toISOString() }
        }
      }));
      
      addSystemMessage("✅ ACRA API - Company verified (98% confidence)");
      
      const companyData = {
        uen: "201234567A",
        name: "TechStart Innovations Pte Ltd",
        registeredAddress: "123 Innovation Drive, #05-01, Singapore 123456",
        businessType: "Private Limited Company",
        incorporationDate: "2018-03-15",
        sector: "Information Technology",
        employeeCount: 15,
        paidUpCapital: 100000
      };
      
      setData(prev => ({
        ...prev,
        companyInfo: {
          ...prev.companyInfo,
          ...companyData,
          verified: true,
          sources: {
            uen: 'acra', name: 'acra', registeredAddress: 'acra', 
            businessType: 'acra', incorporationDate: 'acra', sector: 'acra',
            employeeCount: 'acra', paidUpCapital: 'acra'
          }
        }
      }));

      // Update stage completion
      calculateStageCompletion('company', 'uen', true, 'acra', 'high');
      calculateStageCompletion('company', 'name', true, 'acra', 'high');
      calculateStageCompletion('company', 'registeredAddress', true, 'acra', 'high');
      calculateStageCompletion('company', 'businessType', true, 'acra', 'high');
      calculateStageCompletion('company', 'sector', true, 'acra', 'high');
      calculateStageCompletion('company', 'employeeCount', true, 'acra', 'high');
      calculateStageCompletion('company', 'paidUpCapital', true, 'acra', 'high');
      
    }, 2500);

    // IRAS API Call
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        apiIntegrations: {
          ...prev.apiIntegrations,
          iras: { status: 'success', confidence: 92, timestamp: new Date().toISOString() }
        }
      }));
      
      addSystemMessage("✅ IRAS API - Financial status verified (92% confidence)");
      
      setData(prev => ({
        ...prev,
        companyInfo: {
          ...prev.companyInfo,
          annualRevenue: 2500000,
          sources: { ...prev.companyInfo.sources, annualRevenue: 'iras' }
        }
      }));
      
    }, 4000);

    // WSG API Call  
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        apiIntegrations: {
          ...prev.apiIntegrations,
          wsg: { status: 'success', confidence: 100, timestamp: new Date().toISOString() }
        }
      }));
      
      addSystemMessage("✅ WSG API - Eligibility verified (100% confidence)");
      
      // Determine triage lane based on collected data
      const triageScore = 85; // Calculate based on completeness and complexity
      const triageLane: TriageLane = {
        type: triageScore >= 80 ? 'fast-track' : 'guided',
        score: triageScore,
        reasons: triageScore >= 80 ? 
          ['Complete company information', 'Good financial standing', 'No compliance issues', 'Sufficient local employees'] :
          ['Missing some information', 'Requires additional documentation', 'Complex project structure'],
        sla: triageScore >= 80 ? '3-4 weeks' : '6-8 weeks',
        reviewer: triageScore >= 80 ? 'Senior Officer (Auto-assigned)' : 'Technical Specialist',
        estimatedTime: triageScore >= 80 ? '2-3 weeks faster' : 'Standard timeline'
      };

      setData(prev => ({ ...prev, triageLane }));
      
      // Final summary
      setTimeout(() => {
        addAIMessage(
          `🎉 One-Tap Verification Complete!

✅ All Government APIs Successfully Integrated

📊 Verification Results:
• MyInfo: ${data.apiIntegrations.myInfo.confidence}% confidence - Personal details verified
• ACRA: 98% confidence - Company registration confirmed  
• IRAS: 92% confidence - Financial status verified
• WSG: 100% confidence - Eligibility confirmed

🏃‍♂️ Triage Assessment: ${triageLane.type.toUpperCase()} LANE
• Score: ${triageLane.score}/100
• Estimated Processing: ${triageLane.sla}
• Assigned Reviewer: ${triageLane.reviewer}

Reasons for ${triageLane.type} lane:
${triageLane.reasons.map(reason => `• ${reason}`).join('\n')}

📋 Your completeness score is now ${data.completenessScore}%!

Ready to proceed with your project details?`,
          ["Yes, let's continue with project planning", "I want to review the pre-filled information first"],
          [
            {
              label: "🚀 Continue to Project Details",
              action: () => proceedToProjectDetails(),
              variant: 'default' as const
            },
            {
              label: "📋 Switch to Form View",
              action: () => setViewMode('form'),
              variant: 'outline' as const,
              icon: FormInput
            }
          ]
        );
      }, 1000);
      
    }, 5500);
  };

  const detectIntent = (input: string): 'application' | 'claim' | 'general' => {
    const lowerInput = input.toLowerCase();
    
    // Application keywords
    const applicationKeywords = [
      'apply', 'application', 'grant', 'funding', 'scheme', 'eligibility',
      'project', 'proposal', 'submit application', 'new application'
    ];
    
    // Claim keywords  
    const claimKeywords = [
      'claim', 'claims', 'reimbursement', 'milestone', 'payment', 'invoice',
      'expense', 'submit claim', 'claim money', 'reimbursement'
    ];

    const applicationScore = applicationKeywords.reduce((score, keyword) => 
      lowerInput.includes(keyword) ? score + 1 : score, 0);
    
    const claimScore = claimKeywords.reduce((score, keyword) => 
      lowerInput.includes(keyword) ? score + 1 : score, 0);

    if (applicationScore > claimScore && applicationScore > 0) return 'application';
    if (claimScore > applicationScore && claimScore > 0) return 'claim';
    return 'general';
  };

  const updateProgress = (phase: string, intent: 'application' | 'claim') => {
    const phases = phaseMap[intent];
    const currentPhaseIndex = phases.findIndex(p => p.phase === phase);
    const newProgress = phases.slice(0, currentPhaseIndex + 1)
      .reduce((sum, p) => sum + p.weight, 0);
    
    setData(prev => ({ 
      ...prev, 
      progress: newProgress, 
      currentPhase: phase 
    }));
  };

  const addAIMessage = (content: string, suggestions?: string[], actionButtons?: any[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date(),
        suggestions,
        actionButtons,
        intent: data.intent || undefined
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addSystemMessage = (content: string, data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content,
      timestamp: new Date(),
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    processUserInput(inputValue);
    setInputValue("");
  };

  const processUserInput = (input: string) => {
    // Detect intent if not set
    if (!data.intent) {
      const detectedIntent = detectIntent(input);
      if (detectedIntent !== 'general') {
        setData(prev => ({ ...prev, intent: detectedIntent }));
        initializeWithIntent(detectedIntent);
        return;
      } else {
        // Handle general questions
        handleGeneralQuery(input);
        return;
      }
    }

    // Process based on current intent and progress
    if (data.intent === 'application') {
      processApplicationInput(input);
    } else if (data.intent === 'claim') {
      processClaimInput(input);
    }
  };

  const processApplicationInput = (input: string) => {
    if (data.currentPhase === "Getting Started") {
      handleSingPassLogin();
    } else if (data.currentPhase === "Pre-Screen & Triage") {
      handlePreScreenResponse(input);
    } else if (data.currentPhase === "Project Planning") {
      handleProjectDescription(input);
    }
    // Add more application processing logic here
  };

  const handlePreScreenResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Analyze the response for triage scoring
    let triageScore = 50; // Base score
    const reasons: string[] = [];
    
    // Company registration check
    if (lowerInput.includes('yes') && lowerInput.includes('uen')) {
      triageScore += 15;
      reasons.push('Valid Singapore registration');
    }
    
    // Employee count assessment
    if (lowerInput.includes('15') || lowerInput.includes('employee')) {
      triageScore += 20;
      reasons.push('Sufficient local employees');
    }
    
    // Grant history
    if (lowerInput.includes('no recent') || lowerInput.includes('no similar')) {
      triageScore += 15;
      reasons.push('No duplicate funding concerns');
    }
    
    // CTC status
    if (lowerInput.includes('ctc') || lowerInput.includes('union')) {
      triageScore += 10;
      reasons.push('CTC/Union status clear');
    }
    
    // Determine lane
    const triageLane: TriageLane = {
      type: triageScore >= 75 ? 'fast-track' : 'guided',
      score: triageScore,
      reasons: triageScore >= 75 ? 
        [...reasons, 'High completeness score', 'Straightforward application'] :
        ['Requires additional verification', 'Complex eligibility factors', 'Needs guided assistance'],
      sla: triageScore >= 75 ? '3-4 weeks' : '6-8 weeks',
      reviewer: triageScore >= 75 ? 'Senior Officer (Auto-assigned)' : 'Technical Specialist + Senior Review',
      estimatedTime: triageScore >= 75 ? '2-3 weeks faster than standard' : 'Standard processing timeline'
    };

    setData(prev => ({ ...prev, triageLane }));

    addAIMessage(
      `🎯 Pre-Screen Assessment Complete!

📊 Your Triage Assessment:
• Score: ${triageScore}/100
• Lane Assignment: ${triageLane.type.toUpperCase()} 
• Processing Time: ${triageLane.sla}
• Reviewer: ${triageLane.reviewer}

${triageLane.type === 'fast-track' ? '🏃‍♂️ Fast-Track Benefits' : '🧭 Guided Lane Benefits'}:
${triageLane.reasons.map(reason => `• ${reason}`).join('\n')}

${triageLane.type === 'fast-track' ? 
  '✅ You qualify for expedited processing! Your application will be prioritized and you\'ll get dedicated support.' :
  '🧭 You\'ll receive guided assistance with a technical specialist to ensure your application is optimized for approval.'
}

Ready to proceed with government verification?`,
      ["Yes, start verification", "I want to know more about my lane", "Let me review my answers"],
      [
        {
          label: "⚡ One-Tap Government Verification",
          action: () => handleOneTapVerification(),
          variant: 'default' as const,
          icon: Zap
        },
        {
          label: `📋 ${triageLane.type === 'fast-track' ? 'Fast-Track' : 'Guided'} Process Info`,
          action: () => showLaneDetails(triageLane),
          variant: 'outline' as const,
          icon: Info
        }
      ]
    );
  };

  const showLaneDetails = (lane: TriageLane) => {
    addAIMessage(
      `📋 **${lane.type.toUpperCase()} Lane Details**

**🎯 What This Means:**
${lane.type === 'fast-track' ? `
**Fast-Track Processing:**
• ⚡ **Priority Queue**: Your application jumps ahead in the review process
• 🤖 **Automated Checks**: Pre-approved for standard eligibility criteria
• 👨‍💼 **Senior Officer Review**: Assigned to experienced reviewer immediately
• 📅 **Shorter Timeline**: ${lane.sla} instead of standard 8-10 weeks
• 🔄 **Fewer Clarifications**: Less back-and-forth due to complete initial assessment
• 📞 **Direct Contact**: Direct line to your assigned officer

**Success Rate**: 85-90% approval rate for Fast-Track applications
` : `
**Guided Processing:**
• 🧭 **Technical Specialist**: Dedicated specialist guides your application
• 📋 **Comprehensive Review**: Detailed assessment of complex factors  
• 💡 **Optimization Support**: Help to strengthen your application
• 📚 **Additional Resources**: Access to templates and best practices
• 🔄 **Iterative Process**: Work together to address any gaps
• 📞 **Regular Check-ins**: Scheduled progress reviews

**Success Rate**: 75-80% approval rate with guided optimization
`}

**Next Steps:**
Ready to continue with government verification to auto-fill your application data?`,
      ["Continue with verification", "I'm satisfied with my lane assignment"],
      [
        {
          label: "⚡ Start Verification Process",
          action: () => handleOneTapVerification(),
          variant: 'default' as const,
          icon: Zap
        }
      ]
    );
  };

  // Duplicate functions removed - functions already declared earlier in the file

  const handleGeneralQuery = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('eligibility') || lowerInput.includes('qualify')) {
      addAIMessage(
        `📋 **Grant Eligibility Information**

Here are the general eligibility criteria for most grants:

✅ **Company Requirements:**
• Registered in Singapore with valid UEN
• Minimum 30% local shareholding
• At least 3 local employees (citizens/PRs)
• Good tax compliance record

✅ **Project Requirements:**
• Clear business transformation goals
• Measurable outcomes and KPIs
• Realistic timeline and budget
• No duplicate funding for same activities

Would you like me to check your specific eligibility for a particular grant?`,
        [
          "Check my eligibility for a specific grant",
          "I want to apply for funding",
          "Tell me about different grant types"
        ]
      );
    } else if (lowerInput.includes('process') || lowerInput.includes('how')) {
      addAIMessage(
        `🔄 **Grant Process Overview**

**Application Process:**
1️⃣ **Discover** → Find suitable grants
2️⃣ **Apply** → Submit application with AI assistance  
3️⃣ **Assess** → Government review (4-8 weeks)
4️⃣ **Approve** → Letter of Offer issued
5️⃣ **Execute** → Implement your project
6️⃣ **Claim** → Submit claims for reimbursement

**Claims Process:**
1️⃣ **Prepare** → Gather invoices and evidence
2️⃣ **Submit** → Upload via AI assistant
3️⃣ **Review** → Automated validation + officer review
4️⃣ **Approve** → Payment processed
5️��� **Disburse** → Funds transferred to your account

What would you like to do next?`,
        [
          "Start a new application",
          "Submit a claim",
          "View my existing applications"
        ]
      );
    } else {
      addAIMessage(
        `🤔 **I'm here to help!**

I can assist you with:
• **Grant applications** - Find and apply for funding
• **Claims submission** - Get reimbursed for project expenses  
• **Process guidance** - Understand requirements and timelines
• **Eligibility checking** - See if you qualify for specific grants

What specific question can I answer for you?`,
        [
          "I want to apply for a grant",
          "I need to submit a claim",
          "Check grant eligibility",
          "Explain the application process"
        ]
      );
    }
  };

  // processApplicationInput function moved earlier in the file to avoid duplicate declaration

  const processClaimInput = (input: string) => {
    // Claim-specific processing logic
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('milestone')) {
      setData(prev => ({ 
        ...prev, 
        claimInfo: { ...prev.claimInfo, claimType: 'milestone' } 
      }));
      updateProgress("Claim Type Selection", 'claim');
      
      addAIMessage(
        `✅ **Milestone Completion Claim Selected**

I'll help you claim for a completed project milestone.

Which milestone have you completed? I can see from your project records:`,
        [
          "Phase 1: Equipment Setup & Installation",
          "Phase 2: Staff Training & Certification",
          "Phase 3: System Testing & Go-Live"
        ]
      );
    }
    // Add more claim processing logic here
  };

  const handleSingPassLogin = () => {
    addSystemMessage("🔐 **SingPass Authentication**\n\nInitiating secure login...");
    updateProgress("Identity Verification", 'application');
    
    setTimeout(() => {
      const mockData = {
        name: "David Tan Wei Ming",
        nric: "S1234567A",
        email: "david.tan@company.sg",
        phone: "+65 9123 4567"
      };
      
      setData(prev => ({
        ...prev,
        contactPerson: {
          ...prev.contactPerson,
          ...mockData
        }
      }));

      addAIMessage(
        `✅ **SingPass Authentication Successful**

**Retrieved Information:**
👤 **Name:** ${mockData.name}
🆔 **NRIC:** ${mockData.nric}
📧 **Email:** ${mockData.email}
📱 **Phone:** ${mockData.phone}

Now retrieving your company information from ACRA...`
      );

      setTimeout(() => {
        handleAcraIntegration();
      }, 1500);
    }, 2000);
  };

  const handleAcraIntegration = () => {
    addSystemMessage("🏢 **ACRA Integration**\n\nRetrieving company information...");
    updateProgress("Company Information", 'application');
    
    setTimeout(() => {
      const mockCompanyData = {
        uen: "201234567A",
        name: "TechStart Innovations Pte Ltd",
        registeredAddress: "123 Innovation Drive, Singapore 123456",
        businessType: "Private Limited Company",
        incorporationDate: "2018-03-15",
        sector: "Information Technology",
        employeeCount: 15,
        paidUpCapital: 100000
      };
      
      setData(prev => ({
        ...prev,
        companyInfo: {
          ...prev.companyInfo,
          ...mockCompanyData
        }
      }));

      addAIMessage(
        `🎉 **Company Information Retrieved**

**Company Details:**
🏢 **Name:** ${mockCompanyData.name}
🆔 **UEN:** ${mockCompanyData.uen}
📍 **Address:** ${mockCompanyData.registeredAddress}
🏭 **Sector:** ${mockCompanyData.sector}
👥 **Employees:** ${mockCompanyData.employeeCount}

Everything looks good! Ready to proceed with your project details?`,
        ["Yes, let's continue", "I need to update some information"],
        [
          {
            label: "📝 Continue with Project",
            action: () => proceedToProjectDetails(),
            variant: 'default' as const
          },
          {
            label: "📋 Switch to Form View",
            action: () => setViewMode('form'),
            variant: 'outline' as const,
            icon: FormInput
          }
        ]
      );
    }, 2000);
  };

  const handleIdScan = () => {
    addSystemMessage("📷 **AI Document Scanner**\n\nPosition your NRIC in the camera view...");
    
    setTimeout(() => {
      addSystemMessage("🔍 **Processing Document...**\n\nExtracting information with AI...");
      
      setTimeout(() => {
        const mockData = {
          name: "David Tan Wei Ming", 
          nric: "S1234567A"
        };
        
        setData(prev => ({
          ...prev,
          contactPerson: {
            ...prev.contactPerson,
            ...mockData
          }
        }));

        addAIMessage(
          `✅ **NRIC Scan Complete**

**Extracted Information:**
🆔 **NRIC:** ${mockData.nric}
👤 **Name:** ${mockData.name}

Please provide your contact details to continue:`,
          [],
          [
            {
              label: "📞 Add Contact Info",
              action: () => collectContactInfo(),
              variant: 'default' as const
            }
          ]
        );
      }, 2000);
    }, 1500);
  };

  const collectContactInfo = () => {
    addAIMessage(
      `📞 **Contact Information**

I need your business contact details:
• Email address
• Phone number  
• Your designation in the company

You can tell me all at once or one by one!`,
      [
        "Email: david@company.sg, Phone: 91234567, Position: CEO",
        "Let me add them one by one"
      ]
    );
  };

  const proceedToProjectDetails = () => {
    updateProgress("Project Planning", 'application');
    
    addAIMessage(
      `🚀 **Project Planning & Details**

Excellent! With ${data.completenessScore}% of your information already verified, let's plan your project.

**Tell me about your project:**
• What is your main objective?
• What specific outcomes do you want to achieve?
• How will this transform your business operations?
• What's your planned timeline and budget?

I'll help structure this information and suggest optimal funding components based on the **${schemeName}** scheme requirements.`,
      [
        "We want to implement AI automation in our manufacturing process to improve efficiency by 40%",
        "Looking to digitize our operations and train our workforce on new digital tools",
        "Planning to upgrade our technology infrastructure and enhance cybersecurity"
      ]
    );
  };

  const handleProjectDescription = (description: string) => {
    // Simulate AI processing of project description
    const mockProjectData = {
      title: "Digital Transformation Initiative",
      description: description,
      objectives: [
        "Implement enterprise resource planning system",
        "Train staff on digital tools and processes", 
        "Enhance operational efficiency by 40%",
        "Improve customer service capabilities"
      ],
      timeline: "12 months",
      totalCost: 85000,
      requestedAmount: 68000,
      fundingComponents: [
        { component: "Equipment Allowance", amount: 40000, percentage: 80 },
        { component: "Training Allowance", amount: 21000, percentage: 90 },
        { component: "Consultancy Support", amount: 7000, percentage: 70 }
      ]
    };

    setData(prev => ({
      ...prev,
      projectDetails: mockProjectData
    }));

    // Update stage completions
    calculateStageCompletion('project', 'title', true, 'ai', 'high');
    calculateStageCompletion('project', 'description', true, 'user', 'high');
    calculateStageCompletion('project', 'objectives', true, 'ai', 'high');
    calculateStageCompletion('project', 'timeline', true, 'ai', 'medium');
    calculateStageCompletion('project', 'totalCost', true, 'ai', 'medium');

    calculateStageCompletion('funding', 'requestedAmount', true, 'ai', 'high');
    calculateStageCompletion('funding', 'fundingComponents', true, 'ai', 'high');

    updateProgress("Financial Details", 'application');

    addAIMessage(
      `✅ **Project Information Processed!**

I've analyzed your project description and structured it for the application:

**📋 Project Title:** ${mockProjectData.title}

**🎯 Key Objectives:**
${mockProjectData.objectives.map(obj => `• ${obj}`).join('\n')}

**⏱️ Timeline:** ${mockProjectData.timeline}
**💰 Total Project Cost:** S${mockProjectData.totalCost.toLocaleString()}

**🎯 AI-Optimized Funding Breakdown:**
${mockProjectData.fundingComponents.map(comp => 
  `• **${comp.component}:** S${comp.amount.toLocaleString()} (${comp.percentage}% funding)`
).join('\n')}

**📊 Total Funding Request:** S${mockProjectData.requestedAmount.toLocaleString()}

**${data.triageLane?.type === 'fast-track' ? '🏃‍♂️ Fast-Track Status' : '🧭 Guided Process'}**: Your application is ${data.completenessScore}% complete with high-confidence data from government APIs.

Ready to finalize and submit?`,
      ["Yes, looks perfect", "I want to adjust the funding breakdown", "Let me review everything in form view"],
      [
        {
          label: "🚀 Finalize & Submit",
          action: () => handleFinalSubmission(),
          variant: 'default' as const
        },
        {
          label: "📋 Switch to Form View",
          action: () => setViewMode('form'),
          variant: 'outline' as const,
          icon: FormInput
        }
      ]
    );
  };

  const handleFinalSubmission = () => {
    updateProgress("Review & Submit", 'application');
    setData(prev => ({ ...prev, progress: 100, completenessScore: 100 }));

    addAIMessage(
      `🎉 **Application Ready for Submission!**

**📊 Final Application Summary:**
• **Completeness Score:** 100%
• **Government Verification:** ✅ All APIs verified
• **Triage Lane:** ${data.triageLane?.type.toUpperCase()}
• **Estimated Processing:** ${data.triageLane?.sla}

**🔍 Pre-Submission Validation:**
✅ Company information verified via ACRA
✅ Personal details confirmed via MyInfo  
✅ Financial status validated via IRAS
✅ Eligibility confirmed via WSG
✅ Project structure optimized for scheme requirements
✅ Funding breakdown within scheme limits

**🏆 Success Probability:** ${data.triageLane?.type === 'fast-track' ? '90-95%' : '80-85%'} based on AI analysis

**📋 Application ID:** APP-2025-${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}

Submit your application now?`,
      [],
      [
        {
          label: "🚀 Submit Application",
          action: () => onComplete(data, 'application'),
          variant: 'default' as const
        },
        {
          label: "💾 Save as Draft",
          action: () => alert('Application saved as draft'),
          variant: 'outline' as const
        }
      ]
    );
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'chat' ? 'form' : 'chat');
  };

  const renderFormView = () => {
    if (!data.intent) {
      return (
        <div className="p-6 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Start a Conversation First</h3>
          <p className="text-muted-foreground mb-4">
            Switch to chat mode to begin and I'll pre-fill this form with our conversation data.
          </p>
          <Button onClick={() => setViewMode('chat')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        </div>
      );
    }

    if (data.intent === 'application') {
      return renderApplicationForm();
    } else if (data.intent === 'claim') {
      return renderClaimForm();
    }
  };

  const renderApplicationForm = () => (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Application Form</h3>
        <p className="text-sm text-muted-foreground">
          Pre-filled with data from our conversation. Complete any missing fields.
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input 
                id="company-name"
                value={data.companyInfo.name || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  companyInfo: { ...prev.companyInfo, name: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="uen">UEN</Label>
              <Input 
                id="uen"
                value={data.companyInfo.uen || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  companyInfo: { ...prev.companyInfo, uen: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Registered Address</Label>
            <Textarea 
              id="address"
              value={data.companyInfo.registeredAddress || ""} 
              onChange={(e) => setData(prev => ({
                ...prev,
                companyInfo: { ...prev.companyInfo, registeredAddress: e.target.value }
              }))}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sector">Business Sector</Label>
              <Input 
                id="sector"
                value={data.companyInfo.sector || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  companyInfo: { ...prev.companyInfo, sector: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="employees">Employee Count</Label>
              <Input 
                id="employees"
                type="number"
                value={data.companyInfo.employeeCount || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  companyInfo: { ...prev.companyInfo, employeeCount: parseInt(e.target.value) || 0 }
                }))}
                className="mt-2"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input 
                id="contact-name"
                value={data.contactPerson.name || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  contactPerson: { ...prev.contactPerson, name: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="nric">NRIC/FIN</Label>
              <Input 
                id="nric"
                value={data.contactPerson.nric || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  contactPerson: { ...prev.contactPerson, nric: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email"
                value={data.contactPerson.email || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  contactPerson: { ...prev.contactPerson, email: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                value={data.contactPerson.phone || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  contactPerson: { ...prev.contactPerson, phone: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input 
              id="designation"
              value={data.contactPerson.designation || ""} 
              onChange={(e) => setData(prev => ({
                ...prev,
                contactPerson: { ...prev.contactPerson, designation: e.target.value }
              }))}
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="project" className="space-y-4">
          <div>
            <Label htmlFor="project-title">Project Title</Label>
            <Input 
              id="project-title"
              value={data.projectDetails.title || ""} 
              onChange={(e) => setData(prev => ({
                ...prev,
                projectDetails: { ...prev.projectDetails, title: e.target.value }
              }))}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea 
              id="project-description"
              value={data.projectDetails.description || ""} 
              onChange={(e) => setData(prev => ({
                ...prev,
                projectDetails: { ...prev.projectDetails, description: e.target.value }
              }))}
              rows={4}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Project Timeline</Label>
              <Input 
                id="timeline"
                value={data.projectDetails.timeline || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  projectDetails: { ...prev.projectDetails, timeline: e.target.value }
                }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="total-cost">Total Project Cost</Label>
              <Input 
                id="total-cost"
                type="number"
                value={data.projectDetails.totalCost || ""} 
                onChange={(e) => setData(prev => ({
                  ...prev,
                  projectDetails: { ...prev.projectDetails, totalCost: parseFloat(e.target.value) || 0 }
                }))}
                className="mt-2"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <div>
            <Label htmlFor="requested-amount">Requested Funding Amount</Label>
            <Input 
              id="requested-amount"
              type="number"
              value={data.projectDetails.requestedAmount || ""} 
              onChange={(e) => setData(prev => ({
                ...prev,
                projectDetails: { ...prev.projectDetails, requestedAmount: parseFloat(e.target.value) || 0 }
              }))}
              className="mt-2"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Smart Funding Calculation</h4>
            <p className="text-sm text-blue-700 mb-3">
              Based on our conversation, I can auto-calculate the optimal funding breakdown.
            </p>
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Calculate Optimal Funding
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4 border-t">
        <Button 
          onClick={() => onComplete(data, 'application')}
          className="flex-1"
        >
          Submit Application
        </Button>
        <Button variant="outline" onClick={() => setViewMode('chat')}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Back to Chat
        </Button>
      </div>
    </div>
  );

  const renderClaimForm = () => (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Claim Submission Form</h3>
        <p className="text-sm text-muted-foreground">
          Pre-filled with data from our conversation. Add any missing details.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="claim-type">Claim Type</Label>
          <select 
            id="claim-type"
            value={data.claimInfo.claimType || ""} 
            onChange={(e) => setData(prev => ({
              ...prev,
              claimInfo: { ...prev.claimInfo, claimType: e.target.value as any }
            }))}
            className="w-full mt-2 px-3 py-2 border border-border rounded-md"
          >
            <option value="">Select claim type</option>
            <option value="milestone">Milestone Completion</option>
            <option value="reimbursement">Reimbursement</option>
            <option value="progress">Progress Payment</option>
          </select>
        </div>
        <div>
          <Label htmlFor="claim-amount">Claim Amount</Label>
          <Input 
            id="claim-amount"
            type="number"
            value={data.claimInfo.amount || ""} 
            onChange={(e) => setData(prev => ({
              ...prev,
              claimInfo: { ...prev.claimInfo, amount: parseFloat(e.target.value) || 0 }
            }))}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="claim-description">Claim Description</Label>
        <Textarea 
          id="claim-description"
          value={data.claimInfo.description || ""} 
          onChange={(e) => setData(prev => ({
            ...prev,
            claimInfo: { ...prev.claimInfo, description: e.target.value }
          }))}
          rows={3}
          className="mt-2"
        />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">AI Document Processing</h4>
        <p className="text-sm text-green-700 mb-3">
          Upload your invoices and receipts. I'll automatically extract line items and validate amounts.
        </p>
        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button 
          onClick={() => onComplete(data, 'claim')}
          className="flex-1"
        >
          Submit Claim
        </Button>
        <Button variant="outline" onClick={() => setViewMode('chat')}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Back to Chat
        </Button>
      </div>
    </div>
  );

  const renderStageCompletionSidebar = () => {
    if (!data.intent || data.stageCompletions.length === 0) return null;

    return (
      <div className="w-80 border-l bg-muted/30 p-4 space-y-4 overflow-y-auto">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Application Progress</h3>
          <div className="relative">
            <div className="text-3xl font-bold text-primary mb-1">{data.completenessScore}%</div>
            <div className="text-sm text-muted-foreground">Overall Completion</div>
            <Progress value={data.completenessScore} className="mt-2" />
          </div>
        </div>

        {/* Triage Lane Indicator */}
        {data.triageLane && (
          <div className={`p-3 rounded-lg border ${
            data.triageLane.type === 'fast-track' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${
                data.triageLane.type === 'fast-track' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <span className="font-medium text-sm">
                {data.triageLane.type === 'fast-track' ? '🏃‍♂️ Fast-Track Lane' : '🧭 Guided Lane'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {data.triageLane.sla} • {data.triageLane.reviewer}
            </div>
          </div>
        )}

        {/* API Integration Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Government API Status</h4>
          {Object.entries(data.apiIntegrations).map(([api, status]) => (
            <div key={api} className="flex items-center justify-between text-xs">
              <span className="capitalize">{api === 'myInfo' ? 'MyInfo' : api.toUpperCase()}</span>
              <div className="flex items-center gap-2">
                {status.status === 'success' ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">{status.confidence}%</span>
                  </>
                ) : status.status === 'failed' ? (
                  <>
                    <AlertCircle className="h-3 w-3 text-red-600" />
                    <span className="text-red-600">Failed</span>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                    <span className="text-blue-600">Processing</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stage Completions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Stage Progress</h4>
          {data.stageCompletions.map((stage) => (
            <div key={stage.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{stage.percentage}%</span>
                  <div className={`w-3 h-3 rounded-full ${
                    stage.status === 'completed' ? 'bg-green-500' :
                    stage.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                </div>
              </div>
              <Progress value={stage.percentage} className="h-1.5" />
              
              {/* Field Details */}
              <div className="space-y-1">
                {stage.fields.slice(0, 3).map((field) => (
                  <div key={`${stage.id}-${field.name}`} className="flex items-center justify-between text-xs">
                    <span className="capitalize text-muted-foreground">
                      {field.name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <div className="flex items-center gap-1">
                      {field.completed ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          {field.source && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {field.source === 'myinfo' ? 'MyInfo' : 
                               field.source === 'acra' ? 'ACRA' : 
                               field.source === 'iras' ? 'IRAS' : 
                               field.source === 'user' ? 'Manual' : field.source}
                            </Badge>
                          )}
                          {field.confidence && (
                            <span className={`text-xs ${
                              field.confidence === 'high' ? 'text-green-600' :
                              field.confidence === 'medium' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {field.confidence.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </>
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
                {stage.fields.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{stage.fields.length - 3} more fields
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 pt-4 border-t">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="space-y-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-xs"
              onClick={() => setViewMode(viewMode === 'chat' ? 'form' : 'chat')}
            >
              <ArrowLeftRight className="h-3 w-3 mr-2" />
              Switch to {viewMode === 'chat' ? 'Form' : 'Chat'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-xs"
              onClick={() => alert('Download progress report')}
            >
              <Download className="h-3 w-3 mr-2" />
              Download Progress
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 ai-modal-overlay flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full modal-content ai-chat-container flex flex-col bg-white max-w-7xl">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="flex items-center gap-3 min-w-0 flex-shrink">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg whitespace-nowrap">🤖 Unified AI Assistant</h3>
                <p className="text-sm text-muted-foreground font-normal hidden sm:block truncate">
                  {data.intent === 'application' ? 'Application Assistant' : 
                   data.intent === 'claim' ? 'Claims Assistant' : 
                   'Multi-Purpose Assistant'}
                </p>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden lg:flex items-center gap-2 text-right mr-2">
                <div className="text-sm font-medium whitespace-nowrap">{data.currentPhase}</div>
                <Progress value={data.progress} className="w-24 h-2" />
              </div>
              <div className="flex items-center gap-1">
                <Switch
                  checked={viewMode === 'form'}
                  onCheckedChange={toggleViewMode}
                  disabled={!data.intent}
                />
                <Label className="text-xs hidden sm:inline whitespace-nowrap">
                  {viewMode === 'chat' ? 'Chat' : 'Form'}
                </Label>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                ✕
              </Button>
            </div>
          </div>
          
          {/* Mobile progress */}
          <div className="block md:hidden mt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">{data.currentPhase}</div>
              <div className="text-xs text-muted-foreground">{data.progress}%</div>
            </div>
            <Progress value={data.progress} className="w-full h-2" />
          </div>

          {/* Intent indicator */}
          {data.intent && (
            <div className="flex items-center gap-2 mt-2">
              <Badge className={
                data.intent === 'application' ? 'bg-blue-100 text-blue-700' :
                data.intent === 'claim' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }>
                {data.intent === 'application' ? '🏢 Application Mode' :
                 data.intent === 'claim' ? '💰 Claims Mode' :
                 '❓ General Mode'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                {data.progress}% Complete
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-row p-0 min-h-0 flex-grow">
          <div className="flex-1 flex flex-col min-w-0">
            {viewMode === 'chat' ? (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 ai-messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 sm:gap-3 ${
                      message.type === 'user' ? 'justify-end' : 
                      message.type === 'system' ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}
                    
                    {message.type === 'system' && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`${
                      message.type === 'user' ? 'max-w-[85%] sm:max-w-[75%] order-2' : 
                      message.type === 'system' ? 'max-w-[90%]' : 'max-w-[85%] sm:max-w-[75%]'
                    }`}>
                      <div
                        className={`rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : message.type === 'system'
                            ? 'bg-green-50 border border-green-200 text-center'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">{message.content}</div>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 h-auto"
                                onClick={() => {
                                  setInputValue(suggestion);
                                  handleSendMessage();
                                }}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {message.actionButtons && (
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                            {message.actionButtons.map((button, index) => (
                              <Button
                                key={index}
                                variant={button.variant || 'default'}
                                size="sm"
                                className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 h-auto flex items-center gap-1"
                                onClick={button.action}
                              >
                                {button.icon && <button.icon className="h-3 w-3" />}
                                {button.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        <span className="text-xs sm:text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t p-3 sm:p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message... I understand natural language!"
                      className="pr-16 sm:pr-20 text-sm sm:text-base"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                      >
                        <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim()} 
                    className="px-3 sm:px-4"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2 justify-center sm:justify-start">
                  <Sparkles className="h-3 w-3 text-blue-600" />
                  <span className="hidden sm:inline">Unified AI • Applications & Claims • Government Integration</span>
                  <span className="sm:hidden">AI-Powered • Secure</span>
                </div>
              </div>
            </>
          ) : (
            /* Form View */
            <div className="flex-1 overflow-y-auto">
              {renderFormView()}
            </div>
          )}
          </div>
          
          {/* Stage Completion Sidebar */}
          {data.intent && renderStageCompletionSidebar()}
        </CardContent>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png,.xlsx"
          className="hidden"
        />
      </Card>
    </div>
  );
});