"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./styles/GetBtn.module.css";
import { CSSTransition } from "react-transition-group";

interface SectionProps {
  comp1: React.ReactNode;
}

const NewTaskSection: FC<SectionProps> = ({ comp1 }) => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);
  return (
    <div className={styles.wholeField}>
      <CSSTransition
        in={animation}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <div>{comp1}</div>
      </CSSTransition>
    </div>
  );
};
export default NewTaskSection;
