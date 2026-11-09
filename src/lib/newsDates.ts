const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
};

type NewsLang = keyof typeof MONTHS;
type NewsDateRow = Record<string, string>;

function parseIsoDate(value: string | undefined) {
  const match = (value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) };
}

/** Today as YYYY-MM-DD in the visitor's time zone, so an event ends at their local midnight. */
function localToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** An event stays upcoming through its end date and moves to past the day after. */
export function isUpcomingEvent(row: NewsDateRow, today = localToday()) {
  return (row.end_date || row.start_date || "") >= today;
}

/** Formats a date range, e.g. "October 8–10, 2026" or "29. September – 2. Oktober 2026". */
export function formatEventDateRange(startDate: string | undefined, endDate: string | undefined, lang: NewsLang) {
  const start = parseIsoDate(startDate);
  if (!start) return "";
  const end = parseIsoDate(endDate) || start;
  const months = MONTHS[lang];
  const sameYear = start.year === end.year;
  const sameMonth = sameYear && start.month === end.month;
  const sameDay = sameMonth && start.day === end.day;

  if (lang === "de") {
    const endText = `${end.day}. ${months[end.month]} ${end.year}`;
    if (sameDay) return endText;
    if (sameMonth) return `${start.day}.–${endText}`;
    if (sameYear) return `${start.day}. ${months[start.month]} – ${endText}`;
    return `${start.day}. ${months[start.month]} ${start.year} – ${endText}`;
  }

  const startText = `${months[start.month]} ${start.day}`;
  if (sameDay) return `${startText}, ${start.year}`;
  if (sameMonth) return `${startText}–${end.day}, ${end.year}`;
  if (sameYear) return `${startText} – ${months[end.month]} ${end.day}, ${end.year}`;
  return `${startText}, ${start.year} – ${months[end.month]} ${end.day}, ${end.year}`;
}

/** display_date combines date and place, e.g. "October 8–10, 2026, Berlin": returns the place. */
function extractPlace(displayDate: string | undefined) {
  const text = (displayDate || "").trim();
  const afterYear = text.match(/.*\b\d{4}\b[,\s]*(.*)$/);
  if (afterYear) return afterYear[1].trim();
  const comma = text.lastIndexOf(",");
  return comma === -1 ? "" : text.slice(comma + 1).trim();
}

/** Date line for an event: the range from start_date/end_date plus the place from display_date. */
export function formatEventDate(row: NewsDateRow, lang: NewsLang) {
  const range = formatEventDateRange(row.start_date, row.end_date, lang);
  if (!range) return row.display_date || row.start_date || "";
  const place = extractPlace(row.display_date);
  return place ? `${range}, ${place}` : range;
}
