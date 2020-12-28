import Link from 'next/link'
import styles from "../../styles/Home.module.css";
import Head from "next/head";

export default function Timeline({ userName }){

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

Timeline.getInitialProps = () => {
    return fetch('http://localhost:3000/api/hello')
        .then(res => res.json())
        .then(response => {
            console.log(response)
            const {userName} = response
            return {userName}
        })
}