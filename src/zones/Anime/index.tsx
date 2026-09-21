import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <div className="w-full h-screen bg-[#0a0514] text-[#00ffcc] overflow-hidden relative font-mono uppercase selection:bg-[#ff00ff] selection:text-white">
      
      {/* Background Artwork - "Empty State is Main Screen" */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChar.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[var(--accent-color)]/20 mix-blend-color z-10"></div>
          <img src={activeChar.image} alt="Background" className="w-full h-full object-cover filter contrast-150 saturate-150" />
        </motion.div>
      </AnimatePresence>

      {/* HUD Elements */}
      <div className="absolute top-24 left-6 z-20 flex gap-2">
        <div className="w-4 h-4 bg-[#ff00ff] animate-pulse"></div>
        <div className="text-xs">SYSTEM: ONLINE <br/> HUD VER 2.4</div>
      </div>
      
      <div className="absolute top-24 right-6 z-20 text-right">
        <div className="text-4xl font-black text-[#ff00ff]">{activeChar.id}</div>
        <div className="text-xs tracking-widest">{activeChar.scale}</div>
      </div>

      {/* Crosshairs overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-20">
        <div className="w-[80vw] h-[80vh] border border-[#00ffcc]/30 relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#00ffcc]"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#00ffcc]"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#00ffcc]"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#00ffcc]"></div>
        </div>
      </div>

      {/* Main Content Layout - Asymmetric Bento */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-12 pb-24 pt-32">
        
        {/* Info Panel */}
        <div className="w-full md:w-1/2 mb-8">
          <motion.div
            key={`info-${activeChar.id}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="border-l-4 border-[#ff00ff] pl-6 bg-black/40 backdrop-blur-md p-6 relative overflow-hidden"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,204,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

            <h2 className="text-[#ff00ff] text-sm tracking-[0.3em] mb-2">{activeChar.faction}</h2>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-none text-white shadow-[#ff00ff] drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">{activeChar.name}</h1>
            
            <div className="flex gap-6 mt-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs opacity-50"><Zap size={14} className="inline mr-1"/>ATK</span>
                <span className="text-xl font-bold">{activeChar.stats.ATK}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs opacity-50"><Crosshair size={14} className="inline mr-1"/>SPD</span>
                <span className="text-xl font-bold">{activeChar.stats.SPD}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs opacity-50"><Shield size={14} className="inline mr-1"/>DEF</span>
                <span className="text-xl font-bold">{activeChar.stats.DEF}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#00ffcc]/30 pt-6">
              <div className="text-3xl font-black text-white">{activeChar.price}</div>
              <button className="bg-[#ff00ff] text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                <Hexagon size={18} fill="currentColor" /> INITIATE PURCHASE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Character Selection Slider - HUD style */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {CHARACTERS.map((char, idx) => (
            <button
              key={char.id}
              onClick={() => setActiveId(idx)}
              className={`relative flex-shrink-0 w-48 h-24 border ${activeId === idx ? 'border-[#ff00ff] bg-[#ff00ff]/20' : 'border-[#00ffcc]/30 bg-black/40'} backdrop-blur-sm group hover:border-[#00ffcc] transition-colors p-3 flex flex-col justify-between`}
            >
              <div className="text-xs text-left opacity-70 group-hover:opacity-100 transition-opacity">DATAFILE: {char.id}</div>
              <div className="text-sm font-bold text-left truncate w-full {activeId === idx ? 'text-white' : ''}">{char.name}</div>
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current"></div>
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
