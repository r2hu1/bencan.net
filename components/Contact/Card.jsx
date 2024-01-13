import Link from 'next/link';

export default function Card(data) {
  return (
    <Link className="px-2 py-1 border rounded-lg hover:bg-black hover:text-white hover:border-transparent border-neutral-200 bg-neutral-100" href={data.link}>
      <data.icon size={32} />
    </Link>
  );
}