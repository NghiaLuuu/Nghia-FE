import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Crosshair, Zap, Hexagon, Shield } from 'lucide-react';

const CHARACTERS = [
  {
    id: "01",
    name: "CYBER NINJA KURENAI",
    scale: "1/7 SCALE FIGURE",
    faction: "NEO TOKYO SYNDICATE",
    stats: { ATK: 95, SPD: 120, DEF: 40 },
    image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2000&auto=format&fit=crop",
    price: "4,500,000 VND"
  },
  {
    id: "02",
    name: "MECHA-SAMURAI RONIN",
    scale: "1/100 MASTER GRADE",
    faction: "SHOGUNATE RESISTANCE",
    stats: { ATK: 110, SPD: 60, DEF: 150 },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop",
    price: "2,800,000 VND"
  },
  {
    id: "03",
    name: "A.I. IDOL MIKU",
    scale: "1/4 BUNNY VER.",
    faction: "VIRTUAL DIVA NETWORK",
    stats: { ATK: 10, SPD: 999, DEF: 10 },
    image: "https://images.unsplash.com/photo-1578632292335-df3fbc91db9c?q=80&w=2000&auto=format&fit=crop",
    price: "8,900,000 VND"
  }
];

export default function AnimeZone() {
  const [activeId, setActiveId] = useState(0);
  const activeChar = CHARACTERS[activeId];

  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="w-full h-screen bg-[#050505] text-[#00ffcc] overflow-hidden relative font-mono uppercase cursor-none selection:bg-[#ff00ff] selection:text-white">
      
      {/* Custom Crosshair Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        <div className="w-full h-[1px] bg-[#00ffcc] absolute"></div>
        <div className="h-full w-[1px] bg-[#00ffcc] absolute"></div>
        <div className="w-2 h-2 border border-[#ff00ff] rounded-full absolute bg-white/20"></div>
      </motion.div>

      {/* Extreme Typography Background - Blend Mode Difference */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-40 mix-blend-overlay">
        <h1 className="text-[15vw] font-black leading-none text-transparent text-stroke-2 text-stroke-[#ff00ff] select-none break-words text-center opacity-30 blur-[2px]">
          {activeChar.faction}
        </h1>
      </div>

      {/* Image with Glitch/Mask effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChar.id}
          initial={{ opacity: 0, scale: 1.2, x: 100, filter: 'hue-rotate(90deg) blur(10px)' }}
          animate={{ opacity: 1, scale: 1, x: 0, filter: 'hue-rotate(0deg) blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, x: -100, filter: 'hue-rotate(-90deg) blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-0 w-[65%] h-full z-10"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/40 to-[#050505] z-10 pointer-events-none"></div>
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] z-20 pointer-events-none mix-blend-overlay"></div>
          
          <img src={activeChar.image} alt="Character" className="w-full h-full object-cover filter contrast-[1.2] saturate-[1.5]" />
          
          {/* Glitch Box Overlays */}
          <motion.div 
            animate={{ 
              opacity: [0, 1, 0, 0, 0, 1, 0],
              y: [0, -10, 20, -5, 0, 10, -20]
            }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            className="absolute top-1/3 left-1/4 w-32 h-16 bg-[#ff00ff]/20 z-30 mix-blend-difference blur-[1px]"
          />
        </motion.div>
      </AnimatePresence>

      {/* HUD Corners */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center border-l-2 border-t-2 border-[#ff00ff]">
          <div className="w-2 h-2 bg-[#00ffcc] animate-ping"></div>
        </div>
        <div className="text-[10px] tracking-[0.3em] leading-tight">
          SYS.OP.VER: 9.0.4<br/>
          <span className="text-[#ff00ff]">SECURE CONNECTION</span>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 z-30 text-right">
        <div className="text-7xl font-black text-transparent text-stroke-1 text-stroke-white drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">
          {activeChar.id}
        </div>
        <div className="text-xs tracking-[0.5em] mt-[-10px] mr-2 text-white/50">{activeChar.scale}</div>
      </div>

      {/* Main Content Info - Bento but Extreme */}
      <div className="absolute bottom-12 left-12 z-30 w-[45vw] min-w-[500px]">
        <motion.div
          key={`info-${activeChar.id}`}
          initial={{ y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Faction Banner */}
          <div className="bg-[#ff00ff] text-black text-xs font-bold inline-block px-4 py-1 mb-6 tracking-[0.3em] skew-x-[-15deg]">
            <div className="skew-x-[15deg]">{activeChar.faction}</div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.8] text-white tracking-tighter" style={{ textShadow: '4px 4px 0 #ff00ff' }}>
            {activeChar.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          
          {/* Stats Bento */}
          <div className="grid grid-cols-3 gap-2 mb-12 w-3/4">
            <div className="border border-[#00ffcc]/30 bg-[#00ffcc]/5 p-3 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00ffcc] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="text-[10px] tracking-widest text-[#00ffcc] group-hover:text-black z-10 transition-colors"><Zap size={12} className="inline mb-1"/> ATK</span>
              <span className="text-3xl font-black text-white group-hover:text-black z-10 transition-colors">{activeChar.stats.ATK}</span>
            </div>
            <div className="border border-[#00ffcc]/30 bg-[#00ffcc]/5 p-3 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00ffcc] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="text-[10px] tracking-widest text-[#00ffcc] group-hover:text-black z-10 transition-colors"><Crosshair size={12} className="inline mb-1"/> SPD</span>
              <span className="text-3xl font-black text-white group-hover:text-black z-10 transition-colors">{activeChar.stats.SPD}</span>
            </div>
            <div className="border border-[#00ffcc]/30 bg-[#00ffcc]/5 p-3 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00ffcc] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="text-[10px] tracking-widest text-[#00ffcc] group-hover:text-black z-10 transition-colors"><Shield size={12} className="inline mb-1"/> DEF</span>
              <span className="text-3xl font-black text-white group-hover:text-black z-10 transition-colors">{activeChar.stats.DEF}</span>
            </div>
          </div>

          <div className="flex items-end gap-12">
            <div>
              <div className="text-[10px] tracking-[0.4em] text-[#ff00ff] mb-2">CREDITS REQUIRED</div>
              <div className="text-4xl font-black text-white">{activeChar.price}</div>
            </div>
            
            <button className="relative bg-white text-black h-16 px-8 font-black text-lg skew-x-[-15deg] group hover:bg-[#00ffcc] transition-colors flex items-center justify-center min-w-[200px]">
              <div className="skew-x-[15deg] flex items-center gap-3 w-full justify-center">
                <Hexagon size={20} fill="currentColor" className="group-hover:animate-spin" /> 
                <span>INITIATE</span>
              </div>
              {/* Glitch border effect on hover */}
              <div className="absolute -inset-1 border border-[#ff00ff] opacity-0 group-hover:opacity-100 group-hover:animate-ping z-[-1]"></div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side Navigator */}
      <div className="absolute bottom-12 right-12 z-40 flex flex-col gap-3">
        {CHARACTERS.map((char, idx) => (
          <button
            key={char.id}
            onMouseEnter={() => setActiveId(idx)}
            className={`w-16 h-16 flex items-center justify-center font-black transition-all duration-300 ${
              activeId === idx 
                ? 'bg-[#ff00ff] text-white border-none scale-110' 
                : 'bg-transparent text-[#00ffcc] border border-[#00ffcc]/30 hover:bg-[#00ffcc]/10 hover:border-[#00ffcc]'
            }`}
          >
            {char.id}
          </button>
        ))}
      </div>

      {/* Ambient code scrolling (fake) */}
      <div className="absolute left-6 bottom-1/2 translate-y-1/2 w-48 h-64 overflow-hidden opacity-20 pointer-events-none z-10 mask-image-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
        <motion.div 
          animate={{ y: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="text-[8px] leading-relaxed font-mono break-all text-[#00ffcc]"
        >
          {Array(20).fill("01011001 01001111 01010101 00100000 01000100 01001001 01000101 SYS_ERR: OVERLOAD\n").join('')}
          {Array(20).fill("INIT_PROTOCOL_7... BYPASSING SECURITY... ACCESS GRANTED.\n").join('')}
        </motion.div>
      </div>

    </div>
  );
}
