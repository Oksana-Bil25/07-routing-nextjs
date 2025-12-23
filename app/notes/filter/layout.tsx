import styles from "./FilterLayout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.filterWrapper}>
      <aside className={styles.sidebarContainer}>{sidebar}</aside>
      <main className={styles.notesContainer}>{children}</main>
    </div>
  );
}
