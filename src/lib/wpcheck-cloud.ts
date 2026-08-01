import { supabase } from "@/integrations/supabase/client";
import type { AgreementData } from "@/lib/wpcheck-docs";

export type CloudUpload = {
  id: string;
  name: string;
  reference: string;
  size: number;
  path: string;
  created: string;
};

export type CloudAgreement = AgreementData & { id: string; created: string };

export async function isAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

export async function listUploads(): Promise<CloudUpload[]> {
  const { data, error } = await supabase
    .from("wp_documents")
    .select("id, name, reference, file_size, file_path, created_at")
    .eq("kind", "upload")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((d) => ({
    id: d.id,
    name: d.name,
    reference: d.reference ?? "—",
    size: d.file_size ?? 0,
    path: d.file_path ?? "",
    created: d.created_at,
  }));
}

export async function signedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from("wp-documents").createSignedUrl(path, 60 * 60);
  if (error || !data) throw error ?? new Error("Unable to create link");
  return data.signedUrl;
}

export async function uploadPdf(file: File, reference: string): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const path = `${crypto.randomUUID()}.pdf`;
  const { error: upErr } = await supabase.storage
    .from("wp-documents")
    .upload(path, file, { contentType: "application/pdf", upsert: false });
  if (upErr) throw upErr;
  const { error } = await supabase.from("wp_documents").insert({
    kind: "upload",
    name: file.name,
    reference: reference || null,
    file_path: path,
    file_size: file.size,
    created_by: userData.user?.id ?? null,
  });
  if (error) throw error;
}

export async function replacePdf(doc: CloudUpload, file: File): Promise<void> {
  const path = `${crypto.randomUUID()}.pdf`;
  const { error: upErr } = await supabase.storage
    .from("wp-documents")
    .upload(path, file, { contentType: "application/pdf", upsert: false });
  if (upErr) throw upErr;
  const { error } = await supabase
    .from("wp_documents")
    .update({ name: file.name, file_path: path, file_size: file.size })
    .eq("id", doc.id);
  if (error) throw error;
  if (doc.path) await supabase.storage.from("wp-documents").remove([doc.path]);
}

export async function deleteUpload(doc: CloudUpload): Promise<void> {
  const { error } = await supabase.from("wp_documents").delete().eq("id", doc.id);
  if (error) throw error;
  if (doc.path) await supabase.storage.from("wp-documents").remove([doc.path]);
}

export async function listAgreements(): Promise<CloudAgreement[]> {
  const { data, error } = await supabase
    .from("wp_documents")
    .select("id, agreement, created_at")
    .eq("kind", "generated")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((d) => ({
    ...(d.agreement as unknown as AgreementData),
    id: d.id,
    created: d.created_at,
  }));
}

export async function getAgreementById(id: string): Promise<CloudAgreement | null> {
  const { data, error } = await supabase
    .from("wp_documents")
    .select("id, agreement, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data?.agreement) return null;
  return { ...(data.agreement as unknown as AgreementData), id: data.id, created: data.created_at };
}

export async function createAgreement(a: AgreementData): Promise<string> {
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("wp_documents")
    .insert({
      kind: "generated",
      name: a.employeeName || "AEWV agreement",
      reference: a.reference || null,
      agreement: a as unknown as Record<string, unknown>,
      created_by: userData.user?.id ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function deleteAgreement(id: string): Promise<void> {
  const { error } = await supabase.from("wp_documents").delete().eq("id", id);
  if (error) throw error;
}
