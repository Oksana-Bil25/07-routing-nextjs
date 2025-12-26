"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import { Note } from "@/types/note";

interface NotesClientProps {
  category?: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const normalizedCategory = category === "all" ? undefined : category;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", normalizedCategory ?? "all"],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        category: normalizedCategory,
      }),
    staleTime: 1000 * 60,
  });

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <p style={{ color: "red" }}>Error loading notes.</p>;

  const notes: Note[] = Array.isArray(data) ? data : data?.notes ?? [];

  return (
    <div>
      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}
    </div>
  );
}
