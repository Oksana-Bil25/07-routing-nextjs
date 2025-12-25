import SidebarNotes from "./SidebarNotes";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function SidebarPage() {
  return (
    <>
      <SidebarNotes />

      <Link href="/notes/create">
        <button className={styles.createButton}>+ Create New Note</button>
      </Link>
    </>
  );
}
