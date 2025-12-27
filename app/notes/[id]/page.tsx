import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import NoteDetailsClient from "./NoteDetails.client";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

// Додаємо Promise для типу params
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Очікуємо розв'язання params
  const { id } = await params;

  // 2. Викликаємо API
  const note: Note | null = await fetchNoteById(id).catch(() => null);

  if (!note) return notFound();

  return <NoteDetailsClient note={note} />;
}
