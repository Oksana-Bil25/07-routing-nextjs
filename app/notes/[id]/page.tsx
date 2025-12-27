import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import NoteDetailsClient from "./NoteDetails.client";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note: Note | null = await fetchNoteById(id).catch(() => null);

  if (!note) return notFound();

  return <NoteDetailsClient note={note} />;
}
