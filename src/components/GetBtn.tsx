"use client";
import React, { FC } from "react";
import styles from "./styles/GetBtn.module.css";

const GetBtn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.getBtn}>Get a task</div>
      </div>
    </div>
  );
};

export default GetBtn;
