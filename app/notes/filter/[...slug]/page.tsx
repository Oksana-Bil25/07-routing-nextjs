import { Suspense } from "react";
import NotesClient from "./Notes.client";

interface FilteredNotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;

  const tag = slug && slug.length > 0 ? slug[0] : "all";

  return (
    <Suspense fallback={<div>Loading notes...</div>}>
      <NotesClient key={tag} tag={tag} />
    </Suspense>
  );
}
