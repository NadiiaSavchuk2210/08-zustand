import { NoteTag } from "./types/note";

export const API_BASE_URL = "https://notehub-public.goit.study/api";

export const PAGINATION_CONFIG = {
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 1,
  nextLabel: "→",
  previousLabel: "←",
};

export const NOTE_TAGS: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];
