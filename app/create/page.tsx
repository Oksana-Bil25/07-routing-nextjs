"use client";

import React from "react";
import NoteForm, { NoteFormData } from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query"; // Додай для оновлення списку
import styles from "./CreatePage.module.css";

export default function CreateNotePage() {
  const router = useRouter();
  const queryClient = useQueryClient(); // Клієнт для скидання кешу

  const handleClose = () => {
    // router.back() просто закриває модалку і повертає тебе туди, де ти була
    router.back();
  };

  const handleCreate = async (data: NoteFormData) => {
    try {
      await createNote(data);

      // Обов'язково оновлюємо кеш React Query, щоб нова нотатка з'явилася
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      router.refresh(); // Для серверних компонентів

      // Замість push("/") або push("/notes"), використовуємо back()
      // Це закриває модалку без помилки 404
      router.back();
    } catch (error) {
      console.error("Помилка при створенні:", error);
    }
  };

  return (
    <Modal onClose={handleClose}>
      <main className={styles.container}>
        {/* Додай заголовок тут, щоб він був у білому вікні */}
        <NoteForm onSubmit={handleCreate} onClose={handleClose} />
      </main>
    </Modal>
  );
}
