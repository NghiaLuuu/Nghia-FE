import { motion } from 'framer-motion';
import { Star, Trophy, Target, Sparkles, BookOpen, Mic, Headphones } from 'lucide-react';

const MODULES = [
  { id: 1, title: "Basic Greetings", icon: Mic, color: "from-sky-300 to-blue-500", shadow: "shadow-blue-500/50", progress: 100 },
  { id: 2, title: "Ordering Food", icon: BookOpen, color: "from-amber-300 to-orange-500", shadow: "shadow-orange-500/50", progress: 65 },
  { id: 3, title: "Travel & Directions", icon: Headphones, color: "from-emerald-300 to-teal-500", shadow: "shadow-teal-500/50", progress: 0 },
];

export default function EnglishZone() {
  return (
    <div className="min-h-screen bg-[#f0f5fa] font-sans relative overflow-hidden text-slate-800 selection:bg-indigo-500 selection:text-white">
      
      {/* Playful Floating Background Shapes (3D Neumorphism vibe) */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-tr from-pink-300 to-purple-400 rounded-[40%_60%_70%_30%] blur-2xl opacity-60 mix-blend-multiply"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-[-5%] w-96 h-96 bg-gradient-to-bl from-cyan-300 to-blue-500 rounded-[60%_40%_30%_70%] blur-[80px] opacity-50 mix-blend-multiply pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        {/* Header / Gamified Profile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-white/70 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover rounded-full border-4 border-white" />
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg cursor-pointer"
              >
                <Trophy size={16} className="text-white" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Level 12 Explorer</h1>
              <p className="text-slate-500 font-medium">Keep it up! 450 XP to Next Level</p>
            </div>
          </div>

          {/* Fluid Progress Bar */}
          <div className="w-full md:w-1/3">
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              <span>Current Progress</span>
              <span className="text-indigo-500">65%</span>
            </div>
            <div className="h-6 w-full bg-indigo-100 rounded-full overflow-hidden p-1 shadow-inner relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full relative overflow-hidden"
              >
                {/* Fluid shine effect inside progress bar */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Learning Path - Interactive Badges & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-2 bg-white rounded-full z-0 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-400 to-amber-400 rounded-full"
            />
          </div>

          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const isLocked = mod.progress === 0;
            const isCompleted = mod.progress === 100;

            return (
              <motion.div 
                key={mod.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2, type: "spring", bounce: 0.5 }}
                whileHover={!isLocked ? { y: -10, scale: 1.05 } : {}}
                className={`relative z-10 flex flex-col items-center cursor-pointer ${isLocked ? 'grayscale opacity-70' : ''}`}
              >
                {/* Floating Badge (3D feeling) */}
                <div className="relative group perspective-1000 mb-6">
                  <motion.div 
                    animate={isCompleted ? { y: [0, -10, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx }}
                    className={`w-32 h-32 rounded-[30px] bg-gradient-to-br ${mod.color} p-1 shadow-2xl ${mod.shadow} group-hover:rotate-y-12 transition-transform duration-500 transform-style-3d`}
                  >
                    <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-[26px] border border-white/50 flex flex-col items-center justify-center gap-2 transform translate-z-12">
                      <Icon size={40} className="text-white drop-shadow-md" />
                      {isCompleted && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform rotate-12">
                          <Star size={16} className="text-white" fill="currentColor" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Card Info */}
                <div className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] w-full text-center border border-slate-100 relative overflow-hidden group">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{mod.title}</h3>
                  <div className="text-sm font-semibold text-slate-500 mb-4">Unit {mod.id}</div>
                  
                  {isCompleted ? (
                    <div className="w-full py-3 bg-green-100 text-green-700 font-bold rounded-2xl flex items-center justify-center gap-2">
                      <Target size={18} /> MASTERED
                    </div>
                  ) : isLocked ? (
                    <div className="w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl flex items-center justify-center gap-2">
                      LOCKED
                    </div>
                  ) : (
                    <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 active:scale-95">
                      <Sparkles size={18} /> CONTINUE
                    </button>
                  )}

                  {/* Micro-interaction ring on hover */}
                  {!isLocked && (
                    <div className="absolute inset-0 border-2 border-indigo-400 rounded-3xl scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
