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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Smooth horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const physicsX = useSpring(x, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <div ref={containerRef} className="h-[400vh] bg-black text-[#F9F9F9] relative cursor-none">
      
      {/* Custom Cursor */}
      {createPortal(
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: isHovering ? 3 : 1 }}
          transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        >
          {isHovering && <span className="text-black text-[4px] font-sans font-bold tracking-widest">VIEW</span>}
        </motion.div>,
        document.body
      )}

      {/* Sticky Container for Horizontal Scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Global Branding / Header */}
        <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference">
          <h1 className="font-serif text-6xl italic tracking-tighter">Atelier</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] mt-2">Fall / Winter 2026</p>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x: physicsX }} className="flex h-full w-[400vw]">
          
          {/* Panel 1: Hero Intro */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center relative px-20">
            <h1 className="font-serif text-[15vw] leading-[0.8] tracking-tighter mix-blend-difference z-20 text-center uppercase">
              Monochrome<br/>
              <span className="italic font-light">Editorial</span>
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[70vh] z-10 overflow-hidden"
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop" 
                   className="w-full h-full object-cover filter grayscale contrast-125" alt="Cover" />
            </div>
            
            <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4 text-xs font-sans tracking-[0.2em] uppercase">
              Scroll to explore <div className="w-12 h-[1px] bg-white"></div>
            </div>
          </div>

          {/* Panel 2 & 3: Collection Items */}
          {COLLECTION.map((item, index) => (
            <div key={item.id} className="w-[100vw] h-full flex items-center justify-center p-24 relative">
              
              {/* Giant Background Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[40vw] text-white/5 pointer-events-none z-0">
                {item.id}
              </div>

              <div className={`w-full max-w-7xl h-[80vh] flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-12 z-10`}>
                
                {/* Image Box - Absolutely sharp edges */}
                <div className="w-[60%] h-full relative border border-white/20 p-4"
                     onMouseEnter={() => setIsHovering(true)}
                     onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-full h-full overflow-hidden relative group">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105" />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                  </div>
                </div>

                {/* Typography Box */}
                <div className="w-[40%] h-full flex flex-col justify-end pb-12">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-8 border-l border-white/20 pl-4">
                    Look {item.id} / F-W 26
                  </span>
                  
                  <h2 className="font-serif text-6xl md:text-8xl tracking-tighter uppercase mb-6">{item.name}</h2>
                  
                  <p className="font-sans text-[11px] leading-loose tracking-[0.2em] uppercase text-gray-400 max-w-sm mb-12">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-8 mt-auto">
                    <span className="font-serif text-3xl italic">{item.price}</span>
                    <button className="bg-white text-black font-sans text-xs tracking-[0.3em] font-bold px-10 py-5 uppercase hover:bg-transparent hover:text-white border border-white transition-colors duration-500 flex items-center gap-4">
                      Purchase <ArrowRight size={14} />
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
