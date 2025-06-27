import React from "react";
import styles from "./loginPage.module.css";
import Link from "next/link";

const Loginpage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flipBox}>
        <div className={styles.flipInner}>
          {/* Depan */}
          <div className={styles.flipFront}>
            <h2>Welcome Back!</h2>
            <p>Please continue to login.</p>
          </div>
          {/* Belakang */}
          <div className={styles.flipBack}>
            <Link href="/">
              <div className={styles.socialButton}>Sign In with Google</div>
            </Link>

            <div className={styles.socialButton}>Sign In with Github</div>
            <div className={styles.socialButton}>Sign In with Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
