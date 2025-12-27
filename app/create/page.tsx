"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NoteForm, { NoteFormData } from "@/components/NoteForm/NoteForm";
import { createNote } from "@/lib/api";
import styles from "./CreatePage.module.css"; // Тепер ми його використаємо!

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNote = async (data: NoteFormData) => {
    setIsLoading(true);
    try {
      await createNote(data);
      router.push("/notes/filter/all");
      router.refresh();
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося створити нотатку.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Використовуємо styles.container, щоб прибрати помилку ESLint */
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Create New Note</h1>
        <NoteForm
          onSubmit={handleCreateNote}
          isLoading={isLoading}
          onClose={() => router.back()}
        />
      </div>
    </div>
  );
}
