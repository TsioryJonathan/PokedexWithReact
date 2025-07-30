import MiniStat from "../MiniStat";

function StatsGrid({ captureRate, baseHappiness, baseExp, hatchSteps, hatchCycles }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MiniStat label="Capture Rate" value={captureRate} />
      <MiniStat label="Base Happiness" value={baseHappiness} />
      <MiniStat label="Base Exp" value={baseExp} />
      <MiniStat label="Hatch Steps" value={hatchSteps} hint={`${hatchCycles} cycles`} />
    </div>
  );
}

export default StatsGrid;