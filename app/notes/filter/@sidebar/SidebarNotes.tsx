import Link from "next/link";
import styles from "./Sidebar.module.css";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";

export default async function SidebarNotes() {
  // 1. Отримуємо ВСІ нотатки (без фільтрів), щоб витягнути з них теги
  const allNotes: Note[] = await fetchNotes().catch(() => []);

  // 2. Створюємо набір унікальних тегів, які існують у базі
  const existingTags = allNotes
    .map((note) => note.tag) // Беремо тільки поле tag
    .filter((tag): tag is string => !!tag) // Відсікаємо порожні теги
    .reduce((acc: string[], tag: string) => {
      // Робимо першу літеру великою для одноманітності
      const formatted =
        tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
      if (!acc.includes(formatted)) {
        acc.push(formatted);
      }
      return acc;
    }, []);

  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.list}>
        {/* Пункт "Усі нотатки" є завжди */}
        <li key="all">
          <Link href="/notes/filter/all" className={styles.link}>
            All Notes
          </Link>
        </li>

        {/* Виводимо тільки ті теги, які є в нотатках */}
        {existingTags.sort().map((tag) => (
          <li key={tag}>
            <Link
              href={`/notes/filter/${tag.toLowerCase()}`}
              className={styles.link}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
