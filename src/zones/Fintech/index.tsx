import { ArrowUpRight, Activity } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TX-99812-ABCD-4412', desc: 'Wire Transfer - Q3 Capital Injection', amount: 45000000.00, status: 'Pending Clearance', date: '2026-09-21' },
  { id: 'TX-99812-EFGH-1123', desc: 'Vendor Payment - AWS Infrastructure', amount: -1250430.50, status: 'Completed', date: '2026-09-20' },
  { id: 'TX-99812-IJKL-9941', desc: 'Payroll Run - APAC Region', amount: -4820100.25, status: 'Completed', date: '2026-09-18' },
];

export default function FintechZone() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#020617] text-slate-50 font-sans p-8">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Tier 1: Total Balance */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <h2 className="text-slate-400 text-sm uppercase tracking-[0.2em] mb-4">Total Consolidated Balance (USD)</h2>
          <div className="flex items-end gap-6">
            <span className="text-7xl font-bold font-mono tracking-tight">$1,284,900,123.45</span>
            <div className="flex items-center gap-1 text-emerald-400 text-xl font-mono mb-2 bg-emerald-400/10 px-3 py-1">
              <ArrowUpRight size={24} />
              +12.4% <span className="text-sm text-emerald-600 ml-2">vs Last Quarter</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tier 2: Chart Area (Abstracted) */}
          <div className="lg:col-span-1 border border-slate-800 bg-[#040b1e] p-6 flex flex-col">
            <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={16} /> Cashflow Trend
            </h3>
            <div className="flex-1 relative flex items-end">
              {/* Fake gradient chart area */}
              <div className="w-full h-48 bg-gradient-to-t from-violet-600/20 to-transparent border-t border-violet-500 relative">
                <div className="absolute -top-1 right-0 w-2 h-2 bg-violet-400"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-mono text-slate-500">
              <span>Q1</span><span>Q2</span><span>Q3 (Current)</span>
            </div>
          </div>

          {/* Tier 3: Transaction Table */}
          <div className="lg:col-span-2 border border-slate-800 bg-[#020617]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="py-4 px-6 font-medium text-slate-400 uppercase tracking-wider text-xs">Transaction ID</th>
                  <th className="py-4 px-6 font-medium text-slate-400 uppercase tracking-wider text-xs">Description</th>
                  <th className="py-4 px-6 font-medium text-slate-400 uppercase tracking-wider text-xs">Status</th>
                  <th className="py-4 px-6 font-medium text-slate-400 uppercase tracking-wider text-xs text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="font-mono text-base">
                {TRANSACTIONS.map((tx, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-5 px-6 text-slate-300">{tx.id}</td>
                    <td className="py-5 px-6 font-sans text-slate-400">{tx.desc}</td>
                    <td className="py-5 px-6">
                      <span className={`px-2 py-1 text-xs uppercase tracking-wider ${tx.status === 'Pending Clearance' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-slate-500'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`py-5 px-6 text-right font-medium tabular-nums ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
