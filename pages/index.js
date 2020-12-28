import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Template Next App 🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> 
          Welcome to <a href="https://nextjs.org">Template Next.js!</a>
        </h1>
        <nav>
          <a href="/timeline">Timeline</a>
        </nav>
       </main>

    </div>
  )
}
