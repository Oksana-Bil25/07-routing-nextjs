import styles from "./LayoutNotes.module.css";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
