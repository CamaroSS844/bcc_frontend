"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "./OverviewComponents/topNav";
import SideNav from "./OverviewComponents/sideNav";
import LocalMap from "./OverviewComponents/map";
import styles from "./page.module.css";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const retrieveData = async (authToken) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cemeteries/graves/?cemetery=Luveve', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Accept-encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Authorization': `Token ${authToken}`
        }
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to retrieve data');
      }

      const data = await response.json();
      console.log('Data retrieval successful:', data);

      // Save token or handle success
      localStorage.setItem('graveData', data);

      // Redirect user to the dashboard
    } catch (error) {
      console.log(error.message);
    } finally {
      //
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    const authToken = "5d55c9d47c0733912d87d3d69c9536764bbb3fc5"//localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/"); // Redirect to login if no auth token
    }else {
      retrieveData(authToken);
    }
  }


  if (!isClient) {
    // Avoid rendering until client-side rendering is confirmed
    return null;
  }

  return (
    <div className={styles.page}>
      <Provider store={store}>
        <TopNav />
        <SideNav />
        <div className={styles.mainContent}>
          <LocalMap />
        </div>
      </Provider>
    </div>
  );
}
