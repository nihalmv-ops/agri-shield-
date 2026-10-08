// AgriShield Forest Officer Alerts Dataset

export const officerAlerts = [
  {
    id: 1,
    animal: "Elephant",
    confidence: 96,
    location: "Wayanad, Kerala",
    coordinates: "11.6854° N, 76.1320° E",
    date: "07 Oct 2026",
    time: "10:24 PM",
    camera: "CAM-023",
    source: "AI Wildlife Camera",
    status: "Pending Verification",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    zone: "Muthanga Wildlife Sanctuary Border (Range 4)",
    description: "Adult Asian tusker detected approaching agricultural paddy perimeter fence within 350 meters of residential cluster. Solar fence voltage active.",
    suggestedAction: "Alert Sultan Bathery farmer cluster, dispatch Rapid Response Patrol vehicle RRT-04, prepare acoustic deterrent sirens.",
    assignedRanger: "Ranger S. Madhavan (Badge #KFD-RNGR-109)",
    sensorData: {
      temperature: "21°C",
      humidity: "86%",
      battery: "98%",
      solarCharge: "94%"
    },
    notes: "Previous sightings recorded in Compartment 14. Herd movement pattern indicated."
  },
  {
    id: 2,
    animal: "Leopard",
    confidence: 91,
    location: "Idukki, Kerala",
    coordinates: "9.8494° N, 77.0185° E",
    date: "07 Oct 2026",
    time: "08:15 PM",
    camera: "CAM-014",
    source: "AI Wildlife Camera",
    status: "Verified",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
    zone: "Vandiperiyar Tea Estate Sector 3",
    description: "Indian leopard spotted moving along forest boundary trail adjacent to plantation worker line quarters. Prey hunting movement observed.",
    suggestedAction: "Broadcast SMS flash warning to estate workers, deploy searchlight vehicle, keep livestock securely penned.",
    assignedRanger: "DFO Anjali Nair (Badge #KFD-DFO-018)",
    sensorData: {
      temperature: "18°C",
      humidity: "92%",
      battery: "92%",
      solarCharge: "88%"
    },
    notes: "Verified by Forester V. Paulose on ground patrol. Searchlights issued to estate wardens."
  },
  {
    id: 3,
    animal: "Wild Boar",
    confidence: 88,
    location: "Ernakulam, Kerala",
    coordinates: "10.0537° N, 76.6289° E",
    date: "07 Oct 2026",
    time: "06:45 PM",
    camera: "CAM-042",
    source: "AI Wildlife Camera",
    status: "Under Review",
    severity: "High",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80",
    zone: "Kothamangalam Foothills Sector B",
    description: "Sounder of 4 adult wild boars foraging along tapioca farm boundary line. Fence wires showing mechanical vibrations.",
    suggestedAction: "Inspect perimeter solar fence energizer and notify local farmer ward.",
    assignedRanger: "Officer K. Balan (Badge #KFD-SFO-074)",
    sensorData: {
      temperature: "26°C",
      humidity: "78%",
      battery: "100%",
      solarCharge: "99%"
    },
    notes: "Awaiting ground watcher confirmation from Foothills Ward."
  },
  {
    id: 4,
    animal: "Spotted Deer",
    confidence: 94,
    location: "Palakkad, Kerala",
    coordinates: "10.5364° N, 76.7725° E",
    date: "06 Oct 2026",
    time: "04:12 PM",
    camera: "CAM-009",
    source: "AI Wildlife Camera",
    status: "Verified",
    severity: "Low",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80",
    zone: "Parambikulam Fringe Buffer Zone",
    description: "Group of 6 chital grazing naturally in forest meadow clearing. Zero risk to nearby human habitation.",
    suggestedAction: "Routine observation logging only. No intervention necessary.",
    assignedRanger: "Forester George Mathew (Badge #KFD-FST-201)",
    sensorData: {
      temperature: "28°C",
      humidity: "70%",
      battery: "95%",
      solarCharge: "96%"
    },
    notes: "Routine herbivore grazing census recorded."
  },
  {
    id: 5,
    animal: "Sloth Bear",
    confidence: 89,
    location: "Silent Valley, Kerala",
    coordinates: "11.1342° N, 76.4385° E",
    date: "06 Oct 2026",
    time: "11:05 PM",
    camera: "CAM-031",
    source: "AI Wildlife Camera",
    status: "Pending Verification",
    severity: "High",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80",
    zone: "Attappady Buffer Reserve Fringe",
    description: "Solitary sloth bear sighted scavenging near cardamom drying sheds and apiary beehives on agricultural boundary.",
    suggestedAction: "Alert beekeepers to secure apiary boxes with sensory lighting; dispatch night forest patrol.",
    assignedRanger: "Officer Harikrishnan V. (Badge #KFD-RNGR-145)",
    sensorData: {
      temperature: "19°C",
      humidity: "89%",
      battery: "91%",
      solarCharge: "85%"
    },
    notes: "Night camera thermal trip triggered at 11:04:42 PM."
  },
  {
    id: 6,
    animal: "Bengal Tiger",
    confidence: 95,
    location: "Periyar, Kerala",
    coordinates: "9.4622° N, 77.1435° E",
    date: "05 Oct 2026",
    time: "02:20 AM",
    camera: "CAM-002",
    source: "AI Wildlife Camera",
    status: "Verified",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    zone: "Thekkady Deep Ridge Corridor",
    description: "Adult male tiger recorded on ridge patrol trail heading south-west away from residential settlements towards core zone.",
    suggestedAction: "Maintain camera telemetry surveillance. Normal apex predator movement logged.",
    assignedRanger: "DFO Anjali Nair (Badge #KFD-DFO-018)",
    sensorData: {
      temperature: "17°C",
      humidity: "94%",
      battery: "96%",
      solarCharge: "90%"
    },
    notes: "Stripes pattern identified matching Resident Tiger T-19 'Veeran'."
  }
];

export default officerAlerts;
