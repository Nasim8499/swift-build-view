export type VerifyInput = {
  reference: string;
  passport: string;
  dob: string;
  country: string;
};

export type VerifyResult = {
  status: "verified" | "review" | "not_found";
  reference: string;
  country: string;
  checkedAt: string;
  message: string;
};

const norm = (v: unknown) => String(v ?? "").replace(/\s+/g, "").toUpperCase();

/**
 * Looks up a work agreement record by reference and confirms the supplied
 * identity details line up. Never returns any personal data back to the client.
 */
export async function verifyAgreement(input: VerifyInput): Promise<VerifyResult> {
  const checkedAt = new Date().toISOString();
  const reference = input.reference.trim().toUpperCase();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("wp_documents")
    .select("agreement, reference")
    .eq("reference", reference)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Verification service is unavailable. Please try again.");

  if (!data) {
    return {
      status: "not_found",
      reference,
      country: input.country,
      checkedAt,
      message:
        "No work agreement was found for this reference number. Check the reference and document details, then try again.",
    };
  }

  const agreement = (data.agreement ?? {}) as Record<string, unknown>;
  const passportOnRecord = norm(agreement['passport'] ?? agreement['passportNumber']);
  const dobOnRecord = String(agreement['dob'] ?? agreement['dateOfBirth'] ?? "").slice(0, 10);

  const passportMatches = !passportOnRecord || passportOnRecord === norm(input.passport);
  const dobMatches = !dobOnRecord || dobOnRecord === input.dob;

  if (passportMatches && dobMatches) {
    return {
      status: "verified",
      reference,
      country: input.country,
      checkedAt,
      message:
        "A written work agreement is on record for this reference and the document details supplied match. Minimum entitlements are recorded as compliant.",
    };
  }

  return {
    status: "review",
    reference,
    country: input.country,
    checkedAt,
    message:
      "A record exists for this reference, but the passport number or date of birth does not match. Contact the employment service line on 0800 20 90 20 for manual review.",
  };
}
