# AgriShield — Protecting Farmers, Wildlife & Nature

> **BCA Final Year College Project**  
> A modern unified platform connecting farmers, citizens, and forest officers for direct agricultural trade, incident reporting, and AI-powered wildlife perimeter protection.

---

## 🌿 Key Architecture

AgriShield consists of two primary modules:
1. **Public Citizen & Farmer Portal (`/`):**
   - Direct Farmer Marketplace (Zero broker fees)
   - Real-time Wildlife Sighting Radar
   - Community Crop Damage & Grievance Submissions
   - Simulated Edge AI Trail Camera Viewfinder
   - Citizen / Farmer User Profiles

2. **Forest Officer Administrative Module (`/officer/*`):**
   - **NOTE:** In AgriShield, the **Forest Officer is the Administrator**. There is no separate "Admin" role or dashboard.
   - Command Dashboard with 4 core monitoring metrics
   - Emergency Wildlife Alert dossier with interactive Map Locator
   - Public Grievance Verification & Compensation Sanction workflow
   - Registered Citizens Directory (`/officer/users`)
   - Registered Cultivators Directory (`/officer/farmers`)
   - Real-time Community & Sensor Activity Timeline (`/officer/activity`)
   - Official Service Profile & Station Jurisdiction (`/officer/profile`)

---

## 🎨 Tech Stack

- **Library / Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Nature-Tech Palette: Deep Forest `#063B2A`, Emerald `#10B981`, Mint `#34D399`, Dark `#071A14`)
- **Routing:** React Router DOM
- **Iconography:** Lucide React Icons
- **Language:** JavaScript (JSX)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx                  # Public navbar
│   ├── Footer.jsx                  # Public footer
│   ├── Button.jsx                  # Reusable button with variants
│   ├── ProductCard.jsx             # Farm produce card
│   ├── FeatureCard.jsx             # Feature card
│   ├── SectionTitle.jsx            # Section titles and badges
│   │
│   └── officer/                    # Dedicated Forest Officer components
│       ├── OfficerLayout.jsx       # Administrative shell (Sidebar + Navbar)
│       ├── OfficerSidebar.jsx      # Sticky navigation with active highlights
│       ├── OfficerNavbar.jsx       # Header with notifications & profile
│       ├── NotificationDropdown.jsx# Dropdown with live alerts & tickets
│       ├── StatCard.jsx            # KPI cards (Alerts, Complaints, Verified)
│       ├── AlertCard.jsx           # Sensor threat card with Verify button
│       ├── ComplaintCard.jsx       # Incident card with status workflows
│       └── StatusBadge.jsx         # Accessible badges (Pending, Verified, etc.)
│
├── data/
│   ├── mockData.js                 # Public sample data
│   ├── officerAlerts.js            # Wildlife camera telemetry & coordinates
│   ├── complaints.js               # Citizen crop damage & sighting grievances
│   ├── users.js                    # Registered citizen users
│   ├── farmers.js                  # Registered farming collectives
│   └── activity.js                 # Real-time sensor & marketplace event log
│
├── pages/
│   ├── Home.jsx                    # Landing page with AI bounding box hero
│   ├── Marketplace.jsx             # Produce catalog with multi-filters
│   ├── ProductDetails.jsx          # Crop dossier & farmer request dialog
│   ├── Complaints.jsx              # Incident report form & tracker
│   ├── WildlifeAlerts.jsx          # Sensor radar & precautions modal
│   ├── WildlifeCamera.jsx          # Edge AI camera preview HUD
│   ├── Login.jsx                   # Public user login
│   ├── Register.jsx                # Role-based onboarding
│   ├── Profile.jsx                 # Citizen/Farmer profile
│   │
│   └── officer/                    # Dedicated Forest Officer Pages
│       ├── OfficerLogin.jsx        # Authorized personnel login
│       ├── OfficerRegister.jsx     # Ranger service registration
│       ├── OfficerDashboard.jsx    # Command center with 4 KPIs & alerts
│       ├── OfficerAlerts.jsx       # Full surveillance queue & filter
│       ├── OfficerAlertDetails.jsx # Detailed threat dossier & Map view
│       ├── OfficerComplaints.jsx   # Public grievance register & review
│       ├── OfficerComplaintDetails.jsx # Compensation sanction & officer notes
│       ├── OfficerUsers.jsx        # Registered citizen directory & view
│       ├── OfficerFarmers.jsx      # Registered farmer collective directory
│       ├── OfficerActivity.jsx     # Real-time event & sensor activity
│       └── OfficerProfile.jsx      # Officer credentials & station sector
│
├── App.jsx                         # Main router configuration
├── main.jsx                        # React entrypoint
└── index.css                       # Tailwind base & scan animations
```

---

## 🚦 All Application Routes

### Public Citizen / Farmer Routes
| Route | Page | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Cinematic landing page |
| `/marketplace` | `Marketplace.jsx` | Farm products catalog |
| `/marketplace/:id` | `ProductDetails.jsx` | Product details & order request |
| `/complaints` | `Complaints.jsx` | Citizen incident reporting form |
| `/wildlife-alerts` | `WildlifeAlerts.jsx` | Public wildlife warning feed |
| `/wildlife-camera` | `WildlifeCamera.jsx` | Interactive AI camera viewfinder |
| `/login` | `Login.jsx` | Citizen / Farmer login |
| `/register` | `Register.jsx` | Account registration |
| `/profile` | `Profile.jsx` | User management |

### Forest Officer (Administrator) Routes
| Route | Page | Purpose |
|---|---|---|
| `/officer/login` | `OfficerLogin.jsx` | Officer entry with official credentials |
| `/officer/register` | `OfficerRegister.jsx` | Department officer enrolment |
| `/officer/dashboard` | `OfficerDashboard.jsx` | Command center with 4 KPIs & alert feed |
| `/officer/alerts` | `OfficerAlerts.jsx` | Surveillance queue with filters |
| `/officer/alerts/:id` | `OfficerAlertDetails.jsx` | Threat dossier, notes & location map |
| `/officer/complaints` | `OfficerComplaints.jsx` | Public grievance redressal registry |
| `/officer/complaints/:id` | `OfficerComplaintDetails.jsx`| Status updater, compensation & audit notes |
| `/officer/users` | `OfficerUsers.jsx` | Registered citizens directory & modal |
| `/officer/farmers` | `OfficerFarmers.jsx` | Registered farmers directory & products |
| `/officer/activity` | `OfficerActivity.jsx` | Chronological event timeline |
| `/officer/profile` | `OfficerProfile.jsx` | Officer record, station range & credentials |

---

## 🚀 Running the Project

```bash
cd frontend
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
