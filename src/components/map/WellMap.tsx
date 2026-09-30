import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Well } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Compass, Eye, AlertTriangle, ShieldCheck, MapPin, Layers } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

// Helper to center map dynamically
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Create custom colored Leaflet DivIcons to prevent default asset 404s
const createCustomIcon = (color: string, label: string, isPulsing = false) => {
  const pulseHtml = isPulsing 
    ? `<div class="pulse-ring" style="border-color: ${color};"></div>` 
    : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        ${pulseHtml}
        <div style="
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          background: #0B192C; 
          border: 2px solid ${color}; 
          box-shadow: 0 0 12px ${color}80;
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-family: monospace; 
          font-size: 10px; 
          font-weight: bold; 
          color: #FFFFFF;
        ">
          ${label}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 24px; 
      height: 24px; 
      border-radius: 50%; 
      background: #10B981; 
      border: 3px solid #FFFFFF; 
      box-shadow: 0 0 14px #10B981;
      display: flex; 
      align-items: center; 
      justify-content: center;
    ">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: #FFFFFF;"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
});

interface WellMapProps {
  wells: Well[];
  activeWell: Well | null;
  userCoords: { lat: number; lng: number; label: string } | null;
  selectedRadiusKm?: number;
  onRadiusChange?: (radius: number) => void;
  height?: string;
  showControls?: boolean;
}

export const WellMap: React.FC<WellMapProps> = ({
  wells,
  activeWell,
  userCoords,
  selectedRadiusKm = 10,
  onRadiusChange,
  height = '500px',
  showControls = true
}) => {
  const navigate = useNavigate();
  const [filterFormation, setFilterFormation] = useState<string>('all');
  const [showRiskZone, setShowRiskZone] = useState<boolean>(true);

  // Default center around Assam Asset Nahorkatiya (27.2854, 95.3421)
  const centerLat = activeWell ? activeWell.latitude : 27.2854;
  const centerLng = activeWell ? activeWell.longitude : 95.3421;
  const mapCenter: [number, number] = [centerLat, centerLng];

  const filteredWells = wells.filter(w => {
    if (filterFormation === 'all') return true;
    return w.formation.toLowerCase().includes(filterFormation.toLowerCase());
  });

  return (
    <div className="relative rounded-2xl overflow-hidden border border-oil-navy-700/80 shadow-2xl bg-oil-navy-950 flex flex-col">
      {/* Top Map Controls Bar */}
      {showControls && (
        <div className="p-3 bg-oil-navy-900/90 border-b border-oil-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase tracking-wider">
              GIS Offset Wells Intelligence Map
            </span>
            <span className="font-mono text-[10px] text-slate-400 bg-oil-navy-950 px-2 py-0.5 rounded border border-oil-navy-800">
              Assam Asset (Nahorkatiya Basin)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Radius Selector */}
            {onRadiusChange && (
              <div className="flex items-center gap-1.5 bg-oil-navy-950 px-2.5 py-1 rounded-lg border border-oil-navy-800">
                <span className="text-slate-400">Search Radius:</span>
                {[3, 5, 10, 20].map((r) => (
                  <button
                    key={r}
                    onClick={() => onRadiusChange(r)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                      selectedRadiusKm === r
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}km
                  </button>
                ))}
              </div>
            )}

            {/* Risk Zone Toggle */}
            <button
              onClick={() => setShowRiskZone(!showRiskZone)}
              className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showRiskZone
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-oil-navy-950 text-slate-400 border-oil-navy-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Risk Zone Overlay</span>
            </button>
          </div>
        </div>
      )}

      {/* Real Interactive Leaflet Map */}
      <div style={{ height, width: '100%' }} className="relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController center={mapCenter} zoom={12} />

          {/* OpenStreetMap Dark / Clean Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Current Location Marker */}
          {userCoords && (
            <Marker
              position={[userCoords.lat, userCoords.lng]}
              icon={userLocationIcon}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {userCoords.label}
                  </div>
                  <div className="font-mono text-slate-300 mt-1">
                    Lat: {userCoords.lat.toFixed(4)}, Lng: {userCoords.lng.toFixed(4)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Browser Geolocation Detected
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Dynamic Radius Circle around active well */}
          {activeWell && (
            <Circle
              center={[activeWell.latitude, activeWell.longitude]}
              radius={selectedRadiusKm * 1000}
              pathOptions={{
                color: '#00E5FF',
                fillColor: '#00E5FF',
                fillOpacity: 0.05,
                weight: 1.5,
                dashArray: '6, 6'
              }}
            />
          )}

          {/* Risk Zone Circle around trouble zone wells */}
          {showRiskZone && (
            <Circle
              center={[27.2942, 95.3615]} // AA-05 trouble zone
              radius={2800}
              pathOptions={{
                color: '#EF4444',
                fillColor: '#EF4444',
                fillOpacity: 0.12,
                weight: 2,
              }}
            />
          )}

          {/* Active Well Marker */}
          {activeWell && (
            <Marker
              position={[activeWell.latitude, activeWell.longitude]}
              icon={createCustomIcon('#00E5FF', 'AA12', true)}
            >
              <Popup>
                <div className="p-2 min-w-[220px] text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-oil-navy-700 pb-1.5">
                    <span className="font-mono font-bold text-cyan-400 text-sm">{activeWell.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      ACTIVE DRILLING
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <div><strong>Asset:</strong> {activeWell.asset}</div>
                    <div><strong>Formation:</strong> {activeWell.formation}</div>
                    <div><strong>Current Depth:</strong> {activeWell.currentDepth} m / {activeWell.totalDepth} m</div>
                    <div><strong>Rig:</strong> {activeWell.rigName}</div>
                  </div>
                  <div className="pt-1.5 flex gap-2">
                    <button
                      onClick={() => navigate(`/wells/${activeWell.id}`)}
                      className="w-full py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-center text-[11px]"
                    >
                      View Well Profile
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Offset Wells Markers */}
          {filteredWells
            .filter(w => w.id !== activeWell?.id)
            .map((well) => {
              const isHighSimilarity = (well.similarityScore || 0) >= 85;
              const hasMudLoss = well.name === 'AA-05' || well.name === 'AA-09' || well.name === 'AA-03';
              const markerColor = hasMudLoss ? '#EF4444' : isHighSimilarity ? '#00ADB5' : '#64748B';
              const shortName = well.name.replace('AA-', '');

              return (
                <Marker
                  key={well.id}
                  position={[well.latitude, well.longitude]}
                  icon={createCustomIcon(markerColor, shortName, isHighSimilarity)}
                >
                  <Popup>
                    <div className="p-2 min-w-[230px] text-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-oil-navy-700 pb-1.5">
                        <span className="font-mono font-bold text-white text-sm">{well.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
                          {well.similarityScore || 75}% Match
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-300">
                        <div><strong>Formation:</strong> {well.formation}</div>
                        <div><strong>Distance:</strong> {well.distanceFromActive || 2.5} km</div>
                        <div><strong>Total Depth:</strong> {well.totalDepth} m</div>
                        <div><strong>Historical NPT:</strong> {well.nptTotalHours} hrs</div>
                        {hasMudLoss && (
                          <div className="text-red-400 font-bold flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Mud Loss at 2420–2480 m
                          </div>
                        )}
                      </div>

                      <div className="pt-1.5">
                        <button
                          onClick={() => navigate(`/wells/${well.id}`)}
                          className="w-full py-1 rounded bg-oil-navy-800 hover:bg-oil-navy-700 text-cyan-300 font-semibold text-center text-[11px] border border-oil-navy-600 flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Inspect Offset Data
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>

      {/* Map Legend Overlay */}
      <div className="p-2.5 bg-oil-navy-950/90 border-t border-oil-navy-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-cyan-400 bg-oil-navy-900" />
            <span className="text-slate-300 font-medium">Active Well (AA-12)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-red-500 bg-oil-navy-900" />
            <span className="text-slate-300 font-medium">Historical Loss Zone (AA-05, AA-09)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-cyan-600 bg-oil-navy-900" />
            <span className="text-slate-300 font-medium">High Similarity Offset (&gt;85%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-300 font-medium">Your Current Location</span>
          </div>
        </div>

        <span className="text-slate-500 font-mono text-[10px]">
          Simulated Oil India Offset Network
        </span>
      </div>
    </div>
  );
};
