import { cookies } from "next/headers";

import { fetchContactFormDetails } from "@/services/contact.admin.services";
import ContactPageClient from "@/components/admin/contact/ContactPageClient";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const resolvedParams = await searchParams;

  let contacts = [];
  try {
    const data = await fetchContactFormDetails(cookieHeader, resolvedParams);

    contacts = data.data ?? [];
  } catch {
    contacts = [];
  }

  return <ContactPageClient item={contacts} />;
}
