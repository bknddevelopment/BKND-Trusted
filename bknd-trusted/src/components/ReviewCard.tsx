import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, CheckCircle, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  showBusinessResponse?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpful,
  showBusinessResponse = true
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleHelpful = () => {
    if (!helpfulClicked && onHelpful) {
      setHelpfulClicked(true);
      onHelpful(review.id);
    }
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            {review.author.avatar ? (
              <img
                src={review.author.avatar}
                alt={review.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {review.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            {review.author.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-current" />
              </div>
            )}
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">{review.author.name}</h4>
              {review.author.verified && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Verified Customer
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {expanded || review.text.length <= 200
            ? review.text
            : truncateText(review.text)}
        </p>
        {review.text.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {(showAllImages ? review.images : review.images.slice(0, 3)).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
              </motion.div>
            ))}
            {!showAllImages && review.images.length > 3 && (
              <button
                onClick={() => setShowAllImages(true)}
                className="w-24 h-24 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex flex-col items-center justify-center text-gray-600"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">+{review.images.length - 3} more</span>
              </button>
            )}
          </div>
          {showAllImages && review.images.length > 3 && (
            <button
              onClick={() => setShowAllImages(false)}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {/* Business Response */}
      {showBusinessResponse && review.response && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 ml-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-sm text-blue-900">Business Response</span>
              <span className="text-xs text-blue-700">{formatDate(review.response.date)}</span>
            </div>
            <p className="text-sm text-blue-800">{review.response.text}</p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleHelpful}
          disabled={helpfulClicked}
          className={`flex items-center gap-2 text-sm transition-colors ${
            helpfulClicked
              ? 'text-blue-600 font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${helpfulClicked ? 'fill-current' : ''}`} />
          <span>
            Helpful {review.helpful > 0 && `(${review.helpful + (helpfulClicked ? 1 : 0)})`}
          </span>
        </button>
      </div>
    </motion.div>
  );
};