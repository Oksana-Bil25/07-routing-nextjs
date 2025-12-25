"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNoteModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Повертаємось назад, закриваючи модалку
  };

  return (
    <Modal onClose={handleClose}>
      <div style={{ padding: "20px", color: "black" }}>
        <h2 style={{ marginBottom: "20px" }}>Create New Note</h2>
        {/* Передаємо закриття у onSubmit, щоб після збереження модалка зникла */}
        <NoteForm onSubmit={handleClose} />
      </div>
    </Modal>
  );
}
