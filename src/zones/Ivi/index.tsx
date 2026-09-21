import { motion } from 'framer-motion';
import { Fan, Navigation, Music, Phone, Settings, Wind } from 'lucide-react';
import { useState } from 'react';

export default function IviZone() {
  const [acOn, setAcOn] = useState(true);
  const [temp, setTemp] = useState(22);
  const [activeTab, setActiveTab] = useState('climate'); // climate, nav, media

  return (
    <div className="w-full h-screen bg-[#000000] text-white font-sans overflow-hidden relative select-none">
      
      {/* Ambient Lighting Background */}
      <motion.div 
        animate={{ opacity: acOn ? 1 : 0.3, backgroundColor: temp < 20 ? '#0ea5e9' : temp > 25 ? '#ef4444' : '#8b5cf6' }}
        transition={{ duration: 1 }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] blur-[120px] rounded-full opacity-50 pointer-events-none"
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        
        {/* Top Status Bar */}
        <div className="h-16 px-8 flex items-center justify-between text-[#a1a1aa] font-medium text-lg">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold">14:24</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> 5G</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Outside: 28°C</span>
            <span>Profile: John D.</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex px-8 pb-8 gap-8">
          
          {/* Left Vertical Dock (Massive Touch Targets) */}
          <div className="w-24 bg-white/5 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center gap-8 py-8 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <button onClick={() => setActiveTab('nav')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${activeTab === 'nav' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'text-white/50 hover:bg-white/10'}`}>
              <Navigation size={28} />
            </button>
            <button onClick={() => setActiveTab('media')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${activeTab === 'media' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'text-white/50 hover:bg-white/10'}`}>
              <Music size={28} />
            </button>
            <button onClick={() => setActiveTab('climate')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${activeTab === 'climate' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'text-white/50 hover:bg-white/10'}`}>
              <Fan size={28} />
            </button>
            <button className="w-16 h-16 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 transition-all mt-auto">
              <Phone size={28} />
            </button>
            <button className="w-16 h-16 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 transition-all">
              <Settings size={28} />
            </button>
          </div>

          {/* Center Stage (3D Car Render placeholder + Controls) */}
          <div className="flex-1 relative bg-gradient-to-b from-white/[0.02] to-transparent rounded-[40px] border border-white/5 flex items-center justify-center overflow-hidden">
            
            {/* 3D Car Render Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
              <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1500&auto=format&fit=crop" alt="Car 3D" className="w-[80%] object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mix-blend-screen" />
            </div>

            {/* Climate Controls Overlay (Glassmorphism) */}
            {activeTab === 'climate' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-12 w-[90%] max-w-4xl bg-black/40 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between"
              >
                
                {/* Temp Down */}
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => setTemp(t => Math.max(16, t - 0.5))}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-light hover:bg-white/20 active:bg-white/30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-[#a1a1aa] font-medium tracking-widest uppercase text-sm">Cooler</span>
                </div>

                {/* Central Display */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-8xl font-light tracking-tighter tabular-nums">{temp.toFixed(1)}</span>
                    <span className="text-3xl text-[#a1a1aa]">°C</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setAcOn(!acOn)}
                      className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-colors ${acOn ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      A/C {acOn ? 'ON' : 'OFF'}
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                      <Wind size={20} />
                    </button>
                  </div>
                </div>

                {/* Temp Up */}
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => setTemp(t => Math.min(30, t + 0.5))}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-light hover:bg-white/20 active:bg-white/30 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-[#a1a1aa] font-medium tracking-widest uppercase text-sm">Warmer</span>
                </div>

              </motion.div>
            )}

            {/* Top Right Widget: Media Mini */}
            <div className="absolute top-12 right-12 bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl flex items-center gap-6 w-96">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-inner">
                <Music size={32} className="text-white/50" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg truncate">Nightcall</h4>
                <p className="text-[#a1a1aa] text-sm truncate">Kavinsky</p>
                <div className="w-full h-1 bg-white/20 rounded-full mt-4">
                  <div className="w-1/3 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}
