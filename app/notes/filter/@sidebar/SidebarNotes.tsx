// app/notes/filter/@sidebar/page.tsx або окремий компонент SidebarNotes
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../LayoutNotes.module.css"; // Шлях до твоїх стилів

const CATEGORIES = [
  "All notes",
  "Meeting",
  "Personal",
  "Work",
  "Todo",
  "Shopping",
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav}>
      {CATEGORIES.map((cat) => {
        // Логіка для "All notes" -> slug "all", для інших -> назва тегу
        const slug = cat === "All notes" ? "all" : cat.toLowerCase();
        const href = `/notes/filter/${slug}`;
        const isActive = pathname.includes(slug);

        return (
          <Link
            key={cat}
            href={href}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            {cat}
          </Link>
        );
      })}
    </nav>
  );
}
