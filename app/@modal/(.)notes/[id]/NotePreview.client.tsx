"use client";

import { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api";

import styles from "./NotePreview.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  category?: string;
};

type Props = {
  noteId: string;
};

export default function NotePreviewClient({ noteId }: Props) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const getNote = async () => {
      try {
        setLoading(true);
        const data = await fetchNoteById(noteId);
        setNote(data);
      } catch {
        setError(
          "Помилка 401: Перевірте NEXT_PUBLIC_NOTEHUB_TOKEN у файлі .env"
        );
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [noteId]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!note) return <p>Нотатку не знайдено</p>;

  return (
    <article className={styles.note}>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.content}>{note.content}</p>
      {note.category && <span className={styles.badge}>{note.category}</span>}
    </article>
  );
}
