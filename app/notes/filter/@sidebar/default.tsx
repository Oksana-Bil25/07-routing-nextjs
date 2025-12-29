"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const CATEGORIES = [
  "All notes",
  "Meeting",
  "Personal",
  "Work",
  "Todo",
  "Shopping",
];

export default function SidebarDefault() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav}>
      {CATEGORIES.map((category) => {
        const slug = category === "All notes" ? "all" : category.toLowerCase();
        const href = `/notes/filter/${slug}`;

        const isActive =
          pathname === href || (slug === "all" && pathname === "/notes/filter");

        return (
          <Link
            key={category}
            href={href}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
