import axios from "axios";
import { Note } from "@/types/note";

// 1. Твій екземпляр
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
  search?: string;
  page?: number;
  tag?: string;
}

// 2. Твій fetchNotes (повертаємо як було + захист від 400)
export const fetchNotes = async ({
  tag,
  search,
  page = 1,
}: FetchNotesParams = {}): Promise<Note[]> => {
  const queryParams: Record<string, string | number> = { page };

  if (tag && tag.toLowerCase() !== "all") {
    const formattedTag =
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    queryParams.tag = formattedTag;
  }

  // ПРАВКА ТУТ: додаємо search тільки якщо він реально є і не порожній
  if (search && search.trim() !== "") {
    queryParams.search = search.trim();
  }

  const response = await noteInstance.get<{ notes: Note[] }>("/notes", {
    params: queryParams,
  });
  return response.data.notes;
};

// 3. Твій fetchNoteById
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

// 4. Твій createNote
export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

// 5. Твій deleteNote
export const deleteNote = async (id: string): Promise<void> => {
  await noteInstance.delete(`/notes/${id}`);
};

// 6. Твій updateNote
export const updateNote = async (
  id: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await noteInstance.patch<Note>(`/notes/${id}`, noteData);
  return response.data;
};
