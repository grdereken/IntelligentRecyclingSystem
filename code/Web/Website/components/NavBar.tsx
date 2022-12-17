import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
        <nav className={styles.nav}>
            <Link href="/" className={styles.SiteTitle}>
                IRRS
            </Link>
            <ul>
                <Link href="/leaderboards">
                    leaderboards
                </Link>
                <Link href="/search">
                    search
                </Link>
                
            </ul>
        </nav>
    )
}
