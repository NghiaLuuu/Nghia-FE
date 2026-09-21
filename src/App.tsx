import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './core/Navbar';

// Lazy loading to simulate large apps or just import directly
import ECommerceZone from './zones/ECommerce';
import FashionZone from './zones/Fashion';
import AnimeZone from './zones/Anime';
import TravelZone from './zones/Travel';
import WeddingZone from './zones/Wedding';

export default function App() {
  const [activeZone, setActiveZone] = useState('ecommerce');

  useEffect(() => {
    // Apply theme class to body
    document.body.className = `theme-${activeZone} no-scrollbar`;
  }, [activeZone]);

  const renderZone = () => {
    switch (activeZone) {
      case 'ecommerce': return <ECommerceZone key="ecommerce" />;
      case 'fashion': return <FashionZone key="fashion" />;
      case 'anime': return <AnimeZone key="anime" />;
      case 'travel': return <TravelZone key="travel" />;
      case 'wedding': return <WeddingZone key="wedding" />;
      default: return <ECommerceZone key="ecommerce" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden relative">
      <Navbar activeZone={activeZone} setActiveZone={setActiveZone} />
      <div className="flex-1 w-full pt-[72px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full min-h-[calc(100vh-72px)]"
          >
            {renderZone()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
