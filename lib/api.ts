import axios from "axios";
import { Note } from "@/types/note";

// Екземпляр Axios
export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

// Додавання токену
noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. fetchNotes (для списку)
export const fetchNotes = async (
  params: { tag?: string; search?: string; page?: number } = {}
) => {
  const { tag, search, page = 1 } = params;
  const queryParams: Record<string, string | number> = { page };

  if (tag && tag.toLowerCase() !== "all") {
    const formattedTag =
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    queryParams.tag = formattedTag;
  }

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  const response = await noteInstance.get<{ notes: Note[] }>("/notes", {
    params: queryParams,
  });
  return response.data.notes;
};

// 2. fetchNoteById (ЦЕ ТЕ, ЧОГО НЕ ВИСТАЧАЛО)
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

// 3. createNote (для створення)
export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

// 4. deleteNote (для видалення)
export const deleteNote = async (id: string): Promise<void> => {
  await noteInstance.delete(`/notes/${id}`);
};
