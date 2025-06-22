
import React, { useEffect } from 'react';

const PhotoModal = ({ photo, photos, onClose, onPrevious, onNext }) => {
  // Find current photo index
  const currentIndex = photos.findIndex(p => p.id === photo.id);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevPhoto = photos[currentIndex - 1];
      onPrevious(prevPhoto);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextPhoto = photos[currentIndex + 1];
      onNext(nextPhoto);
    }
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop, not the image
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {currentIndex < photos.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image Container - Improved sizing for desktop */}
        <div className="relative flex items-center justify-center w-full h-full">
          <img
            src={photo.large}
            alt={photo.alt}
            className="max-w-full max-h-full object-contain rounded-lg
                     /* Desktop: Limit max size to prevent poor quality scaling */
                     md:max-w-4xl md:max-h-[80vh]
                     /* Mobile: Use full available space */
                     w-auto h-auto"
            style={{
              // Prevent images from getting too large on very big screens
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
          />
        </div>

        {/* Photo Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-70 px-4 py-2 rounded-full">
          {currentIndex + 1} of {photos.length}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;