import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';

const COLLECTION = [
  {
    id: "01",
    name: "SILHOUETTE I",
    desc: "CẤU TRÚC VẢI TỔNG HỢP. ĐƯỜNG CẮT BẤT ĐỐI XỨNG LẤY CẢM HỨNG TỪ KIẾN TRÚC BRUTALIST.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop",
    price: "$1,250"
  },
  {
    id: "02",
    name: "NOIR TRENCH",
    desc: "LEN NGUYÊN CHẤT. SỰ TĨNH LẶNG TUYỆT ĐỐI TRONG CHUYỂN ĐỘNG.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    price: "$2,800"
  },
  {
    id: "03",
    name: "VOID DRESS",
    desc: "KHOẢNG KHÔNG GIAO THOA CÙNG LỤA CAO CẤP. THIẾT KẾ ĐỘC BẢN.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    price: "$3,400"
  }
];

export default function LookbookZone() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 400, damping: 25 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 400, damping: 25 });
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  // Smooth horizontal scroll
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const physicsX = useSpring(xRaw, { stiffness: 70, damping: 20, mass: 1 });

  // Parallax layers
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const backgroundSpringX = useSpring(backgroundX, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="h-[400vh] bg-[#020202] text-[#F9F9F9] relative cursor-none">
      
      {/* Custom Cursor */}
      {createPortal(
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
          style={{ x: cursorSpringX, y: cursorSpringY }}
          animate={{ 
            scale: cursorText ? 4 : 1,
            backgroundColor: cursorText ? '#ffffff' : '#f9f9f9',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {cursorText && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-black text-[3px] font-sans font-bold tracking-[0.3em] uppercase text-center"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>,
        document.body
      )}

      {/* Sticky Container for Horizontal Scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Global Branding / Header */}
        <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference">
          <h1 className="font-serif text-5xl md:text-7xl italic tracking-tighter">Atelier<span className="text-xl">®</span></h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] mt-4 opacity-70">Fall / Winter 2026</p>
        </div>

        {/* Parallax Background Typography */}
        <motion.div 
          style={{ x: backgroundSpringX }} 
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[35vw] font-serif font-black tracking-tighter opacity-[0.03] pointer-events-none z-0 italic"
        >
          MONOCHROME EDITORIAL VOID ARCHITECTURE
        </motion.div>

        {/* Horizontal Track */}
        <motion.div style={{ x: physicsX }} className="flex h-full w-[400vw] will-change-transform z-10">
          
          {/* Panel 1: Hero Intro */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center relative px-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            
            <h1 className="font-serif text-[18vw] leading-[0.7] tracking-tighter mix-blend-difference z-20 text-center uppercase relative">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className="block">Pure</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="block italic font-light text-[19vw]">Form</motion.span>
              </span>
            </h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[80vh] z-10 overflow-hidden"
                 onMouseEnter={() => setCursorText("DISCOVER")}
                 onMouseLeave={() => setCursorText("")}>
              <motion.img 
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover filter grayscale contrast-150 brightness-75" alt="Cover" />
            </div>
            
            <div className="absolute bottom-12 right-12 z-20 flex items-center gap-6 text-[10px] font-sans tracking-[0.3em] uppercase opacity-60">
              Scroll to explore <motion.div animate={{ width: [0, 100, 0], x: [0, 0, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="h-[1px] bg-white"></motion.div>
            </div>
          </div>

          {/* Panel 2, 3, 4: Collection Items */}
          {COLLECTION.map((item, index) => (
            <div key={item.id} className="w-[100vw] h-full flex items-center justify-center p-12 md:p-24 relative group">
              
              <div className={`w-full max-w-[90vw] md:max-w-7xl h-[85vh] flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 z-10 relative`}>
                
                {/* Number Watermark tied to item */}
                <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0 text-right' : 'left-0 text-left'} font-serif text-[25vw] text-white/[0.02] pointer-events-none leading-none -translate-y-1/4 z-0`}>
                  {item.id}
                </div>

                {/* Image Box */}
                <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden"
                     onMouseEnter={() => setCursorText("DRAG")}
                     onMouseLeave={() => setCursorText("")}>
                  
                  {/* Subtle reveal overlay */}
                  <div className="absolute inset-0 bg-[#020202] z-20 origin-top transform transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-0"></div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full relative z-10"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale contrast-[1.3] brightness-[0.85]" />
                  </motion.div>
                  
                  {/* Framing Lines */}
                  <div className="absolute top-8 left-8 bottom-8 right-8 border border-white/10 pointer-events-none z-30 transition-all duration-500 group-hover:border-white/30 mix-blend-overlay"></div>
                </div>

                {/* Typography Box */}
                <div className="w-full md:w-[45%] h-full flex flex-col justify-center md:justify-end pb-0 md:pb-24 z-20">
                  <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gray-500 mb-12 flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-gray-500"></div> Look {item.id} / F-W 26
                  </span>
                  
                  <h2 className="font-serif text-5xl md:text-[7vw] leading-[0.85] tracking-tighter uppercase mb-8">
                    {item.name.split(' ').map((word, i) => (
                      <span key={i} className="block overflow-hidden">
                        <span className="block transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0" style={{ transitionDelay: `${i * 0.1}s` }}>
                          {word}
                        </span>
                      </span>
                    ))}
                  </h2>
                  
                  <p className="font-sans text-[11px] leading-loose tracking-[0.25em] uppercase text-gray-400 max-w-sm mb-16 transform transition-all duration-700 delay-300 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap md:flex-nowrap items-center gap-8 md:gap-12 mt-auto opacity-0 translate-y-8 transition-all duration-700 delay-400 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="font-serif text-3xl md:text-5xl italic">{item.price}</span>
                    <button 
                      className="relative bg-white text-black font-sans text-xs tracking-[0.3em] font-bold px-12 py-6 uppercase overflow-hidden group/btn"
                      onMouseEnter={() => setCursorText("BUY")}
                      onMouseLeave={() => setCursorText("DRAG")}
                    >
                      <span className="relative z-10 flex items-center gap-4 mix-blend-difference text-white">Purchase <ArrowRight size={14} /></span>
                      <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:scale-y-100"></div>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </motion.div>
      </div>

    </div>
  );
}
