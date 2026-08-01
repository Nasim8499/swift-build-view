import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  reference: z.string().trim().min(4, "Reference number is too short").max(60),
  passport: z.string().trim().min(4, "Passport number is too short").max(40),
  dob: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date of birth"),
  country: z.string().trim().min(2).max(80),
});

export const runWpCheck = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { verifyAgreement } = await import("@/lib/wpcheck-verify.server");
    return verifyAgreement(data);
  });
