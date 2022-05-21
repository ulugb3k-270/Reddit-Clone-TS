import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      <div>
        <PostBox />
      </div>
    </div>
  )
}

export default Home
