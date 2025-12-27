import Link from "next/link";
import styles from "./Sidebar.module.css";
// Імпортуємо функцію з твого API файлу
import { fetchNotes } from "@/lib/api";

// Описуємо структуру нотатки (Note), щоб прибрати помилку "Cannot find name 'Note'"
interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export default async function SidebarNotes() {
  // Тепер TypeScript знає, що таке fetchNotes і Note
  const notes: Note[] = await fetchNotes().catch(() => []);

  // 1. Отримуємо теги з існуючих нотаток
  const dynamicTags = notes.map((n) => n.tag);

  // 2. Додаємо "All Notes" та "Meeting" вручну в масив
  const manualTags = ["All Notes", "Meeting", ...dynamicTags];

  // 3. Робимо список унікальним (щоб не було два "Work")
  const tags = Array.from(new Set(manualTags));

  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={
                tag === "All Notes"
                  ? "/notes/filter"
                  : `/notes/filter?tag=${tag}`
              }
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
