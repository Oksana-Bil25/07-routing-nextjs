import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NoteHub
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Головна
          </Link>
          <Link
            href="/notes"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Нотатки
          </Link>
        </div>
      </nav>
    </header>
  );
}
