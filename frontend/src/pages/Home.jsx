import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  ShoppingBag, 
  ShieldAlert, 
  MessageSquareWarning, 
  Trees, 
  Users, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Camera, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sparkles, 
  Headphones, 
  Send,
  UploadCloud,
  FileCheck2,
  Calendar
} from 'lucide-react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import ProductCard from '../components/ProductCard';
import { sampleProducts, sampleWildlifeAlerts, sampleFeatures } from '../data/mockData';

const Home = () => {
  // Active wildlife preview animal
  const [selectedAnimal, setSelectedAnimal] = useState('Wild Boar');
  const [cameraSlide, setCameraSlide] = useState(0);

  // Quick complaint mockup state
  const [complaintType, setComplaintType] = useState('Crop Damage');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintLocation, setComplaintLocation] = useState('Wayanad, Kerala');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  // Wildlife species data for section 11
  const wildlifeSpecies = [
    { name: 'Elephant', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80' },
    { name: 'Leopard', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=400&q=80' },
    { name: 'Deer', img: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=400&q=80' },
    { name: 'Wild Boar', img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bear', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleQuickComplaintSubmit = (e) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setComplaintDesc('');
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F6]">
      
      {/* =========================================================================
          SECTION 8: CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative bg-[#063B2A] text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        {/* Deep ambient forest backdrop */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071A14]/80 via-[#063B2A]/90 to-[#063B2A] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Grid: Headline + AI Detection Box + Camera Device Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Buttons */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Smart Solutions For A Safer Tomorrow</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.15] text-white">
                AgriShield <br />
                <span className="text-white font-extrabold">Protecting </span>
                <span className="text-emerald-400 font-extrabold">Farmers,</span><br />
                <span className="text-emerald-300 font-extrabold">Wildlife & Nature</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed max-w-lg">
                A unified platform for farmers, users and forest officers to buy, sell, report and protect — powered by AI and technology.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  to="/marketplace"
                  variant="primary"
                  size="md"
                  className="bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold px-6 py-3 rounded-full shadow-glow-emerald"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore Marketplace
                </Button>

                <Button
                  to="/complaints"
                  variant="darkGlass"
                  size="md"
                  className="text-white hover:text-emerald-300 border-emerald-600/50 hover:border-emerald-400 px-5 py-3 rounded-full"
                >
                  Report Wildlife / Complaint
                </Button>
              </div>

              {/* Trust Metric Chips */}
              <div className="pt-2 flex items-center gap-6 text-xs text-emerald-200/70 border-t border-emerald-800/40">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real-time AI Detection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Kerala Forest Integrated</span>
                </div>
              </div>
            </div>

            {/* Center Column: AI Wildlife Detection Visual Mockup Card */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-[#071A14] group">
                
                {/* Animal Photo with AI Scan Line */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80"
                    alt="Elephant detected in Western Ghats"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Neon Scanning Animation */}
                  <div className="ai-scan-line"></div>

                  {/* Corner Target Reticles */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                  {/* Top Badge: AI Detected */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-[#071A14] text-xs font-black shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#071A14] animate-ping"></span>
                    <span>AI Detected</span>
                  </div>

                  {/* Species Classification Card Overlay Inside Box */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#071A14]/85 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-500/40 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-base font-black leading-tight text-white">Elephant</p>
                          <p className="text-[11px] font-semibold text-emerald-400">Confidence: 96%</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded border border-rose-500/40">
                        High Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metadata Card Drawer */}
                <div className="p-4 bg-[#05291D] border-t border-emerald-800/40 space-y-2 text-xs text-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Location
                    </span>
                    <span className="font-semibold text-white">Wayanad, Kerala</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Date & Time
                    </span>
                    <span className="font-semibold text-white">07 Oct 2026 • 10:24 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Camera className="w-3.5 h-3.5 text-emerald-400" /> Camera ID
                    </span>
                    <span className="font-mono font-semibold text-emerald-400 bg-[#071A14] px-2 py-0.5 rounded">
                      CAM-023
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: AI Wildlife Trail Camera Device Feature */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-700/40 bg-gradient-to-br from-[#071A14]/90 to-[#063B2A]/90 p-5 backdrop-blur-md shadow-xl text-left space-y-4">
                
                {/* Trail camera image thumbnail */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-emerald-800/50 bg-[#071A14]">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
                    alt="Solar trail camera"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A14] via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-medium border border-emerald-500/40">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>Live Forest Link</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-white">AI Wildlife Camera</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Detects wild animals, identifies species with deep learning, and sends instant emergency alerts to forest officers and farmers.
                  </p>
                </div>

                <Button
                  to="/wildlife-camera"
                  variant="primary"
                  size="sm"
                  className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white py-2 rounded-full font-semibold"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Live Camera UI
                </Button>

                {/* Slider Dots */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-800"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-800"></span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: 6 FEATURE CARDS BAR
          ========================================================================= */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {sampleFeatures.map((feat) => (
            <Link
              key={feat.id}
              to={feat.link}
              className="group p-4 bg-white rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-[#063B2A] text-emerald-400 flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all shadow-sm">
                  {feat.icon === 'ShoppingBag' && <ShoppingBag className="w-5 h-5" />}
                  {feat.icon === 'ShieldAlert' && <ShieldAlert className="w-5 h-5" />}
                  {feat.icon === 'MessageSquareWarning' && <MessageSquareWarning className="w-5 h-5" />}
                  {feat.icon === 'Trees' && <Trees className="w-5 h-5" />}
                  {feat.icon === 'Users' && <Users className="w-5 h-5" />}
                  {feat.icon === 'Leaf' && <Leaf className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
                    {feat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 & 12: MARKETPLACE PREVIEW + MISSION BENTO SECTION
          ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Fresh From Our Farmers */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Featured Products
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063B2A] tracking-tight">
                  Fresh From Our Farmers
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Support local farmers and get fresh, natural and organic products.
                </p>
              </div>

              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Product Cards Row/Grid (5 items as in prompt) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {sampleProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              
              {/* "Browse Full Catalog" card as 6th slot in 3x2 grid */}
              <Link
                to="/marketplace"
                className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/50 p-6 flex flex-col items-center justify-center text-center group transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#063B2A] text-base">Browse All Crops</h4>
                <p className="text-xs text-gray-500 mt-1 mb-3">Explore grains, spices, fruits & dairy directly from Kerala growers.</p>
                <span className="text-xs font-semibold text-emerald-700 group-hover:underline flex items-center gap-1">
                  Open Marketplace <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column (4 cols): Section 12 - Mission & Statistics Card */}
          <div id="mission" className="lg:col-span-4 h-full">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#071A14] to-[#063B2A] text-white p-7 border border-emerald-800/40 shadow-soft-lg flex flex-col justify-between h-full space-y-6">
              
              {/* Subtle forest texture overlay */}
              <div 
                className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80')`
                }}
              />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Our Mission
                </div>

                <h3 className="text-2xl font-black text-white leading-tight">
                  A Greener Future With Technology
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Combining AI, community reporting and digital tools to protect agriculture, prevent human-wildlife conflicts, and secure fair returns for farmers.
                </p>

                <Button
                  to="/marketplace"
                  variant="primary"
                  size="sm"
                  className="bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold py-2.5 px-5 rounded-full"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  About AgriShield
                </Button>
              </div>

              {/* Sample Statistics (Prompt Section 12) */}
              <div className="relative z-10 pt-4 border-t border-emerald-800/60 grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-black/25 rounded-2xl border border-emerald-500/20">
                  <div className="text-xl font-black text-emerald-400">10K+</div>
                  <div className="text-[10px] text-gray-300 uppercase font-medium mt-0.5">Happy Users</div>
                </div>

                <div className="p-2.5 bg-black/25 rounded-2xl border border-emerald-500/20">
                  <div className="text-xl font-black text-emerald-400">500+</div>
                  <div className="text-[10px] text-gray-300 uppercase font-medium mt-0.5">Farmers</div>
                </div>

                <div className="p-2.5 bg-black/25 rounded-2xl border border-emerald-500/20">
                  <div className="text-xl font-black text-emerald-400">200+</div>
                  <div className="text-[10px] text-gray-300 uppercase font-medium mt-0.5">Alerts</div>
                </div>
              </div>

              {/* Forest Officer Access Banner */}
              <div className="relative z-10 p-4 bg-emerald-950/60 rounded-2xl border border-emerald-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Forest Department Admin?</p>
                  <p className="text-[11px] text-emerald-300/80">Access enforcement dashboard</p>
                </div>
                <Link
                  to="/officer/dashboard"
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] rounded-lg transition-colors"
                >
                  Enter Portal
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: WILDLIFE PROTECTION BANNER + SUPPORT WIDGET
          ========================================================================= */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Wildlife Sighting Banner (9 cols) */}
          <div className="lg:col-span-9 rounded-3xl bg-[#063B2A] text-white p-6 sm:p-8 relative overflow-hidden border border-emerald-800/50 shadow-soft-lg flex flex-col justify-between">
            <div className="relative z-10 space-y-4 max-w-2xl">
              <span className="text-[11px] font-bold tracking-widest text-emerald-300 uppercase bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50">
                Together We Can
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Report Wildlife Sightings &amp; Keep Our Forests Safe
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Your report can help forest officers respond quickly, prevent crop loss, and protect farmers, communities and wildlife without harm.
              </p>

              <div className="pt-2">
                <Button
                  to="/complaints"
                  variant="primary"
                  size="md"
                  className="bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold rounded-full px-6 py-2.5"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Report Now
                </Button>
              </div>
            </div>

            {/* Wildlife Thumbnails Gallery (Elephant, Leopard, Deer, Wild Boar, Bear) */}
            <div className="relative z-10 mt-8 pt-6 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {wildlifeSpecies.map((animal) => {
                  const isSelected = selectedAnimal === animal.name;
                  return (
                    <button
                      key={animal.name}
                      onClick={() => setSelectedAnimal(animal.name)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-emerald-400 scale-105 shadow-glow-emerald'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      title={animal.name}
                    >
                      <img
                        src={animal.img}
                        alt={animal.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-bold text-center text-white py-0.5 truncate">
                        {animal.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Status Note */}
              <div className="text-right hidden sm:block">
                <p className="text-[11px] text-emerald-300 font-semibold">Active Sanctuary Watch</p>
                <p className="text-[10px] text-gray-400">Waynad, Idukki &amp; Palakkad</p>
              </div>
            </div>

            {/* Background Forest Ranger silhouette overlay on the right */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
          </div>

          {/* Need Help Support Card (3 cols) */}
          <div className="lg:col-span-3 rounded-3xl bg-[#071A14] text-white p-6 sm:p-7 border border-emerald-800/40 shadow-soft-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Need Help?</h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Contact our dedicated farmer support team and forest emergency desk for any immediate assistance.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button
                to="/complaints"
                variant="outline"
                size="sm"
                className="w-full border-emerald-600 text-white hover:bg-emerald-900/40 rounded-full font-medium py-2.5"
                icon={ArrowRight}
                iconPosition="right"
              >
                Get Support
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 13: COMPLAINT REPORTING PREVIEW & STATUS TRACKER
          ========================================================================= */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft-lg p-6 sm:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Quick Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Quick Report Preview
                </div>
                <h3 className="text-2xl font-extrabold text-[#063B2A]">
                  Report an Incident or Crop Damage
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Submit wildlife incursions, boundary fence cuts, or agricultural damage directly to the forest ranger desk.
                </p>
              </div>

              {complaintSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Complaint Registered Successfully!</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Assigned Reference ID: <strong>CMP-2026-092</strong>. Forest range patrol in {complaintLocation} has been dispatched.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickComplaintSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Complaint Type
                      </label>
                      <select
                        value={complaintType}
                        onChange={(e) => setComplaintType(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Crop Damage">Crop Damage</option>
                        <option value="Wildlife Sighting">Wildlife Sighting</option>
                        <option value="Solar Fence Breach">Solar Fence Breach</option>
                        <option value="Cattle Attack">Cattle Attack</option>
                        <option value="Illegal Intrusion">Illegal Forest Intrusion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Location / Ward
                      </label>
                      <input
                        type="text"
                        value={complaintLocation}
                        onChange={(e) => setComplaintLocation(e.target.value)}
                        placeholder="e.g. Sultan Bathery, Wayanad"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Description of Incident
                    </label>
                    <textarea
                      rows={3}
                      value={complaintDesc}
                      onChange={(e) => setComplaintDesc(e.target.value)}
                      placeholder="Explain what happened, animal type, approximate time and damage..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  {/* Upload Image UI Mockup */}
                  <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">Upload Site Photo / Proof (Optional)</p>
                        <p className="text-[11px] text-gray-500">PNG, JPG, HEIC up to 10MB</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 cursor-pointer hover:underline">
                      Browse File
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto bg-[#063B2A] hover:bg-[#094d37] text-white px-8 py-3 rounded-full font-semibold"
                    icon={Send}
                    iconPosition="right"
                  >
                    Submit Complaint
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Live Complaint Status Demonstration (Prompt Section 13) */}
            <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 border border-gray-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h4 className="text-sm font-bold text-[#063B2A]">
                  Complaint Status Workflow
                </h4>
                <span className="text-[11px] font-semibold text-gray-500">Live Tracker</span>
              </div>

              {/* Status Step 1: Pending */}
              <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-900">Crop Damage - Wayanad</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Elephant herd damaged paddy perimeter fence.</p>
                </div>
              </div>

              {/* Status Step 2: Under Review */}
              <div className="p-3.5 bg-white rounded-xl border border-blue-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-900">Wildlife Sighting - Idukki</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Under Review
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Forest officer reviewing camera logs and dispatched patrol.</p>
                </div>
              </div>

              {/* Status Step 3: Resolved */}
              <div className="p-3.5 bg-white rounded-xl border border-emerald-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-900">Forest Issue - Chalakudy</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Resolved
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Solar fence re-energized and cleared of fallen tree.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/complaints"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1"
                >
                  <span>Open Full Complaint Management Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

