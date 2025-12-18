interface NoteCardProps {
  title: string;
  content: string;
  date: string;
}

export default function NoteCard({ title, content, date }: NoteCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>
      <div className="text-sm text-gray-400 font-medium">{date}</div>
    </div>
  );
}
