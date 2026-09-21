import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1550614000-4b95d4ebf32b?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1500&auto=format&fit=crop",
];

const TEXTS = [
  { title: "AVANT", subtitle: "SS_26_C1" },
  { title: "GARDE", subtitle: "NOISE_SYS" },
  { title: "VOID", subtitle: "NULL_PTR" },
  { title: "FORM", subtitle: "RAW_DATA" },
];

export default function FashionZone() {
  const containerRef = useRef(null);
  
  // Track scroll position for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });

  // Left column goes UP (normal scroll direction, but translated via fixed position)
  const leftY = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);
  // Right column goes DOWN (reverse scroll direction)
  const rightY = useTransform(smoothProgress, [0, 1], ["-75%", "0%"]);

  return (
    // 400vh gives enough space to scroll through 4 panels
    <div ref={containerRef} className="h-[400vh] bg-[#dedede] relative selection:bg-black selection:text-white">
      
      {/* Sticky container that holds the split screen layout */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex">
        
        {/* Absolute Center Typography - Brutalist over everything */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center mix-blend-difference">
          <h1 className="text-[12vw] font-black tracking-tighter text-white uppercase text-center leading-[0.8] scale-y-125">
            CULTURE<br/>
            <span className="italic font-light">CLASH</span>
          </h1>
        </div>

        {/* Global Header */}
        <div className="absolute top-8 left-8 z-40 text-black mix-blend-difference font-bold uppercase tracking-[0.2em] text-xs">
          <span className="text-white">DISTRICT 9 / YOUTH</span>
        </div>
        <div className="absolute top-8 right-8 z-40">
          <button className="bg-black text-white px-6 py-3 font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-black border border-transparent transition-all">
            Enter Store
          </button>
        </div>

        {/* LEFT COLUMN: Scrolls normally (upwards) */}
        <motion.div 
          style={{ y: leftY }} 
          className="w-1/2 h-[400vh] flex flex-col will-change-transform z-10"
        >
          {TEXTS.map((text, i) => (
            <div key={`left-${i}`} className="h-screen w-full flex items-center justify-center p-12 relative overflow-hidden group">
              {/* Background solid */}
              <div className="absolute inset-0 bg-[#dedede] z-0"></div>
              
              <div className="relative z-10 w-full h-full flex flex-col justify-between pt-24 pb-12">
                <div className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase">
                  {text.subtitle} / 0{i + 1}
                </div>
                
                <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-none text-black">
                  {text.title}
                </h2>
                
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest cursor-pointer group/btn">
                  Explore <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transform group-hover/btn:scale-125 transition-transform"><ArrowUpRight size={20} /></div>
                </div>
              </div>

              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT COLUMN: Scrolls in reverse (downwards) */}
        <motion.div 
          style={{ y: rightY }} 
          className="w-1/2 h-[400vh] flex flex-col will-change-transform z-20"
        >
          {IMAGES.slice().reverse().map((img, i) => (
            <div key={`right-${i}`} className="h-screen w-full p-4 md:p-12 relative overflow-hidden group">
              <div className="w-full h-full relative overflow-hidden">
                {/* Reveal mask on hover */}
                <div className="absolute inset-0 bg-black/20 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src={img} 
                  alt="Fashion Look" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 contrast-125 transition-all duration-700" 
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
