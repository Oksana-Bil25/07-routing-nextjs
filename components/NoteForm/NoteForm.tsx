"use client";

import { useForm } from "react-hook-form";
import css from "./NoteForm.module.css";

export interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose?: () => void;
  onSubmit: (data: NoteFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<NoteFormData>;
}

const NoteForm = ({
  onClose,
  onSubmit,
  isLoading,
  defaultValues,
}: NoteFormProps) => {
  const { register, handleSubmit } = useForm<NoteFormData>({
    defaultValues,
  });

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Кнопка-хрестик: рендериться, якщо передано функцію закриття */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close"
        >
          ×
        </button>
      )}

      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          placeholder="Enter title..."
          className={css.input}
          {...register("title", { required: "Title is required" })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          placeholder="Write your note here..."
          className={css.textarea}
          {...register("content", { required: "Content is required" })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Tags</label>
        <select className={css.select} {...register("tag")}>
          <option value="Todo">Todo</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>

      <div className={css.actions}>
        {onClose && (
          <button type="button" onClick={onClose} className={css.buttonCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={css.buttonSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
