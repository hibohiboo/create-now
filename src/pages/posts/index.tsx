import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '~/components/templates/posts/Layout'
import utilStyles from '~/styles/utils.module.scss'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>
          <Link href="/posts/first-post">
            <a>Post Page</a>
          </Link>
        </p>
      </section>
    </Layout>
  )
}
