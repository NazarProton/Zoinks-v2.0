import ManualItem from './ManualItem';

export default function ManualBlock() {
  return (
    <div
      id="manual"
      className="bg-whiteDarkest flex flex-col items-center px-10 pc630:px-20 w-full py-8"
    >
      <ManualItem manualType="Launch App" />
      <ManualItem manualType="Get Zoinks" />
      <ManualItem manualType="Make Snacks" />
      <ManualItem manualType="Earn more" />
    </div>
  );
}
