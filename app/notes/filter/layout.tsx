import styles from "./FilterLayout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.blackSidebar}>{sidebar}</aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
