import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/button'
import { loginWithGithub } from '../firebase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from '../hooks/useUser'
import { colors } from '../styles/theme'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGithub()
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
                            user === USER_STATES.NOT_LOGGED &&
                            <Button onClick={handleClick}>
                                Login with GitHub
                            </Button>
                        }
                        {
                            user === USER_STATES.NOT_KNOW && <span>Loading ...</span>
                        }
                    </div>
                </main>
            </div>

            <style jsx>{`
                img {
                  width: 120px;
                }
                div {
                  margin-top: 16px;
                }
                section {
                  display: grid;
                  height: 100%;
                  place-content: center;
                  place-items: center;
                }
                h1 {
                  color: ${colors.primary};
                  font-weight: 800;
                  font-size: 32px;
                  margin-bottom: 16px;
                }
                h2 {
                  color: ${colors.secondary};
                  font-size: 21px;
                  margin: 0;
                }
              `}
            </style>
        </>
  )
}
