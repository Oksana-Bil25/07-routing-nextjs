"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    onError: () => toast.error("Failed to delete note."),
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  if (notes.length === 0) {
    return <p className={css.noNotes}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default NoteList;
