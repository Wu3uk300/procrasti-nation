"use client";

import "./global.css";
import Link from "next/link";
import styles from "./NavBar.module.css";
import {
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

function NavBar() {
  const { user, isAuthenticated, getPermissions } = useKindeBrowserClient();
  const pathname = usePathname();
  const { permissions } = getPermissions();
  if (pathname === "/login" || pathname === "/register") {
    return <div></div>;
  } else {
    return (
      <Navbar
        bg="secondary gradient"
        variant="dark"
        sticky="top"
        expand="sm"
        collapseOnSelect
        className="d-flex  flex-column "
      >
        <NavbarBrand className={styles.floating} as={Link} href="/">
          <div className="display-1 w-auto d-inline-block mb-25">
            PROCRASTI-NATION
          </div>
        </NavbarBrand>
        <NavbarToggle className={styles.toggle} aria-controls="main-navbar" />

        <NavbarCollapse className={styles.collapse} id="main-navbar">
          <Nav className={styles.custom}>
            <NavLink as={Link} href="/new" active={pathname === "/new"}>
              New Task
            </NavLink>
          </Nav>
          {isAuthenticated && (
            <Nav className={styles.custom}>
              <NavLink as={Link} href="/all" active={pathname === "/all"}>
                All Tasks
              </NavLink>
            </Nav>
          )}
          {isAuthenticated && permissions.includes("create:task") && (
            <Nav className={styles.custom}>
              <NavLink as={Link} href="/create" active={pathname === "/create"}>
                Create Task
              </NavLink>
            </Nav>
          )}

          {isAuthenticated && permissions.includes("create:task") && (
            <Nav className={styles.custom}>
              <NavLink as={Link} href="/delete" active={pathname === "/delete"}>
                Delete Task
              </NavLink>
            </Nav>
          )}

          <Nav className={styles.custom}>
            <NavLink as={Link} href="/about" active={pathname === "/about"}>
              About
            </NavLink>
          </Nav>

          <Nav className={styles.widthFix}>
            {isAuthenticated ? (
              <div className={styles.userInfo}>
                {user?.picture && (
                  <Image
                    src={user?.picture}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className={styles.userName}
                  ></Image>
                )}
                {user && !user.picture && (
                  <div>
                    <div>{user?.given_name?.[0]}</div>
                  </div>
                )}
                <LogoutLink>
                  <div className={styles.loginBtn}>Logout</div>
                </LogoutLink>
              </div>
            ) : (
              <LoginLink>
                <div className={styles.loginBtn}>Login</div>
              </LoginLink>
            )}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }
}

export default NavBar;
