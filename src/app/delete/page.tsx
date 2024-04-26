import { PrismaClient } from "@prisma/client";
import styles from "../all/AllTasksPage.module.css";
import DeleteBtn from "@/components/DeleteBtn";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function DeleteTasksPage() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const hasPermisiion = await getPermission("create:task");
  if (!hasPermisiion?.isGranted) {
    redirect("/");
  }

  const tasks = await prisma.task.findMany();

  async function deleteTask(id: number) {
    "use server";
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      redirect("/api/auth/login");
    }

    await prisma.task.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/all");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>ALL TASKS AT ALL</div>
      <div className={styles.tasks}>
        {tasks.map((elem) => (
          <div className={styles.allDataField} key={elem.id}>
            <div className={styles.taskField}>
              <p className={styles.task}>{elem.content}</p>
            </div>
            <DeleteBtn func={deleteTask} id={elem.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
