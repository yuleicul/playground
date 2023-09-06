import Link from 'next/link'
import Head from 'next/head'

export default function firstPost() {
  return (
    <>
      <Head>
        <title>yulei</title>
      </Head>
      <div>
        <Link href="/">Back Home</Link>
      </div>
    </>
  )
}
