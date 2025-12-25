// 1. Імпортуємо САМ КОМПОНЕНТ (вкажіть правильний шлях до .tsx файлу)
import SidebarNotes from "./@sidebar/SidebarNotes";

// 2. Імпортуємо СТИЛІ для лейауту (це у вас вже було вірно)
import styles from "./LayoutNotes.module.css";
import Link from "next/link";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.blackSidebar}>
        {/* Тепер це спрацює, бо SidebarNotes — це компонент, а не об'єкт стилів */}
        <SidebarNotes />

        <Link href="/notes/create">
          <button className={styles.createButton}>+ Create New Note</button>
        </Link>
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
