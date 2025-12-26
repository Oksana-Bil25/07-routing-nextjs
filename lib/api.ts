import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});

export const fetchNotes = async ({
  search,
  page = 1,
  category,
}: {
  search?: string;
  page?: number;
  category?: string;
} = {}) => {
  const response = await noteInstance.get("/notes", {
    params: {
      search,
      page,
      category: category === "all" ? undefined : category,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  if (!id) throw new Error("Note id is required");
  const response = await noteInstance.get(`/notes/${id}`);
  return response.data;
};
