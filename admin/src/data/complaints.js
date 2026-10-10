// AgriShield Admin - Complaints Dataset

export const initialComplaints = [
  {
    id: "CMP-001",
    type: "Crop Damage",
    reporter: "Rahul Kumar",
    phone: "+91 98471 23456",
    location: "Wayanad, Kerala",
    subLocation: "Sultan Bathery, Ward 6",
    date: "07 Oct 2026",
    time: "06:30 AM",
    priority: "High",
    status: "Pending",
    description: "An elephant herd entered the agricultural paddy field during the night and damaged 1.5 acres of maturing crops and broke 40m of border solar fence.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹45,000",
    officerNotes: "Inspection team RRT-04 scheduled for GPS site survey today at 11:30 AM."
  },
  {
    id: "CMP-002",
    type: "Animal Attack",
    reporter: "Anjali S",
    phone: "+91 94462 87654",
    location: "Idukki, Kerala",
    subLocation: "Vandiperiyar Tea Cluster",
    date: "06 Oct 2026",
    time: "08:45 PM",
    priority: "Critical",
    status: "Under Review",
    description: "Indian leopard spotted hunting small game adjacent to plantation worker line quarters. Cattle in shed were severely distressed.",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "N/A (Preventive Safety)",
    officerNotes: "Thermal camera CAM-014 recorded feline presence. Searchlight vehicle deployed."
  },
  {
    id: "CMP-003",
    type: "Wildlife Sighting",
    reporter: "Suresh G",
    phone: "+91 97455 11223",
    location: "Ernakulam, Kerala",
    subLocation: "Kothamangalam Foothills",
    date: "05 Oct 2026",
    time: "05:15 PM",
    priority: "Medium",
    status: "Verified",
    description: "Sounder of 4 adult wild boars sighted foraging within 50 meters of tapioca crop boundary. Wires showing mechanical strain.",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹8,000",
    officerNotes: "Site checked by Forester K. Balan. Solar fence energizer repaired and re-tensioned."
  },
  {
    id: "CMP-004",
    type: "Fence Breach",
    reporter: "Divakaran K. R.",
    phone: "+91 98950 33445",
    location: "Thrissur, Kerala",
    subLocation: "Chalakudy Forest Range",
    date: "04 Oct 2026",
    time: "02:15 PM",
    priority: "Medium",
    status: "Resolved",
    description: "Heavy rain caused fallen teak tree limb to sever perimeter electric fence. Flying squad cleared tree and re-energized line.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹6,500",
    officerNotes: "Wire replaced at 9.4kV normal tension. Ticket verified and closed."
  },
  {
    id: "CMP-005",
    type: "Illegal Intrusion",
    reporter: "Forest Watcher Anonymous",
    phone: "+91 94471 99887",
    location: "Nilambur, Malappuram",
    subLocation: "Compartment 12 Buffer",
    date: "03 Oct 2026",
    time: "11:30 PM",
    priority: "High",
    status: "Rejected",
    description: "Suspicion of unauthorized timber cutting after strange acoustic vibrations heard along border track.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "N/A",
    officerNotes: "Night patrol investigated area; vibration was caused by road construction tractor on adjacent highway. False alarm."
  },
  {
    id: "CMP-006",
    type: "Sloth Bear Raid",
    reporter: "Mathew C",
    phone: "+91 94460 77112",
    location: "Munnar, Kerala",
    subLocation: "Highland Spice Estate",
    date: "02 Oct 2026",
    time: "10:10 PM",
    priority: "High",
    status: "Pending",
    description: "Solitary bear damaged 3 apiary beehives and scratched cardamom processing shed exterior wall.",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹12,000",
    officerNotes: "Sensor CAM-031 telemetry correlated. Inspection pending by Ranger Harikrishnan."
  }
];

export default initialComplaints;

