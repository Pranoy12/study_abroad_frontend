import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return <>{children}</>;
}
