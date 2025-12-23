import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteInstance.interceptors.request.use((config) => {
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

export const fetchNotes = async ({
  search,
  page,
  tag,
}: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const response = await noteInstance.get("/notes", {
    params: {
      search: search || undefined,
      page: page || 1,
      tag: tag === "all" ? undefined : tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await noteInstance.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await noteInstance.post("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  // Тепер id точно передається в URL
  const response = await noteInstance.delete(`/notes/${id}`);
  return response.data;
};
