import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

  // Передзавантаження даних на сервері
  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <main style={{ padding: "20px" }}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Клієнтський компонент, який відображає дані нотатки */}
        <NotePreviewClient id={params.id} />
      </HydrationBoundary>
    </main>
  );
}
