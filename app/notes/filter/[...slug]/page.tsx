import NotesClient from "./Notes.client";
import { fetchNotes, deleteNote } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { Note } from "@/types/note"; // Переконайся, що цей шлях правильний

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  // 1. РОЗГОРТАЄМО PARAMS (Виправляє помилку Next.js 15)
  const { slug } = await params;

  // Визначаємо тег: якщо "all", то завантажуємо все
  const currentTag = slug?.[0] === "all" ? "" : slug?.[0] || "";

  // 2. ДОДАЄМО ТИП ДЛЯ notes (Виправляє помилки 7034 та 7005)
  let notes: Note[] = [];

  try {
    const fetchedData = await fetchNotes(currentTag ? { tag: currentTag } : {});
    // Перевіряємо, чи прийшов масив
    notes = Array.isArray(fetchedData) ? fetchedData : [];
  } catch (error) {
    console.error("Fetch error:", error);
    notes = []; // В разі помилки повертаємо порожній масив, щоб не було 404
  }

  // 3. SERVER ACTION ДЛЯ ВИДАЛЕННЯ
  const handleDelete = async (id: string) => {
    "use server";
    try {
      await deleteNote(id);
      revalidatePath("/notes/filter/[...slug]");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return <NotesClient notes={notes} onDelete={handleDelete} />;
}
