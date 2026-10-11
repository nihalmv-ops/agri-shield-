import React, { useState, useMemo, useRef } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  SlidersHorizontal, 
  Download, 
  Maximize2, 
  Flame, 
  Eye, 
  Info, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  LineChart,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const FULL_YEAR_DATA = [
  { month: 'Jan', elephant: 14, leopard: 6, boar: 22, total: 42, note: 'Dry season baseline; normal fringe waterhole visits' },
  { month: 'Feb', elephant: 18, leopard: 8, boar: 26, total: 52, note: 'Early seasonal migration toward Kabini & Periyar basins' },
  { month: 'Mar', elephant: 22, leopard: 9, boar: 31, total: 62, note: 'Waterhole clustering; heightened edge vigilance' },
  { month: 'Apr', elephant: 29, leopard: 11, boar: 38, total: 78, note: 'Pre-monsoon crop boundary scouting by lone tuskers' },
  { month: 'May', elephant: 35, leopard: 14, boar: 44, total: 93, note: 'Jackfruit & mango fruiting season in village groves' },
  { month: 'Jun', elephant: 42, leopard: 18, boar: 48, total: 108, note: 'Monsoon onset; elephants active along bamboo corridors' },
  { month: 'Jul', elephant: 38, leopard: 16, boar: 41, total: 95, note: 'High sanctuary interior rainfall; temporary perimeter lull' },
  { month: 'Aug', elephant: 45, leopard: 19, boar: 52, total: 116, note: 'Flooded interior streams driving wildlife to ridge edges' },
  { month: 'Sep', elephant: 51, leopard: 22, boar: 58, total: 131, note: 'Maturing paddy crop scent attracting family herds' },
  { month: 'Oct', elephant: 63, leopard: 27, boar: 64, total: 154, note: 'Harvest season peak incursion; DEFCON 2 elevated' },
  { month: 'Nov', elephant: 56, leopard: 24, boar: 59, total: 139, note: 'Post-harvest gleaning; RRT night patrol scheduled' },
  { month: 'Dec', elephant: 48, leopard: 20, boar: 50, total: 118, note: 'Winter transition period; return to deep core reserve' }
];

const SPECIES_CONFIG = {
  all: {
    key: 'total',
    name: 'Total Sighting Detections',
    color: '#10B981', // emerald
    gradientId: 'grad-total',
    stroke: '#10B981',
    fillColor: 'rgba(16, 185, 129, 0.15)',
    textColor: 'text-emerald-700',
    bgBadge: 'bg-emerald-50 border-emerald-200 text-emerald-800'
  },
  elephant: {
    key: 'elephant',
    name: 'Asian Elephant (Elephas maximus)',
    color: '#059669', // deep emerald
    gradientId: 'grad-elephant',
    stroke: '#059669',
    fillColor: 'rgba(5, 150, 105, 0.2)',
    textColor: 'text-emerald-800',
    bgBadge: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    icon: '🐘'
  },
  leopard: {
    key: 'leopard',
    name: 'Indian Leopard (Panthera pardus)',
    color: '#F43F5E', // rose
    gradientId: 'grad-leopard',
    stroke: '#F43F5E',
    fillColor: 'rgba(244, 63, 94, 0.18)',
    textColor: 'text-rose-600',
    bgBadge: 'bg-rose-50 border-rose-200 text-rose-800',
    icon: '🐆'
  },
  boar: {
    key: 'boar',
    name: 'Wild Boar (Sus scrofa)',
    color: '#F59E0B', // amber
    gradientId: 'grad-boar',
    stroke: '#F59E0B',
    fillColor: 'rgba(245, 158, 11, 0.18)',
    textColor: 'text-amber-600',
    bgBadge: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: '🐗'
  }
};

const WildlifeTrendsChart = () => {
  const [timeframe, setTimeframe] = useState('10M'); // '6M' | '10M' | '12M'
  const [chartType, setChartType] = useState('area'); // 'area' | 'bar' | 'spline'
  const [selectedSpecies, setSelectedSpecies] = useState('all'); // 'all' | 'elephant' | 'leopard' | 'boar'
  const [hoveredIndex, setHoveredIndex] = useState(9); // default to October (latest month)
  const [copiedNotice, setCopiedNotice] = useState(false);

  const containerRef = useRef(null);

  // Filter data based on selected timeframe
  const activeData = useMemo(() => {
    if (timeframe === '6M') {
      return FULL_YEAR_DATA.slice(4, 10); // May to Oct
    }
    if (timeframe === '12M') {
      return FULL_YEAR_DATA; // Jan to Dec
    }
    return FULL_YEAR_DATA.slice(0, 10); // Jan to Oct (10M YTD)
  }, [timeframe]);

  // Max value calculation for scaling
  const maxValue = useMemo(() => {
    if (selectedSpecies === 'all') {
      const max = Math.max(...activeData.map(d => d.total));
      return Math.ceil(max / 20) * 20; // round up to multiple of 20
    }
    const max = Math.max(...activeData.map(d => d[SPECIES_CONFIG[selectedSpecies].key] || d.total));
    return Math.ceil(max / 10) * 10;
  }, [activeData, selectedSpecies]);

  // Aggregate statistics
  const stats = useMemo(() => {
    const totalSightings = activeData.reduce((acc, curr) => acc + curr.total, 0);
    const totalElephants = activeData.reduce((acc, curr) => acc + curr.elephant, 0);
    const totalLeopards = activeData.reduce((acc, curr) => acc + curr.leopard, 0);
    const totalBoars = activeData.reduce((acc, curr) => acc + curr.boar, 0);

    const latestMonth = activeData[activeData.length - 1] || activeData[0];
    const prevMonth = activeData[activeData.length - 2] || latestMonth;
    const growthRate = prevMonth.total > 0 
      ? (((latestMonth.total - prevMonth.total) / prevMonth.total) * 100).toFixed(1)
      : 0;

    return {
      totalSightings,
      totalElephants,
      totalLeopards,
      totalBoars,
      latestMonth,
      growthRate,
      peakMonth: [...activeData].sort((a, b) => b.total - a.total)[0]
    };
  }, [activeData]);

  // SVG Chart Geometry calculations
  const svgWidth = 840;
  const svgHeight = 280;
  const padLeft = 46;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;

  const chartInnerWidth = svgWidth - padLeft - padRight;
  const chartInnerHeight = svgHeight - padTop - padBottom;

  // Calculate points coordinate mapper
  const getCoordinates = (metricKey) => {
    return activeData.map((d, index) => {
      const x = padLeft + (index / (activeData.length - 1)) * chartInnerWidth;
      const val = d[metricKey] || 0;
      const y = padTop + chartInnerHeight - (val / maxValue) * chartInnerHeight;
      return { x, y, val, month: d.month, data: d };
    });
  };

  // Generate smooth cubic Bézier curve SVG path (Catmull-Rom style smoothing)
  const generateSmoothPath = (points) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      // Control points
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  // Generate closed area path for gradient fills
  const generateAreaPath = (points) => {
    if (points.length === 0) return '';
    const linePath = generateSmoothPath(points);
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = padTop + chartInnerHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const pointsTotal = useMemo(() => getCoordinates('total'), [activeData, maxValue]);
  const pointsElephant = useMemo(() => getCoordinates('elephant'), [activeData, maxValue]);
  const pointsLeopard = useMemo(() => getCoordinates('leopard'), [activeData, maxValue]);
  const pointsBoar = useMemo(() => getCoordinates('boar'), [activeData, maxValue]);

  // Y-axis grid tick levels
  const yTicks = [0, Math.round(maxValue * 0.25), Math.round(maxValue * 0.5), Math.round(maxValue * 0.75), maxValue];

  const hoveredData = activeData[hoveredIndex] || activeData[activeData.length - 1];

  const handleExportSummary = () => {
    const summaryText = `AgriShield Wildlife Sighting Analytics (2026):\nTotal Incursions: ${stats.totalSightings}\nElephant Detections: ${stats.totalElephants}\nLeopard Sightings: ${stats.totalLeopards}\nWild Boar Incidents: ${stats.totalBoars}\nPeak Incursion Month: ${stats.peakMonth.month} (${stats.peakMonth.total} sightings)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-6">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#063B2A] tracking-tight">
                  Wildlife Sighting Frequency Trends (2026)
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#063B2A]">
                  Edge Optical Sensors
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Time-series movement radar and AI detection volumes across Wayanad &amp; Idukki sanctuary buffer frontiers
              </p>
            </div>
          </div>
        </div>

        {/* Chart View & Timeframe Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Timeframe selector */}
          <div className="bg-[#F5F8F6] p-1 rounded-xl border border-gray-200/80 flex items-center text-xs font-bold">
            <button
              onClick={() => {
                setTimeframe('6M');
                setHoveredIndex(5);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeframe === '6M' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              6M
            </button>
            <button
              onClick={() => {
                setTimeframe('10M');
                setHoveredIndex(9);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeframe === '10M' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              YTD (10M)
            </button>
            <button
              onClick={() => {
                setTimeframe('12M');
                setHoveredIndex(9);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeframe === '12M' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Full Year
            </button>
          </div>

          {/* Chart Display Type Switcher */}
          <div className="bg-[#F5F8F6] p-1 rounded-xl border border-gray-200/80 flex items-center text-xs font-bold">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-lg transition-all ${
                chartType === 'area' ? 'bg-white text-[#063B2A] shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Smooth Gradient Spline Area Chart"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg transition-all ${
                chartType === 'bar' ? 'bg-white text-[#063B2A] shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Tactical Stacked Capsule Bar Chart"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Export Summary Button */}
          <button
            onClick={handleExportSummary}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="Copy Sighting Telemetry Summary"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copy Alert Banner */}
      {copiedNotice && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 text-center animate-fadeIn">
          Wildlife Sighting telemetry copied to clipboard!
        </div>
      )}

      {/* 2. Executive KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Incursions */}
        <div className="p-4 bg-[#F5F8F6] rounded-2xl border border-gray-200/80 hover:bg-white hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Total Incursions</span>
            <span className="flex items-center text-emerald-700 font-bold text-[11px]">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +{stats.growthRate}% MoM
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#063B2A]">
              {stats.totalSightings.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Verified Events</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
            <span>Peak: {stats.peakMonth.month} ({stats.peakMonth.total})</span>
            <span className="text-emerald-700 font-bold">~4.8 / Day</span>
          </div>
        </div>

        {/* Asian Elephant Share */}
        <div 
          onClick={() => setSelectedSpecies(selectedSpecies === 'elephant' ? 'all' : 'elephant')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedSpecies === 'elephant'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-[#F5F8F6] border-gray-200/80 hover:bg-white hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1 font-bold text-[#063B2A]">
              <span>🐘</span> Asian Elephant
            </span>
            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
              High Risk
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#063B2A]">
              {stats.totalElephants}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              ({((stats.totalElephants / stats.totalSightings) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="mt-2 text-[10px] text-gray-500">
            <span>Primary Crop Incursion Threat</span>
          </div>
        </div>

        {/* Indian Leopard Share */}
        <div 
          onClick={() => setSelectedSpecies(selectedSpecies === 'leopard' ? 'all' : 'leopard')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedSpecies === 'leopard'
              ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20'
              : 'bg-[#F5F8F6] border-gray-200/80 hover:bg-white hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1 font-bold text-rose-950">
              <span>🐆</span> Indian Leopard
            </span>
            <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-100 px-1.5 py-0.2 rounded">
              Predator
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-950">
              {stats.totalLeopards}
            </span>
            <span className="text-xs font-bold text-rose-700">
              ({((stats.totalLeopards / stats.totalSightings) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="mt-2 text-[10px] text-gray-500">
            <span>Village Quarters Watch Active</span>
          </div>
        </div>

        {/* Wild Boar Share */}
        <div 
          onClick={() => setSelectedSpecies(selectedSpecies === 'boar' ? 'all' : 'boar')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedSpecies === 'boar'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-[#F5F8F6] border-gray-200/80 hover:bg-white hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1 font-bold text-amber-950">
              <span>🐗</span> Wild Boar
            </span>
            <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
              Tuber Crop
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-950">
              {stats.totalBoars}
            </span>
            <span className="text-xs font-bold text-amber-700">
              ({((stats.totalBoars / stats.totalSightings) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="mt-2 text-[10px] text-gray-500">
            <span>Paddy &amp; Tapioca Buffer Line</span>
          </div>
        </div>

      </div>

      {/* 3. Interactive SVG Chart Canvas */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-b from-[#FAFDFB] to-white rounded-3xl p-4 sm:p-6 border border-emerald-950/10 shadow-inner overflow-hidden select-none"
      >
        
        {/* Subtle Background Tactical Radar Watermark */}
        <div className="absolute right-6 top-6 opacity-[0.03] pointer-events-none">
          <Activity className="w-96 h-96 text-[#063B2A]" />
        </div>

        {/* SVG Visualization */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto max-h-[300px] overflow-visible"
          >
            <defs>
              {/* Gradients for Spline Areas */}
              <linearGradient id="grad-total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#10B981" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="grad-elephant" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="80%" stopColor="#059669" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="grad-leopard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.38" />
                <stop offset="80%" stopColor="#F43F5E" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="grad-boar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
                <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>

              {/* Glowing Drop Shadow Filter for Active Line */}
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10B981" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Horizontal Gridlines & Tick Values */}
            {yTicks.map((val, idx) => {
              const y = padTop + chartInnerHeight - (val / maxValue) * chartInnerHeight;
              return (
                <g key={idx}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={svgWidth - padRight}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray={idx === 0 ? "none" : "4 4"}
                  />
                  <text
                    x={padLeft - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Vertical Month Guidelines */}
            {activeData.map((d, index) => {
              const x = padLeft + (index / (activeData.length - 1)) * chartInnerWidth;
              const isHovered = hoveredIndex === index;

              return (
                <g key={d.month}>
                  {/* Subtle vertical dotted guide on hover */}
                  {isHovered && (
                    <line
                      x1={x}
                      y1={padTop}
                      x2={x}
                      y2={padTop + chartInnerHeight}
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Month Label */}
                  <text
                    x={x}
                    y={svgHeight - 14}
                    textAnchor="middle"
                    fill={isHovered ? "#063B2A" : "#64748B"}
                    fontSize={isHovered ? "12" : "11"}
                    fontWeight={isHovered ? "900" : "600"}
                    className="transition-all"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}

            {/* MODE 1: AREA & SPLINE CURVES */}
            {chartType === 'area' && (
              <>
                {/* Secondary curves when "all" is selected */}
                {selectedSpecies === 'all' && (
                  <>
                    {/* Wild Boar Area & Curve */}
                    <path
                      d={generateAreaPath(pointsBoar)}
                      fill="url(#grad-boar)"
                    />
                    <path
                      d={generateSmoothPath(pointsBoar)}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeOpacity="0.85"
                    />

                    {/* Leopard Area & Curve */}
                    <path
                      d={generateAreaPath(pointsLeopard)}
                      fill="url(#grad-leopard)"
                    />
                    <path
                      d={generateSmoothPath(pointsLeopard)}
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth="2"
                      strokeOpacity="0.85"
                    />

                    {/* Elephant Area & Curve */}
                    <path
                      d={generateAreaPath(pointsElephant)}
                      fill="url(#grad-elephant)"
                    />
                    <path
                      d={generateSmoothPath(pointsElephant)}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* Combined Total Topmost Glowing Line */}
                    <path
                      d={generateAreaPath(pointsTotal)}
                      fill="url(#grad-total)"
                    />
                    <path
                      d={generateSmoothPath(pointsTotal)}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      filter="url(#glow-filter)"
                    />
                  </>
                )}

                {/* Single Species Focus Curves */}
                {selectedSpecies === 'elephant' && (
                  <>
                    <path d={generateAreaPath(pointsElephant)} fill="url(#grad-elephant)" />
                    <path d={generateSmoothPath(pointsElephant)} fill="none" stroke="#059669" strokeWidth="3.5" filter="url(#glow-filter)" />
                  </>
                )}
                {selectedSpecies === 'leopard' && (
                  <>
                    <path d={generateAreaPath(pointsLeopard)} fill="url(#grad-leopard)" />
                    <path d={generateSmoothPath(pointsLeopard)} fill="none" stroke="#F43F5E" strokeWidth="3.5" filter="url(#glow-filter)" />
                  </>
                )}
                {selectedSpecies === 'boar' && (
                  <>
                    <path d={generateAreaPath(pointsBoar)} fill="url(#grad-boar)" />
                    <path d={generateSmoothPath(pointsBoar)} fill="none" stroke="#F59E0B" strokeWidth="3.5" filter="url(#glow-filter)" />
                  </>
                )}

                {/* Node Circles on Hover Point */}
                {activeData.map((d, index) => {
                  const isHovered = hoveredIndex === index;
                  if (!isHovered) return null;

                  const ptTotal = pointsTotal[index];
                  const ptElephant = pointsElephant[index];
                  const ptLeopard = pointsLeopard[index];
                  const ptBoar = pointsBoar[index];

                  return (
                    <g key={d.month} className="animate-scaleIn pointer-events-none">
                      {selectedSpecies === 'all' && (
                        <>
                          {/* Total Node */}
                          <circle cx={ptTotal.x} cy={ptTotal.y} r="7" fill="#10B981" />
                          <circle cx={ptTotal.x} cy={ptTotal.y} r="4" fill="#FFFFFF" />

                          {/* Species Nodes */}
                          <circle cx={ptElephant.x} cy={ptElephant.y} r="5" fill="#059669" stroke="#fff" strokeWidth="2" />
                          <circle cx={ptLeopard.x} cy={ptLeopard.y} r="5" fill="#F43F5E" stroke="#fff" strokeWidth="2" />
                          <circle cx={ptBoar.x} cy={ptBoar.y} r="5" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
                        </>
                      )}

                      {selectedSpecies === 'elephant' && (
                        <>
                          <circle cx={ptElephant.x} cy={ptElephant.y} r="7" fill="#059669" />
                          <circle cx={ptElephant.x} cy={ptElephant.y} r="4" fill="#FFFFFF" />
                        </>
                      )}
                      {selectedSpecies === 'leopard' && (
                        <>
                          <circle cx={ptLeopard.x} cy={ptLeopard.y} r="7" fill="#F43F5E" />
                          <circle cx={ptLeopard.x} cy={ptLeopard.y} r="4" fill="#FFFFFF" />
                        </>
                      )}
                      {selectedSpecies === 'boar' && (
                        <>
                          <circle cx={ptBoar.x} cy={ptBoar.y} r="7" fill="#F59E0B" />
                          <circle cx={ptBoar.x} cy={ptBoar.y} r="4" fill="#FFFFFF" />
                        </>
                      )}
                    </g>
                  );
                })}
              </>
            )}

            {/* MODE 2: MODERN SEGMENTED CAPSULE BARS */}
            {chartType === 'bar' && (
              <>
                {activeData.map((d, index) => {
                  const x = padLeft + (index / (activeData.length - 1)) * chartInnerWidth;
                  const isHovered = hoveredIndex === index;
                  const barWidth = Math.min(38, Math.max(20, chartInnerWidth / (activeData.length * 1.6)));

                  const totalH = (d.total / maxValue) * chartInnerHeight;
                  const elephantH = (d.elephant / maxValue) * chartInnerHeight;
                  const leopardH = (d.leopard / maxValue) * chartInnerHeight;
                  const boarH = (d.boar / maxValue) * chartInnerHeight;

                  const bottomY = padTop + chartInnerHeight;

                  return (
                    <g key={d.month} className="transition-all duration-300">
                      {selectedSpecies === 'all' ? (
                        <g>
                          {/* Wild Boar (Bottom Segment) */}
                          <rect
                            x={x - barWidth / 2}
                            y={bottomY - boarH}
                            width={barWidth}
                            height={boarH}
                            fill="#F59E0B"
                            rx="2"
                            className="transition-all"
                            opacity={isHovered ? 1 : 0.85}
                          />

                          {/* Leopard (Middle Segment) */}
                          <rect
                            x={x - barWidth / 2}
                            y={bottomY - boarH - leopardH}
                            width={barWidth}
                            height={leopardH}
                            fill="#F43F5E"
                            rx="2"
                            className="transition-all"
                            opacity={isHovered ? 1 : 0.85}
                          />

                          {/* Elephant (Top Segment with rounded top capsule) */}
                          <rect
                            x={x - barWidth / 2}
                            y={bottomY - totalH}
                            width={barWidth}
                            height={elephantH}
                            fill="#10B981"
                            rx="6"
                            className="transition-all"
                            opacity={isHovered ? 1 : 0.9}
                          />
                        </g>
                      ) : (
                        /* Single Species Bar */
                        <rect
                          x={x - barWidth / 2}
                          y={bottomY - ((d[SPECIES_CONFIG[selectedSpecies].key] || 0) / maxValue) * chartInnerHeight}
                          width={barWidth}
                          height={((d[SPECIES_CONFIG[selectedSpecies].key] || 0) / maxValue) * chartInnerHeight}
                          fill={SPECIES_CONFIG[selectedSpecies].color}
                          rx="6"
                          className="transition-all shadow-md"
                          opacity={isHovered ? 1 : 0.85}
                        />
                      )}

                      {/* Active Ring on Hover */}
                      {isHovered && (
                        <rect
                          x={x - barWidth / 2 - 2}
                          y={bottomY - totalH - 2}
                          width={barWidth + 4}
                          height={totalH + 4}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          rx="8"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}
              </>
            )}

            {/* Invisible Overlay Rectangles for Smooth Scrubbing / Hover across all points */}
            {activeData.map((d, index) => {
              const x = padLeft + (index / (activeData.length - 1)) * chartInnerWidth;
              const step = chartInnerWidth / (activeData.length - 1);
              const hitX = index === 0 ? padLeft : x - step / 2;
              const hitW = index === 0 || index === activeData.length - 1 ? step / 2 + 10 : step;

              return (
                <rect
                  key={`hit-${d.month}`}
                  x={hitX}
                  y={padTop}
                  width={hitW}
                  height={chartInnerHeight + 20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => setHoveredIndex(index)}
                />
              );
            })}
          </svg>
        </div>

        {/* 4. Glassmorphic High-Tech Tactical Tooltip Card */}
        {hoveredData && (
          <div className="mt-4 p-4 rounded-2xl bg-[#071A14] text-white border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
            
            {/* Left: Month Meta */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-emerald-400 font-mono">
                  {hoveredData.month} 2026 Telemetry
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {hoveredIndex === 9 ? 'Current Peak Month' : 'Historical Data'}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {hoveredData.note}
              </p>
            </div>

            {/* Right: Data Breakdown Chips */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs font-mono">
              <div className="p-2 rounded-xl bg-black/50 border border-emerald-800/60 text-center min-w-[70px]">
                <span className="text-[10px] text-gray-400 block font-semibold">Total</span>
                <strong className="text-base font-black text-emerald-400">{hoveredData.total}</strong>
              </div>

              <div className="p-2 rounded-xl bg-black/50 border border-emerald-900/40 text-center min-w-[70px]">
                <span className="text-[10px] text-gray-400 block font-semibold">🐘 Elephant</span>
                <strong className="text-sm font-bold text-emerald-300">{hoveredData.elephant}</strong>
                <span className="text-[9px] text-gray-400 block">({((hoveredData.elephant / hoveredData.total) * 100).toFixed(0)}%)</span>
              </div>

              <div className="p-2 rounded-xl bg-black/50 border border-rose-900/40 text-center min-w-[70px]">
                <span className="text-[10px] text-gray-400 block font-semibold">🐆 Leopard</span>
                <strong className="text-sm font-bold text-rose-400">{hoveredData.leopard}</strong>
                <span className="text-[9px] text-gray-400 block">({((hoveredData.leopard / hoveredData.total) * 100).toFixed(0)}%)</span>
              </div>

              <div className="p-2 rounded-xl bg-black/50 border border-amber-900/40 text-center min-w-[70px]">
                <span className="text-[10px] text-gray-400 block font-semibold">🐗 Wild Boar</span>
                <strong className="text-sm font-bold text-amber-400">{hoveredData.boar}</strong>
                <span className="text-[9px] text-gray-400 block">({((hoveredData.boar / hoveredData.total) * 100).toFixed(0)}%)</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 5. Species Legend & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 text-xs">
        
        {/* Clickable Legend Badges */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap font-semibold">
          <button
            onClick={() => setSelectedSpecies('all')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              selectedSpecies === 'all'
                ? 'bg-[#063B2A] text-white border-transparent shadow-xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <span>All Combined ({stats.totalSightings})</span>
          </button>

          <button
            onClick={() => setSelectedSpecies('elephant')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              selectedSpecies === 'elephant'
                ? 'bg-[#059669] text-white border-transparent shadow-xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
            <span>Asian Elephant (40%)</span>
          </button>

          <button
            onClick={() => setSelectedSpecies('leopard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              selectedSpecies === 'leopard'
                ? 'bg-rose-600 text-white border-transparent shadow-xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Indian Leopard (18%)</span>
          </button>

          <button
            onClick={() => setSelectedSpecies('boar')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              selectedSpecies === 'boar'
                ? 'bg-amber-600 text-white border-transparent shadow-xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Wild Boar (42%)</span>
          </button>
        </div>

        {/* Operational Intelligence Note */}
        <div className="flex items-center gap-2 text-gray-500 text-[11px]">
          <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Peak Nocturnal Incursions: 22:00 – 04:30 hrs</span>
        </div>

      </div>

    </div>
  );
};

export default WildlifeTrendsChart;

