export default function Card(data) {
  return (
    <div className="px-2 py-1 border rounded-lg hover:bg-black hover:text-white hover:border-transparent border-border bg-secondary">
      <data.icon size={32} />
    </div>
  );
}