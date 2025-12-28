"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api"; // Твоя функція з api.ts
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string; // Тепер приймаємо тільки ID (вимога ментора)
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  // 1. Отримуємо дані з кешу.
  // Оскільки ми зробили prefetchQuery на сервері з ключем ["note", id],
  // цей запит виконається миттєво без "крутілочки" завантаження.
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div className={css.container}>Loading...</div>;
  if (!note) return <div className={css.container}>Note not found.</div>;

  return (
    <div className={css.container}>
      {/* Кнопка "Назад" тепер працює як закриття модалки */}
      <button onClick={() => router.back()} className={css.backBtn}>
        ← Back
      </button>

      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>Tag: {note.tag}</span>
      </div>
    </div>
  );
}
