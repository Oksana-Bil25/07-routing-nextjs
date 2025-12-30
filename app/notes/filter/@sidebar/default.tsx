import Link from "next/link";
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
  return (
    <nav className={styles.sidebarNav}>
      {CATEGORIES.map((category) => {
        const slug = category === "All notes" ? "all" : category.toLowerCase();
        const href = `/notes/filter/${slug}`;

        return (
          <Link key={category} href={href} className={styles.navItem}>
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
