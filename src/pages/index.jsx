import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('🎉 You are subscribed!');
      setName('');
      setEmail('');
    } else {
      setStatus(data.error || 'Something went wrong.');
    }
  };

  return (
    <>
      <Head>
        <title>subscribe to instruments</title>
        <link
              href="https://fonts.googleapis.com/css2?family=Ancizar+Sans&display=swap"
              rel="stylesheet"
  />
      </Head>
      <main className={styles.container}>
        <div className={styles.card}>
           <div className={styles.logo}>
              <img src="/icons/logo.svg" alt="Logo" />
            </div> 
         <h1 className={styles.heading}>
              subscribe to <span className={styles.brand}>my instruments</span>
         </h1>
            <p className={styles.description}>
              This is Pranav and these are <span className={styles.highlight}>my instruments</span>.</br>
              Subscribe to let <span className={styles.highlight}>my sound flow</span> through your mailboxes.
            </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
                  <p className={styles.copyright}>
  ©         {new Date().getFullYear()} instruments. All rights reserved.
        </p>
          {status && <p className={styles.status}>{status}</p>}
        </div>

      </main>
    </>
  );
}
