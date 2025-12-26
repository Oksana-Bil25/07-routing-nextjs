import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: {
    id: string;
  };
};

export default async function NotePage({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return <NoteDetailsClient note={note} />;
}
