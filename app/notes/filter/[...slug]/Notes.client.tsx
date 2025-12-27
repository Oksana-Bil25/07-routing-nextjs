"use client";

import { useState, useMemo } from "react";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import CreatePage from "@/app/create/page";
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
  // 🔹 Стан для відкриття модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔍 1. Фільтрація
  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter(
      (note: Note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  // 🔹 2. Рахуємо сторінки
  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);

  // ✅ Визначаємо активну сторінку
  const activePage =
    currentPage > totalPages ? Math.max(1, totalPages) : currentPage;

  // 🔹 3. Пагінація
  const paginatedNotes = useMemo(() => {
    const start = (activePage - 1) * NOTES_PER_PAGE;
    return filteredNotes.slice(start, start + NOTES_PER_PAGE);
  }, [filteredNotes, activePage]);

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        {/* Блок 1: Пошук (ліворуч) */}
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

        {/* Блок 2: Пагінація (центр) */}
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Блок 3: Кнопка (праворуч) */}
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

      {/* ✅ МОДАЛЬНЕ ВІКНО */}
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
            <CreatePage />
          </div>
        </div>
      )}
    </div>
  );
}
