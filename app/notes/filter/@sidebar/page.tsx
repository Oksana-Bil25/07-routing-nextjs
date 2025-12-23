"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Sidebar.module.css";

const CATEGORIES = [
  { name: "All Notes", slug: "all" },
  { name: "Work", slug: "Work" },
  { name: "Personal", slug: "Personal" },
  { name: "Todo", slug: "Todo" },
  { name: "Meeting", slug: "Meeting" },
  { name: "Shopping", slug: "Shopping" },
];

export default function SidebarPage() {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Categories</h2>
      <nav>
        <ul className={css.list}>
          {CATEGORIES.map((cat) => {
            const href =
              cat.slug === "all"
                ? "/notes/filter"
                : `/notes/filter/${cat.slug}`;

            const isActive = pathname === href;

            return (
              <li key={cat.slug} className={css.item}>
                <Link
                  href={href}
                  className={isActive ? css.activeLink : css.link}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
