import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>Post</h1>
      <h2>
        <Link href="/posts/first-post">Read This Page</Link>
      </h2>
    </>
  )
}
