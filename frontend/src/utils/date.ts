export const formatForDatetimeLocal = (isoString?: string | null): string => {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatIsoForLaravel = (dateString: string) => {
  const iso = new Date(dateString).toISOString();
  return iso.replace(/\.\d{3}Z$/, "Z");
};
