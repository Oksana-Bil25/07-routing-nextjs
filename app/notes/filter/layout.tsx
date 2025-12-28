// app/notes/filter/layout.tsx
import React from "react";
import styles from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar, // ОБОВ'ЯЗКОВО: використовуємо цей проп
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebarArea}>
        {/* ЗАВДАННЯ 6: Рендеримо слот sidebar, який приходить автоматично */}
        {sidebar}
      </aside>

      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}
