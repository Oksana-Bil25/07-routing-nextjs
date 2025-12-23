"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm"; // Переконайтеся, що шлях правильний

export default function CreateNotePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Оновлюємо кеш, щоб нова нотатка з'явилася в списку
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Note</h2>
      <NoteForm
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
