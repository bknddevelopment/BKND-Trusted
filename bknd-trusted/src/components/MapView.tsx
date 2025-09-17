import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, Maximize2, Filter } from 'lucide-react';
import { Business } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MapViewProps {
  businesses: Business[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onBusinessSelect?: (business: Business) => void;
  selectedBusinessId?: string;
  showControls?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  businesses,
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 12,
  onBusinessSelect,
  selectedBusinessId,
  showControls = true
}) => {
  const [mapZoom, setMapZoom] = useState(zoom);
  const [mapCenter, setMapCenter] = useState(center);
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulated map rendering - in production, integrate with Google Maps or Mapbox
  const getBusinessPosition = (business: Business, index: number) => {
    // Generate positions based on business location
    const baseLeft = 20 + (index % 4) * 20;
    const baseTop = 20 + Math.floor(index / 4) * 15;
    return {
      left: `${baseLeft + Math.random() * 10}%`,
      top: `${baseTop + Math.random() * 10}%`
    };
  };

  const getTrustColor = (trustScore: number) => {
    if (trustScore >= 90) return 'bg-green-500 border-green-600';
    if (trustScore >= 70) return 'bg-yellow-500 border-yellow-600';
    if (trustScore >= 50) return 'bg-orange-500 border-orange-600';
    return 'bg-red-500 border-red-600';
  };

  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 1, 20));
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 1, 5));

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Container (Placeholder - replace with actual map implementation) */}
      <div
        ref={mapRef}
        className={`absolute inset-0 ${
          mapType === 'satellite'
            ? 'bg-gradient-to-br from-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-green-50'
        }`}
      >
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-gray-600"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-gray-600"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>

        {/* Business Pins */}
        {businesses.map((business, index) => {
          const position = getBusinessPosition(business, index);
          const isSelected = business.id === selectedBusinessId;
          const isHovered = business.id === hoveredBusiness;

          return (
            <motion.div
              key={business.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
                opacity: 1
              }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="absolute"
              style={position}
            >
              {/* Pin */}
              <div
                className="relative cursor-pointer group"
                onClick={() => onBusinessSelect && onBusinessSelect(business)}
                onMouseEnter={() => setHoveredBusiness(business.id)}
                onMouseLeave={() => setHoveredBusiness(null)}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`relative z-10 w-10 h-10 rounded-full ${getTrustColor(
                    business.trustScore
                  )} border-2 shadow-lg flex items-center justify-center text-white font-bold transition-all ${
                    isSelected ? 'ring-4 ring-white ring-opacity-50' : ''
                  }`}
                >
                  {business.trustScore}
                </motion.div>
                <div
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] ${
                    business.trustScore >= 90
                      ? 'border-t-green-500'
                      : business.trustScore >= 70
                      ? 'border-t-yellow-500'
                      : business.trustScore >= 50
                      ? 'border-t-orange-500'
                      : 'border-t-red-500'
                  }`}
                />

                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="bg-white rounded-lg shadow-xl p-3 min-w-[200px]">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {business.name}
                        </h4>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(business.rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-600">
                            {business.rating.toFixed(1)} ({business.reviews})
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {business.priceRange.min}-{business.priceRange.max}$/{business.priceRange.unit}
                        </p>
                        <p className="text-xs text-green-600 font-medium mt-1">
                          {business.responseTime}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {/* Center Marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Map Controls */}
      {showControls && (
        <>
          {/* Zoom Controls */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="border-t border-gray-200" />
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>

          {/* Map Type Toggle */}
          <div className="absolute left-4 top-4 bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors rounded"
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">
                {mapType === 'roadmap' ? 'Satellite' : 'Map'}
              </span>
            </button>
          </div>

          {/* Current Location Button */}
          <button className="absolute right-4 bottom-36 bg-white rounded-lg shadow-lg p-2 hover:bg-gray-100 transition-colors">
            <Navigation className="w-5 h-5" />
          </button>

          {/* Fullscreen Button */}
          <button className="absolute right-4 top-4 bg-white rounded-lg shadow-lg p-2 hover:bg-gray-100 transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Legend */}
      <div className="absolute left-4 bottom-4 bg-white rounded-lg shadow-lg p-3 max-w-[200px]">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Trust Score</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">90-100 Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-600">70-89 Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-xs text-gray-600">50-69 Fair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">&lt;50 Poor</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2">
        <span className="text-sm font-medium text-gray-700">
          {businesses.length} businesses in view
        </span>
      </div>
    </div>
  );
};