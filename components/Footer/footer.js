import Link from 'next/link'
import Home from '../Icons/Home'
import Search from '../Icons/Search'
import Create from '../Icons/Create'
import { colors } from '../../styles/theme'

export default function Footer () {
  return (
        <>
            <nav>
                <Link href="/home">
                    <a>
                        <Home with={32} heigh={32} stroke="#09d"/>
                    </a>
                </Link>
                <Link href="/search">
                    <a>
                        <Search with={32} heigh={32} stroke="#09d"/>
                    </a>
                </Link>
                <Link href="/compose/tweet">
                    <a>
                        <Create with={32} heigh={32} stroke="#09d"/>
                    </a>
                </Link>
            </nav>
            <style jsx>{`
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
