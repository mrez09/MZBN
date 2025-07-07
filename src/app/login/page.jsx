"use client";
import React from "react";
import styles from "./loginPage.module.css";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

const Loginpage = () => {
  const { data, status } = useSession();

  const router = useRouter();

  //console.log(data, status);
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

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
              <div
                className={styles.socialButton}
                onClick={() => signIn("google")}
              >
                Sign In with Google
              </div>
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
