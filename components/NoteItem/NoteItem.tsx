"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  return (
    <div className={css.listItem}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>

        <div className={css.actions}>
          {note._id ? (
            <Link href={`/notes/${note._id}`} className={css.detailsLink}>
              View details
            </Link>
          ) : (
            <span style={{ color: "red" }}>No ID</span>
          )}

          <button
            className={css.button}
            onClick={() => note._id && onDelete(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
