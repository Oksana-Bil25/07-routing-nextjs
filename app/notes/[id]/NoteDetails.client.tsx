"use client";

import { useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NoteDetailsClientProps {
  note: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <button onClick={() => router.back()} className={css.backBtn}>
        ← Back
      </button>

      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}>Tag: {note.tag}</p>
    </div>
  );
}
