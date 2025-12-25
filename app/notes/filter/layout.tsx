import styles from "./LayoutNotes.module.css";
import SidebarNotes from "./@sidebar/SidebarNotes";
import Link from "next/link";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.blackSidebar}>
        <SidebarNotes />

        <Link href="/notes/create">
          <button className={styles.createButton}>+ Create New Note</button>
        </Link>
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
