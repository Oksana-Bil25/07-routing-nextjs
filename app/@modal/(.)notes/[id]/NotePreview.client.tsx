"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import styles from "./NotePreview.module.css";
import { Note } from "@/types/note";

export default function NotePreviewClient({ id }: { id: string }) {
  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <LoadingIndicator />;
  if (!note) return <p>Note not found</p>;

  return (
    <div className={styles.container}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
