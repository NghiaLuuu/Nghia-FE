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
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[var(--accent-color)] font-bold tracking-[0.2em] mb-4 uppercase">{FASHION_ITEM.sub}</p>
            <h1 className="text-edge text-[15vw] md:text-[8vw] mb-8 relative z-20 mix-blend-difference">{FASHION_ITEM.name}</h1>
            
            <div className="ml-12 md:ml-24 max-w-sm border-l-4 border-[var(--accent-color)] pl-6 relative">
              <div className="absolute -left-12 -top-12 text-[8rem] text-white/10 font-serif leading-none">"</div>
              <p className="text-lg font-light leading-relaxed mb-8">{FASHION_ITEM.desc}</p>
              
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black">{FASHION_ITEM.price}</span>
                <button className="bg-white text-black px-8 py-4 uppercase font-black tracking-widest hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300">
                  COP NOW
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Col - Broken Grid Images */}
        <div className="col-span-1 md:col-span-7 h-[80vh] relative mt-20 md:mt-0">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 right-10 w-[60%] h-[70%] z-20"
          >
            <img 
              src={FASHION_ITEM.image1} 
              alt="Main Product" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-4 right-4 bg-[var(--accent-color)] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Limited Edition
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-[50%] h-[50%] z-10"
          >
            <img 
              src={FASHION_ITEM.image2} 
              alt="Detail" 
              className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700"
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
