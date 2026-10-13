// AgriShield Clean Dataset - Ready for Live Production Data

export const sampleProducts = [];

export const sampleWildlifeAlerts = [];

export const sampleComplaints = [];

export const officerMetrics = {
  wildlifeAlerts: 0,
  pendingComplaints: 0,
  verifiedAlerts: 0,
  resolvedComplaints: 0,
  patrolTeamsActive: 0,
  connectedCameras: 0,
  registeredFarmers: 0,
  activeZones: 0
};

export const sampleFeatures = [
  {
    id: "feat-market",
    title: "Marketplace",
    description: "Buy & sell agricultural products directly without middlemen.",
    icon: "ShoppingBag",
    link: "/marketplace",
    highlight: "Zero Commission"
  },
  {
    id: "feat-alerts",
    title: "Wildlife Alerts",
    description: "AI-powered wildlife detection and real-time community alerts.",
    icon: "ShieldAlert",
    link: "/wildlife-alerts",
    highlight: "96% AI Accuracy"
  },
  {
    id: "feat-complaints",
    title: "Complaints",
    description: "Report wildlife attacks, crop damages and forest boundary issues.",
    icon: "MessageSquareWarning",
    link: "/complaints",
    highlight: "Fast Response"
  },
  {
    id: "feat-forest",
    title: "Forest Protection",
    description: "Collaborative tech supporting safer villages and wildlife habitats.",
    icon: "Trees",
    link: "/admin/dashboard",
    highlight: "Govt. Integrated"
  },
  {
    id: "feat-farmers",
    title: "For Farmers",
    description: "Showcase fresh harvests, receive fair prices and protect crops.",
    icon: "Users",
    link: "/register?role=farmer",
    highlight: "Direct Empowerment"
  },
  {
    id: "feat-users",
    title: "For Users",
    description: "Discover fresh organic produce, support farmers and keep communities safe.",
    icon: "Leaf",
    link: "/marketplace",
    highlight: "100% Farm Fresh"
  }
];
