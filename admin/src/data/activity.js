// AgriShield Admin - Activity Timeline Dataset

export const initialActivity = [
  {
    id: "ACT-101",
    time: "10:24 PM",
    title: "AI detected Elephant in Wayanad",
    description: "Camera CAM-023 triggered with 96% neural confidence in Sultan Bathery Sector 4.",
    type: "alert",
    icon: "Radio",
    color: "rose"
  },
  {
    id: "ACT-102",
    time: "09:48 PM",
    title: "New complaint submitted by Rahul Kumar",
    description: "Ticket CMP-001 filed for paddy crop destruction along buffer perimeter.",
    type: "complaint",
    icon: "MessageSquareWarning",
    color: "amber"
  },
  {
    id: "ACT-103",
    time: "08:15 PM",
    title: "Leopard alert verified",
    description: "DFO Anjali Nair confirmed feline thermal sighting on CAM-014 at Vandiperiyar.",
    type: "verified",
    icon: "CheckCircle2",
    color: "blue"
  },
  {
    id: "ACT-104",
    time: "07:40 PM",
    title: "New farmer registered",
    description: "Anjali S enlisted Highrange Apiaries (3.2 Acres) into agricultural directory.",
    type: "farmer",
    icon: "Trees",
    color: "emerald"
  },
  {
    id: "ACT-105",
    time: "06:30 PM",
    title: "New marketplace product added",
    description: "Fresh Tomato (200 kg) listed by farmer Rahul Kumar at ₹60/kg.",
    type: "product",
    icon: "ShoppingBag",
    color: "emerald"
  },
  {
    id: "ACT-106",
    time: "04:12 PM",
    title: "Spotted deer herd monitored in Parambikulam",
    description: "CAM-009 logged 6 chital deer grazing peacefully in buffer fringe.",
    type: "alert",
    icon: "Radio",
    color: "teal"
  },
  {
    id: "ACT-107",
    time: "02:15 PM",
    title: "Solar perimeter fence energized",
    description: "Chalakudy range flying squad repaired line tension to 9.4 kV.",
    type: "patrol",
    icon: "ShieldAlert",
    color: "teal"
  },
  {
    id: "ACT-108",
    time: "11:30 AM",
    title: "Damage inspection squad dispatched",
    description: "RRT-04 mobilized for GPS crop loss survey at Sultan Bathery.",
    type: "patrol",
    icon: "Send",
    color: "purple"
  }
];

export default initialActivity;
