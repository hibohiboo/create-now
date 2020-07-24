import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
// import utilStyles from '~/styles/utils.module.scss'

// const name = 'hibohiboo'
export const siteTitle = 'Design Pattern test'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
