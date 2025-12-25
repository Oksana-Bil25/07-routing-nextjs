"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

interface NotePageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  if (isLoading) return <LoadingIndicator />;
  if (!note) return <p>Note not found</p>;

  return <NotePreviewClient id={params.id} />;
}
