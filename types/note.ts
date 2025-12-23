export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Health"
  | "Meeting"
  | "Shopping";

export interface Note {
  id: string; // Поле, яке реально приходить з сервера
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string; // Залишаємо про всяк випадок як необов'язкове
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: NoteTag;
}
