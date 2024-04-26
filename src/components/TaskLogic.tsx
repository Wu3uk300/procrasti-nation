"use server";
import React from "react";
import { PrismaClient } from "@prisma/client";
import styles from "./styles/GetBtn.module.css";
import { revalidatePath, revalidateTag } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function DoAgain() {
  "use server";
  revalidateTag(task);
}

let task: any;

export default async function TaskLogic() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let tasks = await prisma.task.findMany();
  const min = 0;
  const max = tasks.length - 1;
  function randomTask(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const task = tasks[randomTask(min, max)];

  let userTasks = await prisma.userTasks.findMany({
    where: {
      userid: user?.id,
    },
  });
  const repetitiveTask = userTasks.filter(
    (elem) => elem.content === task.content
  );

  async function addToaAll() {
    "use server";
    if (repetitiveTask.length !== 0) {
      return;
    }
    await prisma.userTasks.create({
      data: {
        userid: user?.id as string,
        content: task.content,
      },
    });

    revalidatePath("/all");
    redirect("/all");
  }
  return (
    <div>
      <div className={styles.taskField}>
        <div className={styles.task}>
          <div className={styles.smallHeader}>Your Task is:</div>
          {task?.content}
        </div>
      </div>

      <div>
        <div className={styles.interactiveBtns}>
          <form action={DoAgain}>
            <button className={styles.changeTask}>Change Tasks</button>
          </form>

          <div>
            <form action={addToaAll}>
              <button
                className={
                  repetitiveTask.length !== 0
                    ? styles.disabled
                    : styles.taskCompleted
                }
              >
                {repetitiveTask.length !== 0
                  ? "You already have this task"
                  : "Add to all tasks"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
