// AgriShield Admin - Wildlife Alerts Dataset

export const initialWildlifeAlerts = [
  {
    id: "AL-001",
    animal: "Elephant",
    confidence: 96,
    location: "Wayanad, Kerala",
    coordinates: "11.6854° N, 76.1320° E",
    date: "07 Oct 2026",
    time: "10:24 PM",
    source: "AI Camera",
    camera: "CAM-023",
    status: "Pending Verification",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    zone: "Muthanga Sanctuary Border (Sector 4)",
    description: "Adult male Asian elephant detected moving along paddy boundary fence within 350 meters of residential dwellings.",
    suggestedAction: "Alert Sultan Bathery cluster, dispatch Rapid Response Patrol vehicle RRT-04, prepare acoustic deterrent sounders.",
    officerNotes: "Camera trap triggered automated optical alarm at 22:24:18. Patrol unit notified.",
    sensorData: {
      temperature: "21°C",
      battery: "98%",
      solarCharge: "94%",
      signal: "Strong 5G"
    }
  },
  {
    id: "AL-002",
    animal: "Leopard",
    confidence: 91,
    location: "Idukki, Kerala",
    coordinates: "9.8494° N, 77.0185° E",
    date: "07 Oct 2026",
    time: "08:15 PM",
    source: "AI Camera",
    camera: "CAM-014",
    status: "Verified",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
    zone: "Vandiperiyar Tea Estate Sector 3",
    description: "Indian leopard spotted moving along forest boundary trail adjacent to plantation worker line quarters.",
    suggestedAction: "Broadcast SMS warning to estate workers, deploy searchlight vehicle, keep livestock penned.",
    officerNotes: "Verified by DFO Anjali Nair via thermal video replay. Night watch posted.",
    sensorData: {
      temperature: "18°C",
      battery: "92%",
      solarCharge: "88%",
      signal: "Moderate 4G"
    }
  },
  {
    id: "AL-003",
    animal: "Wild Boar",
    confidence: 88,
    location: "Ernakulam, Kerala",
    coordinates: "10.0537° N, 76.6289° E",
    date: "07 Oct 2026",
    time: "06:45 PM",
    source: "AI Camera",
    camera: "CAM-042",
    status: "Under Review",
    severity: "High",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80",
    zone: "Kothamangalam Foothills Sector B",
    description: "Sounder of 4 wild boars observed foraging along tapioca perimeter line.",
    suggestedAction: "Inspect perimeter solar fence energizer and notify local farmer ward.",
    officerNotes: "Awaiting ground confirmation from Beat Forester K. Balan.",
    sensorData: {
      temperature: "26°C",
      battery: "100%",
      solarCharge: "99%",
      signal: "Strong 5G"
    }
  },
  {
    id: "AL-004",
    animal: "Spotted Deer",
    confidence: 94,
    location: "Palakkad, Kerala",
    coordinates: "10.5364° N, 76.7725° E",
    date: "06 Oct 2026",
    time: "04:12 PM",
    source: "AI Camera",
    camera: "CAM-009",
    status: "Verified",
    severity: "Low",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80",
    zone: "Parambikulam Fringe Buffer Zone",
    description: "Group of 6 chital deer grazing peacefully in natural meadow buffer.",
    suggestedAction: "Routine observation logging. No intervention needed.",
    officerNotes: "Regular herbivore herd census noted.",
    sensorData: {
      temperature: "28°C",
      battery: "95%",
      solarCharge: "96%",
      signal: "Good 4G"
    }
  },
  {
    id: "AL-005",
    animal: "Sloth Bear",
    confidence: 89,
    location: "Silent Valley, Kerala",
    coordinates: "11.1342° N, 76.4385° E",
    date: "06 Oct 2026",
    time: "11:05 PM",
    source: "AI Camera",
    camera: "CAM-031",
    status: "Pending Verification",
    severity: "High",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80",
    zone: "Attappady Buffer Reserve Fringe",
    description: "Sloth bear detected scavenging near cardamom drying sheds and apiary beehives on agricultural boundary.",
    suggestedAction: "Alert local beekeepers to secure apiary hives with sensory lighting.",
    officerNotes: "Thermal camera triggered at 23:05. Night patrol notified.",
    sensorData: {
      temperature: "19°C",
      battery: "91%",
      solarCharge: "85%",
      signal: "Moderate 4G"
    }
  },
  {
    id: "AL-006",
    animal: "Bengal Tiger",
    confidence: 95,
    location: "Periyar, Kerala",
    coordinates: "9.4622° N, 77.1435° E",
    date: "05 Oct 2026",
    time: "02:20 AM",
    source: "AI Camera",
    camera: "CAM-002",
    status: "Verified",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    zone: "Thekkady Deep Ridge Corridor",
    description: "Adult male tiger recorded on ridge patrol trail heading south-west into core reserve.",
    suggestedAction: "Maintain camera telemetry surveillance. Normal apex predator movement.",
    officerNotes: "Stripes matched with Resident Male T-19.",
    sensorData: {
      temperature: "17°C",
      battery: "96%",
      solarCharge: "90%",
      signal: "Strong 5G"
    }
  }
];

export default initialWildlifeAlerts;

