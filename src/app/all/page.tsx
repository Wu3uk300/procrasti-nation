import { PrismaClient } from "@prisma/client";
import styles from "./AllTasksPage.module.css";
import DeleteBtn from "@/components/DeleteBtn";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import GetBtn from "@/components/GetBtn";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AllTasksPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const user = await getUser();
  const tasks = await prisma.userTasks.findMany({
    where: {
      userid: user?.id,
    },
  });

  async function deleteTask(id: number) {
    "use server";
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      redirect("/api/auth/login");
    }

    await prisma.userTasks.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/all");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>All Tasks</div>
      {tasks.length === 0 ? (
        <div>
          <div className={styles.nothingHeader}>
            Nothing Found! Maybe you should get a new task!
          </div>
          <div>
            <Link href="/new">
              <GetBtn />
            </Link>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
