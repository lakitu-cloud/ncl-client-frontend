import { format } from "date-fns";

export const formatSafeDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid';
  return format(date, 'PPP p');
};