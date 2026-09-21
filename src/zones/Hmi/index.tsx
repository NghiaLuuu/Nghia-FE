import { useState, useEffect } from 'react';
import { Settings, AlertTriangle, Power, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Component: Thanh đo lường từng nấc (Segmented Gauge)
const SegmentedGauge = ({ value, max, isDanger }: { value: number, max: number, isDanger: boolean }) => {
  const segments = 20;
  const activeSegments = Math.floor((value / max) * segments);

  return (
    <div className="flex gap-1 h-6">
      {Array.from({ length: segments }).map((_, i) => {
        const isActive = i < activeSegments;
        let colorClass = "bg-white/10";
        if (isActive) {
          if (isDanger) colorClass = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]";
          else if (i > segments * 0.7) colorClass = "bg-yellow-500";
          else colorClass = "bg-green-500";
        }
        return (
          <div 
            key={i} 
            className={`flex-1 ${colorClass} transition-colors duration-150 rounded-sm`}
          />
        );
      })}
    </div>
  );
};

export default function HmiZone() {
  const [temp, setTemp] = useState(120.5);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => {
        const next = prev + (Math.random() > 0.5 ? 0.3 : -0.3);
        return Number(next.toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsFlashing(temp >= 115);
  }, [temp]);

  // CSS Hazard Stripes cho nút cảnh báo
  const hazardPattern = {
    backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)'
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-transparent overflow-hidden">
      
      {/* Container Chính - Border 1px siêu mỏng */}
      <div className="max-w-[1920px] mx-auto h-[calc(100vh-120px)] grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/10 border border-white/10 mt-12 shadow-2xl shadow-black">
        
        {/* Header / Status Bar */}
        <div className="md:col-span-12 bg-[#0a0a0a] p-4 md:p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-6">
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.8)]"
            />
            <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-red-500">
              SYS-ERR-409: Turbine 4 Offline
            </span>
          </div>
          <div className="text-lg font-mono text-gray-400 hidden md:block">
            UTC {new Date().toISOString().substring(11, 19)}
          </div>
        </div>

        {/* Main Display - Telemetry */}
        <div className="md:col-span-9 bg-[#050505] p-8 md:p-16 flex flex-col justify-center border-r border-white/10 relative">
          
          <div className="absolute top-8 right-8 text-white/5 font-mono text-9xl font-black pointer-events-none select-none">
            T-04
          </div>

          {/* Khối Nhiệt độ */}
          <div className="mb-16 z-10">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <Activity size={16} /> Core Temperature (T-1)
            </h2>
            <div className="flex items-end gap-6 mb-6">
              <motion.span 
                animate={isFlashing ? { opacity: [1, 0.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.4, ease: "circIn" }}
                className={`text-[80px] md:text-[140px] leading-none font-black font-mono tabular-nums tracking-tighter ${isFlashing ? 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'text-white'}`}
              >
                {temp.toFixed(1)}
              </motion.span>
              <span className="text-3xl text-gray-600 font-mono mb-4 md:mb-8 tracking-widest">°C</span>
            </div>
            
            <div className="max-w-2xl">
              <SegmentedGauge value={temp} max={150} isDanger={isFlashing} />
              <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                <span>0°C</span>
                <span className="text-red-500">CRITICAL: 115°C</span>
                <span>150°C</span>
              </div>
            </div>
          </div>

          {/* Khối Tốc độ */}
          <div className="z-10">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">
              Main Rotor Speed
            </h2>
            <div className="flex items-end gap-6">
              <span className="text-6xl md:text-8xl leading-none font-black font-mono tabular-nums tracking-tighter text-emerald-400">
                1,450
              </span>
              <span className="text-2xl text-gray-600 font-mono mb-2 tracking-widest">RPM</span>
            </div>
          </div>
        </div>

        {/* Controls Sidebar - Brutalist Industrial */}
        <div className="md:col-span-3 bg-[#0a0a0a] flex flex-col gap-[1px] bg-white/10">
          
          <button className="flex-1 bg-[#111] hover:bg-[#1a1a1a] flex flex-col items-center justify-center gap-4 transition-colors border-none outline-none group">
            <Settings size={32} className="text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm uppercase font-bold tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">Calibration</span>
          </button>

          <button className="flex-1 bg-yellow-500 text-black flex flex-col items-center justify-center gap-4 border-none outline-none active:scale-[0.98] transition-transform" style={hazardPattern}>
            <AlertTriangle size={32} className="text-black" />
            <span className="text-lg md:text-xl uppercase font-black tracking-widest">Manual Override</span>
          </button>

          <button className="flex-[1.5] bg-red-600 text-white flex flex-col items-center justify-center gap-4 border-none outline-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform" style={hazardPattern}>
            <Power size={48} className="drop-shadow-lg" />
            <span className="text-2xl md:text-3xl uppercase font-black tracking-widest drop-shadow-md">E - STOP</span>
          </button>

        </div>
      </div>
    </div>
  );
}
