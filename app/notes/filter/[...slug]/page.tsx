import { fetchNotes, deleteNote } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Note } from "@/types/note";
import { revalidatePath } from "next/cache";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tagFromUrl = slug?.[0];
  const tag = tagFromUrl?.toLowerCase() === "all" ? undefined : tagFromUrl;

  const notes: Note[] = await fetchNotes({ tag });

  async function handleDelete(id: string) {
    "use server";
    try {
      await deleteNote(id);
      revalidatePath("/notes/filter/[...slug]", "page");
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  return (
    <main>
      <NotesClient notes={notes} onDelete={handleDelete} />
    </main>
  );
}
