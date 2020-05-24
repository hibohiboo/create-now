import React from 'react'
import Head from 'next/head'
import { TWITTER_USER_NAME, SITE_NAME, SITE_DOMAIN } from '~/lib/constants'

const component: React.FC<{
  title: string
  description: string
  url: string
  image?: string
  keywords?: string
}> = ({
  title,
  description,
  url,
  image = 'https://lostrpg-751c1.firebaseapp.com/assets/images/losttop.png',
  keywords = 'LOSTRPG,廃墟,子供たち,キャラクターシート,TRPG,廃墟の森,ポストアポカリプス',
}) => (
  <Head>
    <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
    <meta name="twitter:creator" content={`@${TWITTER_USER_NAME}`} />
    <meta
      name="twitter:card"
      content={image ? 'summary_large_image' : 'summary'}
    />
    {title && <meta name="og:title" content={title} />}
    {url && <meta name="og:url" content={`${SITE_DOMAIN}${url}`} />}
    {description && <meta name="description" content={description} />}
    {description && <meta name="og:description" content={description} />}
    {image && <meta name="og:image" content={image} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:site_name" content={SITE_NAME} />
  </Head>
)
export default component
// <meta name="twitter:card" content="summary" />
// <meta name="twitter:site" content="@nytimesbits" />
// <meta name="twitter:creator" content="@nickbilton" />
// <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
// <meta property="og:title" content="A Twitter for My Sister" />
// <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
// <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
