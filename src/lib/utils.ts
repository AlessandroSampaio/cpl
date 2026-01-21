import { DateValue } from "@ark-ui/solid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDate(date: DateValue | string | undefined): string {
  if (!date) return "";
  const parsedDate = new Date(Date.parse(date.toString()));

  const normalizedDate = new Date(
    parsedDate.getUTCFullYear(),
    parsedDate.getUTCMonth(),
    parsedDate.getUTCDate(),
  );

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(normalizedDate);
}

export function parseDateStringToISO8601(dateString: string): string {
  // Split the string into day, month, and year parts
  const parts = dateString.split("/");

  // Note: Month in the Date constructor is zero-based (0-indexed),
  // so we subtract 1 from the month part.
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  // Create a new Date object using the parts
  // The constructor with multiple arguments (year, month, day) creates a date in the local timezone
  const dateObject = new Date(year, month, day);

  // Use toISOString() to convert the Date object to an ISO 8601 string (in UTC)
  // This produces a string like "2025-01-23T00:00:00.000Z"
  return dateObject.toISOString().slice(0, -14);
}
