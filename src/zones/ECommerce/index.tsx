import { motion } from 'framer-motion';
import { Cpu, Battery, Wifi, ShieldCheck, ChevronRight, ShoppingCart } from 'lucide-react';

const TECH_PRODUCT = {
  name: "TITAN QUANTUM X9",
  tagline: "VƯỢT LÊN MỌI GIỚI HẠN VẬT LÝ",
  price: "42.990.000",
  originalPrice: "48.000.000",
  image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2940&auto=format&fit=crop",
  specs: [
    { icon: Cpu, label: "Chipset", value: "Neural Core V9" },
    { icon: Battery, label: "Thời lượng", value: "140 Giờ Liên tục" },
    { icon: Wifi, label: "Kết nối", value: "Quantum 7G" },
    { icon: ShieldCheck, label: "Bảo mật", value: "Quét Sinh Trắc Nano" }
  ]
};

export default function ECommerceZone() {
  return (
    <div className="w-full min-h-full p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 pt-20">
      
      {/* Left Column: Image & Effects */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 relative group"
      >
        <div className="absolute inset-0 bg-[var(--accent-color)] opacity-20 blur-[100px] rounded-full transition-opacity group-hover:opacity-40"></div>
        <img 
          src={TECH_PRODUCT.image} 
          alt={TECH_PRODUCT.name} 
          className="relative z-10 w-full h-auto object-cover rounded-3xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 border border-[var(--text-color)]/10"
        />
        {/* Floating Spec Badge */}
        <div className="absolute bottom-6 left-6 z-20 backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--accent-color)] flex items-center justify-center text-[var(--accent-color)] shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Vi xử lý đa luồng</p>
            <p className="text-white font-bold font-mono">1.2 Trillion OPS</p>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Information & Actions */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full md:w-1/2 flex flex-col"
      >
        <span className="text-[var(--accent-color)] font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
          Phiên bản Đặc biệt
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2 uppercase">{TECH_PRODUCT.name}</h1>
        <p className="text-xl text-gray-400 mb-8 font-light">{TECH_PRODUCT.tagline}</p>
        
        {/* Price Block */}
        <div className="flex items-end gap-4 mb-10 border-b border-[var(--text-color)]/10 pb-8">
          <span className="text-5xl font-bold font-mono text-[var(--accent-color)]">{TECH_PRODUCT.price}đ</span>
          <span className="text-xl text-gray-500 line-through mb-1 font-mono">{TECH_PRODUCT.originalPrice}đ</span>
        </div>

        {/* Specs Grid - Hairline Grid, No Rounded Corners, Monospace */}
        <div className="grid grid-cols-2 mb-10 border-t border-l border-[var(--text-color)]/20">
          {TECH_PRODUCT.specs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="bg-transparent border-b border-r border-[var(--text-color)]/20 p-5 flex flex-col gap-3 hover:bg-[var(--accent-color)]/5 transition-colors relative group">
                <Icon className="text-[var(--accent-color)] group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">{spec.label}</span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">{spec.value}</span>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>

        {/* Actions - Sharp edges, intense glow */}
        <div className="flex gap-0">
          <button className="flex-1 bg-transparent text-[var(--accent-color)] font-mono font-bold tracking-widest py-5 px-6 border border-[var(--accent-color)] flex items-center justify-center gap-3 hover:bg-[var(--accent-color)] hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 relative group overflow-hidden">
            {/* Scanline effect on button */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none"></div>
            <ShoppingCart size={24} />
            MUA NGAY
          </button>
          <button className="px-8 py-5 border border-l-0 border-[var(--text-color)]/20 flex items-center justify-center gap-2 hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all font-mono font-bold tracking-widest text-sm uppercase">
            So sánh <ChevronRight size={18} />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6 text-center">Giao hàng hỏa tốc 2H. Miễn phí đổi trả 30 ngày. Đã bao gồm VAT.</p>
      </motion.div>
    </div>
  );
}
