import { motion } from 'framer-motion';
import { useState } from 'react';

const TRANSACTIONS = [
  { id: 'TX-99812-ABCD-4412', desc: 'Wire Transfer - Q3 Capital Injection', amount: 45000000.00, status: 'Pending Clearance', date: '2026-09-21' },
  { id: 'TX-99812-EFGH-1123', desc: 'Vendor Payment - AWS Infrastructure', amount: -1250430.50, status: 'Completed', date: '2026-09-20' },
  { id: 'TX-99812-IJKL-9941', desc: 'Payroll Run - APAC Region', amount: -4820100.25, status: 'Completed', date: '2026-09-18' },
  { id: 'TX-99812-MNOP-5512', desc: 'Dividend Distribution', amount: -15000000.00, status: 'Completed', date: '2026-09-15' },
  { id: 'TX-99812-QRST-8821', desc: 'Series B Funding Round', amount: 120000000.00, status: 'Completed', date: '2026-09-10' },
];

export default function FintechZone() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8 md:p-16 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* Tier 1: Total Balance - Extreme Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 mt-12 flex flex-col md:flex-row items-baseline justify-between gap-8 border-b border-white/5 pb-16"
        >
          <div>
            <h2 className="text-white/40 text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Consolidated Global Balance
            </h2>
            <div className="text-[8vw] leading-none font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              $1.28B
            </div>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <div className="text-emerald-400 text-4xl md:text-5xl font-mono tracking-tight font-light flex items-center gap-2">
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.5 }}
              >↑</motion.span>
              12.4%
            </div>
            <div className="text-white/30 text-xs tracking-[0.2em] uppercase mt-2">vs Last Quarter</div>
            
            {/* Minimalist Chart / Sparkline representation */}
            <div className="mt-8 flex items-end gap-1 h-12">
              {[4, 7, 5, 8, 12, 10, 15, 14, 20, 18, 24].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 4}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                  className="w-1.5 bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-sm"
                ></motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tier 3: Transaction Table - "Black Hole" Effect */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white/50 text-xs uppercase tracking-[0.3em]">Recent Transactions</h3>
            <button className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">View Ledger →</button>
          </div>

          <div className="relative" onMouseLeave={() => setHoveredRow(null)}>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/30">
              <div className="col-span-3">Identifier</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3 text-right">Amount (USD)</div>
            </div>

            {/* Table Body */}
            <div className="mt-6 flex flex-col gap-2">
              {TRANSACTIONS.map((tx, idx) => {
                const isHovered = hoveredRow === idx;
                const isFaded = hoveredRow !== null && hoveredRow !== idx;

                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredRow(idx)}
                    className="relative group cursor-pointer"
                  >
                    {/* Hover Glow Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-0`}></div>
                    
                    <div className={`relative z-10 grid grid-cols-12 gap-4 py-6 items-center transition-all duration-500
                      ${isHovered ? 'scale-[1.02] bg-white/[0.02] rounded-xl px-4 -mx-4' : ''}
                      ${isFaded ? 'opacity-20 blur-[2px] scale-[0.98]' : 'opacity-100'}
                    `}>
                      
                      <div className="col-span-3 font-mono text-xs text-white/50 tracking-wider">
                        {tx.id}
                      </div>
                      
                      <div className={`col-span-4 font-sans text-sm tracking-wide ${isHovered ? 'text-white' : 'text-white/70'}`}>
                        {tx.desc}
                      </div>
                      
                      <div className="col-span-2">
                        <span className={`px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-full border 
                          ${tx.status === 'Pending Clearance' 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                            : 'bg-white/5 text-white/40 border-white/5'}`}>
                          {tx.status}
                        </span>
                      </div>
                      
                      <div className={`col-span-3 text-right font-mono text-lg tabular-nums tracking-tighter
                        ${tx.amount > 0 ? 'text-emerald-400' : (isHovered ? 'text-white' : 'text-white/60')}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* The Black Hole Gradient (bottom fade) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

          </div>
        </div>

      </div>
    </div>
  );
}
