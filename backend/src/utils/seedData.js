// Pre-defined sample data for initial database seeding

export const seedUsers = [
  {
    name: 'DFO Anjali Nair',
    email: 'officer@agrishield.gov.in',
    password: 'password123',
    phone: '+91 94470 12345',
    role: 'officer',
    district: 'Wayanad',
    state: 'Kerala',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    officerDetails: {
      badgeNumber: 'KL-FD-7741',
      rank: 'Divisional Forest Officer',
      division: 'Wayanad Wildlife Division',
      range: 'Muthanga Forest Range',
      station: 'Sultan Bathery Command Post'
    }
  },
  {
    name: 'Rahul Kumar',
    email: 'rahul.farmer@agrishield.com',
    password: 'password123',
    phone: '+91 98471 23456',
    role: 'farmer',
    district: 'Wayanad',
    state: 'Kerala',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isVerifiedFarmer: true,
    farmDetails: {
      farmName: 'Wayanad Hills Green Valley',
      acres: '4.5 Acres',
      cropTypes: ['Paddy', 'Coffee', 'Pepper'],
      taluk: 'Sultan Bathery',
      village: 'Kuppadi',
      sectorZone: 'Sector 4 (Muthanga Buffer Fringe)',
      nearestCamera: 'CAM-023',
      fenceStatus: 'Solar Energized (8.2 kV)',
      riskLevel: 'Critical'
    }
  },
  {
    name: 'Anjali S',
    email: 'anjali.idukki@agrishield.com',
    password: 'password123',
    phone: '+91 94462 87654',
    role: 'farmer',
    district: 'Idukki',
    state: 'Kerala',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    isVerifiedFarmer: true,
    farmDetails: {
      farmName: 'Highrange Apiaries & Spices',
      acres: '3.2 Acres',
      cropTypes: ['Cardamom', 'Honey', 'Tea'],
      taluk: 'Peerumade',
      village: 'Vandiperiyar',
      sectorZone: 'Sector 7 (Vandiperiyar Forest Rim)',
      riskLevel: 'High',
      nearestCamera: 'CAM-014',
      fenceStatus: 'Bio-Fence + Solar (7.5 kV)',
      riskLevel: 'High'
    }
  },
  {
    name: 'Suresh Gopalan',
    email: 'suresh.user@agrishield.com',
    password: 'password123',
    phone: '+91 97455 11223',
    role: 'user',
    district: 'Ernakulam',
    state: 'Kerala',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    address: 'Kothamangalam Town'
  }
];

export const seedCameras = [
  {
    cameraId: 'CAM-023',
    name: 'Muthanga Sanctuary Outer Rim (Sector 4)',
    sector: 'Wayanad Sector 4',
    coordinates: '11.6854° N, 76.1320° E',
    status: 'Online',
    lastAnimal: 'Asian Elephant',
    lastConfidence: 96,
    lastTriggerTime: '10:24 PM',
    battery: '98%',
    solar: '94%',
    temperature: '21°C',
    signal: '5G Strong',
    liveImageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80'
  },
  {
    cameraId: 'CAM-014',
    name: 'Vandiperiyar Tea Cluster (Sector 7)',
    sector: 'Idukki Sector 7',
    coordinates: '9.8494° N, 77.0185° E',
    status: 'Online',
    lastAnimal: 'Indian Leopard',
    lastConfidence: 91,
    lastTriggerTime: '08:15 PM',
    battery: '92%',
    solar: '88%',
    temperature: '18°C',
    signal: '4G Stable',
    liveImageUrl: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80'
  },
  {
    cameraId: 'CAM-042',
    name: 'Kothamangalam Foothills (Sector 2)',
    sector: 'Ernakulam Sector 2',
    coordinates: '10.0537° N, 76.6289° E',
    status: 'Online',
    lastAnimal: 'Wild Boar Sounder',
    lastConfidence: 88,
    lastTriggerTime: '06:45 PM',
    battery: '85%',
    solar: '80%',
    temperature: '26°C',
    signal: '4G Stable',
    liveImageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    cameraId: 'CAM-008',
    name: 'Chalakudy Riverine Corridor (Sector 5)',
    sector: 'Thrissur Sector 5',
    coordinates: '10.3012° N, 76.3524° E',
    status: 'Online',
    lastAnimal: 'Tiger',
    lastConfidence: 89,
    lastTriggerTime: 'Yesterday, 11:10 PM',
    battery: '94%',
    solar: '91%',
    temperature: '23°C',
    signal: '5G Strong',
    liveImageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80'
  }
];

export const seedAlerts = [
  {
    alertId: 'AL-001',
    animal: 'Elephant',
    confidence: 96,
    location: 'Wayanad, Kerala',
    coordinates: '11.6854° N, 76.1320° E',
    date: '07 Oct 2026',
    time: '10:24 PM',
    source: 'AI Camera',
    camera: 'CAM-023',
    status: 'Pending Verification',
    severity: 'Critical',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    zone: 'Muthanga Sanctuary Border (Sector 4)',
    description: 'Adult male Asian elephant detected moving along paddy boundary fence within 350 meters of residential dwellings.',
    suggestedAction: 'Alert Sultan Bathery cluster, dispatch Rapid Response Patrol vehicle RRT-04, prepare acoustic deterrent sounders.',
    sensorData: {
      temperature: '21°C',
      battery: '98%',
      solarCharge: '94%',
      signal: 'Strong 5G'
    }
  },
  {
    alertId: 'AL-002',
    animal: 'Leopard',
    confidence: 91,
    location: 'Idukki, Kerala',
    coordinates: '9.8494° N, 77.0185° E',
    date: '07 Oct 2026',
    time: '08:15 PM',
    source: 'AI Camera',
    camera: 'CAM-014',
    status: 'Verified',
    severity: 'Critical',
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80',
    zone: 'Vandiperiyar Tea Estate Sector 3',
    description: 'Indian leopard spotted moving along forest boundary trail adjacent to plantation worker line quarters.',
    suggestedAction: 'Broadcast SMS warning to estate workers, deploy searchlight vehicle, keep livestock penned.',
    sensorData: {
      temperature: '18°C',
      battery: '92%',
      solarCharge: '88%',
      signal: 'Moderate 4G'
    }
  },
  {
    alertId: 'AL-003',
    animal: 'Wild Boar',
    confidence: 88,
    location: 'Ernakulam, Kerala',
    coordinates: '10.0537° N, 76.6289° E',
    date: '07 Oct 2026',
    time: '06:45 PM',
    source: 'AI Camera',
    camera: 'CAM-042',
    status: 'Pending Verification',
    severity: 'High',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
    zone: 'Kothamangalam Foothills Sector 2',
    description: 'Sounder of 4 adult wild boars sighted foraging within 50 meters of tapioca crop boundary.',
    suggestedAction: 'Inspect solar fence voltage telemetry, dispatch local squad.',
    sensorData: {
      temperature: '26°C',
      battery: '85%',
      solarCharge: '80%',
      signal: 'Strong 4G'
    }
  }
];

export const seedComplaints = [
  {
    complaintId: 'CMP-001',
    type: 'Crop Damage',
    reporter: 'Rahul Kumar',
    phone: '+91 98471 23456',
    location: 'Wayanad, Kerala',
    subLocation: 'Sultan Bathery, Ward 6',
    priority: 'High',
    status: 'Pending',
    description: 'An elephant herd entered the agricultural paddy field during the night and damaged 1.5 acres of maturing crops and broke 40m of border solar fence.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    compensationClaimed: '₹45,000',
    officerNotes: 'Inspection team RRT-04 scheduled for GPS site survey today at 11:30 AM.'
  },
  {
    complaintId: 'CMP-002',
    type: 'Animal Attack',
    reporter: 'Anjali S',
    phone: '+91 94462 87654',
    location: 'Idukki, Kerala',
    subLocation: 'Vandiperiyar Tea Cluster',
    priority: 'Critical',
    status: 'Under Review',
    description: 'Indian leopard spotted hunting small game adjacent to plantation worker line quarters. Cattle in shed were severely distressed.',
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80',
    compensationClaimed: 'N/A (Preventive Safety)',
    officerNotes: 'Thermal camera CAM-014 recorded feline presence. Searchlight vehicle deployed.'
  },
  {
    complaintId: 'CMP-003',
    type: 'Wildlife Sighting',
    reporter: 'Suresh Gopalan',
    phone: '+91 97455 11223',
    location: 'Ernakulam, Kerala',
    subLocation: 'Kothamangalam Foothills',
    priority: 'Medium',
    status: 'Verified',
    description: 'Sounder of 4 adult wild boars sighted foraging within 50 meters of tapioca crop boundary. Wires showing mechanical strain.',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80',
    compensationClaimed: '₹8,000',
    compensationApproved: 8000,
    officerNotes: 'Site checked by Forester K. Balan. Solar fence energizer repaired and re-tensioned.'
  }
];

export const seedActivities = [
  {
    activityId: 'ACT-101',
    time: '10:24 PM',
    title: 'AI detected Elephant in Wayanad',
    description: 'Camera CAM-023 triggered with 96% neural confidence in Sultan Bathery Sector 4.',
    type: 'alert',
    icon: 'Radio',
    color: 'rose'
  },
  {
    activityId: 'ACT-102',
    time: '09:48 PM',
    title: 'New crop damage complaint by Rahul Kumar',
    description: 'Ticket CMP-001 filed for paddy crop destruction along buffer perimeter.',
    type: 'complaint',
    icon: 'MessageSquareWarning',
    color: 'amber'
  },
  {
    activityId: 'ACT-103',
    time: '08:15 PM',
    title: 'Leopard alert verified by Forest Officer',
    description: 'DFO Anjali Nair confirmed feline thermal sighting on CAM-014 at Vandiperiyar.',
    type: 'verified',
    icon: 'CheckCircle2',
    color: 'blue'
  },
  {
    activityId: 'ACT-104',
    time: '07:40 PM',
    title: 'Farmer registered for early warning siren',
    description: 'Anjali S enlisted Highrange Apiaries (3.2 Acres) into defense perimeter.',
    type: 'farmer',
    icon: 'Trees',
    color: 'emerald'
  }
];
