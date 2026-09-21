import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useRef, useState } from 'react';

const PRODUCT = {
  name: "AIR MAX SYMPHONY",
  tagline: "GRAVITY DEFIED.",
  price: "$295",
  desc: "The next generation of air technology. A seamless blend of brutalist aesthetic and weightless comfort. Constructed with aerospace-grade monofilament mesh.",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop", // Red Nike shoe
  sizes: [7, 8, 9, 10, 11, 12],
  features: ["Aero-mesh upper", "Quantum air unit", "Carbon fiber plate"]
};

export default function ECommerceZone() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [selectedSize, setSelectedSize] = useState(9);
  const [isAdded, setIsAdded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleAdd = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Parallax Values
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const transformStyle = useMotionTemplate`perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.05, 1.05, 1.05)`;

  return (
    <div 
      ref={containerRef} 
      className="min-h-[150vh] bg-[#f0f0f0] text-[#111] font-sans selection:bg-[#ff4500] selection:text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Massive Background Typography Parallax */}
        <motion.div style={{ y: yText }} className="text-[25vw] font-black tracking-tighter text-[#e5e5e5] whitespace-nowrap leading-none select-none">
          DEFY GRAVITY
        </motion.div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center px-6 md:px-24 pt-24 pb-12 gap-12 max-w-[1920px] mx-auto">
        
        {/* Left: Product Info */}
        <div className="flex-1 w-full flex flex-col justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase bg-black text-white px-3 py-1">New Release</span>
              <div className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#ff4500]">
                <Star size={12} fill="currentColor" /> 4.9/5
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
              {PRODUCT.name}
            </h1>
            <p className="text-2xl md:text-3xl font-light tracking-tight text-gray-500 mb-8 italic">
              {PRODUCT.tagline}
            </p>

            <div className="flex items-baseline gap-4 mb-12">
              <span className="text-5xl font-black tracking-tighter">{PRODUCT.price}</span>
              <span className="text-sm font-bold text-gray-400 line-through tracking-widest">$350</span>
            </div>

            {/* Size Selector */}
            <div className="mb-12">
              <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">Select Size (US)</div>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border flex items-center justify-center font-bold text-lg transition-all duration-300
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 bg-transparent text-black hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAdd}
              className="group relative bg-[#ff4500] text-white w-full md:w-auto h-20 px-12 font-bold text-sm tracking-[0.2em] uppercase overflow-hidden flex items-center justify-center gap-4"
            >
              {/* Button Magnetic & Fill Effect */}
              <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>
              
              <span className="relative z-10 flex items-center gap-4">
                {isAdded ? (
                  <><Check size={20} /> ADDED TO CART</>
                ) : (
                  <>ADD TO BAG <ShoppingBag size={18} className="group-hover:translate-x-2 transition-transform duration-300" /></>
                )}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right: Immersive Product Image (Out of bounds) */}
        <div className="flex-1 w-full h-[60vh] md:h-[80vh] relative z-20 pointer-events-none">
          <motion.div 
            style={{ y: yImage, scale: scaleImage, transform: transformStyle }}
            className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] flex items-center justify-center"
          >
            {/* Soft shadow underlying the shoe */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-3/4 h-32 bg-black/30 blur-[40px] rounded-[100%] scale-y-50"></div>
            
            <img 
              src={PRODUCT.image} 
              alt={PRODUCT.name} 
              className="w-full h-full object-contain filter drop-shadow-2xl saturate-[1.2] contrast-[1.1] rotate-[-15deg] mix-blend-multiply" 
            />
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
