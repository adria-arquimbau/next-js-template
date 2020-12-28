import Link from 'next/link'
import styles from "../../styles/Home.module.css";
import Head from "next/head";

export default function Timeline({ userName }){

    Timeline.getInitialProps = () => {
        return { userName: 'Adria' }
    }

    return (
        <>
            <Head>
                <title>🔥 My Timeline</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className={styles.title}>This is the timeline of {userName}</h1>
            <nav>
                <Link href='/'>Go Home</Link>
            </nav>

            <style jsx>{`
              nav {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
            `}</style>
        </>
    )
}