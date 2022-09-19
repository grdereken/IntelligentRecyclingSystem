import '../styles/globals.css'
import NavBar from '../components/NavBar'
import { AppProps } from 'next/app'
function MyApp({ Component , pageProps }: AppProps) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
