import { useState } from "react";

interface DataCenterSite {
  id: string;
  name: string;
  city: string;
  state: string;
  stateAbbr: string;
  lat: number;
  lng: number;
  medianHouseholdIncome: number;
  nationalMedian: number;
  povertyRate: number;
  population: number;
  status: string;
  capacity: string;
  acquired: string;
  landCost: string;
  notes: string;
  source: string;
}

const SITES: DataCenterSite[] = [
  {
    id: "dowagiac",
    name: "Alliance Cloud Services — Dowagiac Campus",
    city: "Dowagiac",
    state: "Michigan",
    stateAbbr: "MI",
    lat: 41.98,
    lng: -86.11,
    medianHouseholdIncome: 37200,
    nationalMedian: 74580,
    povertyRate: 22.4,
    population: 5900,
    status: "Operating & Expanding",
    capacity: "30 MW current → 340 MW planned by 2029",
    acquired: "December 2020",
    landCost: "$3.9 million (35 acres → expanding to 83 acres)",
    notes: "Federal class-action lawsuit filed by residents over 24/7 noise. Mayor issued public open letter demanding transparency. City council denied moratorium petition.",
    source: "U.S. Census ACS 2022, WSBT, Michigan Advance"
  },
  {
    id: "montana",
    name: "Sentinum — Montana Data Center",
    city: "Butte",
    state: "Montana",
    stateAbbr: "MT",
    lat: 46.0,
    lng: -112.53,
    medianHouseholdIncome: 42100,
    nationalMedian: 74580,
    povertyRate: 18.1,
    population: 34200,
    status: "Sold / Divested (Sept 2025)",
    capacity: "Undisclosed — sold to focus on Michigan flagship",
    acquired: "2020–2021",
    landCost: "Undisclosed",
    notes: "Hyperscale Data announced intent to sell Montana land leases and power contracts in September 2025 to concentrate resources on the Dowagiac campus.",
    source: "PR Newswire (Sept 2025), Data Center Dynamics"
  }
];

const NATIONAL_MEDIAN = 74580;

// Simple US map using approximate state center coordinates mapped to SVG viewBox
// We'll use a simplified approach with dots on a US outline SVG
const STATE_POSITIONS: Record<string, { x: number; y: number }> = {
  MI: { x: 580, y: 165 },
  MT: { x: 230, y: 130 },
};

export default function DataCenterMap() {
  const [selected, setSelected] = useState<DataCenterSite | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const incomeGap = (site: DataCenterSite) =>
    Math.round(((NATIONAL_MEDIAN - site.medianHouseholdIncome) / NATIONAL_MEDIAN) * 100);

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-[var(--color-border,#d4c5a9)]" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ backgroundColor: "#1a3a2a" }}>
        <h3 className="text-lg font-bold text-white mb-1">Hyperscale Data Inc. — Site Selection Pattern</h3>
        <p className="text-sm" style={{ color: "#c8b89a" }}>
          Known data center locations mapped against local median household income vs. the U.S. national median ($74,580)
        </p>
      </div>

      {/* Map + Chart layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ backgroundColor: "#faf7f2" }}>

        {/* Left: US Map */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-[#d4c5a9]">
          <p className="text-xs mb-3 font-semibold uppercase tracking-widest" style={{ color: "#5a4a3a" }}>Site Locations</p>
          <div className="relative w-full" style={{ paddingBottom: "62%" }}>
            <svg
              viewBox="0 0 960 600"
              className="absolute inset-0 w-full h-full"
              style={{ background: "#eee8dc" }}
            >
              {/* Simplified US outline paths */}
              <path
                d="M 150 80 L 820 80 L 820 420 L 680 420 L 680 500 L 580 500 L 580 420 L 150 420 Z"
                fill="#ddd5c0"
                stroke="#b8a88a"
                strokeWidth="1.5"
              />
              {/* Great Lakes rough outline */}
              <ellipse cx="580" cy="160" rx="30" ry="18" fill="#c8dce8" opacity="0.6" />
              <ellipse cx="610" cy="145" rx="18" ry="12" fill="#c8dce8" opacity="0.6" />
              {/* State dividers (simplified) */}
              <line x1="400" y1="80" x2="400" y2="420" stroke="#b8a88a" strokeWidth="0.5" opacity="0.5" />
              <line x1="300" y1="80" x2="300" y2="280" stroke="#b8a88a" strokeWidth="0.5" opacity="0.5" />
              <line x1="150" y1="280" x2="820" y2="280" stroke="#b8a88a" strokeWidth="0.5" opacity="0.5" />

              {/* State labels */}
              <text x="235" y="175" fontSize="11" fill="#7a6a5a" fontFamily="sans-serif">MT</text>
              <text x="575" y="210" fontSize="11" fill="#7a6a5a" fontFamily="sans-serif">MI</text>

              {/* Site dots */}
              {SITES.map((site) => {
                const pos = STATE_POSITIONS[site.stateAbbr];
                if (!pos) return null;
                const isSelected = selected?.id === site.id;
                const isSold = site.status.includes("Sold");
                return (
                  <g
                    key={site.id}
                    onClick={() => setSelected(selected?.id === site.id ? null : site)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulse ring */}
                    {!isSold && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 22 : 18}
                        fill="none"
                        stroke="#c8a84b"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    )}
                    {/* Main dot */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 12 : 9}
                      fill={isSold ? "#8a7a6a" : "#1a3a2a"}
                      stroke={isSelected ? "#c8a84b" : "white"}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y + 24}
                      fontSize="10"
                      fill={isSold ? "#6a5a4a" : "#1a3a2a"}
                      fontFamily="sans-serif"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {site.city}
                    </text>
                    {isSold && (
                      <text
                        x={pos.x}
                        y={pos.y + 36}
                        fontSize="9"
                        fill="#8a7a6a"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        fontStyle="italic"
                      >
                        (divested)
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Legend */}
              <circle cx="170" cy="540" r="7" fill="#1a3a2a" stroke="white" strokeWidth="1.5" />
              <text x="183" y="545" fontSize="10" fill="#3a2a1a" fontFamily="sans-serif">Active site</text>
              <circle cx="280" cy="540" r="7" fill="#8a7a6a" stroke="white" strokeWidth="1.5" />
              <text x="293" y="545" fontSize="10" fill="#3a2a1a" fontFamily="sans-serif">Divested site</text>
            </svg>
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#7a6a5a" }}>Click a dot to see site details below</p>
        </div>

        {/* Right: Income comparison bar chart */}
        <div className="p-4">
          <p className="text-xs mb-3 font-semibold uppercase tracking-widest" style={{ color: "#5a4a3a" }}>
            Local Median Income vs. U.S. National Median
          </p>
          <div className="space-y-4">
            {/* National median reference bar */}
            <div>
              <div className="flex justify-between text-xs mb-1" style={{ color: "#5a4a3a" }}>
                <span className="font-semibold">U.S. National Median</span>
                <span className="font-bold">$74,580</span>
              </div>
              <div className="w-full rounded-full h-5" style={{ backgroundColor: "#e8dfc8" }}>
                <div
                  className="h-5 rounded-full flex items-center justify-end pr-2"
                  style={{ width: "100%", backgroundColor: "#4a7a5a" }}
                >
                  <span className="text-white text-xs font-bold">100%</span>
                </div>
              </div>
            </div>

            {/* Site bars */}
            {SITES.map((site) => {
              const pct = Math.round((site.medianHouseholdIncome / NATIONAL_MEDIAN) * 100);
              const gap = incomeGap(site);
              const isSold = site.status.includes("Sold");
              return (
                <div
                  key={site.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(selected?.id === site.id ? null : site)}
                  onMouseEnter={() => setHoveredBar(site.id)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span
                      className="font-semibold"
                      style={{ color: selected?.id === site.id ? "#1a3a2a" : "#3a2a1a" }}
                    >
                      {site.city}, {site.stateAbbr}
                      {isSold && <span className="ml-1 italic font-normal" style={{ color: "#8a7a6a" }}>(divested)</span>}
                    </span>
                    <span className="font-bold" style={{ color: "#8a1a1a" }}>
                      ${site.medianHouseholdIncome.toLocaleString()} ({gap}% below national)
                    </span>
                  </div>
                  <div className="w-full rounded-full h-5" style={{ backgroundColor: "#e8dfc8" }}>
                    <div
                      className="h-5 rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: hoveredBar === site.id || selected?.id === site.id
                          ? "#8a1a1a"
                          : isSold ? "#9a8a7a" : "#c84a3a",
                      }}
                    >
                      <span className="text-white text-xs font-bold">{pct}%</span>
                    </div>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#7a6a5a" }}>
                    Poverty rate: {site.povertyRate}% &nbsp;|&nbsp; Population: {site.population.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Income gap callout */}
          <div className="mt-5 p-3 rounded" style={{ backgroundColor: "#f0e8d8", borderLeft: "3px solid #c84a3a" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#8a1a1a" }}>Pattern</p>
            <p className="text-xs" style={{ color: "#3a2a1a" }}>
              Both known Hyperscale Data sites are located in communities with median household incomes
              significantly below the national median, high poverty rates, and limited regulatory capacity
              to challenge industrial expansion.
            </p>
          </div>
        </div>
      </div>

      {/* Selected site detail panel */}
      {selected && (
        <div className="px-6 py-4 border-t border-[#d4c5a9]" style={{ backgroundColor: "#f5f0e8" }}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-base" style={{ color: "#1a3a2a" }}>{selected.name}</h4>
              <p className="text-xs mt-0.5" style={{ color: "#5a4a3a" }}>{selected.city}, {selected.state} &nbsp;·&nbsp; {selected.status}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: "#d4c5a9", color: "#3a2a1a" }}
            >
              Close ✕
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#7a6a5a" }}>Capacity</p>
              <p className="text-xs" style={{ color: "#1a3a2a" }}>{selected.capacity}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#7a6a5a" }}>Acquired</p>
              <p className="text-xs" style={{ color: "#1a3a2a" }}>{selected.acquired}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#7a6a5a" }}>Land Cost</p>
              <p className="text-xs" style={{ color: "#1a3a2a" }}>{selected.landCost}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#7a6a5a" }}>Median Income</p>
              <p className="text-xs font-bold" style={{ color: "#8a1a1a" }}>
                ${selected.medianHouseholdIncome.toLocaleString()} ({incomeGap(selected)}% below U.S. median)
              </p>
            </div>
          </div>
          <p className="text-xs" style={{ color: "#3a2a1a" }}>{selected.notes}</p>
          <p className="text-xs mt-2 italic" style={{ color: "#7a6a5a" }}>Sources: {selected.source}</p>
        </div>
      )}

      {/* Footer note */}
      <div className="px-6 py-3 border-t border-[#d4c5a9]" style={{ backgroundColor: "#ede5d5" }}>
        <p className="text-xs italic" style={{ color: "#7a6a5a" }}>
          Income data from U.S. Census Bureau American Community Survey (2022 5-year estimates). National median household income: $74,580 (2022 ACS). 
          Hyperscale Data Inc. (NYSE American: GPUS) is controlled by Ault &amp; Company, Inc. (~53% beneficial ownership as of early 2026).
        </p>
      </div>
    </div>
  );
}
