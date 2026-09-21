import { ShoppingBag, Search, Menu, Zap, Aperture, Globe, Heart, MonitorSmartphone, Crown, Factory, LineChart, Car, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const ZONES = [
  { id: 'ecommerce', label: 'Tech', icon: MonitorSmartphone },
  { id: 'fashion', label: 'Hype', icon: Zap },
  { id: 'anime', label: 'Otaku', icon: Aperture },
  { id: 'travel', label: 'Journey', icon: Globe },
  { id: 'wedding', label: 'Vows', icon: Heart },
  { id: 'lookbook', label: 'Editorial', icon: Crown },
  { id: 'hmi', label: 'Factory', icon: Factory },
  { id: 'english', label: 'IELTS Mastery', icon: GraduationCap },
  { id: 'fintech', label: 'Fintech', icon: LineChart },
  { id: 'ivi', label: 'Auto', icon: Car },
];

const ZONE_GROUPS = [
  {
    id: 'lifestyle',
    title: "Lifestyle & B2C",
    items: [
      { id: 'ecommerce', label: 'Tech Superstore', number: '01' },
      { id: 'fashion', label: 'Hype / Vortex', number: '02' },
      { id: 'anime', label: 'Otaku Universe', number: '03' },
      { id: 'travel', label: 'Luxury Journey', number: '04' },
      { id: 'wedding', label: 'Vows & Wedding', number: '05' },
    ]
  },
  {
    id: 'industrial',
    title: "Industrial & B2B",
    items: [
      { id: 'hmi', label: 'Factory HMI', number: '06' },
      { id: 'fintech', label: 'Fintech BI', number: '07' },
      { id: 'ivi', label: 'Auto Cockpit', number: '08' },
    ]
  },
  {
    id: 'content',
    title: "Content & Education",
    items: [
      { id: 'lookbook', label: 'Editorial Lookbook', number: '09' },
      { id: 'english', label: 'IELTS Mastery', number: '10' },
    ]
  }
];

export default function Navbar({ activeZone, setActiveZone }: { activeZone: string, setActiveZone: (id: string) => void }) {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectZone = (id: string) => {
    setActiveZone(id);
    setHoveredGroup(null);
    setIsMobileMenuOpen(false);
  };

  const activeGroup = ZONE_GROUPS.find(g => g.id === hoveredGroup);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setHoveredGroup(null)}
        className="fixed top-0 left-0 right-0 z-[60] flex flex-col transition-colors duration-500"
      >
        {/* Top Bar */}
        <div className={`flex items-center justify-between px-6 md:px-12 backdrop-blur-md border-b transition-colors duration-500 ${hoveredGroup ? 'bg-[#0a0a0a] text-white border-white/10' : 'bg-transparent mix-blend-difference text-white border-transparent'}`}>
          
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter cursor-pointer py-4">
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
              X
            </span>
            <span className="hidden md:inline-block">SUPERMARKET</span>
          </div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 h-full">
            {ZONE_GROUPS.map(group => (
              <div 
                key={group.id}
                onMouseEnter={() => setHoveredGroup(group.id)}
                className="h-full flex items-center px-6 relative cursor-pointer group"
              >
                <span className={`uppercase font-bold tracking-widest text-xs transition-colors ${hoveredGroup === group.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {group.title}
                </span>
                {hoveredGroup === group.id && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 py-4 border-l border-current/20 pl-6">
            <button className="hover:opacity-70 transition-opacity"><Search size={20} /></button>
            <button className="hover:opacity-70 transition-opacity"><ShoppingBag size={20} /></button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover:opacity-70 transition-opacity"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <AnimatePresence>
          {hoveredGroup && activeGroup && (
            <motion.div
              initial={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, height: 'auto', clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block bg-[#0a0a0a]/95 backdrop-blur-xl text-white overflow-hidden shadow-2xl shadow-black/50"
            >
              <div className="px-12 py-16 max-w-[1920px] mx-auto grid grid-cols-12 gap-12">
                <div className="col-span-4 border-r border-white/10 pr-12 flex flex-col justify-between">
                  <div>
                    <span className="text-gray-500 font-mono text-sm">CATEGORY</span>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mt-2 leading-none">{activeGroup.title}</h2>
                  </div>
                  <p className="text-gray-400 text-sm mt-8 max-w-sm">
                    Select a universe to override the current reality. All UI/UX principles are strictly enforced within each zone.
                  </p>
                </div>
                
                <div className="col-span-8 flex flex-col gap-4">
                  {activeGroup.items.map((item, idx) => {
                    const isActive = activeZone === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1 }}
                        onClick={() => handleSelectZone(item.id)}
                        className="group flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="flex items-baseline gap-6">
                          <span className={`font-mono text-sm ${isActive ? 'text-[var(--accent-color)]' : 'text-gray-600'}`}>{item.number}</span>
                          <span className={`text-4xl md:text-[3.5vw] font-black uppercase tracking-tighter transition-all duration-300 origin-left ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white group-hover:translate-x-4'}`}>
                            {item.label}
                          </span>
                        </span>
                        {isActive && (
                          <motion.span 
                            layoutId="active-dot-dropdown"
                            className="w-3 h-3 rounded-full bg-white ml-4"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Fallback */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-[#0a0a0a] text-white pt-24 px-6 lg:hidden overflow-y-auto pb-24"
          >
            {ZONE_GROUPS.map(group => (
              <div key={group.id} className="mb-12">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                  {group.title}
                </h3>
                <div className="flex flex-col gap-4">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectZone(item.id)}
                      className="text-left text-2xl font-black uppercase tracking-tighter text-gray-400 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
