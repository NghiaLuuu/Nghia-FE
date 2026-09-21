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

      <div className="pt-32 px-4 md:px-12 max-w-[1920px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-screen">
        
        {/* Left Col - Huge Text & Button */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center h-full z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[var(--accent-color)] font-bold tracking-[0.2em] mb-4 uppercase">{FASHION_ITEM.sub}</p>
            <h1 className="text-edge text-[20vw] md:text-[10vw] mb-4 relative z-20 mix-blend-difference leading-none">{FASHION_ITEM.name}</h1>
            
            <div className="ml-4 md:ml-24 max-w-sm border-l-4 border-[var(--accent-color)] pl-6 relative">
              <div className="absolute -left-12 -top-12 text-[8rem] text-white/10 font-serif leading-none">"</div>
              <p className="text-lg font-light leading-relaxed mb-8">{FASHION_ITEM.desc}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Col - Broken Grid Images & Overlapping Typo */}
        <div className="col-span-1 md:col-span-7 h-[60vh] md:h-[80vh] relative mt-10 md:mt-0">
          
          {/* Giant overlapping Typography & CTA (Nước đi #4: Typo đan xen) - Đẩy xuống z-10 để giày đè lên */}
          <div className="absolute -bottom-10 md:bottom-20 left-4 md:-left-32 z-10 flex flex-col items-start gap-4 pointer-events-auto">
            <span className="text-[12vw] md:text-[6vw] font-black leading-none tracking-tighter text-white whitespace-nowrap drop-shadow-lg">{FASHION_ITEM.price}</span>
            <button className="bg-[var(--accent-color)] text-white px-8 py-4 md:px-12 md:py-6 uppercase font-black text-2xl md:text-5xl tracking-widest hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_var(--accent-color)] border-none">
              COP NOW
            </button>
          </div>
          {/* Main Product Image - z-20 đè lên cụm Text. Phải đặt mix-blend-lighten ở thẻ cha có transform để tránh lỗi Stacking Context che khuất Text */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[90%] md:w-[80%] h-[100%] md:h-[90%] z-20 pointer-events-none mix-blend-lighten"
          >
            <img 
              src={FASHION_ITEM.image1} 
              alt="Main Product" 
              className="w-full h-full object-contain filter contrast-125 saturate-0 hover:saturate-100 hover:scale-105 transition-all duration-700 pointer-events-auto"
            />
          </motion.div>
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
