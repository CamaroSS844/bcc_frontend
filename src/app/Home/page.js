//to inform next js this is a client component
"use client";

import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import SideNav from "./OverviewComponents/sideNav";
import TopNav from "./OverviewComponents/topNav";
import LocalMap from "./OverviewComponents/map";
import { useRouter } from "next/router";

var loginScreen = false;


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const router = isClient ? useRouter() : null;
  const authToken = isClient ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    setIsClient(true);
  });

  //const router = useRouter();
  if (isClient && authToken != null) {

    return (
      <div className={styles.page}>
        <TopNav />
        <SideNav />
        <main className={styles.main}>
          <LocalMap />
        </main>
        <footer className={styles.footer}>
          <span className={styles.footerText}>© 2024 Mine Machines</span>
        </footer>
      </div>
    );
  } else if (isClient && authToken == null){
    router.push('/')
  }
}
