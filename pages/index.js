import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/button'
import { loginWithGithub, onAuthStateChange } from '../firebase/client'
import { useState, useEffect } from 'react'
import Avatar from "../components/avatar";

export default function Home () {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChange(user => setUser(user))
  }, [])

  const handleClick = () => {
    loginWithGithub()
      .then(setUser)
      .catch(err => {
        console.log(err)
      })
  }

  return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Template Next App 🔥</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="https://nextjs.org">Template Next.js!</a>
                    </h1>
                    <div>
                        {
                            user === null &&
                            <Button onClick={handleClick}>
                                Login with GitHub
                            </Button>
                        }
                        {
                            user && user.avatar && <div>
                                <Avatar
                                    alt={user.username}
                                    src={user.avatar}
                                    text={user.username}
                                />
                            </div>
                        }
                    </div>
                </main>
            </div>

            <style jsx>{`
              div {
                margin-top: 15px;
              }
            `}</style>
        </>
  )
}
