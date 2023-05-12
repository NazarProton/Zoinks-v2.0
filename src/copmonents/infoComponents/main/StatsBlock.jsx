import StatsItem from '../../contextComponents/main/StatsItem';

export default function StatsBlock() {
  return (
    <div className="grid grid-cols-1 justify-items-center pc540:grid-cols-2 pc990:grid-cols-4 gap-4 pc540:gap-8 border-t-2 border-solid border-whiteDarkest">
      <StatsItem statsType="TVL" />
      <StatsItem statsType="PVL" />

      <StatsItem statsType="LPI" />

      <StatsItem statsType="TNP" />
    </div>
  );
}
