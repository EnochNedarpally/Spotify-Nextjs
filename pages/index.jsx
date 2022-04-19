// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'
import { getSession } from 'next-auth/react'

const Home = () => {
  return (
    <div className="h-screen bg-black overflow-hidden">
      <Head>
        <title>Spotify </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        <Sidebar/>
        <Center/>
      </main>
      <div className='sticky bottom-0 text-white'>
        <Player/>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context){
  const session = await getSession(context);
  return{
    props:{
      session
    }
  }
}
