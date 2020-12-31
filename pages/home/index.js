import AppLayout from "../../components/AppLayout";
import {useEffect, useState} from 'react'
import Devit from "../../components/Devit";
import useUser from "../../hooks/useUser";
import {fetchLatestDevits} from "../../firebase/client";
import Create from "../../components/Icons/Create";
import Link from 'next/link';
import {colors} from "../../styles/theme";
import Home from "../../components/Icons/Home";
import Search from "../../components/Icons/Search";
import Head from "next/head";
import Footer from "../../components/Footer/footer";

export default function HomePage(){

    const [timeline, setTimeline] = useState([])
    const user = useUser()

    useEffect(() => {
        user && fetchLatestDevits().then(setTimeline)
    }, [user])

    return(
        <>
            <AppLayout>
                <Head>
                    <title>Inicio / App</title>
                </Head>
                <section>
                    <header>
                        <h1>Inicio</h1>
                    </header>
                    <section>
                        {timeline.map(({ id, img, userName, avatar, content, userId, createdAt }) => (
                            <Devit
                                avatar={avatar}
                                createdAt={createdAt}
                                id={id}
                                img={img}
                                key={id}
                                content={content}
                                userName={userName}
                                userId ={userId}
                            />
                        ))}
                    </section>
                    <Footer></Footer>
                </section>
            </AppLayout>

            <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section {
          flex: 1;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
    )
}