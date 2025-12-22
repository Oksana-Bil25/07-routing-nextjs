import styles from "./LayoutNotes.module.css";
export default function NotesLayout({
  children,
  modal,
  sidebar,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>

      <main className={styles.notesWrapper}>
        {children}
        {modal}
      </main>
    </div>
  );
}
