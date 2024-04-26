"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CreateSegment from "./CreateSegment";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const hasPermisiion = await getPermission("create:task");
  if (!hasPermisiion?.isGranted) {
    redirect("/");
  }
  return (
    <div>
      <CreateSegment />
    </div>
  );
}
