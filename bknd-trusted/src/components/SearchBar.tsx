import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  suggestions?: string[];
  locationSuggestions?: string[];
  isLoading?: boolean;
  placeholder?: string;
  defaultLocation?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  suggestions = [],
  locationSuggestions = [],
  isLoading = false,
  placeholder = "What service do you need?",
  defaultLocation = ""
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(defaultLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || location.trim()) {
      onSearch(query.trim(), location.trim());
      setShowSuggestions(false);
      setShowLocationSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'query' | 'location') => {
    const currentSuggestions = type === 'query' ? suggestions : locationSuggestions;
    const setShow = type === 'query' ? setShowSuggestions : setShowLocationSuggestions;
    const setValue = type === 'query' ? setQuery : setLocation;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestion(prev =>
        prev < currentSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestion(prev =>
        prev > 0 ? prev - 1 : currentSuggestions.length - 1
      );
    } else if (e.key === 'Enter' && focusedSuggestion >= 0) {
      e.preventDefault();
      setValue(currentSuggestions[focusedSuggestion]);
      setShow(false);
      setFocusedSuggestion(-1);
    } else if (e.key === 'Escape') {
      setShow(false);
      setFocusedSuggestion(-1);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={index} className="font-semibold text-blue-600">{part}</span> :
        part
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3 p-3 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Service Search Input */}
        <div ref={searchRef} className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setFocusedSuggestion(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => handleKeyDown(e, 'query')}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Service Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setQuery(suggestion);
                        setShowSuggestions(false);
                        setFocusedSuggestion(-1);
                      }}
                      onMouseEnter={() => setFocusedSuggestion(index)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        focusedSuggestion === index
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {highlightMatch(suggestion, query)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location Input */}
        <div ref={locationRef} className="flex-1 md:max-w-xs relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowLocationSuggestions(true);
                setFocusedSuggestion(-1);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              onKeyDown={(e) => handleKeyDown(e, 'location')}
              placeholder="City, State or ZIP"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {location && (
              <button
                type="button"
                onClick={() => setLocation('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Suggestions Dropdown */}
          <AnimatePresence>
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="max-h-64 overflow-y-auto">
                  {locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLocation(suggestion);
                        setShowLocationSuggestions(false);
                        setFocusedSuggestion(-1);
                      }}
                      onMouseEnter={() => setFocusedSuggestion(index)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        focusedSuggestion === index
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {highlightMatch(suggestion, location)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center justify-center gap-2 min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search
            </>
          )}
        </button>
      </div>
    </form>
  );
};