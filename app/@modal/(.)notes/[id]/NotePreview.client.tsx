import axios from "axios";
import { Note } from "@/types/note";

// Створення екземпляру Axios
export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

// Додавання токену авторизації через інтерцептор
noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

/**
 * Отримання списку нотаток з фільтрацією
 */
export const fetchNotes = async ({
  tag,
  search,
  page = 1,
}: FetchNotesParams = {}): Promise<Note[]> => {
  const queryParams: Record<string, string | number> = { page };

  // Обробка тегів (ігноруємо "all", форматуємо інші)
  if (tag && tag.toLowerCase() !== "all") {
    const formattedTag =
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    queryParams.tag = formattedTag;
  }

  if (search && search.trim() !== "") {
    queryParams.search = search.trim();
  }

  const response = await noteInstance.get<{ notes: Note[] }>("/notes", {
    params: queryParams,
  });

  return response.data.notes;
};

/**
 * Отримання ОДНІЄЇ нотатки (виправляє помилку в NotePreview та [id]/page)
 */
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

/**
 * Створення нотатки (виправляє помилку в create/page)
 */
export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

/**
 * Видалення нотатки
 */
export const deleteNote = async (id: string): Promise<void> => {
  await noteInstance.delete(`/notes/${id}`);
};

/**
 * Оновлення нотатки
 */
export const updateNote = async (
  id: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await noteInstance.patch<Note>(`/notes/${id}`, noteData);
  return response.data;
};
