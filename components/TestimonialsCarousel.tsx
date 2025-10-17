'use client';

import { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Houston, TX',
    service: 'Plumbing',
    rating: 5,
    text: 'Found an amazing plumber through BKND Trusted. Response was quick, pricing was fair, and the work was excellent. Highly recommend!',
    image: 'https://i.pravatar.cc/150?img=1',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    location: 'Dallas, TX',
    service: 'HVAC',
    rating: 5,
    text: 'My AC broke in the middle of summer. BKND connected me with a certified HVAC pro who fixed it same day. Lifesaver!',
    image: 'https://i.pravatar.cc/150?img=13',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Emily Chen',
    location: 'Austin, TX',
    service: 'House Cleaning',
    rating: 5,
    text: 'Best cleaning service I\'ve ever used. Background-checked professionals, fair pricing, and my house has never looked better.',
    image: 'https://i.pravatar.cc/150?img=5',
    date: '3 days ago',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    location: 'San Antonio, TX',
    service: 'Electrical',
    rating: 5,
    text: 'Needed emergency electrical work. Got 3 quotes within an hour, hired someone immediately. The whole process was seamless.',
    image: 'https://i.pravatar.cc/150?img=12',
    date: '1 week ago',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    location: 'Fort Worth, TX',
    service: 'General Contracting',
    rating: 5,
    text: 'Renovated my kitchen using a contractor from BKND Trusted. Professional, on-time, on-budget. Couldn\'t be happier with the results!',
    image: 'https://i.pravatar.cc/150?img=9',
    date: '2 weeks ago',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-section bg-gradient-to-br from-brand-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-neutral-900 mb-4">
            What Homeowners Are Saying
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Real reviews from real customers who found their perfect pro through BKND Trusted
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-100 transition-all duration-500">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-featured-400" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl text-neutral-700 text-center mb-8 leading-relaxed font-medium">
              "{current.text}"
            </p>

            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img
                src={current.image}
                alt={current.name}
                className="w-16 h-16 rounded-full border-4 border-brand-100"
              />
              <div className="text-center md:text-left">
                <div className="font-bold text-neutral-900 text-lg">{current.name}</div>
                <div className="text-neutral-600 text-sm">{current.location}</div>
                <div className="inline-flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                    {current.service}
                  </span>
                  <span className="text-xs text-neutral-500">{current.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white hover:bg-brand-50 border-2 border-neutral-200 hover:border-brand-400 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl group"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-neutral-600 group-hover:text-brand-600 transition-colors" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white hover:bg-brand-50 border-2 border-neutral-200 hover:border-brand-400 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl group"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-neutral-600 group-hover:text-brand-600 transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-brand-600 w-8'
                    : 'bg-neutral-300 hover:bg-brand-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Stats Below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">4.9/5</div>
            <div className="text-sm text-neutral-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">50K+</div>
            <div className="text-sm text-neutral-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">98%</div>
            <div className="text-sm text-neutral-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">24/7</div>
            <div className="text-sm text-neutral-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
