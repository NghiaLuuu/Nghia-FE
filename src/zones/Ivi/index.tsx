import { Music, Navigation, Wind, Settings } from 'lucide-react';

const SegmentedBattery = ({ percentage }: { percentage: number }) => {
  const segments = 10;
  const activeSegments = Math.round((percentage / 100) * segments);

  return (
    <div className="flex gap-1 h-8">
      {Array.from({ length: segments }).map((_, i) => (
        <div 
          key={i} 
          className={`w-6 h-full skew-x-[-15deg] ${
            i < activeSegments 
              ? 'bg-[#f97316]' 
              : 'bg-[#222]'
          }`}
        />
      ))}
    </div>
  );
};

export default function IviZone() {
  return (
    <div className="h-screen w-full bg-[#000] text-white font-sans overflow-hidden relative selection:bg-transparent">
      
      {/* Background Map - Solid, No blur tricks, high contrast */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
          alt="Map" 
          className="w-full h-full object-cover filter contrast-125 grayscale"
        />
        {/* Navigation Route - Solid sharp line, NO GLOW */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-l-[6px] border-t-[6px] border-[#f97316] rounded-tl-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -mt-4 -ml-4 w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center">
          <Navigation size={16} className="text-black" />
        </div>
      </div>

      {/* Main UI Layout - Solid panels, edge-to-edge spacing */}
      <div className="relative z-10 w-full h-full p-6 md:p-12 flex flex-col justify-between pointer-events-none">
        
        {/* Top Status Bar - Matte Panels */}
        <div className="flex justify-between items-start gap-8">
          {/* Battery Panel */}
          <div className="bg-[#111] border border-white/5 p-6 flex items-center gap-8 pointer-events-auto shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <span className="text-4xl font-black font-mono tabular-nums tracking-tighter text-[#f97316]">84%</span>
                <span className="text-gray-500 font-mono text-lg uppercase tracking-widest">420 KM</span>
              </div>
              <SegmentedBattery percentage={84} />
            </div>
          </div>
          
          {/* Time Panel */}
          <div className="bg-[#111] border border-white/5 px-8 py-6 pointer-events-auto flex items-end gap-6 shadow-2xl">
            <span className="text-6xl font-black font-mono tabular-nums tracking-tighter leading-none">14:05</span>
            <span className="text-gray-500 font-mono text-xl uppercase tracking-widest mb-1">22°C EXT</span>
          </div>
        </div>

        {/* Bottom Controls - Massive targets, brutalist shapes */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch md:items-end">
          
          {/* Media Player */}
          <div className="flex-1 md:max-w-[600px] bg-[#111] border border-white/5 p-8 pointer-events-auto shadow-2xl">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <Music size={24} className="text-[#f97316]" />
              <div className="text-gray-500 font-bold tracking-[0.2em] uppercase text-sm">Now Playing</div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-2 truncate">SYMPHONY NO. 9</h2>
            <p className="text-xl text-gray-400 font-mono uppercase tracking-widest mb-12">Beethoven</p>
            
            {/* Playback Controls - Geometric & Massive */}
            <div className="flex items-center gap-4">
              <button className="flex-1 h-24 bg-[#1a1a1a] hover:bg-[#222] flex items-center justify-center transition-colors border-none outline-none group">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-r-[20px] border-r-gray-400 group-hover:border-r-white border-b-[12px] border-b-transparent transition-colors"></div>
              </button>
              
              <button className="flex-[1.5] h-24 bg-[#f97316] hover:bg-[#ea580c] flex items-center justify-center transition-colors border-none outline-none">
                <div className="flex gap-2">
                  <div className="w-4 h-10 bg-black"></div>
                  <div className="w-4 h-10 bg-black"></div>
                </div>
              </button>
              
              <button className="flex-1 h-24 bg-[#1a1a1a] hover:bg-[#222] flex items-center justify-center transition-colors border-none outline-none group">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-gray-400 group-hover:border-l-white border-b-[12px] border-b-transparent transition-colors"></div>
              </button>
            </div>
          </div>

          {/* Climate Controls */}
          <div className="flex-[1.5] bg-[#111] border border-white/5 p-8 flex justify-between items-center pointer-events-auto shadow-2xl">
            <button className="w-32 h-32 bg-[#1a1a1a] hover:bg-[#222] flex items-center justify-center transition-colors border-none outline-none">
              <span className="text-6xl font-light text-gray-400 leading-none mb-2">-</span>
            </button>
            
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3 border border-white/10 px-4 py-2 rounded-full">
                <Wind size={16} className="text-cyan-400" />
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-cyan-400">AUTO</span>
              </div>
              <div className="text-7xl md:text-8xl font-black font-mono tabular-nums tracking-tighter">
                21<span className="text-5xl text-gray-600">°</span>
              </div>
            </div>
            
            <button className="w-32 h-32 bg-[#1a1a1a] hover:bg-[#222] flex items-center justify-center transition-colors border-none outline-none">
              <span className="text-6xl font-light text-[#f97316] leading-none mb-2">+</span>
            </button>
          </div>

          {/* Quick Settings Action */}
          <button className="w-[120px] bg-[#111] border border-white/5 hover:bg-[#1a1a1a] flex flex-col items-center justify-center gap-4 pointer-events-auto transition-colors outline-none shadow-2xl">
            <Settings size={32} className="text-gray-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 [writing-mode:vertical-lr]">Settings</span>
          </button>

        </div>
      </div>
    </div>
  );
}
