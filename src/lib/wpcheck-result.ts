export const LAST_RESULT_KEY = "wpcheck:last-result";

export type StoredResult = {
  status: "verified" | "review" | "not_found";
  reference: string;
  country: string;
  checkedAt: string;
  message: string;
};
