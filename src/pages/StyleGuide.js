import React from 'react';

function StyleGuide() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-primary mb-4">Style Guide</h1>
          <p className="text-xl text-gray-600">Preview of colors and typography options</p>
        </div>
        
        {/* Color Palette */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="font-display text-2xl text-gray-800 mb-6">Color Palette</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Primary (Pastel Blue)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-primary-light rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">primary-light</span>
                </div>
                <div className="h-24 bg-primary rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">primary</span>
                </div>
                <div className="h-24 bg-primary-dark rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">primary-dark</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Secondary (Pastel Peach)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-secondary-light rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">secondary-light</span>
                </div>
                <div className="h-24 bg-secondary rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">secondary</span>
                </div>
                <div className="h-24 bg-secondary-dark rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">secondary-dark</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Accent (Mint)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-accent-light rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">accent-light</span>
                </div>
                <div className="h-24 bg-accent rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">accent</span>
                </div>
                <div className="h-24 bg-accent-dark rounded flex items-end p-2">
                  <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded">accent-dark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Typography */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="font-display text-2xl text-gray-800 mb-6">Typography</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Display Font (Playfair Display)</h3>
              <p className="font-display text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-display text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Script Font (Dancing Script)</h3>
              <p className="font-script text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-script text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Serif Font (Cormorant Garamond)</h3>
              <p className="font-serif text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-serif text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Modern Font (Montserrat)</h3>
              <p className="font-modern text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-modern text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Elegant Font (Lora)</h3>
              <p className="font-elegant text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-elegant text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Classic Font (Libre Baskerville)</h3>
              <p className="font-classic text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-classic text-xl mt-2">We're getting married!</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Sans Font (Quicksand)</h3>
              <p className="font-sans text-3xl text-primary">Casey & Yasmim</p>
              <p className="font-sans text-xl mt-2">We're getting married!</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-6">UI Example with New Colors and Fonts</h3>
            
            <div className="bg-primary-light rounded-lg p-6 mb-6">
              <h4 className="font-display text-2xl text-primary-dark mb-4">Save the Date</h4>
              <p className="font-sans text-gray-700 mb-4">Join us for our special day on October 15, 2025</p>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition">
                RSVP Now
              </button>
            </div>
            
            <div className="bg-secondary-light rounded-lg p-6">
              <h4 className="font-script text-2xl text-primary-dark mb-4">Details</h4>
              <p className="font-sans text-gray-700 mb-4">Ceremony begins at 3:00 PM followed by a reception</p>
              <button className="bg-secondary text-gray-800 px-6 py-2 rounded-md hover:bg-secondary-dark transition">
                View Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StyleGuide;