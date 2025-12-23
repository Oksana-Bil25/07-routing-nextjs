import NoteDetailsClient from "./NoteDetails.client";

// В Next.js 15 params — це Promise
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Тепер помилка "Property id does not exist" зникне
  return <NoteDetailsClient id={id} />;
}
