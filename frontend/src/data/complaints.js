// AgriShield Community Complaints Dataset

export const complaints = [
  {
    id: "CMP001",
    type: "Elephant Crop Damage",
    reportedBy: "Rajesh Kumar",
    phone: "+91 98471 23456",
    email: "rajesh.wayanad@example.com",
    location: "Wayanad, Kerala",
    subLocation: "Sultan Bathery, Ward 6",
    date: "07 Oct 2026",
    time: "06:30 AM",
    status: "Pending",
    severity: "Critical",
    description: "An elephant entered the agricultural field during the night and damaged crops. About 1.5 acres of maturing paddy was flattened, and 40 meters of border solar wire fence was uprooted.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹45,000",
    officerNotes: "Inspection team RRT-04 scheduled for site survey today at 11:30 AM. GPS perimeter survey required.",
    affectedCrop: "Kerala Matta Paddy (1.5 Acres)",
    history: [
      { step: "Submitted by Citizen", time: "07 Oct 2026, 06:30 AM", user: "Rajesh Kumar" },
      { step: "Automated Ticket Dispatched", time: "07 Oct 2026, 06:32 AM", user: "AgriShield System" },
      { step: "Assigned to Range Officer", time: "07 Oct 2026, 07:15 AM", user: "Ranger S. Madhavan" }
    ]
  },
  {
    id: "CMP002",
    type: "Leopard Sighting",
    reportedBy: "Mariyamma Chacko",
    phone: "+91 94462 87654",
    email: "mariyamma.c@example.com",
    location: "Idukki, Kerala",
    subLocation: "Vandiperiyar Tea Cluster",
    date: "07 Oct 2026",
    time: "08:45 PM",
    status: "Under Review",
    severity: "Critical",
    description: "Leopard was spotted resting on a rock ledge 50 meters behind our cowshed. Cattle were distressed and loud barking alerted the neighborhood. Night movement poses danger for plantation labor.",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "N/A (Safety Measure)",
    officerNotes: "Camera trap CAM-014 recorded feline presence. Searchlight patrol deployed. Estate manager instructed to illuminate line quarters.",
    affectedCrop: "Livestock & Worker Safety",
    history: [
      { step: "Submitted by Citizen", time: "07 Oct 2026, 08:45 PM", user: "Mariyamma Chacko" },
      { step: "Status changed to Under Review", time: "07 Oct 2026, 09:10 PM", user: "DFO Anjali Nair" }
    ]
  },
  {
    id: "CMP003",
    type: "Fence Breach & Forest Issue",
    reportedBy: "Divakaran K. R.",
    phone: "+91 97455 11223",
    email: "divakaran.k@example.com",
    location: "Thrissur, Kerala",
    subLocation: "Chalakudy Forest Range",
    date: "05 Oct 2026",
    time: "02:15 PM",
    status: "Verified",
    severity: "High",
    description: "Heavy rain caused a fallen teak tree branch to snap the solar boundary fence wire energizer line. Wild boars have started slipping into vegetable gardens.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹8,000",
    officerNotes: "Site inspected by Forester V. Paulose. Verified fallen limb. Repair crew issued work permit for wire re-tensioning.",
    affectedCrop: "Perimeter Solar Fence",
    history: [
      { step: "Submitted by Citizen", time: "05 Oct 2026, 02:15 PM", user: "Divakaran K. R." },
      { step: "Verified on Ground", time: "05 Oct 2026, 04:30 PM", user: "Forester V. Paulose" }
    ]
  },
  {
    id: "CMP004",
    type: "Wild Boar Crop Damage",
    reportedBy: "Sukumaran P.",
    phone: "+91 98950 33445",
    email: "sukumaran.p@example.com",
    location: "Wayanad, Kerala",
    subLocation: "Mananthavady Foothills",
    date: "03 Oct 2026",
    time: "07:00 AM",
    status: "Resolved",
    severity: "Medium",
    description: "Sounder of wild boars dug up and destroyed mature tapioca and elephant foot yam crops across 0.5 acres during nocturnal feeding.",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹18,000",
    officerNotes: "Field survey completed on 04 Oct. Compensation of ₹16,500 sanctioned via direct DBT transfer under Govt Wildlife Relief Fund.",
    affectedCrop: "Tapioca & Yam (0.5 Acres)",
    history: [
      { step: "Submitted by Citizen", time: "03 Oct 2026, 07:00 AM", user: "Sukumaran P." },
      { step: "Verified by Range Officer", time: "03 Oct 2026, 11:30 AM", user: "Ranger S. Madhavan" },
      { step: "Compensation Sanctioned & Resolved", time: "04 Oct 2026, 03:00 PM", user: "DFO Office" }
    ]
  },
  {
    id: "CMP005",
    type: "Illegal Encroachment",
    reportedBy: "Forest Watcher Anonymous",
    phone: "+91 94471 99887",
    email: "watcher.nilambur@kerala.gov.in",
    location: "Nilambur, Malappuram",
    subLocation: "Compartment 12 Reserve",
    date: "01 Oct 2026",
    time: "11:30 PM",
    status: "Resolved",
    severity: "High",
    description: "Chainsaw noises and tractor movement spotted in forest compartment 12 buffer zone between 11 PM and midnight.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "N/A",
    officerNotes: "Flying squad intercepted illegal tractor carrying teak timber. 2 suspects detained under Kerala Forest Act 1961.",
    affectedCrop: "Teak Reserve Forest",
    history: [
      { step: "Reported by Watcher", time: "01 Oct 2026, 11:30 PM", user: "Watcher Unit" },
      { step: "Flying Squad Interception", time: "02 Oct 2026, 01:15 AM", user: "Flying Squad RFO" },
      { step: "Case Booked & Resolved", time: "02 Oct 2026, 10:00 AM", user: "Divisional Office" }
    ]
  },
  {
    id: "CMP006",
    type: "Livestock Attack by Tiger",
    reportedBy: "Chandran Pillai",
    phone: "+91 94951 88332",
    email: "chandran.pillai@example.com",
    location: "Munnar, Idukki",
    subLocation: "Mattupetty Buffer Line",
    date: "28 Sep 2026",
    time: "05:15 PM",
    status: "Rejected",
    severity: "High",
    description: "Claimed a cow was attacked inside private farmland by tiger. Claim request for ₹25,000 compensation.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    compensationClaimed: "₹25,000",
    officerNotes: "Veterinary and ranger post-mortem inspection proved cattle demise was due to feral stray dog attack outside forest zone. Claim ineligible under Forest Wildlife Rules.",
    affectedCrop: "Cattle (Single Head)",
    history: [
      { step: "Submitted by Citizen", time: "28 Sep 2026, 05:15 PM", user: "Chandran Pillai" },
      { step: "Veterinary Survey Rejected Claim", time: "29 Sep 2026, 02:00 PM", user: "Veterinary Surgeon" }
    ]
  }
];

export default complaints;
