import { API_BASE_URL } from "@/constants";
import { NewNoteData, Note } from "@/types/note";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const PER_PAGE = 9;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
  perPage: number = PER_PAGE
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search ? { search } : {}),
      page,
      tag,
      perPage,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (newNote: NewNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
