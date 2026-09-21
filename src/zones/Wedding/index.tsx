import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Clock, Heart, ArrowRight, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

// Floating particles component (Dust / Petals)
const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const arr = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100vh", x: `${p.x}vw` }}
          animate={{ opacity: [0, 0.6, 0], y: "-10vh", x: `${p.x + (Math.random() * 10 - 5)}vw` }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.id * 0.5 }}
          className="absolute rounded-full bg-[#d4af37] blur-[1px]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

export default function WeddingZone() {
  const containerRef = useRef(null);
  const heroScrollRef = useRef(null);
  
  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 400, damping: 25 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 400, damping: 25 });
  const [cursorState, setCursorState] = useState('default'); // default, hover

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  // Scroll Progress for Hero & Gallery
  const { scrollYProgress: heroProgress } = useScroll({ target: heroScrollRef, offset: ["start start", "end end"] });
  
  // Massive Typography Parallax
  const name1X = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const name2X = useTransform(heroProgress, [0, 1], ["0%", "-50%"]);
  
  // Horizontal Scroll for Gallery (Scroll-jacking)
  // The gallery container is 250vw wide. We need to shift it left by 150vw to reach the end.
  const horizontalScrollRaw = useTransform(heroProgress, [0.2, 0.9], ["0vw", "-150vw"]);
  const horizontalScroll = useSpring(horizontalScrollRaw, { stiffness: 60, damping: 20 });

  return (
    <div ref={containerRef} className="bg-[#f8f6f0] text-[#2c2c2c] font-serif relative selection:bg-[#d4af37] selection:text-white cursor-none">
      
      {/* Custom Elegant Cursor */}
      {createPortal(
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
          style={{ x: cursorSpringX, y: cursorSpringY }}
        >
          <motion.div 
            animate={{ 
              scale: cursorState === 'hover' ? 3 : 1,
              borderColor: cursorState === 'hover' ? 'rgba(212,175,55,1)' : 'rgba(212,175,55,0.5)',
              backgroundColor: cursorState === 'hover' ? 'rgba(212,175,55,0.1)' : 'transparent'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full h-full rounded-full border border-[#d4af37] flex items-center justify-center"
          >
            <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
          </motion.div>
        </motion.div>,
        document.body
      )}

      {/* Ambient Lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none z-0"></div>
      <Particles />

      {/* Frame / Border (Fixed overlay) */}
      <div className="fixed inset-6 border border-[#d4af37]/20 pointer-events-none z-50 mix-blend-multiply"></div>

      {/* SECTION 1 & 2: HERO + HORIZONTAL GALLERY (SCROLL-JACKING) */}
      <div ref={heroScrollRef} className="h-[400vh] relative w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          
          {/* HUGE Parallax Names */}
          <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-10 overflow-hidden mix-blend-multiply opacity-20">
            <motion.div style={{ x: name1X }} className="text-[25vw] font-light italic leading-[0.7] whitespace-nowrap text-[#d4af37]">
              Charlotte
            </motion.div>
            <motion.div style={{ x: name2X }} className="text-[25vw] font-light italic leading-[0.7] whitespace-nowrap text-[#d4af37] text-right">
              Alexander
            </motion.div>
          </div>

          {/* HERO CONTENT */}
          <motion.div 
            style={{ opacity: useTransform(heroProgress, [0, 0.15], [1, 0]) }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#8c8c8c] mb-8 flex items-center gap-6">
              <span>24 . 11 . 2026</span>
              <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
              <span>Lake Como</span>
            </div>
            
            <h1 className="text-7xl md:text-[8vw] font-light leading-[0.85] text-center tracking-tighter">
              We are getting <br/>
              <span className="italic text-[#d4af37]">married.</span>
            </h1>
            
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#8c8c8c]">Scroll to experience</span>
              <motion.div animate={{ height: [0, 40, 0], y: [0, 20, 40] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent"></motion.div>
            </div>
          </motion.div>

          {/* HORIZONTAL GALLERY */}
          <motion.div 
            style={{ x: horizontalScroll }} 
            className="absolute top-0 left-0 h-full flex items-center z-30 w-[250vw]"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            {/* Spacer 100vw to let Hero scroll by first */}
            <div className="w-[100vw] h-full flex-shrink-0"></div>

            {/* Image 1 */}
            <div className="w-[50vw] h-full flex items-center justify-center px-12 flex-shrink-0 relative group">
              <div className="w-full h-[70vh] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[#d4af37]/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1500&auto=format&fit=crop" className="w-full h-full object-cover filter grayscale-[20%] sepia-[10%] group-hover:scale-105 transition-transform duration-[2s]" alt="Wedding 1" />
              </div>
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 font-sans text-xs tracking-[0.5em] uppercase text-[#d4af37]">The Beginning</div>
            </div>

            {/* Image 2 + Quote */}
            <div className="w-[40vw] h-full flex flex-col justify-center px-12 flex-shrink-0">
              <div className="w-full h-[50vh] relative overflow-hidden shadow-2xl mb-12">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1500&auto=format&fit=crop" className="w-full h-full object-cover filter sepia-[20%] hover:scale-105 transition-transform duration-[2s]" alt="Wedding 2" />
              </div>
              <p className="font-light italic text-2xl md:text-3xl text-center leading-relaxed text-[#5c5c5c]">
                "In all the world, there is no heart for me like yours. <br/> In all the world, there is no love for you like mine."
              </p>
            </div>

            {/* Image 3 */}
            <div className="w-[60vw] h-full flex items-center justify-center px-12 flex-shrink-0">
              <div className="w-full h-[80vh] relative overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1500&auto=format&fit=crop" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[2s]" alt="Wedding 3" />
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>

      {/* SECTION 3: THE ITINERARY (Normal Vertical Scroll) */}
      <div className="relative z-10 w-full py-32 px-12 md:px-24 bg-white/50 backdrop-blur-md border-t border-[#d4af37]/20">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl italic font-light text-[#d4af37] mb-6">Order of Events</h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#8c8c8c]">Saturday, November 24th</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-16">
          {[
            { time: "03:00 PM", title: "Welcome Drinks", icon: Clock, desc: "Gather at the courtyard for pre-ceremony refreshments." },
            { time: "04:00 PM", title: "The Ceremony", icon: Heart, desc: "The exchange of vows taking place by the lake." },
            { time: "06:00 PM", title: "Dinner & Reception", icon: MapPin, desc: "A grand feast followed by an evening of dancing under the stars." }
          ].map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              key={idx} 
              className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left"
            >
              <div className="w-32 flex flex-col items-center md:items-end text-[#d4af37]">
                <span className="font-sans text-sm tracking-[0.2em] font-bold">{item.time}</span>
                <item.icon size={20} className="mt-2 opacity-50" />
              </div>
              
              <div className="hidden md:block w-[1px] h-24 bg-[#d4af37]/30"></div>

              <div className="flex-1">
                <h3 className="text-2xl font-light mb-4">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed tracking-widest text-[#8c8c8c] max-w-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 4: RSVP (Normal Vertical Scroll) */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-8 text-center border-t border-[#d4af37]/20">
        <h2 className="text-5xl md:text-6xl italic font-light mb-8 text-[#d4af37]">Be our Guest</h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#8c8c8c] mb-16 max-w-lg leading-loose">
          Kindly respond by October 1st, 2026. We cannot wait to celebrate this special day with you.
        </p>

        <form className="w-full max-w-md space-y-8 text-left" onMouseEnter={() => setCursorState('hover')} onMouseLeave={() => setCursorState('default')}>
          <div className="border-b border-[#d4af37]/30 pb-2">
            <input type="text" placeholder="Full Name(s)" className="w-full bg-transparent outline-none font-serif text-xl placeholder-[#8c8c8c]/50 text-[#2c2c2c]" />
          </div>
          <div className="border-b border-[#d4af37]/30 pb-2">
            <input type="email" placeholder="Email Address" className="w-full bg-transparent outline-none font-serif text-xl placeholder-[#8c8c8c]/50 text-[#2c2c2c]" />
          </div>
          <div className="border-b border-[#d4af37]/30 pb-2">
            <select className="w-full bg-transparent outline-none font-serif text-xl text-[#8c8c8c]/80 cursor-pointer appearance-none">
              <option>Joyfully Accepts</option>
              <option>Regretfully Declines</option>
            </select>
          </div>

          <div className="pt-8 flex justify-center">
            <button type="button" className="group/btn relative overflow-hidden bg-transparent border border-[#d4af37] text-[#d4af37] px-16 py-5 font-sans text-xs uppercase tracking-[0.3em] transition-colors duration-700 hover:text-white">
              <span className="relative z-10 flex items-center gap-4">SEND RSVP <ArrowRight size={14} /></span>
              <div className="absolute inset-0 bg-[#d4af37] transform scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100 z-0"></div>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
