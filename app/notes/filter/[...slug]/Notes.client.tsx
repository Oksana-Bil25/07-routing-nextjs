"use client";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import styles from "./NotesPage.module.css";
import { Note } from "@/types/note";

export default function NotesClient({
  notes = [],
  onDelete,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <div className={styles.leftGroup}>
          <input
            type="text"
            placeholder="Search notes"
            className={styles.searchInput}
          />
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>←</button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>→</button>
          </div>
        </div>

        <Link href="/notes/create" className={styles.button}>
          Create note +
        </Link>
      </header>

      <NoteList notes={notes} onDelete={onDelete} />
    </div>
  );
}
