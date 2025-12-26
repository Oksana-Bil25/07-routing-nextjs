"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const CATEGORIES = [
  { name: "All Notes", slug: "all" },
  { name: "Work", slug: "work" },
  { name: "Personal", slug: "personal" },
  { name: "Todo", slug: "todo" },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>
      <ul className={styles.list}>
        {CATEGORIES.map((cat) => {
          const href =
            cat.slug === "all" ? "/notes/filter" : `/notes/filter/${cat.slug}`;
          const active = pathname === href;

          return (
            <li key={cat.slug}>
              <Link
                href={href}
                className={active ? styles.active : styles.link}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
