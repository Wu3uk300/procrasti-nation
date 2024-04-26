"use client";
import createTask from "@/actions/create";
import { useEffect, useRef, useState } from "react";
import styles from "./CreatePage.module.css";
import { CSSTransition } from "react-transition-group";

export default function CreatePage() {
  const [animation, setAnimation] = useState(false);
  const [safas, setSafas] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  function animationPlay() {
    setAnimation(true);
  }
  useEffect(() => {
    if (animation) {
      setTimeout(() => {
        setSafas(true);
      }, 100);
      setTimeout(() => {
        setAnimation(false);
        setSafas(false);
      }, 4000);
    }
  }, [animation]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Create A New Task</div>

      <form
        ref={ref}
        className={styles.actionForm}
        action={async (formData) => {
          ref.current?.reset();
          await createTask(formData);
        }}
      >
        <input className={styles.inputField} name="content" type="text" />
        <button onClick={animationPlay} className={styles.createBtn}>
          Create
        </button>
      </form>

      {animation && (
        <CSSTransition in={safas} timeout={300} classNames="easy" unmountOnExit>
          <div className={styles.sentWindow}>Task Created!</div>
        </CSSTransition>
      )}
    </div>
  );
}
