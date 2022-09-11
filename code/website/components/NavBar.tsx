import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
        <nav className={styles.nav}>
            <Link href="/">
                <a className={styles.SiteTitle}>IRRS</a>
            </Link>
            <ul>
                <Link href="/leaderboards">
                    <a>leaderboards</a>
                </Link>
                <Link href="/search">
                    <a>search</a>
                </Link>
                
            </ul>
        </nav>
    )
}
