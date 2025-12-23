"use client";

import { useForm } from "react-hook-form";
import css from "./NoteForm.module.css";

interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose?: () => void;
  onSubmit: (data: NoteFormData) => void;
  isLoading?: boolean;
}

const NoteForm = ({ onClose, onSubmit, isLoading }: NoteFormProps) => {
  const { register, handleSubmit } = useForm<NoteFormData>();

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          className={css.input}
          {...register("title", { required: true })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          className={css.textarea}
          {...register("content", { required: true })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Tag</label>
        <select className={css.select} {...register("tag")}>
          <option value="Todo">Todo</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
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
