import React, { useState } from 'react';
import {
  Filter, DollarSign, Calendar, Star, MapPin, Shield,
  ChevronDown, ChevronUp, X, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchFilters } from '../types';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
  serviceTypes?: string[];
  variant?: 'sidebar' | 'dropdown';
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onReset,
  serviceTypes = [],
  variant = 'sidebar'
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['serviceType', 'price', 'availability'])
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue,
        min: type === 'min' ? numValue : filters.priceRange?.min || 0,
        max: type === 'max' ? numValue : filters.priceRange?.max || 1000
      }
    });
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    section: string;
    children: React.ReactNode;
  }> = ({ title, icon, section, children }) => (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections.has(section) ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections.has(section) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterContent = () => (
    <>
      {/* Service Type Filter */}
      <FilterSection
        title="Service Type"
        icon={<Filter className="w-4 h-4 text-gray-500" />}
        section="serviceType"
      >
        {serviceTypes.map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="serviceType"
              value={type}
              checked={filters.serviceType === type}
              onChange={(e) => onFiltersChange({ ...filters, serviceType: e.target.value })}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{type}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        icon={<DollarSign className="w-4 h-4 text-gray-500" />}
        section="price"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange?.min || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <span className="text-gray-500 mt-6">-</span>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange?.max || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  placeholder="1000"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: '$0-50', min: 0, max: 50 },
              { label: '$50-100', min: 50, max: 100 },
              { label: '$100-250', min: 100, max: 250 },
              { label: '$250+', min: 250, max: 10000 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => onFiltersChange({
                  ...filters,
                  priceRange: { min: preset.min, max: preset.max }
                })}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.priceRange?.min === preset.min && filters.priceRange?.max === preset.max
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        icon={<Calendar className="w-4 h-4 text-gray-500" />}
        section="availability"
      >
        {[
          { value: 'today', label: 'Today' },
          { value: 'tomorrow', label: 'Tomorrow' },
          { value: 'this-week', label: 'This Week' },
          { value: 'flexible', label: 'Flexible' }
        ].map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="availability"
              value={option.value}
              checked={filters.availability === option.value}
              onChange={(e) => onFiltersChange({
                ...filters,
                availability: e.target.value as SearchFilters['availability']
              })}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Minimum Rating"
        icon={<Star className="w-4 h-4 text-gray-500" />}
        section="rating"
      >
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={() => onFiltersChange({ ...filters, rating })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-700 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Distance Filter */}
      <FilterSection
        title="Distance"
        icon={<MapPin className="w-4 h-4 text-gray-500" />}
        section="distance"
      >
        <div className="space-y-2">
          {[5, 10, 25, 50].map((distance) => (
            <label key={distance} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="distance"
                value={distance}
                checked={filters.distance === distance}
                onChange={() => onFiltersChange({ ...filters, distance })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Within {distance} miles</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Verified Only */}
      <div className="px-4 py-3 border-b border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verified || false}
            onChange={(e) => onFiltersChange({ ...filters, verified: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Verified Businesses Only</span>
          </div>
        </label>
      </div>
    </>
  );

  if (variant === 'dropdown') {
    return (
      <>
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="md:hidden btn-secondary flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-140px)]">
                  <FilterContent />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <button
                    onClick={onReset}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <FilterContent />
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onReset}
          className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};