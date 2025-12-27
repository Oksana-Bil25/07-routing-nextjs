import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note = await fetchNoteById(id).catch(() => null);

  if (!note) {
    return notFound();
  }

  return (
    <section>
      <h1>{note.title}</h1>
      <div>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
      </div>
    </section>
  );
}
