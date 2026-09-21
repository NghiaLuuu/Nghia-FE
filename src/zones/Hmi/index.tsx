import { useState, useEffect } from 'react';
import { Settings, AlertTriangle, Power } from 'lucide-react';

export default function HmiZone() {
  const [temp, setTemp] = useState(120.5);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => {
        const next = prev + (Math.random() > 0.5 ? 0.1 : -0.1);
        return Number(next.toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsFlashing(temp >= 115);
  }, [temp]);

  return (
    <div className="min-h-screen bg-[#111] text-[#e5e5e5] p-6 font-mono selection:bg-transparent">
      {/* Grid Layout - 1px borders */}
      <div className="max-w-[1920px] mx-auto h-[calc(100vh-120px)] grid grid-cols-12 gap-[1px] bg-gray-800 border border-gray-800">
        
        {/* Header / Status Bar */}
        <div className="col-span-12 bg-[#1a1a1a] p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-6 h-6 bg-red-600 rounded-none animate-pulse"></div>
            <span className="text-2xl font-bold uppercase tracking-widest text-red-500">Tua-bin số 4 mất kết nối - Lỗi E-409</span>
          </div>
          <div className="text-xl text-gray-400">
            SYS_TIME: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Main Display */}
        <div className="col-span-8 bg-[#111] p-12 flex flex-col justify-center border-r border-gray-800">
          <div className="mb-12">
            <h2 className="text-xl text-gray-500 uppercase tracking-widest mb-4">Core Temperature (T-1)</h2>
            <div className="flex items-end gap-4">
              <span className={`text-[120px] leading-none font-bold tabular-nums ${isFlashing ? 'text-red-500' : 'text-[#e5e5e5]'}`}>
                {temp}
              </span>
              <span className="text-4xl text-gray-500 mb-4">°C</span>
            </div>
            <div className={`mt-4 p-4 border ${isFlashing ? 'border-red-500 text-red-500' : 'border-gray-700 text-gray-500'} inline-flex items-center gap-2`}>
              <AlertTriangle size={24} />
              <span className="text-lg uppercase">Ngưỡng cảnh báo: 115 °C</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl text-gray-500 uppercase tracking-widest mb-4">Rotor Speed</h2>
            <div className="flex items-end gap-4">
              <span className="text-8xl leading-none font-bold tabular-nums text-green-500">1,450</span>
              <span className="text-2xl text-gray-500 mb-2">RPM</span>
            </div>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="col-span-4 bg-[#1a1a1a] p-8 flex flex-col gap-[1px] bg-gray-800">
          
          <button className="w-full h-[120px] bg-[#111] flex flex-col items-center justify-center gap-2 active:bg-gray-800 transition-none border-none outline-none">
            <Settings size={32} className="text-gray-400" />
            <span className="text-xl uppercase font-bold text-gray-400">Calibration</span>
          </button>

          <button className="w-full h-[120px] bg-yellow-600 text-black flex flex-col items-center justify-center gap-2 active:bg-yellow-700 transition-none border-none outline-none mt-8">
            <AlertTriangle size={32} />
            <span className="text-xl uppercase font-black">Manual Override</span>
          </button>

          <button className="w-full h-[160px] bg-red-600 text-white flex flex-col items-center justify-center gap-2 active:bg-red-700 transition-none border-none outline-none mt-[1px]">
            <Power size={48} />
            <span className="text-2xl uppercase font-black">Emergency Stop</span>
          </button>

        </div>
      </div>
    </div>
  );
}
