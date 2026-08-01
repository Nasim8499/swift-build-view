export const LAST_RESULT_KEY = "wpcheck:last-result";
export const LAST_VALUES_KEY = "wpcheck:last-values";

export type StoredResult = {
  status: "verified" | "review" | "not_found";
  reference: string;
  country: string;
  checkedAt: string;
  message: string;
};

/** The masked form values of the last check, kept so the user can resubmit. */
export type StoredValues = {
  reference: string;
  passport: string;
  dob: string;
  country: string;
};
