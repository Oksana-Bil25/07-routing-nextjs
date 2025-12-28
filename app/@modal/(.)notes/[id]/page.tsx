import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "../../../notes/[id]/NoteDetails.client";
import styles from "../../../../components/Modal/Modal.module.css";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const state = dehydrate(queryClient);

  if (!state.queries.length) {
    return notFound();
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBody}>
        <HydrationBoundary state={state}>
          <NoteDetailsClient id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
