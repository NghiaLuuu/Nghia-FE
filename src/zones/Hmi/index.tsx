import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Activity, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Simulated telemetry data
const generateTelemetry = () => ({
  temp: (Math.random() * 15 + 65).toFixed(1), // 65-80 C
  pressure: (Math.random() * 0.5 + 4.2).toFixed(2), // 4.2-4.7 Bar
  rpm: Math.floor(Math.random() * 200 + 3400), // 3400-3600 RPM
  vibration: (Math.random() * 2 + 1).toFixed(2), // 1-3 mm/s
});

export default function HmiZone() {
  const [data, setData] = useState(generateTelemetry());
  const [time, setTime] = useState(new Date().toISOString());

  // Simulate real-time data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateTelemetry());
      setTime(new Date().toISOString());
    }, 1500); // 1.5s refresh rate for HMI stability
    return () => clearInterval(interval);
  }, []);

  const isWarning = parseFloat(data.temp) > 75;

  return (
    <div className="w-full h-screen bg-[#070b14] text-[#8ab4f8] font-mono overflow-hidden relative selection:bg-[#8ab4f8] selection:text-black">
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(138,180,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(138,180,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-50 mix-blend-overlay"></div>

      <div className="relative z-10 w-full h-full p-6 flex flex-col gap-6">
        
        {/* Top Status Bar */}
        <header className="h-16 border border-[#8ab4f8]/30 bg-[#8ab4f8]/5 flex items-center justify-between px-6 backdrop-blur-sm shadow-[0_0_15px_rgba(138,180,248,0.1)]">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${isWarning ? 'bg-[#fbbc04] text-[#fbbc04]' : 'bg-[#34a853] text-[#34a853]'}`}></div>
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-[#e8f0fe]">Turbine Alpha / Core 01</h1>
          </div>
          
          <div className="flex items-center gap-8">
            {isWarning && (
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex items-center gap-2 text-[#fbbc04] text-xs font-bold bg-[#fbbc04]/10 px-3 py-1 border border-[#fbbc04]/50"
              >
                <AlertTriangle size={14} /> TEMP_WARN
              </motion.div>
            )}
            <div className="text-xs text-[#8ab4f8]/70 flex items-center gap-2">
              <Activity size={14} /> SYS_TIME: {time}
            </div>
          </div>
        </header>

        {/* Main Dashboard Area */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          
          {/* Left Column: Primary Circular Gauge */}
          <div className="col-span-4 border border-[#8ab4f8]/30 bg-[#8ab4f8]/5 p-6 flex flex-col items-center justify-center relative shadow-[inset_0_0_30px_rgba(138,180,248,0.05)]">
            <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-[#8ab4f8]/50">Rotor Speed</div>
            
            {/* SVG Radar / RPM Gauge */}
            <div className="relative w-64 h-64 flex items-center justify-center mt-4">
              {/* Outer Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8ab4f8" strokeWidth="0.5" strokeOpacity="0.2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8ab4f8" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * (data.rpm / 4000))} className="transition-all duration-1000 ease-out drop-shadow-[0_0_5px_rgba(138,180,248,0.8)]" />
              </svg>
              
              {/* Rotating Inner Tech Ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-[#8ab4f8]/30 rounded-full"
              ></motion.div>

              <div className="text-center">
                <motion.div 
                  key={data.rpm}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-black text-[#e8f0fe] tracking-tighter drop-shadow-[0_0_10px_rgba(232,240,254,0.5)]"
                >
                  {data.rpm}
                </motion.div>
                <div className="text-[10px] text-[#8ab4f8] mt-1 tracking-widest">RPM</div>
              </div>
            </div>

            {/* Target Value Indicator */}
            <div className="mt-12 w-full flex justify-between items-center border-t border-[#8ab4f8]/20 pt-4">
              <span className="text-xs text-[#8ab4f8]/50">TARGET: 3500</span>
              <span className="text-xs text-[#34a853]">DEV: {((data.rpm - 3500) / 3500 * 100).toFixed(2)}%</span>
            </div>
          </div>

          {/* Middle Column: Critical Telemetry Grid */}
          <div className="col-span-5 grid grid-rows-3 gap-6">
            
            {/* Temp Card */}
            <div className={`row-span-1 border p-5 flex justify-between items-center transition-colors duration-500
              ${isWarning ? 'border-[#fbbc04] bg-[#fbbc04]/10 shadow-[inset_0_0_20px_rgba(251,188,4,0.2)]' : 'border-[#8ab4f8]/30 bg-[#8ab4f8]/5'}`}
            >
              <div>
                <div className={`text-[10px] tracking-widest mb-1 ${isWarning ? 'text-[#fbbc04]' : 'text-[#8ab4f8]/50'}`}><Zap size={12} className="inline mr-2" />CORE TEMP</div>
                <div className="text-xs text-[#8ab4f8]/70">Threshold: 75.0 °C</div>
              </div>
              <div className="text-right">
                <motion.div 
                  key={data.temp}
                  initial={{ opacity: 0.8, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-4xl font-black tabular-nums ${isWarning ? 'text-[#fbbc04] drop-shadow-[0_0_8px_rgba(251,188,4,0.8)]' : 'text-[#e8f0fe]'}`}
                >
                  {data.temp}
                </motion.div>
                <div className={`text-[10px] ${isWarning ? 'text-[#fbbc04]' : 'text-[#8ab4f8]'}`}>°C</div>
              </div>
            </div>

            {/* Pressure Card */}
            <div className="row-span-1 border border-[#8ab4f8]/30 bg-[#8ab4f8]/5 p-5 flex justify-between items-center">
              <div>
                <div className="text-[10px] tracking-widest mb-1 text-[#8ab4f8]/50"><Activity size={12} className="inline mr-2" />SYS PRESSURE</div>
                <div className="text-xs text-[#8ab4f8]/70">Nominal: 4.5 Bar</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-[#e8f0fe] tabular-nums">{data.pressure}</div>
                <div className="text-[10px] text-[#8ab4f8]">BAR</div>
              </div>
            </div>

            {/* Vibration Card */}
            <div className="row-span-1 border border-[#8ab4f8]/30 bg-[#8ab4f8]/5 p-5 flex justify-between items-center">
              <div>
                <div className="text-[10px] tracking-widest mb-1 text-[#8ab4f8]/50"><Cpu size={12} className="inline mr-2" />VIBRATION</div>
                <div className="text-xs text-[#8ab4f8]/70">RMS Velocity</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-[#e8f0fe] tabular-nums">{data.vibration}</div>
                <div className="text-[10px] text-[#8ab4f8]">MM/S</div>
              </div>
            </div>

          </div>

          {/* Right Column: Event Log & Controls */}
          <div className="col-span-3 flex flex-col gap-6">
            
            {/* Event Log */}
            <div className="flex-1 border border-[#8ab4f8]/30 bg-[#8ab4f8]/5 p-4 flex flex-col overflow-hidden">
              <div className="text-[10px] tracking-widest text-[#8ab4f8]/50 mb-4 border-b border-[#8ab4f8]/20 pb-2">SYSTEM LOG</div>
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto text-[10px] font-mono pr-2 custom-scrollbar">
                <div className="text-[#8ab4f8]/70"><span className="text-[#8ab4f8]">14:22:01</span> - DIAGNOSTIC CHECK OK</div>
                <div className="text-[#8ab4f8]/70"><span className="text-[#8ab4f8]">14:22:15</span> - PRESSURE CALIBRATED</div>
                <div className="text-[#fbbc04]"><span className="text-[#fbbc04]">14:23:04</span> - TEMP SPIKE DETECTED</div>
                <div className="text-[#8ab4f8]/70"><span className="text-[#8ab4f8]">14:23:45</span> - COOLING SYSTEM ENGAGED</div>
                <div className="text-[#34a853]"><span className="text-[#34a853]">14:24:10</span> - TEMP NORMALIZED</div>
                {isWarning && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-[#fbbc04] bg-[#fbbc04]/10 p-1">
                    <span>{time.split('T')[1].substring(0, 8)}</span> - WARN: TEMP OVER 75C
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="h-24 grid grid-cols-2 gap-4">
              <button className="border border-[#8ab4f8]/50 bg-[#8ab4f8]/10 hover:bg-[#8ab4f8]/20 text-[#8ab4f8] font-bold text-xs uppercase tracking-widest shadow-[inset_0_0_10px_rgba(138,180,248,0.2)] active:scale-95 transition-all">
                DIAGNOSTICS
              </button>
              <button className="border border-[#ea4335]/50 bg-[#ea4335]/10 hover:bg-[#ea4335]/20 text-[#ea4335] font-bold text-xs uppercase tracking-widest shadow-[inset_0_0_10px_rgba(234,67,53,0.2)] active:scale-95 transition-all">
                EMERGENCY E-STOP
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
