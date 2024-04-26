"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
export default async function createTask(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const content = formData.get("content");
  await prisma.task.create({
    data: {
      content: content as string,
    },
  });
  revalidatePath("/all");
}
