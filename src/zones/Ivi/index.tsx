import { BatteryCharging, Music, Navigation, Wind } from 'lucide-react';

export default function IviZone() {
  return (
    <div className="h-screen w-full bg-black text-white font-sans overflow-hidden relative selection:bg-transparent">
      
      {/* Edge-to-edge Map Background (Simulated) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
          alt="Map" 
          className="w-full h-full object-cover filter contrast-150 brightness-50"
        />
        {/* Navigation path line fake */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-l-4 border-t-4 border-[#f97316] rounded-tl-full shadow-[0_0_30px_#f97316]"></div>
        <div className="absolute top-1/2 left-1/2 -mt-4 -ml-4 w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center shadow-[0_0_20px_#f97316]">
          <Navigation size={20} className="text-black" />
        </div>
      </div>

      {/* Floating Glass Panels */}
      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between pointer-events-none">
        
        {/* Top Status Bar */}
        <div className="flex justify-between items-start">
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 flex items-center gap-8 pointer-events-auto active:bg-white/10">
            <div className="flex items-center gap-4">
              <BatteryCharging size={40} className="text-[#f97316]" />
              <div>
                <div className="text-3xl font-bold">84%</div>
                <div className="text-gray-400 text-lg">420 km</div>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 px-8 py-6 pointer-events-auto">
            <div className="text-4xl font-bold font-mono">14:05</div>
            <div className="text-gray-400 text-lg">22°C Outside</div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex gap-8 items-end">
          
          {/* Media Player */}
          <div className="w-[500px] backdrop-blur-xl bg-black/60 border border-white/10 p-8 pointer-events-auto">
            <div className="flex items-start justify-between mb-8">
              <Music size={32} className="text-gray-400" />
              <div className="text-gray-400 text-xl tracking-widest uppercase">Bluetooth</div>
            </div>
            {/* Huge Text for Glanceability */}
            <h2 className="text-4xl font-bold leading-tight mb-2 truncate">Bản giao hưởng số 9 cung Rê thứ, Op. 125</h2>
            <p className="text-2xl text-[#f97316]">Ludwig van Beethoven</p>
            
            {/* Huge Touch Targets */}
            <div className="flex justify-between mt-12">
              <div className="w-24 h-24 bg-white/10 flex items-center justify-center active:bg-white/20">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-r-[20px] border-r-white border-b-[12px] border-b-transparent"></div>
              </div>
              <div className="w-32 h-24 bg-[#f97316] flex items-center justify-center active:bg-[#ea580c] shadow-[0_0_30px_#f97316_inset]">
                <div className="w-4 h-10 bg-black mr-2"></div>
                <div className="w-4 h-10 bg-black"></div>
              </div>
              <div className="w-24 h-24 bg-white/10 flex items-center justify-center active:bg-white/20">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* AC Controls */}
          <div className="flex-1 backdrop-blur-xl bg-black/60 border border-white/10 p-8 flex justify-between pointer-events-auto">
            <div className="w-32 h-32 border-2 border-white/20 flex flex-col items-center justify-center text-4xl active:bg-white/10">
              -
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Wind size={40} className="text-cyan-400" />
              <div className="text-6xl font-bold">21°C</div>
              <div className="text-xl text-gray-400">AUTO</div>
            </div>
            <div className="w-32 h-32 border-2 border-white/20 flex flex-col items-center justify-center text-4xl text-[#f97316] active:bg-white/10">
              +
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
