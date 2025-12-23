"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";

// Додаємо цей інтерфейс
interface NoteDetailsClientProps {
  id: string;
}

// Вказуємо тип для аргументів компонента
export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <button onClick={() => router.back()} className={css.backBtn}>
        ← Back
      </button>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
    </div>
  );
}
