import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FASHION_ITEM = {
  name: "VORTEX",
  sub: "OG '98 RE-ISSUE",
  desc: "Bản phát hành giới hạn kết hợp cùng nghệ sĩ thị giác KAW. 100 đôi trên toàn cầu. Đừng chớp mắt.",
  image1: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop",
  image2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1500&auto=format&fit=crop",
  price: "12,000,000 VND"
};

export default function FashionZone() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="w-full min-h-[150vh] bg-black text-white overflow-hidden relative">
      
      {/* Background Typography */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-20">
        <motion.h1 
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="text-[25vw] font-black text-edge whitespace-nowrap text-transparent"
          style={{ WebkitTextStroke: '2px white' }}
        >
          HYPEBEAST HYPEBEAST HYPEBEAST
        </motion.h1>
      </div>

      <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1920px] mx-auto relative grid grid-cols-1 md:grid-cols-12 grid-rows-[1fr_auto] min-h-screen gap-y-12">
        
        {/* Lớp Typography (Nằm dưới - DOM Order 1 - Row 1) */}
        <div className="md:row-start-1 md:col-start-1 md:col-span-8 flex flex-col justify-start relative">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Title */}
            <p className="text-[var(--accent-color)] font-bold tracking-[0.2em] mb-2 uppercase">{FASHION_ITEM.sub}</p>
            <h1 className="font-black text-[25vw] md:text-[14vw] leading-[0.8] mb-8 md:mb-12 uppercase tracking-tighter mix-blend-difference">{FASHION_ITEM.name}</h1>
            
            {/* Description */}
            <div className="max-w-md pl-2">
              <p className="text-xl font-light leading-relaxed text-gray-300">{FASHION_ITEM.desc}</p>
            </div>
          </motion.div>
        </div>

        {/* Lớp Hình Ảnh (Nằm giữa - DOM Order 2, đè lên Typography - Span 2 rows) */}
        <div className="md:row-start-1 md:row-span-2 md:col-start-6 md:col-span-7 relative flex items-center justify-center pointer-events-none mix-blend-lighten">
          <motion.div 
            style={{ y: y1 }}
            className="w-full h-full flex items-center justify-center scale-125 md:scale-150 origin-center"
          >
            <img 
              src={FASHION_ITEM.image1} 
              alt="Main Product" 
              className="w-full h-auto max-h-[80vh] object-contain filter contrast-125 saturate-0 hover:saturate-100 transition-all duration-700 pointer-events-auto"
            />
          </motion.div>
        </div>

        {/* Lớp Hành Động (Nằm trên cùng - DOM Order 3 - Row 2) */}
        <div className="md:row-start-2 md:col-start-1 md:col-span-5 relative flex flex-col items-start gap-4">
          <span className="font-sans text-[12vw] md:text-[4vw] font-black leading-none tracking-tight text-white drop-shadow-md">{FASHION_ITEM.price}</span>
          <button className="bg-[var(--accent-color)] text-white px-12 py-6 uppercase font-black text-3xl md:text-4xl tracking-widest hover:bg-white hover:text-black transition-colors duration-300 border-none outline-none">
            COP NOW
          </button>
        </div>

      </div>

      {/* Marquee Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[var(--accent-color)] text-black font-black text-2xl py-3 uppercase tracking-widest overflow-hidden pointer-events-none z-50">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="whitespace-nowrap flex gap-8"
        >
          <span>OUT NOW</span><span>/</span><span>LIMITED STOCK</span><span>/</span><span>NO RESTOCK</span><span>/</span>
          <span>OUT NOW</span><span>/</span><span>LIMITED STOCK</span><span>/</span><span>NO RESTOCK</span><span>/</span>
          <span>OUT NOW</span><span>/</span><span>LIMITED STOCK</span><span>/</span><span>NO RESTOCK</span><span>/</span>
        </motion.div>
      </div>

    </div>
  );
}
