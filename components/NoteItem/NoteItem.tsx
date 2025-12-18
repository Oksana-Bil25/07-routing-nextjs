"use client";

import Link from "next/link";
import css from "./NoteItem.module.css";
import type { Note } from "@/types/note";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem = ({ note, onDelete }: NoteItemProps) => {
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>
        {note.content.length > 100
          ? `${note.content.substring(0, 100)}...`
          : note.content}
      </p>

      <div className={css.footer}>
        {note.tag && <span className={css.tag}>{note.tag}</span>}

        <div className={css.actions}>
          <Link href={`/notes/${note.id}`} className={css.detailsLink}>
            View details
          </Link>

          <button
            className={css.button}
            onClick={(e) => {
              e.preventDefault();
              onDelete(note.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
