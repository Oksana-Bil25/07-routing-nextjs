import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // 1. Prefetching: завантажуємо дані в кеш на сервері
  // Це забезпечує миттєве відображення даних при прямому переході за URL
  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    return notFound();
  }

  const state = dehydrate(queryClient);

  // Перевіряємо чи нотатка взагалі існує в кеші
  if (!state.queries.length) return notFound();

  return (
    // 2. Гідрація: передаємо кеш у клієнтський компонент
    <HydrationBoundary state={state}>
      {/* 3. Передаємо ТІЛЬКИ id, як ми і домовилися в NoteDetailsClient */}
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
