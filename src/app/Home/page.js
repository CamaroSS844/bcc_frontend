"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "./OverviewComponents/topNav";
import SideNav from "./OverviewComponents/sideNav";
import LocalMap from "./OverviewComponents/map";
import styles from "./page.module.css";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push("/"); // Redirect to login if no auth token
      }
    }
  }, [isClient, router]);

  if (!isClient) {
    // Avoid rendering until client-side rendering is confirmed
    return null;
  }

  return (
    <div className={styles.page}>
      <TopNav />
      <SideNav />
      <main className={styles.main}>
        <LocalMap />
      </main>
      <footer className={styles.footer}>
        <span className={styles.footerText}>© 22series</span>
      </footer>
    </div>
  );
}
