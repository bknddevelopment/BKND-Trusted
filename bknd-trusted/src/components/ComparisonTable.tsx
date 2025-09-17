import React, { useState } from 'react';
import { Check, X, Star, Shield, Clock, DollarSign, TrendingUp, Minus, Plus } from 'lucide-react';
import { Business } from '../types';
import { motion } from 'framer-motion';

interface ComparisonTableProps {
  businesses: Business[];
  onRemove?: (businessId: string) => void;
  onSelect?: (businessId: string) => void;
  maxCompare?: number;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  businesses,
  onRemove,
  onSelect,
  maxCompare = 4
}) => {
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  const features = [
    { key: 'rating', label: 'Customer Rating', icon: <Star className="w-4 h-4" /> },
    { key: 'trustScore', label: 'Trust Score', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'reviews', label: 'Total Reviews', icon: <Star className="w-4 h-4" /> },
    { key: 'verified', label: 'Verified Business', icon: <Shield className="w-4 h-4" /> },
    { key: 'responseTime', label: 'Response Time', icon: <Clock className="w-4 h-4" /> },
    { key: 'priceRange', label: 'Price Range', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'insurance', label: 'Insurance Coverage', icon: <Shield className="w-4 h-4" /> },
    { key: 'licensed', label: 'Licensed', icon: <Check className="w-4 h-4" /> },
    { key: 'yearsInBusiness', label: 'Years in Business', icon: <Clock className="w-4 h-4" /> },
    { key: 'completedJobs', label: 'Completed Jobs', icon: <Check className="w-4 h-4" /> },
  ];

  const visibleFeatures = expandedFeatures ? features : features.slice(0, 6);

  const getFeatureValue = (business: Business, featureKey: string) => {
    switch (featureKey) {
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold">{business.rating.toFixed(1)}</span>
          </div>
        );
      case 'trustScore':
        const color = business.trustScore >= 90 ? 'text-green-600' :
                     business.trustScore >= 70 ? 'text-yellow-600' :
                     'text-red-600';
        return (
          <div className={`font-semibold ${color}`}>
            {business.trustScore}%
          </div>
        );
      case 'reviews':
        return <span>{business.reviews.toLocaleString()}</span>;
      case 'verified':
        return business.verified ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <X className="w-5 h-5 text-gray-400" />
        );
      case 'responseTime':
        return <span className="text-sm">{business.responseTime}</span>;
      case 'priceRange':
        return (
          <span className="text-sm font-medium">
            ${business.priceRange.min}-${business.priceRange.max}/{business.priceRange.unit}
          </span>
        );
      case 'insurance':
        return business.insurance ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <X className="w-5 h-5 text-gray-400" />
        );
      case 'licensed':
        return business.licensed ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <X className="w-5 h-5 text-gray-400" />
        );
      case 'yearsInBusiness':
        return <span>{business.yearsInBusiness} years</span>;
      case 'completedJobs':
        return <span>{business.completedJobs.toLocaleString()}</span>;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBestValue = (featureKey: string) => {
    switch (featureKey) {
      case 'rating':
        return Math.max(...businesses.map(b => b.rating));
      case 'trustScore':
        return Math.max(...businesses.map(b => b.trustScore));
      case 'reviews':
        return Math.max(...businesses.map(b => b.reviews));
      case 'responseTime':
        // For response time, lower is better (if numeric comparison possible)
        return null;
      case 'priceRange':
        return Math.min(...businesses.map(b => b.priceRange.min));
      case 'yearsInBusiness':
        return Math.max(...businesses.map(b => b.yearsInBusiness));
      case 'completedJobs':
        return Math.max(...businesses.map(b => b.completedJobs));
      default:
        return null;
    }
  };

  const isBestValue = (business: Business, featureKey: string) => {
    const bestValue = getBestValue(featureKey);
    if (bestValue === null) return false;

    switch (featureKey) {
      case 'rating':
        return business.rating === bestValue;
      case 'trustScore':
        return business.trustScore === bestValue;
      case 'reviews':
        return business.reviews === bestValue;
      case 'priceRange':
        return business.priceRange.min === bestValue;
      case 'yearsInBusiness':
        return business.yearsInBusiness === bestValue;
      case 'completedJobs':
        return business.completedJobs === bestValue;
      default:
        return false;
    }
  };

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Plus className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses to compare</h3>
        <p className="text-gray-600">Add up to {maxCompare} businesses to compare side by side</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Header with Business Names */}
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-semibold text-gray-600">Compare Features</span>
              </th>
              {businesses.map((business) => (
                <th key={business.id} className="px-4 py-4 text-center">
                  <div className="space-y-2">
                    {business.images[0] ? (
                      <img
                        src={business.images[0]}
                        alt={business.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                        <span className="text-2xl font-bold text-gray-400">
                          {business.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{business.name}</h4>
                      <p className="text-xs text-gray-600">{business.location.city}, {business.location.state}</p>
                    </div>
                    {onRemove && (
                      <button
                        onClick={() => onRemove(business.id)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {businesses.length < maxCompare && (
                <th className="px-4 py-4">
                  <button className="w-full h-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Add Business</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>

          {/* Feature Comparison Rows */}
          <tbody>
            {visibleFeatures.map((feature, index) => (
              <motion.tr
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {feature.icon}
                    {feature.label}
                  </div>
                </td>
                {businesses.map((business) => {
                  const isBest = isBestValue(business, feature.key);
                  return (
                    <td
                      key={business.id}
                      className={`px-4 py-4 text-center ${
                        isBest ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className={`inline-flex items-center justify-center ${
                        isBest ? 'font-semibold text-green-700' : ''
                      }`}>
                        {getFeatureValue(business, feature.key)}
                        {isBest && (
                          <span className="ml-2 text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">
                            Best
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
                {businesses.length < maxCompare && <td />}
              </motion.tr>
            ))}
          </tbody>

          {/* Action Row */}
          <tfoot>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">
                {features.length > 6 && (
                  <button
                    onClick={() => setExpandedFeatures(!expandedFeatures)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {expandedFeatures ? 'Show less' : `Show ${features.length - 6} more features`}
                  </button>
                )}
              </td>
              {businesses.map((business) => (
                <td key={business.id} className="px-4 py-4 text-center">
                  <button
                    onClick={() => onSelect && onSelect(business.id)}
                    className="btn-primary text-sm"
                  >
                    Choose This
                  </button>
                </td>
              ))}
              {businesses.length < maxCompare && <td />}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};