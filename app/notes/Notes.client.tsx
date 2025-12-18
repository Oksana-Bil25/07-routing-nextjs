"use client";

import css from "./NotesPage.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import useModalControl from "@/components/hooks/useModalControl";
import { fetchNotes } from "@/lib/api";

export default function NotesClient() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTextDebounce] = useDebounce(searchText, 500);
  const { isModalOpen, openModal, closeModal } = useModalControl();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchTextDebounce, currentPage],
    queryFn: () =>
      fetchNotes({ search: searchTextDebounce, page: currentPage }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes && data.notes.length < 1) {
      toast.error("No notes found for your request.");
    }
  }, [data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateTaskButton = () => {
    setCurrentPage(1);
    openModal();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchText} onChange={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleCreateTaskButton}>
          Create note +
        </button>
      </header>

      <Toaster />

      {isError && <ErrorMessage />}

      {isLoading && <LoadingIndicator />}

      {data && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
