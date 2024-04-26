-- CreateTable
CREATE TABLE "UserTasks" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "UserTasks_pkey" PRIMARY KEY ("id")
);
