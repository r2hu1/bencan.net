import Link from 'next/link';

export default function Card(data) {
  return (
    <Link className="flex items-center p-2 text-sm border rounded-full border-border hover:bg-secondary" href={data.link}>
      <data.icon size={28} />
    </Link>
  );
}