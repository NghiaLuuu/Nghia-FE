import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

// Floating particles component (Dust / Petals)
const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100vh", x: `${p.x}vw` }}
          animate={{ opacity: [0, 0.5, 0], y: "-10vh", x: `${p.x + (Math.random() * 10 - 5)}vw` }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.id * 0.5 }}
          className="absolute rounded-full bg-[#d4af37] blur-[1px]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

export default function WeddingZone() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-serif relative selection:bg-[#d4af37] selection:text-white overflow-hidden">
      
      {/* Background soft lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none z-0"></div>

      <Particles />

      {/* Frame / Border */}
      <div className="absolute inset-6 border border-[#d4af37]/20 pointer-events-none z-30"></div>
      <div className="absolute inset-8 border border-[#d4af37]/10 pointer-events-none z-30"></div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-8 text-center">
        
        {/* Date & Location (Fade in slow) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 font-sans text-xs tracking-[0.4em] uppercase text-[#8c8c8c] flex items-center gap-6"
        >
          <span>24 . 11 . 2026</span>
          <div className="w-1 h-1 rounded-full bg-[#d4af37]"></div>
          <span>LAKE COMO, ITALY</span>
        </motion.div>

        {/* Main Typography - Elegant Serif Italic */}
        <div className="relative mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="text-7xl md:text-[8vw] leading-[0.8] tracking-tighter font-light"
          >
            <span className="block mb-4">Charlotte</span>
            <span className="block italic text-[#d4af37] text-5xl md:text-[5vw] mb-4 font-serif">&amp;</span>
            <span className="block">Alexander</span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="max-w-md mx-auto mb-16"
        >
          <p className="text-sm md:text-base leading-loose tracking-[0.1em] text-[#5c5c5c] font-light">
            We joyfully invite you to share in our happiness as we unite in marriage. A celebration of love, surrounded by the beauty of nature and the warmth of family.
          </p>
        </motion.div>

        {/* RSVP Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
        >
          <button className="group relative overflow-hidden bg-transparent border border-[#d4af37] text-[#d4af37] px-12 py-4 font-sans text-xs uppercase tracking-[0.3em] transition-colors duration-700 hover:text-white">
            <span className="relative z-10">RSVP NOW</span>
            <div className="absolute inset-0 bg-[#d4af37] transform scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 z-0"></div>
          </button>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="absolute bottom-16 text-[#d4af37]/50"
        >
          <Heart size={20} strokeWidth={1} />
        </motion.div>

      </div>
    </div>
  );
}
