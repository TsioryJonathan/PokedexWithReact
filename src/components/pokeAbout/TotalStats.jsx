function TotalStats({ stats, totalStats, avgStat, getStatColor }) {
    return (
      <div className="bg-white/10 rounded p-3 space-y-2">
        <div className="flex justify-between text-md text-white/70">
          <span>Total</span>
          <span>{totalStats}</span>
        </div>
        <div className="flex justify-between text-md text-white/70">
          <span>Average</span>
          <span>{avgStat}</span>
        </div>
        <div className="flex gap-2 flex-wrap mt-1">
          {stats.map((s) => (
            <span
              key={s.name}
              className="text-[12px] tracking-wide bg-white/15 px-2 py-1 rounded uppercase flex items-center gap-1"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${getStatColor(s.name)}`} />
              {s.value}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default TotalStats;