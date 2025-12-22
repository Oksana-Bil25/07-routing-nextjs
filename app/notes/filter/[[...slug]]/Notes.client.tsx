"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag = "all" }: NotesClientProps) {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchText, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, page, tag }],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, tag }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <header
        className={styles.toolbar}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
        }}
      >
        <SearchBox value={searchText} onChange={handleSearchChange} />

        <Link
          href="/notes/create"
          className={styles.createBtn}
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Create note +
        </Link>
      </header>

      {data && data.totalPages > 1 && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={(p: number) => setPage(p)}
          />
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>Error loading notes.</p>}

      {data && <NoteList notes={data.notes} />}
    </div>
  );
}
