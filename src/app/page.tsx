"use client";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Container } from "@/components/bootstrap";
import { Padauk } from "next/font/google";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

const gafata = Padauk({
  weight: "400",
  subsets: ["latin"],
});

function HomePage() {
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation2(true);
    }, 1500);
    setTimeout(() => {
      setAnimation3(true);
    }, 2000);
  }, []);
  return (
    <main>
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.container}>
            <CSSTransition
              in={animation}
              timeout={700}
              classNames="blur"
              unmountOnExit
            >
              <p className={styles.asking}>
                Feeling a little bit Procrastinated?
              </p>
            </CSSTransition>
            <CSSTransition
              in={animation2}
              timeout={300}
              classNames="scale-fade"
              unmountOnExit
            >
              <p className={styles.doit}>Get Yourself a Task!</p>
            </CSSTransition>

            <CSSTransition
              in={animation3}
              timeout={300}
              classNames="popup-bounce"
              unmountOnExit
            >
              <div className={styles.centerContainer}>
                <div className={styles.button}>
                  <Link href="/new">
                    <div className={styles.buttonitself}>Get a Task</div>
                  </Link>
                </div>
              </div>
            </CSSTransition>
          </div>
        </Container>
      </div>
    </main>
  );
}

export default HomePage;
