// AgriShield Mock Data for Day 1 Frontend

export const sampleProducts = [
  {
    id: "prod-1",
    name: "Organic Rice",
    price: 45,
    unit: "kg",
    category: "Grains",
    badge: "Organic",
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    location: "Kozhikode, Kerala",
    seller: {
      name: "Ramesh Kumar",
      phone: "+91 98471 23456",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      verified: true,
      farmName: "Puzha Organic Farm"
    },
    quantityAvailable: 500,
    description: "Naturally grown traditional Kerala Matta rice cultivated using organic bio-fertilizers. Rich in fiber, magnesium, and minerals without synthetic pesticides.",
    harvestDate: "September 2026",
    features: ["100% Pesticide Free", "Direct from Farmer", "Traditional Heritage Seed", "Sun Dried"]
  },
  {
    id: "prod-2",
    name: "Mixed Farm Vegetables",
    price: 30,
    unit: "kg",
    category: "Vegetables",
    badge: "Fresh",
    rating: 4.8,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
    location: "Malappuram, Kerala",
    seller: {
      name: "Lakshmi Farm",
      phone: "+91 94462 87654",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      verified: true,
      farmName: "Green Valley Collective"
    },
    quantityAvailable: 150,
    description: "Freshly harvested assorted local garden vegetables including okra, ivy gourd, snake gourd, brinjal, and green chilies. Picked every morning.",
    harvestDate: "Daily Fresh",
    features: ["Morning Fresh Harvest", "Chemical Residue Free", "Supports Local Women Farmers"]
  },
  {
    id: "prod-3",
    name: "Pure Wild Forest Honey",
    price: 250,
    unit: "500g",
    category: "Other",
    badge: "Pure",
    rating: 5.0,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    location: "Idukki, Kerala",
    seller: {
      name: "Green Valley Farms",
      phone: "+91 97455 11223",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      verified: true,
      farmName: "Highrange Apiaries"
    },
    quantityAvailable: 80,
    description: "Raw unfiltered natural honey sourced ethically from mountain forests of Idukki. Contains live enzymes, pollen, and natural antibacterial properties with no added syrup.",
    harvestDate: "August 2026",
    features: ["Raw & Unprocessed", "Wild Flora Origin", "Ethically Collected", "Glass Jar Packed"]
  },
  {
    id: "prod-4",
    name: "Fresh Kerala Coconut",
    price: 20,
    unit: "piece",
    category: "Fruits",
    badge: "Natural",
    rating: 4.7,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1563273295-88f58c733359?auto=format&fit=crop&w=800&q=80",
    location: "Thrissur, Kerala",
    seller: {
      name: "Suresh Farm",
      phone: "+91 98950 33445",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      rating: 4.7,
      verified: true,
      farmName: "Kera Agro Grove"
    },
    quantityAvailable: 1000,
    description: "Thick meat, sweet water coconuts straight from mature coastal coconut palms. Ideal for cooking, fresh coconut milk extraction, and oil making.",
    harvestDate: "Weekly Harvest",
    features: ["Sweet Natural Water", "High Oil Content", "Large Sized Coconuts"]
  },
  {
    id: "prod-5",
    name: "Wayanad Black Pepper",
    price: 400,
    unit: "kg",
    category: "Spices",
    badge: "Spices",
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    location: "Wayanad, Kerala",
    seller: {
      name: "Spice World Co.",
      phone: "+91 94471 99887",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      verified: true,
      farmName: "Wayanad Hills Spice Estate"
    },
    quantityAvailable: 250,
    description: "Premium bold black pepper berries from high altitude hills of Wayanad. Intense aroma, high piperine content, sun-dried naturally on bamboo mats.",
    harvestDate: "August 2026",
    features: ["Export Quality Grade A", "High Piperine", "Sun Dried Naturally", "Aromatic & Pungent"]
  },
  {
    id: "prod-6",
    name: "Green Cardamom Extra Bold",
    price: 1800,
    unit: "kg",
    category: "Spices",
    badge: "Spices",
    rating: 5.0,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    location: "Munnar, Kerala",
    seller: {
      name: "Munnar Green Spices",
      phone: "+91 94460 77112",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      verified: true,
      farmName: "Highland Spice Garden"
    },
    quantityAvailable: 60,
    description: "8mm+ extra bold fragrant green cardamom pods cultivated in shaded misty slopes of Munnar. Perfect for culinary dishes, tea, and desserts.",
    harvestDate: "September 2026",
    features: ["8mm Bold Pods", "Fresh Green Color", "Intense Fragrance"]
  },
  {
    id: "prod-7",
    name: "Pure Country Cow Milk",
    price: 55,
    unit: "L",
    category: "Dairy",
    badge: "Fresh",
    rating: 4.8,
    reviewsCount: 43,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    location: "Palakkad, Kerala",
    seller: {
      name: "Ksheera Dairy Co-op",
      phone: "+91 94951 88332",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      verified: true,
      farmName: "Palakkad Native Cattle Farm"
    },
    quantityAvailable: 120,
    description: "Fresh unpasteurized raw A2 milk from grass-fed native Indian cows. Rich natural cream layer, free from hormones or adulterants.",
    harvestDate: "Daily Morning",
    features: ["A2 Certified", "Grass Fed Cows", "Glass Bottle Delivery"]
  },
  {
    id: "prod-8",
    name: "Malabar Nendran Banana",
    price: 60,
    unit: "kg",
    category: "Fruits",
    badge: "Organic",
    rating: 4.9,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    location: "Thrissur, Kerala",
    seller: {
      name: "Haritha Farmers Society",
      phone: "+91 98475 44221",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      verified: true,
      farmName: "Thrissur Kole Agro Fields"
    },
    quantityAvailable: 350,
    description: "Iconic sweet Kerala Nendran plantains ripened naturally on trees without carbide. Essential for banana chips, baby food, and traditional Kerala cuisine.",
    harvestDate: "Weekly Harvest",
    features: ["Chemical Ripening Free", "Naturally Sweet", "High Nutrition"]
  }
];

export const sampleWildlifeAlerts = [
  {
    id: "alert-101",
    animal: "Elephant",
    confidence: 96,
    location: "Wayanad, Kerala",
    zone: "Muthanga Wildlife Sanctuary Border",
    dateTime: "07 Oct 2026 • 10:24 PM",
    camera: "CAM-023",
    status: "Active Alert",
    severity: "High",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
    description: "Adult male Asian elephant detected moving towards agricultural paddy perimeter fence. Proximity to human settlement is approximately 400 meters.",
    suggestedAction: "Alert nearby farm clusters, activate acoustic deterrents, deploy rapid response ranger vehicle.",
    officerInCharge: "Ranger S. Madhavan (Range 4)",
    verified: true
  },
  {
    id: "alert-102",
    animal: "Leopard",
    confidence: 91,
    location: "Idukki, Kerala",
    zone: "Vandiperiyar Tea Estate Sector 3",
    dateTime: "07 Oct 2026 • 08:15 PM",
    camera: "CAM-014",
    status: "Active Alert",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80",
    description: "Indian leopard spotted hunting small game along the forest boundary trail adjacent to plantation worker quarters.",
    suggestedAction: "Issue SMS flash warning to estate workers, avoid night movements, patrol vehicle dispatched.",
    officerInCharge: "DFO Anjali Nair",
    verified: true
  },
  {
    id: "alert-103",
    animal: "Wild Boar",
    confidence: 88,
    location: "Ernakulam, Kerala",
    zone: "Kothamangalam Foothills",
    dateTime: "07 Oct 2026 • 06:40 PM",
    camera: "CAM-042",
    status: "Warning",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80",
    description: "Sounder of 4 wild boars observed foraging near tapioca plantation boundary. Solar fence indicates no breach yet.",
    suggestedAction: "Check solar fence energizer status and notify local farmer ward.",
    officerInCharge: "Officer K. Balan",
    verified: true
  },
  {
    id: "alert-104",
    animal: "Spotted Deer",
    confidence: 94,
    location: "Palakkad, Kerala",
    zone: "Parambikulam Fringe Zone",
    dateTime: "06 Oct 2026 • 04:12 PM",
    camera: "CAM-009",
    status: "Monitored",
    severity: "Low",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=800&q=80",
    description: "Herd of chital deer grazing in the buffer meadow. No threat to human habitation or crops detected.",
    suggestedAction: "Routine observation logging. No intervention needed.",
    officerInCharge: "Forester George Mathew",
    verified: true
  },
  {
    id: "alert-105",
    animal: "Sloth Bear",
    confidence: 89,
    location: "Silent Valley, Kerala",
    zone: "Attappady Buffer Reserve",
    dateTime: "06 Oct 2026 • 11:05 PM",
    camera: "CAM-031",
    status: "Active Alert",
    severity: "High",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80",
    description: "Sloth bear detected scavenging near apiary beehives on agricultural boundary. Nocturnal movement recorded.",
    suggestedAction: "Advise beekeepers to secure hives with sensory lighting. Night patrol notified.",
    officerInCharge: "Officer Harikrishnan V.",
    verified: false
  }
];

export const sampleComplaints = [
  {
    id: "CMP-2026-089",
    type: "Crop Damage",
    title: "Elephant herd damaged paddy crop & solar fencing",
    description: "A group of 3 elephants broke through the border solar fence around 2:00 AM and ruined 1.5 acres of ready-to-harvest paddy in Sultan Bathery ward.",
    location: "Sultan Bathery, Wayanad",
    date: "06 Oct 2026",
    status: "Pending",
    severity: "High",
    reportedBy: "Sukumaran P. (Farmer)",
    compensationClaimed: "₹45,000",
    officerNotes: "Inspection team scheduled for field assessment tomorrow morning."
  },
  {
    id: "CMP-2026-084",
    type: "Wildlife Sighting",
    title: "Leopard spotted near cattle shed",
    description: "Leopard was seen resting on a rock ledge 50 meters behind the cowshed. Cattle were terrified and barking dogs alerted family members.",
    location: "Vandiperiyar, Idukki",
    date: "05 Oct 2026",
    status: "Under Review",
    severity: "Critical",
    reportedBy: "Mariyamma Chacko",
    compensationClaimed: "N/A",
    officerNotes: "Camera trap CAM-014 confirms sighting. Crackers and searchlights issued to cluster."
  },
  {
    id: "CMP-2026-077",
    type: "Forest Fence Breach",
    title: "Fallen teak tree severed solar boundary fence",
    description: "Heavy rain caused a branch to fall on the electric energizer line. Wild boars have started entering vegetable garden.",
    location: "Chalakudy, Thrissur",
    date: "03 Oct 2026",
    status: "Resolved",
    severity: "Medium",
    reportedBy: "K. R. Divakaran",
    compensationClaimed: "₹8,000",
    officerNotes: "Wire replaced and energizer re-tested. Status verified by local forester."
  },
  {
    id: "CMP-2026-071",
    type: "Illegal Encroachment",
    title: "Suspected timber cutting in sanctuary buffer",
    description: "Chainsaw noises heard in forest compartment 12 between 11 PM and midnight.",
    location: "Nilambur, Malappuram",
    date: "01 Oct 2026",
    status: "Resolved",
    severity: "High",
    reportedBy: "Forest Watcher Anonymous",
    compensationClaimed: "N/A",
    officerNotes: "Patrol intercepted vehicle. Case booked under Wildlife Protection Act."
  }
];

export const officerMetrics = {
  wildlifeAlerts: 24,
  pendingComplaints: 12,
  verifiedAlerts: 18,
  resolvedComplaints: 35,
  patrolTeamsActive: 8,
  connectedCameras: 56,
  registeredFarmers: 512,
  activeZones: 14
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
    link: "/officer/dashboard",
    highlight: "Govt. Integrated"
  },
  {
    id: "feat-farmers",
    title: "For Farmers",
    description: "Showcase fresh harvests, receive fair prices and protect crops.",
    icon: "Users",
    link: "/register?role=farmer",
    highlight: "Empowering 500+ Farmers"
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
