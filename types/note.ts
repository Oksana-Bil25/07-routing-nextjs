export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Health"
  | "Meeting"
  | "Shopping";

export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: NoteTag;
}
