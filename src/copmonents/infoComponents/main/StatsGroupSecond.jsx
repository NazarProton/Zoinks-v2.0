import StatsBlockSecond from './StatsBlockSecond';

const StatsGroupSecond = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <StatsBlockSecond type={'ZOINKS'} />
      <StatsBlockSecond type={'SNACKS'} />
      <StatsBlockSecond type={'LUNCHBOX'} />
    </div>
  );
};

export default StatsGroupSecond;
