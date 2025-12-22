import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";

// --- Типи ---
interface RawNote {
  _id?: string;
  title: string;
  content: string;
  tag?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Можливі теги
const validTags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Health",
  "Meeting",
  "Shopping",
];
const parseTag = (tag?: string): NoteTag => {
  if (tag && validTags.includes(tag as NoteTag)) return tag as NoteTag;
  return "Todo";
};

// --- Авторизація ---
const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API Функції ---

// Логін (отримання токена)
export const login = async (email: string, password: string): Promise<void> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  const { token } = response.data;
  localStorage.setItem("token", token);
};

// Отримати всі нотатки
export const fetchNotes = async ({
  search,
  page,
  tag,
}: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await apiClient.get<{
    notes: RawNote[];
    totalPages?: number;
  }>("/notes", {
    params: tag === "all" ? { search, page } : { search, page, tag },
  });

  const data = response.data;

  const notesWithId: Note[] = data.notes.map((note, i) => ({
    _id: note._id ?? `${note.title}-${i}-${Date.now()}`,
    title: note.title,
    content: note.content,
    tag: parseTag(note.tag),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updatedAt ?? new Date().toISOString(),
  }));

  return {
    notes: notesWithId,
    totalPages: data.totalPages ?? 1,
  };
};

// Отримати одну нотатку по id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await apiClient.get<RawNote>(`/notes/${id}`);
  const note = response.data;
  return {
    _id: note._id ?? `${note.title}-${Date.now()}`,
    title: note.title,
    content: note.content,
    tag: parseTag(note.tag),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updatedAt ?? new Date().toISOString(),
  };
};

// Створити нотатку
export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await apiClient.post<RawNote>("/notes", noteData);
  const note = response.data;
  return {
    _id: note._id ?? `${note.title}-${Date.now()}`,
    title: note.title,
    content: note.content,
    tag: parseTag(note.tag),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updatedAt ?? new Date().toISOString(),
  };
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<void> => {
  await apiClient.delete(`/notes/${id}`);
};

// Оновити нотатку
export const updateNote = async (
  id: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await apiClient.put<RawNote>(`/notes/${id}`, noteData);
  const note = response.data;
  return {
    _id: note._id ?? `${note.title}-${Date.now()}`,
    title: note.title,
    content: note.content,
    tag: parseTag(note.tag),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updatedAt ?? new Date().toISOString(),
  };
};
