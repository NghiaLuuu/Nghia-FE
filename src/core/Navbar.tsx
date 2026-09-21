import { ShoppingBag, Search, Menu, Zap, Aperture, Globe, Heart, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const ZONES = [
  { id: 'ecommerce', label: 'Tech', icon: MonitorSmartphone },
  { id: 'fashion', label: 'Hype', icon: Zap },
  { id: 'anime', label: 'Otaku', icon: Aperture },
  { id: 'travel', label: 'Journey', icon: Globe },
  { id: 'wedding', label: 'Vows', icon: Heart },
];

export default function Navbar({ activeZone, setActiveZone }: { activeZone: string, setActiveZone: (id: string) => void }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-[var(--bg-color)]/70 border-b border-[var(--text-color)]/10 transition-colors duration-700"
    >
      <div className="flex items-center gap-2 font-bold text-xl tracking-tighter cursor-pointer">
        <span className="w-8 h-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-[var(--bg-color)] transition-colors duration-700">
          X
        </span>
        <span className="hidden md:inline-block">SUPERMARKET</span>
      </div>

      <div className="hidden lg:flex items-center gap-1 bg-[var(--text-color)]/5 p-1 rounded-full border border-[var(--text-color)]/10">
        {ZONES.map((zone) => {
          const Icon = zone.icon;
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive ? 'text-[var(--bg-color)]' : 'text-[var(--text-color)] hover:bg-[var(--text-color)]/10'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[var(--text-color)] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} />
                {zone.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-[var(--text-color)]/10 transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-[var(--text-color)]/10 transition-colors">
          <ShoppingBag size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-[var(--text-color)]/10 transition-colors lg:hidden">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
