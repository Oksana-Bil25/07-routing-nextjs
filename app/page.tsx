import Link from "next/link";
import css from "./Home.module.css";

export default function Home() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <Link href="/create" className="create-button">
          + Create New Note
        </Link>
      </div>

      <p className={css.description}>
        NoteHub is a simple and efficient application designed for managing
        personal notes. It helps keep your thoughts organized and accessible in
        one place.
      </p>
      <p className={css.description}>
        The app provides a clean interface for writing, editing, and browsing
        notes.
      </p>
    </main>
  );
}
