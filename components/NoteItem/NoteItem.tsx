"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  return (
    <div className={css.listItem}>
      <div className={css.contentWrapper}>
        <h3 className={css.title}>{note.title}</h3>
        {/* Обмежуємо текст, щоб картки були однакового розміру */}
        <p className={css.content}>
          {note.content.length > 120
            ? `${note.content.substring(0, 120)}...`
            : note.content}
        </p>
      </div>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>

        <div className={css.actions}>
          {/* scroll={false} каже Next.js відкрити перехоплений маршрут (модалку) */}
          <Link
            href={`/notes/${note.id}`}
            scroll={false}
            className={css.detailsLink}
          >
            View details
          </Link>

          <button
            className={css.button}
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
