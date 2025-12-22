"use client";

import css from "./NoteDetails.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id && id !== "create",
  });

  if (id === "create") {
    return null;
  }

  if (isLoading) {
    return (
      <div className={css.container}>
        <p>Loading note details...</p>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className={css.container}>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back to list
        </button>
        <p>Note not found or an error occurred.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={() => router.back()}>
        ← Back to list
      </button>

      <article className={css.item}>
        <header className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </header>

        <section className={css.content}>{note.content}</section>

        <footer className={css.date}>
          <span>Last updated: </span>
          {new Date(note.updatedAt || note.createdAt).toLocaleString()}
        </footer>
      </article>
    </div>
  );
}
