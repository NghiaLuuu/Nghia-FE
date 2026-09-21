import { motion, animate, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

function CountUp({ value, decimals = 1, prefix = "", suffix = "" }: { value: number, decimals?: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Custom easeOut
        onUpdate: (latest) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
          }
        }
      });
    }
  }, [inView, value, decimals, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{(0).toFixed(decimals)}{suffix}</span>;
}

export default function EnglishZone() {
  return (
    <div className="min-h-screen bg-white text-[var(--text-color)] font-sans selection:bg-[var(--cta-color)] selection:text-white pb-24">
      
      {/* Hero Section - Asymmetric Layout */}
      <div className="pt-32 px-4 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[80vh]">
        
        {/* Left Col - Typography Heavy */}
        <div className="col-span-1 md:col-span-8 flex flex-col items-start z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-none mb-8">
              <ShieldCheck size={18} className="text-[var(--text-color)]" />
              <span className="font-bold text-sm uppercase tracking-widest text-[var(--text-color)]">
                IELTS Intensive Bootcamp 7.5+ (Cam kết đầu ra bằng văn bản pháp lý)
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="text-[14vw] md:text-[7vw] font-black leading-[0.9] tracking-tighter uppercase mb-10 text-[var(--text-color)]">
              BỨT PHÁ BĂNG ĐIỂM.<br />
              KHÔNG HỌC MẸO,<br />
              <span className="text-gray-300">HỌC TƯ DUY.</span>
            </h1>

            {/* Primary Action */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <button className="w-full sm:w-auto bg-[var(--cta-color)] text-white px-10 py-5 uppercase font-black text-xl tracking-wider hover:scale-105 active:scale-95 transition-transform duration-300 shadow-2xl shadow-[var(--cta-color)]/30 flex items-center justify-center gap-3">
                ĐẶT LỊCH TEST ĐẦU VÀO <ArrowRight size={24} />
              </button>
              <span className="font-medium text-gray-500 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Còn 3 suất trống tuần này
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Col - Visual Anchor (Abstract/Clean) */}
        <div className="col-span-1 md:col-span-4 h-full hidden md:flex items-center justify-center relative">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full aspect-square bg-gray-50 flex items-center justify-center relative border border-gray-100 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="text-[30vw] md:text-[20vw] font-black leading-none tracking-tighter text-gray-100 mix-blend-multiply absolute -right-10 -bottom-10">
              9.0
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Section - Asymmetric Bento Grid */}
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto mt-24">
        
        <div className="mb-12">
          <h2 className="text-3xl font-black uppercase tracking-widest text-[var(--text-color)]">Kết quả thực chứng</h2>
          <div className="w-24 h-1 bg-[var(--cta-color)] mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Main Bento Box - Overall Score */}
          <div className="md:col-span-7 md:row-span-2 bg-[var(--accent-color)] text-white p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-widest mb-1">Trần Nguyễn Phương Anh</h3>
                <p className="text-gray-400 font-medium">Khóa Bootcamp K42 - Lộ trình 8 tuần</p>
              </div>
              <div className="px-4 py-2 bg-white/10 text-white text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
                Đã đạt mục tiêu
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-gray-400 font-bold uppercase tracking-widest mb-2 text-sm">Điểm Overall</p>
                <div className="text-[15vw] md:text-[10vw] font-black leading-none tracking-tighter text-[var(--cta-color)] drop-shadow-2xl">
                  <CountUp value={8.5} />
                </div>
              </div>
              
              <div className="mb-4 md:mb-8 border-l border-white/20 pl-6">
                <p className="text-2xl font-bold leading-tight max-w-sm">
                  "Tăng <CountUp value={2.0} prefix="+" /> band chỉ sau 8 tuần. Không học vẹt, tư duy phản biện được rèn giũa sắc bén."
                </p>
              </div>
            </div>
          </div>

          {/* Skill Bento 1 - Reading */}
          <div className="md:col-span-5 bg-gray-50 border border-gray-100 p-8 flex flex-col justify-between group">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Kỹ năng Reading</p>
            <div className="flex items-end justify-between mt-4">
              <div className="text-[10vw] md:text-[6vw] font-black leading-none tracking-tighter text-[var(--text-color)] group-hover:scale-105 transition-transform origin-bottom-left">
                <CountUp value={9.0} />
              </div>
              <CheckCircle2 size={32} className="text-[var(--text-color)] mb-2 md:mb-4" />
            </div>
          </div>

          {/* Skill Bento 2 & 3 - Listening & Speaking */}
          <div className="md:col-span-2 md:row-span-1 bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Listening</p>
            <div className="text-5xl font-black tracking-tighter text-[var(--text-color)] mt-4">
              <CountUp value={8.5} />
            </div>
          </div>

          <div className="md:col-span-3 md:row-span-1 bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Speaking & Writing</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-5xl font-black tracking-tighter text-[var(--text-color)]">
                <CountUp value={8.0} />
              </div>
              <span className="text-gray-300 font-light text-4xl">/</span>
              <div className="text-5xl font-black tracking-tighter text-[var(--text-color)]">
                <CountUp value={8.0} />
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
