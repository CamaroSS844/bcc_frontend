//to inform next js this is a client component
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import React from "react";
//import { useRouter } from 'next/navigation'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = React.useState(false);
  //const router = useRouter();

  

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
          'Accept': '*/*',
          'Accept-encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Save token or handle success
      localStorage.setItem('authToken', data.token);
      router.push('/Home')

      // Redirect user to the dashboard
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [windowDimensions, setWindowDimensions] = useState({
    width:  700,
    height: 350,
  });




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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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