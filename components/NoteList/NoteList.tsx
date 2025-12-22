"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  // Лог для відстеження проблемних нотаток
  console.log("Notes received:", notes);

  return (
    <ul className={css.list}>
      {notes.map((note, index) => (
        <li key={note._id ?? `${note.title}-${index}`}>
          {/* Якщо note._id немає, не даємо некоректний Link */}
          {note._id ? (
            <NoteItem note={note} onDelete={(id) => mutation.mutate(id)} />
          ) : (
            <div className={css.listItem}>
              <h3 className={css.title}>{note.title || "Untitled"}</h3>
              <p className={css.content}>{note.content || "No content"}</p>
              <p style={{ color: "red" }}>⚠️ Note ID missing!</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
