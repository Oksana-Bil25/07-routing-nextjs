import { fetchNotes, deleteNote } from "@/lib/api";
import NotesClient from "./Notes.client";
import { revalidatePath } from "next/cache";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // 1. Отримуємо slug з параметрів
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  // 2. Визначаємо категорію (перше слово після /filter/)
  const category = slug[0] || "all";

  // 3. Функція видалення (Server Action)
  async function handleDelete(id: string) {
    "use server";
    await deleteNote(id);
    revalidatePath("/notes/filter/[...slug]", "page");
  }

  // 4. Завантажуємо нотатки
  // Якщо category === "all", fetchNotes автоматично це обробить (якщо ви оновили api.ts)
  const notes = await fetchNotes({ tag: category });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <NotesClient notes={notes} onDelete={handleDelete} />
    </div>
  );
}
