"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api";
import { useDebounce } from "@/components/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./NotesPage.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, currentPage],
    queryFn: () =>
      fetchNotes({
        tag,
        search: debouncedSearch,
        page: currentPage,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className={styles.app}>Loading...</div>;
  if (isError) return <div className={styles.app}>Error loading notes.</div>;

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <div className={styles.leftGroup}>
          <input
            type="text"
            placeholder="Search notes"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.paginationWrapper}>
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className={styles.buttonWrapper}>
          <Link href="/create" className={styles.button}>
            Create note +
          </Link>
        </div>
      </header>

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      ) : (
        <p className={styles.empty}>No notes found.</p>
      )}
    </div>
  );
}
