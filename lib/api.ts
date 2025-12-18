import axios from "axios";
import type { Note, NoteFormData } from "../types/note";
import type { FetchNotesResponse } from "../types/response";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

if (TOKEN) {
  api.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
} else {
  console.warn("NEXT_PUBLIC_NOTEHUB_TOKEN is not set. API calls may fail..");
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: params,
  });
  return response.data;
};

export const createNote = async (data: NoteFormData): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
