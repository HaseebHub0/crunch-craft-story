import { useEffect, useRef, useState } from 'react';

const LogoSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      if (!isPaused) {
        scrollPosition += 1;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const logos = [
    '/snacks typography/crazy fish.png',
    '/snacks typography/Glory-Nuts-(1).png',
    '/snacks typography/nimko full.png',
    '/snacks typography/peanut-party.png',
    '/snacks typography/namak para.png',
    '/snacks typography/yummy tummy.png',
    '/snacks typography/love bitee.png',
    '/snacks typography/kurkaray 2.png',
    '/snacks typography/Generative Fill 4.png',
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        
        
        <div className="relative overflow-hidden rounded-2xl">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-amber-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-amber-50 to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollRef}
            className="flex gap-8 items-center animate-scroll py-4"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Duplicate logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-200">
                  <img
                    src={logo}
                    alt={`Product logo ${index + 1}`}
                    className="w-32 h-32 object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
