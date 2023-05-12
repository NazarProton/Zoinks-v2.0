import Link from 'next/link';

export default function CustomToastWithLink(txHash) {
  return (
    <div className="font-play">
      {'Transaction was '}
      <Link
        className="text-zoinksSolid"
        target="_blank"
        href={`https://bscscan.com/tx/${txHash}`}
      >
        sent
      </Link>
    </div>
  );
}
