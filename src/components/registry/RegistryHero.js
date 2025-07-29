import React from 'react';

const RegistryHero = () => {
  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/80 via-red-500/70 to-orange-500/80 dark:from-pink-800/80 dark:via-red-700/70 dark:to-orange-700/80" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-dancing text-white mb-6 leading-tight">
            Japan Honeymoon Fund
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-quicksand mb-8 leading-relaxed">
            Help us create unforgettable memories in the Land of the Rising Sun
          </p>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <span className="text-lg font-medium">Experience Japan with us</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-white/10 rounded-full"></div>
    </div>
  );
};

export default RegistryHero;