export default function Card(data) {
  return (
    <div className="flex items-center px-4 py-1 text-sm border rounded-full border-border gap-x-2 hover:bg-secondary">
      <data.icon size={28} />
      {data.name}
    </div>
  );
}