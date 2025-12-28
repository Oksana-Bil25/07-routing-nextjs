"use client";

import React from "react";
import NoteForm, { NoteFormData } from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./CreatePage.module.css";

export default function CreateNotePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClose = () => {
    router.back();
  };

  const handleCreate = async (data: NoteFormData) => {
    try {
      await createNote(data);

      queryClient.invalidateQueries({ queryKey: ["notes"] });

      router.refresh();

      router.back();
    } catch (error) {
      console.error("Помилка при створенні:", error);
    }
  };

  return (
    <Modal onClose={handleClose}>
      <main className={styles.container}>
        <NoteForm onSubmit={handleCreate} onClose={handleClose} />
      </main>
    </Modal>
  );
}
