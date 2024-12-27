//to inform next js this is a client component
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    width: !(typeof window !== 'undefined') ? window.innerWidth / 2 : 700,
    height: !(typeof window !== 'undefined') ? window.innerHeight / 2: 350,
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


  return (
    <div className={styles.page}>
      <div className={styles.backdrop}>
        <Image
          src="/Bulawayo_CBD.jpg"
          alt="Bulawayo_CBD"
          width={windowDimensions.width}
          height={windowDimensions.height}
          priority
        />
        <Image
          src="/Bulawayo-City-Hall.jpg"
          alt="Bulawayo-City-Hall"
          width={windowDimensions.width}
          height={windowDimensions.height}
          priority
        />
        <Image
          src="/Bulawayo-Thermal-Power-Station.jpg"
          alt="Bulawayo-Thermal-Power-Station"
          width={windowDimensions.width}
          height={windowDimensions.height}
          priority
        />
        <Image
          src="/Bulawayo.jpeg"
          alt="Bulawayo"
          width={windowDimensions.width}
          height={windowDimensions.height}
          priority
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.loginForm}>
          { errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <h2>Login</h2>
          <div className={styles.inputContainer}>
            <label>Username:</label>
            <input
              type="text"
              name="Name"
              id="name"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <span style={{ color: "#040498" }}>Forgot Password?</span>
          <button
            type="submit" 
            onClick={() => handleLogin()} 
            disabled={loading}
            >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}