# AgriShield — Protecting Farmers, Wildlife & Nature

> **BCA Final Year College Project — Day 1: Professional UI/UX Foundation**  
> A modern unified platform connecting farmers, citizens, and forest officers for direct agricultural trade, incident reporting, and AI-powered wildlife perimeter protection.

---

## 🌿 Overview

AgriShield bridges the critical gap between agricultural communities living along forest fringes and wildlife conservation authorities. It combines:
1. **Direct Farmer Marketplace:** Zero-commission direct trade between verified growers and buyers.
2. **AI Wildlife Perimeter Vision:** Smart trail camera detection of endangered and hazardous wildlife (Elephants, Leopards, Wild Boars, etc.).
3. **Public Grievance & Crop Damage Redressal:** Transparent filing of human-wildlife conflict incidents with status tracking.
4. **Forest Officer Command Center:** Dedicated administrative interface for range officers to monitor camera traps, verify threats, and dispatch patrol units.

---

## 🎨 Tech Stack (Day 1 Frontend Foundation)

- **Library / Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Nature-Tech Palette: Deep Forest `#063B2A`, Emerald `#10B981`, Mint `#34D399`, `#071A14`)
- **Routing:** React Router DOM (v6+)
- **Iconography:** Lucide React Icons
- **Language:** JavaScript (JSX)

---

## 📁 Project Structure

```
c:\Project\job\Agrisheld\
├── .gitignore
├── README.md
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   │   └── mockup-reference.jpg
    │   ├── components/
    │   │   ├── Navbar.jsx           # Responsive navbar with search, notifications, mobile menu
    │   │   ├── Footer.jsx           # Platform links, farmer resources & emergency desk
    │   │   ├── Button.jsx           # Reusable button with variants (primary, glass, dark, danger)
    │   │   ├── ProductCard.jsx      # Agricultural product card with wishlist & contact action
    │   │   ├── FeatureCard.jsx      # Modern cards with Lucide icons
    │   │   └── SectionTitle.jsx     # Badges, titles and subtitles
    │   │
    │   ├── data/
    │   │   └── mockData.js          # Realistic Kerala farm crops, wildlife cameras, complaints
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx             # Cinematic hero with AI bounding box & feature showcase
    │   │   ├── Marketplace.jsx      # Product search, category filters, location, sort, inquiry modal
    │   │   ├── ProductDetails.jsx   # Detailed crop view, seller credentials, quantity selector
    │   │   ├── Complaints.jsx       # Incident report form and status workflow tracker
    │   │   ├── WildlifeAlerts.jsx   # Real-time sensor alerts with confidence gauges & threat dossier
    │   │   ├── WildlifeCamera.jsx   # Edge AI camera preview HUD, telemetry, capture & dispatch
    │   │   ├── Login.jsx            # Split-screen responsive authentication portal
    │   │   ├── Register.jsx         # Role-based onboarding (Farmer vs Citizen)
    │   │   ├── Profile.jsx          # User management with products, orders & alert preferences
    │   │   │
    │   │   └── officer/
    │   │       ├── OfficerLogin.jsx     # Forest department badge & PIN authentication
    │   │       ├── OfficerRegister.jsx  # Official ranger service registration
    │   │       ├── OfficerDashboard.jsx # Command dashboard with 4 core metrics & actions
    │   │       ├── OfficerAlerts.jsx    # Sensor threat verification register
    │   │       └── OfficerComplaints.jsx# Public damage claim review & compensation workflow
    │   │
    │   ├── App.jsx                  # Route definitions & scroll restoration
    │   ├── main.jsx                 # React root render
    │   └── index.css                # Base Tailwind directives, glassmorphism & scan animations
    ├── index.html                   # Favicon, Inter font, and metadata
    ├── package.json
    ├── tailwind.config.js           # Custom nature-tech color tokens
    └── vite.config.js
```

---

## 🚦 Routes Created

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Cinematic landing page matching official prototype |
| `/marketplace` | `Marketplace.jsx` | Search, category & location filtered crops |
| `/marketplace/:id` | `ProductDetails.jsx` | Detailed product information & direct request |
| `/complaints` | `Complaints.jsx` | File crop damage or wild animal intrusion incident |
| `/wildlife-alerts` | `WildlifeAlerts.jsx` | Live wildlife perimeter radar & confidence feeds |
| `/wildlife-camera` | `WildlifeCamera.jsx` | Interactive AI camera viewfinder with HUD overlays |
| `/login` | `Login.jsx` | Split-screen user login |
| `/register` | `Register.jsx` | Farmer / Citizen account registration |
| `/profile` | `Profile.jsx` | Profile details, listed crops, orders & settings |
| `/officer/login` | `OfficerLogin.jsx` | Official Forest Department Ranger entry |
| `/officer/register` | `OfficerRegister.jsx` | Ranger badge enrolment |
| `/officer/dashboard` | `OfficerDashboard.jsx` | Administrative command center with sidebar |
| `/officer/alerts` | `OfficerAlerts.jsx` | Officer sensor verification queue |
| `/officer/complaints` | `OfficerComplaints.jsx`| Officer citizen grievance & compensation tracker |

---

## 🚀 How to Run the Project

1. Open your terminal in the project directory:
   ```bash
   cd c:\Project\job\Agrisheld\frontend
   ```

2. Install dependencies (already prepared):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL (typically `http://localhost:5173`).

---

## 📦 Build for Production

```bash
cd c:\Project\job\Agrisheld\frontend
npm run build
```
The optimized production bundle will be generated in `frontend/dist/`.
