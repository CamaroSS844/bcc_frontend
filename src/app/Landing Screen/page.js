//to inform next js this is a client component
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import SideNav from "./OverviewComponents/sideNav";
import TopNav from "./OverviewComponents/topNav";
import LocalMap from "./OverviewComponents/map";

var loginScreen = false;


export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    setErrorMessage('');

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://bcc-backend-fwc7.onrender.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Save token or handle success
      localStorage.setItem('authToken', data.token);

      // Redirect user to the dashboard
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  
    const [windowDimensions, setWindowDimensions] = useState({
      width: (typeof window !== 'undefined')? window.innerWidth : null,
      height: (typeof window !== 'undefined')? window.innerHeight : null,
    });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (loginScreen) {
    return (
      <div className={styles.page}>
        <div style={{ width: "100vw", height: "100vh", display: "grid", gridTemplate: "auto/ auto auto", backgroundColor: "#000" }}>
          <Image
            src="/Bulawayo_CBD.jpg"
            alt="Bulawayo_CBD"
            width={windowDimensions.width / 2}
            height={windowDimensions.height / 2}
            priority
          />
          <Image
            src="/Bulawayo-City-Hall.jpg"
            alt="Bulawayo-City-Hall"
            width={windowDimensions.width / 2}
            height={windowDimensions.height / 2}
            priority
          />
          <Image
            src="/Bulawayo-Thermal-Power-Station.jpg"
            alt="Bulawayo-Thermal-Power-Station"
            width={windowDimensions.width / 2}
            height={windowDimensions.height / 2}
            priority
          />
          <Image
            src="/Bulawayo.jpeg"
            alt="Bulawayo"
            width={windowDimensions.width / 2}
            height={windowDimensions.height / 2}
            priority
          />
        </div>
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          background: "#000000a1", zIndex: 1,
          position: "absolute",
          width: "100vw",
          height: "100vh",
        }}>
          <div style={{
            width: "35vw",
            height: "70vh",
            backgroundColor: "#dfdfdf",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <h2>Login</h2>
            <div style={{ width: "80%", display: "inherit", flexDirection: "inherit", justifyContent: "flex-start", gap: "10px" }}>
              <label>Username:</label> <input type="text" name="Name" id="name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
              <label>Password:</label> <input type="password" name="password" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <span style={{ color: "#040498" }}>Forgot Password?</span>
            <button style={{ width: "40%", height: "30px", marginTop: "10px" }}
              type="submit" onClick={() => handleLogin()} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    )
  } else {

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
  }
}