/** Client-side validation and input masking helpers for the WP Check form. */

export function maskReference(value: string): string {
  const raw = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 14);
  const letters = raw.slice(0, 3).replace(/[^A-Z]/g, "");
  const rest = raw.slice(letters.length).replace(/[^0-9]/g, "");
  let out = letters;
  if (rest.length > 0) out += "-" + rest.slice(0, 4);
  if (rest.length > 4) out += "-" + rest.slice(4, 10);
  return out;
}

export function maskPassport(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

export function maskDob(value: string): string {
  const d = value.replace(/[^0-9]/g, "").slice(0, 8);
  const parts = [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}

/** Converts a masked DD/MM/YYYY value to ISO (YYYY-MM-DD), or null when invalid. */
export function dobToIso(value: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  const day = Number(dd), month = Number(mm), year = Number(yyyy);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) return null;
  const now = new Date();
  const age = (now.getTime() - date.getTime()) / (365.25 * 24 * 3600 * 1000);
  if (age < 15 || age > 100) return null;
  return `${yyyy}-${mm}-${dd}`;
}

export type WpCheckFieldErrors = Partial<Record<"reference" | "passport" | "dob" | "country", string>>;

export function validateWpCheck(values: {
  reference: string;
  passport: string;
  dob: string;
  country: string;
}): { errors: WpCheckFieldErrors; dobIso: string | null } {
  const errors: WpCheckFieldErrors = {};

  if (!values.reference.trim()) errors.reference = "Enter the reference number from the work agreement.";
  else if (!/^[A-Z]{3}-\d{4}-\d{4,6}$/.test(values.reference.trim()))
    errors.reference = "Use the format WPC-2026-004821.";

  if (!values.passport.trim()) errors.passport = "Enter the passport number.";
  else if (!/^[A-Z0-9]{6,12}$/.test(values.passport.trim()))
    errors.passport = "Passport numbers are 6 to 12 letters and numbers.";

  const dobIso = dobToIso(values.dob);
  if (!values.dob.trim()) errors.dob = "Enter the date of birth as DD/MM/YYYY.";
  else if (!dobIso) errors.dob = "Enter a real date of birth (DD/MM/YYYY) for a person aged 15 or over.";

  if (!values.country.trim()) errors.country = "Select the country that issued the documents.";

  return { errors, dobIso };
}
