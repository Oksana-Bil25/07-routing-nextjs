"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { NoteFormData } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (createdNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push(`/notes/${createdNote._id}`);
    },
  });

  const onSubmit = (data: NoteFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.field}>
        <label>Title</label>
        <input {...register("title", { required: "Required" })} />
        {errors.title && (
          <span className={css.error}>{errors.title.message}</span>
        )}
      </div>

      <div className={css.field}>
        <label>Content</label>
        <textarea {...register("content", { required: "Required" })} />
        {errors.content && (
          <span className={css.error}>{errors.content.message}</span>
        )}
      </div>

      <div className={css.field}>
        <label>Tag</label>
        <select {...register("tag", { required: true })}>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Todo">Todo</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Create Note"}
      </button>
    </form>
  );
}
