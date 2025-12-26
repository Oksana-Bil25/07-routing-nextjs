import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to NoteHub</h1>

      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Link href="/" className={styles.createButton}>
          Home
        </Link>
        <Link href="/notes/filter" className={styles.createButton}>
          Notes
        </Link>
      </div>

      <p className={styles.description}>
        NoteHub is a simple and efficient application designed for managing
        personal notes.
      </p>
    </main>
  );
}
