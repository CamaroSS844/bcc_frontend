"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "./OverviewComponents/topNav";
import SideNav from "./OverviewComponents/sideNav";
import LocalMap from "./OverviewComponents/map";
import styles from "./page.module.css";

import {  useAppDispatch } from "@/lib/hooks";
import { initialize } from "@/lib/features/dataStorageSlice";
import StoreProvider from "../StoreProvider";
import { retrieveData } from "./OverviewComponents/data/apiCalls";

function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authToken = localStorage.getItem('authToken'); // Replace with dynamic token retrieval if needed


  useEffect(() => {
    setIsClient(true); // Confirm client-side rendering
  }, []);


  useEffect(() => {
    if (!authToken) {
      router.push("/"); // Redirect to login
      return;
    }

    retrieveData(authToken, dispatch, initialize).then(() => {
      console.log("Data fetched and initialized.");
    });
  }, [dispatch]); // Ensure this only runs once or when dependencies change


  if (!isClient) {
    // Avoid rendering until client-side rendering is confirmed
    return null;
  }

  return (
    <div className={styles.page}>
      <TopNav />
      <SideNav />
      <div className={styles.mainContent}>
        <LocalMap />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
}
