import axios from "axios";
import { notFound } from "next/navigation";
import NoteDetailsClient from "../../../notes/[id]/NoteDetails.client";
import { Note } from "@/types/note";
import styles from "../../../../app/notes/filter/[...slug]/NotesPage.module.css";

const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function fetchNoteById(id: string): Promise<Note | null> {
  try {
    const response = await noteInstance.get<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) return notFound();

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <NoteDetailsClient note={note} />
      </div>
    </div>
  );
}
