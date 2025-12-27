import axios from "axios";
import { Note } from "@/types/note";

export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  tag?: string;
  search?: string;
  page?: number;
}

const ALLOWED_TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<Note[]> => {
  const { tag, search, page = 1 } = params;

  const queryParams: Record<string, string | number> = {
    page: Number(page),
  };

  if (tag) {
    const cleanTag =
      tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1).toLowerCase();

    if (ALLOWED_TAGS.includes(cleanTag)) {
      queryParams.tag = cleanTag;
    }
  }

  if (search && search.trim().length > 0) {
    queryParams.search = search.trim();
  }

  try {
    const response = await noteInstance.get<{ notes: Note[] }>("/notes", {
      params: queryParams,
    });
    return response.data.notes || [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error Status:", error.response?.status);
      console.error("API Error Data:", error.response?.data);
    }
    return [];
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await noteInstance.delete(`/notes/${id}`);
};

export const updateNote = async (
  id: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await noteInstance.patch<Note>(`/notes/${id}`, noteData);
  return response.data;
};
