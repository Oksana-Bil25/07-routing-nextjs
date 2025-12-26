"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./LayoutNotes.module.css";
import SidebarNotes from "./@sidebar/page";
import Link from "next/link";

const queryClient = new QueryClient();

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.layoutContainer}>
        <aside className={styles.blackSidebar}>
          <SidebarNotes />
          <Link href="/notes/create">
            <button className={styles.createButton}>+ Create New Note</button>
          </Link>
        </aside>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </QueryClientProvider>
  );
}
