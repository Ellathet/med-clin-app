import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider} from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = (url) => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }

  }, [router])

  return (
    <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
export default MyApp
