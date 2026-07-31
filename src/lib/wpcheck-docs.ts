export type UploadedDoc = {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  reference: string;
  dataUrl: string;
};

export type AgreementData = {
  id: string;
  created: string;
  reference: string;
  effectiveDate: string;
  employerName: string;
  employerNzbn: string;
  employeeName: string;
  clientId: string;
  passport: string;
  nationality: string;
  position: string;
  site: string;
  hourlyRate: string;
  hoursPerWeek: string;
  jobCheckToken: string;
  caseOfficer: string;
};

const UPLOAD_KEY = "wpcheck-admin-documents-v2";
const AGREEMENT_KEY = "wpcheck-admin-agreements-v1";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable or quota exceeded */
  }
}

export const loadUploads = () => read<UploadedDoc>(UPLOAD_KEY);
export const saveUploads = (docs: UploadedDoc[]) => write(UPLOAD_KEY, docs);
export const loadAgreements = () => read<AgreementData>(AGREEMENT_KEY);
export const saveAgreements = (docs: AgreementData[]) => write(AGREEMENT_KEY, docs);
export const getAgreement = (id: string) => loadAgreements().find((a) => a.id === id) ?? null;

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

export function formatNzDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function defaultAgreement(): AgreementData {
  return {
    id: "",
    created: new Date().toISOString(),
    reference: "",
    effectiveDate: new Date().toISOString().slice(0, 10),
    employerName: "",
    employerNzbn: "",
    employeeName: "",
    clientId: "",
    passport: "",
    nationality: "",
    position: "",
    site: "",
    hourlyRate: "38.50",
    hoursPerWeek: "40",
    jobCheckToken: "",
    caseOfficer: "AKL-INZ-OFFICER-4481 (Auckland Central)",
  };
}

export function docRef(a: AgreementData) {
  return a.reference || `INZ-1188-AEWV-${a.clientId || "PENDING"}`;
}

export function annualGross(a: AgreementData) {
  const rate = Number(a.hourlyRate) || 0;
  const hours = Number(a.hoursPerWeek) || 0;
  return rate * hours * 52;
}

export const money = (n: number) =>
  n.toLocaleString("en-NZ", { style: "currency", currency: "NZD", minimumFractionDigits: 2 });
