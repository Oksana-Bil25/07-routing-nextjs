import { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span className={styles.tag}>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
}
