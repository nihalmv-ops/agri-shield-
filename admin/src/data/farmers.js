// AgriShield Admin - Farmers Dataset

export const initialFarmers = [
  {
    id: "FAR-001",
    name: "Rahul Kumar",
    email: "rahul.farmer@agrishield.com",
    phone: "+91 98471 23456",
    location: "Wayanad, Kerala",
    farmName: "Wayanad Hills Green Valley",
    acres: "4.5 Acres",
    productsCount: 12,
    complaintsCount: 2,
    resolvedComplaints: 1,
    joinedDate: "Jan 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    products: [
      { id: "PROD-101", name: "Fresh Tomato", price: "₹60/kg", category: "Vegetables", stock: "200 kg" },
      { id: "PROD-103", name: "Black Pepper", price: "₹400/kg", category: "Spices", stock: "250 kg" },
      { id: "PROD-108", name: "Robusta Coffee", price: "₹320/kg", category: "Other", stock: "180 kg" }
    ]
  },
  {
    id: "FAR-002",
    name: "Anjali S",
    email: "anjali.idukki@agrishield.com",
    phone: "+91 94462 87654",
    location: "Idukki, Kerala",
    farmName: "Highrange Apiaries & Spices",
    acres: "3.2 Acres",
    productsCount: 8,
    complaintsCount: 1,
    resolvedComplaints: 0,
    joinedDate: "Feb 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    products: [
      { id: "PROD-104", name: "Pure Honey", price: "₹250/500g", category: "Other", stock: "80 jars" },
      { id: "PROD-109", name: "Organic Clove", price: "₹950/kg", category: "Spices", stock: "50 kg" }
    ]
  },
  {
    id: "FAR-003",
    name: "Suresh G",
    email: "suresh.grove@agrishield.com",
    phone: "+91 98950 33445",
    location: "Thrissur, Kerala",
    farmName: "Kera Agro Grove",
    acres: "6.0 Acres",
    productsCount: 5,
    complaintsCount: 0,
    resolvedComplaints: 0,
    joinedDate: "Mar 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    products: [
      { id: "PROD-105", name: "Fresh Coconut", price: "₹20/piece", category: "Fruits", stock: "1000 pcs" },
      { id: "PROD-110", name: "Tender Coconut", price: "₹45/piece", category: "Fruits", stock: "300 pcs" }
    ]
  },
  {
    id: "FAR-004",
    name: "Mathew C",
    email: "mathew.highland@agrishield.com",
    phone: "+91 94460 77112",
    location: "Munnar, Kerala",
    farmName: "Highland Spice Garden",
    acres: "5.5 Acres",
    productsCount: 6,
    complaintsCount: 1,
    resolvedComplaints: 1,
    joinedDate: "Apr 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    products: [
      { id: "PROD-106", name: "Green Cardamom", price: "₹1800/kg", category: "Spices", stock: "60 kg" }
    ]
  },
  {
    id: "FAR-005",
    name: "Ramesh P",
    email: "ramesh.p@agrishield.com",
    phone: "+91 97455 11223",
    location: "Kottayam, Kerala",
    farmName: "Puzha Heritage Rice Farm",
    acres: "8.0 Acres",
    productsCount: 15,
    complaintsCount: 3,
    resolvedComplaints: 2,
    joinedDate: "May 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    products: [
      { id: "PROD-102", name: "Organic Rice", price: "₹45/kg", category: "Grains", stock: "500 kg" },
      { id: "PROD-107", name: "Fresh Banana", price: "₹50/kg", category: "Fruits", stock: "300 kg" }
    ]
  }
];

export default initialFarmers;
