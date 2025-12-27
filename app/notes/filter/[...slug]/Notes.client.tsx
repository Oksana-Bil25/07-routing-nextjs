"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Note } from "@/types/note";
import { createNote } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./NotesPage.module.css";

const NOTES_PER_PAGE = 9;

interface NotesClientProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NotesClient({
  notes = [],
  onDelete,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter(
      (note: Note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);

  const activePage =
    currentPage > totalPages ? Math.max(1, totalPages) : currentPage;

  const paginatedNotes = useMemo(() => {
    const start = (activePage - 1) * NOTES_PER_PAGE;
    return filteredNotes.slice(start, start + NOTES_PER_PAGE);
  }, [filteredNotes, activePage]);

  const handleFormSubmit = async (data: Partial<Note>) => {
    try {
      await createNote(data);
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create note:", error);
      alert("Помилка при збереженні нотатки");
    }
  };

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
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.button}
          >
            Create note +
          </button>
        </div>
      </header>

      <NoteList notes={paginatedNotes} onDelete={onDelete} />

      {isModalOpen && (
        <div className={styles.backdrop} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <NoteForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
