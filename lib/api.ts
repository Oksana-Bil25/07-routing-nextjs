import axios from "axios";
import { Note } from "@/types/note";

// 1. Створення екземпляру Axios з базовим URL
export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

// 2. Інтерцептор для додавання токену авторизації
noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Інтерфейс для параметрів запиту
export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

// 4. Отримання списку нотаток (з фільтрацією по тегу)
export const fetchNotes = async ({
  tag,
  search,
  page,
}: FetchNotesParams = {}) => {
  const response = await noteInstance.get<{ notes: Note[] }>("/notes", {
    params: {
      tag: tag === "all" ? undefined : tag,
      search,
      page,
    },
  });
  return response.data.notes;
};

// 5. Отримання однієї нотатки за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

// 6. Видалення нотатки (те, чого не вистачало)
export const deleteNote = async (id: string): Promise<void> => {
  await noteInstance.delete(`/notes/${id}`);
};

// 7. Створення нової нотатки
export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

// 8. Оновлення існуючої нотатки
export const updateNote = async (
  id: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await noteInstance.patch<Note>(`/notes/${id}`, noteData);
  return response.data;
};
