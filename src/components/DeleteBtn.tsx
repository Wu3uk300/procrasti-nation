"use client";

import { FC } from "react";
import styles from "@/app/all/AllTasksPage.module.css";

interface DeleteBtnProps {
  id: number;
  func: (arg: number) => void;
}

const DeleteBtn: FC<DeleteBtnProps> = ({ id, func }) => {
  return (
    <form action={() => func(id)}>
      <div className={styles.deleteCover}>
        <button className={styles.deleteBtn}>&#10003;</button>
      </div>
    </form>
  );
};

export default DeleteBtn;
