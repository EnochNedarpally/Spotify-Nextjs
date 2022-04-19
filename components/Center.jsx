import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import {shuffle} from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs'

const Center = () => {
    const{data:session}=useSession();
    const color=[
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-yellow-500",
        "from-purple-500",
        "from-violet-500",
        "from-pink-500",
    ]
    const [bgColor, setBgColor] = useState(null);
    const playlistId= useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi=useSpotify();
    useEffect(()=>{
        setBgColor(shuffle(color).pop());
    },[playlistId])
    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then(data=>{
            setPlaylist(data.body)
        }).catch(err=>{
            console.log("Something went wrong",err)
        })
    },[spotifyApi,playlistId])
    
  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide  '>
        <header className='absolute top-2 right-5'>
            <div className='inline-flex items-center bg-black rounded-full p-1 pr-3 space-x-2 cursor-pointer opacity-80 hover:opacity-70'>
                <img className='rounded-full w-10 h-10' src={session?.user.image} alt={session?.user.name} />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>
        <section className={`h-60 flex items-end space-x-3 p-4 bg-gradient-to-b to-black ${bgColor}`}>
            <img className='h-32 w-32 shadow-xl rounded-sm' src={playlist?.images[0].url} alt={playlist?.name} />
            <div className='ml-4'>
                <p>Playlist</p>
                <h2 className='text-2xl'>{playlist?.name}</h2>
            </div>
        </section>
        <Songs key={playlist?.id} playlist={playlist}/>
    </div>
  )
}

export default Center