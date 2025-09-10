// src/components/common/EngagementGallery.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhotoModal from './PhotoModal';

const EngagementGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('home');

  const cloudinaryBaseUrl = "https://res.cloudinary.com/dwdaehpml/image/upload";

  const engagementPhotos = [
    {
      id: 1,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/walking-me-looking-at-her_cwm3dr`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/walking-me-looking-at-her_cwm3dr`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/walking-me-looking-at-her_cwm3dr`,
      alt: 'Casey and Yasmim engagement photo - walking together',
      aspectRatio: 'tall'
    },
    {
      id: 2,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/tall-and-serious_hgdrbi`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/tall-and-serious_hgdrbi`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/tall-and-serious_hgdrbi`,
      alt: 'Casey and Yasmim engagement photo - elegant pose',
      aspectRatio: 'tall'
    },
    {
      id: 3,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/steps-holding-hands_auajrz`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/steps-holding-hands_auajrz`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/steps-holding-hands_auajrz`,
      alt: 'Casey and Yasmim engagement photo - holding hands on steps',
      aspectRatio: 'tall'
    },
    {
      id: 4,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/standing-tree-shot_fpdj7f`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/standing-tree-shot_fpdj7f`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/standing-tree-shot_fpdj7f`,
      alt: 'Casey and Yasmim engagement photo - by the tree',
      aspectRatio: 'tall'
    },
    {
      id: 5,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/sitting-bench-landscape_hxe6tk`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/sitting-bench-landscape_hxe6tk`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/sitting-bench-landscape_hxe6tk`,
      alt: 'Casey and Yasmim engagement photo - sitting on bench',
      aspectRatio: 'square'
    },
    {
      id: 6,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/model-closeup-shot_vbv99u`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/model-closeup-shot_vbv99u`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/model-closeup-shot_vbv99u`,
      alt: 'Casey and Yasmim engagement photo - close up portrait',
      aspectRatio: 'tall'
    },
    {
      id: 7,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/kissing-landscape_giztl8`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/kissing-landscape_giztl8`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/kissing-landscape_giztl8`,
      alt: 'Casey and Yasmim engagement photo - romantic kiss',
      aspectRatio: 'square'
    },
    {
      id: 8,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/her-hands-my-back_orehwg`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/her-hands-my-back_orehwg`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/her-hands-my-back_orehwg`,
      alt: 'Casey and Yasmim engagement photo - intimate moment',
      aspectRatio: 'tall'
    },
    {
      id: 9,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/hands-only-holding_dkfeo0`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/hands-only-holding_dkfeo0`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/hands-only-holding_dkfeo0`,
      alt: 'Casey and Yasmim engagement photo - holding hands detail',
      aspectRatio: 'wide'
    },
    {
      id: 10,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/church-shot-far-away_g0lrz8`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/church-shot-far-away_g0lrz8`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/church-shot-far-away_g0lrz8`,
      alt: 'Casey and Yasmim engagement photo - church setting',
      aspectRatio: 'tall'
    },
    {
      id: 11,
      thumbnail: `${cloudinaryBaseUrl}/w_400,q_auto,f_auto/both-smiling_aekvcv`,
      medium: `${cloudinaryBaseUrl}/w_800,q_auto,f_auto/both-smiling_aekvcv`,
      large: `${cloudinaryBaseUrl}/w_1600,q_auto,f_auto/both-smiling_aekvcv`,
      alt: 'Casey and Yasmim engagement photo - happy couple smiling',
      aspectRatio: 'tall'
    }
  ];

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      {/* Gallery Section */}
      <section className="py-16 bg-white dark:bg-dark-primary transition-colors duration-200 animate-gallery-appear">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="font-script text-4xl text-primary-dark dark:text-primary-light mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              {t('gallery.subtitle')}
            </p>
            
            {/* Mobile hint - only shows on mobile */}
            <div className="sm:hidden bg-accent-light dark:bg-dark-card rounded-lg p-4 mx-4 mb-6 border-l-4 border-primary dark:border-primary-light">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-primary dark:text-primary-light mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                  <span className="font-medium">{t('gallery.mobileHintBold')}</span> {t('gallery.mobileHintText')}
                </p>
              </div>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {engagementPhotos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => openModal(photo)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                  <img
                    src={photo.thumbnail}
                    alt={photo.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <PhotoModal
          photo={selectedPhoto}
          photos={engagementPhotos}
          onClose={closeModal}
          onPrevious={(prevPhoto) => setSelectedPhoto(prevPhoto)}
          onNext={(nextPhoto) => setSelectedPhoto(nextPhoto)}
        />
      )}
      
      <style jsx>{`
        @keyframes gallery-appear {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-gallery-appear {
          animation: gallery-appear 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default EngagementGallery;