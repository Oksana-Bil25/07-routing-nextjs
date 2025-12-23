"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <LoadingIndicator />}

        {isError && <p className={css.error}>Failed to load note details.</p>}

        {note && (
          <article className={css.note}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.category}>
              Category: <span>{note.tag}</span>
            </p>
            <div className={css.content}>{note.content}</div>
          </article>
        )}

        <button className={css.closeBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
