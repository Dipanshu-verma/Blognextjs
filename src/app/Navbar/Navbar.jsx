// components/Navbar.js
"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const [logout, setLogout] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


  return (
    <div className={styles.header}>
      <nav className={styles.navbar}>
        <h1 className={styles.navbarHeading}>BlogApp</h1>
        <Link href="/" className={styles.Link}>
          <p className={styles.blogParagraph}>Blogs</p>
        </Link>
        <Link href={token?"/writeblog":"/login"} className={styles.Link}>
          <p>Create a blog</p>
        </Link>

        {token ? (
          <button
            onClick={() => {
              setLogout(!logout);
              localStorage.removeItem("token");
            }}
            className={styles.loginButton}
          >
            Logout
          </button>
        ) : (
          <Link  href="/login" className={styles.Link}>
            <button className={styles.loginButton}>Login</button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
