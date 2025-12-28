import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  // Визначаємо тег (логіка лишається та сама)
  const tagFromUrl = slug?.[0];
  const tag = tagFromUrl?.toLowerCase() === "all" ? undefined : tagFromUrl;

  // 1. Створюємо екземпляр QueryClient
  const queryClient = new QueryClient();

  // 2. Попередньо завантажуємо дані в кеш на сервері
  // ВАЖЛИВО: queryKey має на 100% збігатися з тим, що в NotesClient
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1], // Тег, пустий пошук, 1 сторінка
    queryFn: () => fetchNotes({ tag, search: "", page: 1 }),
  });

  return (
    <main>
      {/* 3. Обгортаємо в HydrationBoundary і передаємо стан кешу */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* 4. Передаємо в клієнт ТІЛЬКИ тег. 
            Він сам забере нотатки з кешу за ключем ["notes", tag, "", 1] */}
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </main>
  );
}
