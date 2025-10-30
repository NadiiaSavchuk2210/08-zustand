import { NewNoteData } from "@/types/note";

type Rule<T> = (value: T) => string | null;

type Schema<T> = {
  [K in keyof T]?: Rule<T[K]>[];
};

const rules = {
  required:
    (message: string): Rule<string> =>
    (value) =>
      value.trim() ? null : message,

  min:
    (length: number, message: string): Rule<string> =>
    (value) =>
      value.trim().length >= length ? null : message,

  max:
    (length: number, message: string): Rule<string> =>
    (value) =>
      value.trim().length <= length ? null : message,

  oneOf:
    (options: string[], message: string): Rule<string> =>
    (value) =>
      options.includes(value) ? null : message,
};

export const validationSchema: Schema<NewNoteData> = {
  title: [
    rules.required("Title is required"),
    rules.min(3, "Title must be at least 3 characters"),
    rules.max(50, "Title is too long"),
  ],
  content: [rules.max(500, "Content is too long")],
  tag: [
    rules.required("Tag is required"),
    rules.oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag"
    ),
  ],
};

export function validateForm<T extends NewNoteData>(
  data: Partial<T>,
  schema: Schema<T>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key in schema) {
    const rules = schema[key];
    const value = data[key];
    if (!rules || value === undefined) continue;

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }

  return errors;
}
