import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const DESTINATION = {
  name: "Bvlgari Resort Bali",
  location: "Uluwatu, Bali, Indonesia",
  rating: 4.9,
  reviews: 1284,
  price: "24.500.000 VND",
  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
  badges: ["Cam kết giá tốt nhất", "Hoàn hủy miễn phí 48h"]
};

export default function TravelZone() {
  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] text-[#2d3748] relative">
      
      {/* Hero Image Section with Whitespace */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-[60vh] lg:h-screen">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={DESTINATION.image} 
          alt={DESTINATION.name} 
          className="w-full h-full object-cover rounded-bl-[120px] shadow-2xl"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-[45vh] lg:pt-32 pb-24 h-full flex flex-col justify-center">
        
        {/* Main Info Box */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-xl max-w-2xl border border-gray-100"
        >
          {/* Trust Badges */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {DESTINATION.badges.map((badge, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#2f855a] bg-[#2f855a]/10 px-3 py-1.5 rounded-full">
                {i === 0 ? <ShieldCheck size={14} /> : <CheckCircle2 size={14} />}
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">{DESTINATION.name}</h1>
          
          <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#2f855a]"/> {DESTINATION.location}</span>
            <span className="flex items-center gap-1 font-bold text-gray-900">
              <Star size={16} fill="#F59E0B" className="text-amber-500" /> 
              {DESTINATION.rating} <span className="font-normal text-gray-500">({DESTINATION.reviews} đánh giá thật)</span>
            </span>
          </div>

          {/* Multi-variant Search / Booking Form */}
          <div className="bg-gray-50 rounded-3xl p-2 flex flex-col md:flex-row gap-2 mb-8">
            <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Nhận phòng - Trả phòng</span>
                <span className="font-bold text-sm">12 thg 10 - 15 thg 10</span>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <Users className="text-gray-400" size={20} />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Khách & Phòng</span>
                <span className="font-bold text-sm">2 người lớn, 1 phòng</span>
              </div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">Giá mỗi đêm từ</p>
              <p className="text-3xl font-black text-[#2f855a]">{DESTINATION.price}</p>
            </div>
            <button className="bg-[#2f855a] text-white h-14 px-8 rounded-full font-bold flex items-center gap-2 hover:bg-[#276749] transition-all hover:pr-6 group">
              Đặt Ngay 
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
