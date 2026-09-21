import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STORY = [
  {
    year: "I. THE ENCOUNTER",
    title: "Mùa thu tại Paris",
    desc: "Khoảnh khắc ánh mắt chạm nhau giữa bảo tàng Louvre tĩnh lặng, thời gian như ngừng trôi. Bức ảnh trắng đen ghi lại sự khởi đầu của vĩnh cửu.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1500&auto=format&fit=crop"
  },
  {
    year: "II. THE PROMISE",
    title: "Lời hứa trên cao nguyên",
    desc: "Giữa biển mây hoàng hôn, chiếc nhẫn được trao đi. Một lời hứa không lời nhưng đanh thép hơn mọi ngôn từ.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1500&auto=format&fit=crop"
  },
  {
    year: "III. THE CELEBRATION",
    title: "Vũ khúc tình yêu",
    desc: "Bản tình ca vang lên trong ánh nến. Từng chuyển động, từng nụ cười được đóng băng thành nghệ thuật.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1500&auto=format&fit=crop"
  }
];

export default function WeddingZone() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#f8f7f5] text-[#1c1917] font-serif selection:bg-[#d4af37] selection:text-white">
      
      {/* Hero Section */}
      <div className="h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=3000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover filter grayscale" />
        </motion.div>
        
        <div className="z-10 relative">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-xs tracking-[0.4em] uppercase mb-8 text-gray-500"
          >
            Fine Art Wedding Photography
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-normal tracking-tight italic"
          >
            L'Éternité
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="w-[1px] h-32 bg-current mx-auto mt-16"
          ></motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-6 py-32 relative">
        {/* The Axis */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 hidden md:block"></div>

        {STORY.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-40 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Image */}
            <div className="w-full md:w-1/2 relative group">
              <div className="overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f8f7f5] border border-gray-200 flex items-center justify-center p-4 z-10 hidden md:flex">
                <span className="font-sans text-[10px] tracking-widest text-center uppercase text-gray-500">Fine<br/>Art<br/>Print</span>
              </div>
            </div>

            {/* Text */}
            <div className={`w-full md:w-1/2 flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
              <span className="font-sans text-xs tracking-[0.2em] text-[#d4af37] mb-6">{item.year}</span>
              <h2 className="text-4xl md:text-5xl italic mb-8">{item.title}</h2>
              <p className="font-sans text-sm text-gray-500 leading-loose max-w-sm font-light">
                {item.desc}
              </p>
            </div>
            
          </div>
        ))}
      </div>

      {/* Footer / CTA */}
      <div className="py-32 text-center border-t border-gray-200">
        <h2 className="text-4xl italic mb-12">Bắt đầu câu chuyện của bạn</h2>
        <button className="px-12 py-4 border border-current text-sm tracking-[0.2em] uppercase font-sans hover:bg-[#1c1917] hover:text-[#f8f7f5] transition-colors duration-500">
          Đặt Lịch Hẹn
        </button>
      </div>

    </div>
  );
}
