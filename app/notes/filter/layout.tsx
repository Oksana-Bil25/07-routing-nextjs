"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LayoutNotes.module.css";

const CATEGORIES = [
  "All notes",
  "Meeting",
  "Personal",
  "Work",
  "Todo",
  "Shopping",
];

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebarArea}>
        <nav className={styles.sidebarNav}>
          {CATEGORIES.map((cat) => {
            const slug = cat.toLowerCase();
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
      </aside>
      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}
