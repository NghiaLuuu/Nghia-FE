import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Compass, MapPin, Search } from 'lucide-react';

export default function TravelZone() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zoom effect for the background image
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="h-[200vh] bg-black text-white relative selection:bg-white selection:text-black font-sans">
      
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Immersive Background */}
        <motion.div 
          style={{ scale: scaleImg }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop" 
            alt="Travel Landscape" 
            className="w-full h-full object-cover filter brightness-[0.7]" 
          />
          {/* Subtle gradient overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </motion.div>

        {/* Header */}
        <div className="absolute top-8 left-8 right-8 z-50 flex items-center justify-between mix-blend-difference">
          <div className="font-serif text-2xl font-bold tracking-widest uppercase">Nomad.</div>
          <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="hover:line-through cursor-pointer">Destinations</span>
            <span className="hover:line-through cursor-pointer">Journeys</span>
            <span className="hover:line-through cursor-pointer">Journal</span>
          </div>
          <button className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <Search size={16} />
          </button>
        </div>

        {/* Central Masking Typography */}
        <motion.div 
          style={{ opacity: opacityText, y: yText }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 mix-blend-overlay"
        >
          <h1 className="text-[15vw] font-serif font-black tracking-tighter uppercase leading-[0.8] text-white/90">
            DISCOVER
          </h1>
          <h1 className="text-[15vw] font-serif font-black tracking-tighter uppercase leading-[0.8] text-transparent stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
            THE WILD
          </h1>
        </motion.div>

        {/* Glassmorphism Search/Booking Widget */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full p-4 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            
            <div className="flex-1 flex items-center gap-4 px-6 border-r border-white/20">
              <MapPin size={24} className="text-white/50" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Location</span>
                <input type="text" placeholder="Where to?" className="bg-transparent text-white placeholder-white/80 font-serif text-xl outline-none" />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4 px-6 border-r border-white/20">
              <Compass size={24} className="text-white/50" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Experience</span>
                <select className="bg-transparent text-white font-serif text-xl outline-none appearance-none cursor-pointer">
                  <option className="text-black">Adventure</option>
                  <option className="text-black">Relaxation</option>
                  <option className="text-black">Culture</option>
                </select>
              </div>
            </div>

            <div className="px-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                Explore
              </button>
            </div>

          </div>
          
          <div className="text-center mt-6 text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
            Scroll to zoom into the world
          </div>
        </div>

      </div>
    </div>
  );
}
