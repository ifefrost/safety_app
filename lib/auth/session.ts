import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  return session.user.email;
}
