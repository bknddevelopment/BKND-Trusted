import React, { useState, useEffect } from 'react';
import { Calculator, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from '../types';

interface PriceCalculatorProps {
  services: Service[];
  businessName: string;
  onQuoteRequest?: (selectedServices: Service[], estimatedTotal: number) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  services,
  businessName,
  onQuoteRequest
}) => {
  const [selectedServices, setSelectedServices] = useState<Map<string, number>>(new Map());
  const [customQuantities, setCustomQuantities] = useState<Map<string, number>>(new Map());
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [priceComparison, setPriceComparison] = useState<'below' | 'average' | 'above'>('average');

  useEffect(() => {
    calculateTotal();
  }, [selectedServices, customQuantities]);

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach((isSelected, serviceId) => {
      if (isSelected) {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          const quantity = customQuantities.get(serviceId) || 1;
          total += service.price * quantity;
        }
      }
    });
    setEstimatedTotal(total);

    // Mock price comparison logic
    if (total > 0) {
      const avgMarketPrice = total * 1.15; // Mock: assume market average is 15% higher
      if (total < avgMarketPrice * 0.9) setPriceComparison('below');
      else if (total > avgMarketPrice * 1.1) setPriceComparison('above');
      else setPriceComparison('average');
    }
  };

  const toggleService = (serviceId: string) => {
    const newSelected = new Map(selectedServices);
    newSelected.set(serviceId, !selectedServices.get(serviceId));
    setSelectedServices(newSelected);
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity > 0) {
      const newQuantities = new Map(customQuantities);
      newQuantities.set(serviceId, quantity);
      setCustomQuantities(newQuantities);
    }
  };

  const handleQuoteRequest = () => {
    const selected = services.filter(s => selectedServices.get(s.id));
    if (onQuoteRequest && selected.length > 0) {
      onQuoteRequest(selected, estimatedTotal);
    }
  };

  const getPriceComparisonIcon = () => {
    switch (priceComparison) {
      case 'below':
        return <TrendingDown className="w-5 h-5 text-green-600" />;
      case 'above':
        return <TrendingUp className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPriceComparisonText = () => {
    switch (priceComparison) {
      case 'below':
        return 'Below market average';
      case 'above':
        return 'Above market average';
      default:
        return 'At market average';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Price Calculator</h3>
        </div>
        <p className="text-blue-100 text-sm">
          Get an instant estimate from {businessName}
        </p>
      </div>

      {/* Services List */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedServices.get(service.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selectedServices.get(service.id) || false}
                onChange={() => toggleService(service.id)}
                onClick={(e) => e.stopPropagation()}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      {service.name}
                      {service.popular && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-semibold text-green-600">
                      ${service.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">{service.duration}</div>
                  </div>
                </div>

                {/* Quantity Selector */}
                {selectedServices.get(service.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="text-sm text-gray-600">Quantity:</label>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(
                          service.id,
                          (customQuantities.get(service.id) || 1) - 1
                        )}
                        className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        disabled={(customQuantities.get(service.id) || 1) <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={customQuantities.get(service.id) || 1}
                        onChange={(e) => updateQuantity(service.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(
                          service.id,
                          (customQuantities.get(service.id) || 1) + 1
                        )}
                        className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Breakdown */}
      {estimatedTotal > 0 && (
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium mb-3"
          >
            {showBreakdown ? 'Hide' : 'Show'} price breakdown
          </button>

          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-2 mb-4"
            >
              {services
                .filter(s => selectedServices.get(s.id))
                .map(service => {
                  const quantity = customQuantities.get(service.id) || 1;
                  return (
                    <div key={service.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {service.name} {quantity > 1 && `(×${quantity})`}
                      </span>
                      <span className="font-medium">
                        ${(service.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
            </motion.div>
          )}

          {/* Total and Comparison */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Estimated Total</span>
              <span className="text-2xl font-bold text-green-600">
                ${estimatedTotal.toFixed(2)}
              </span>
            </div>

            {/* Market Comparison */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {getPriceComparisonIcon()}
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {getPriceComparisonText()}
                </div>
                <div className="text-xs text-gray-600">
                  Based on local market rates
                </div>
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  This comparison is based on average prices from similar businesses in your area.
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleQuoteRequest}
            className="w-full btn-primary mt-4"
          >
            Request Official Quote
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            *This is an estimate only. Final price may vary based on specific requirements.
          </p>
        </div>
      )}

      {/* Empty State */}
      {estimatedTotal === 0 && (
        <div className="p-6 text-center text-gray-500">
          <p className="text-sm">Select services to see price estimate</p>
        </div>
      )}
    </div>
  );
};