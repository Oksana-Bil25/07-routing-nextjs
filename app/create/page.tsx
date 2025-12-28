"use client";

import React from "react";
import NoteForm, { NoteFormData } from "../../components/NoteForm/NoteForm";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./CreatePage.module.css";

export default function CreateNotePage() {
  const router = useRouter();

  const handleCreate = async (data: NoteFormData) => {
    try {
      await createNote(data);
      router.push("/notes");
      router.refresh();
    } catch (error) {
      console.error("Помилка при створенні:", error);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Create a New Note</h1>
      <NoteForm onSubmit={handleCreate} />
    </main>
  );
}
