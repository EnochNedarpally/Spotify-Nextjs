import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import {useSession,signOut} from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import {playlistIdState} from '../atoms/playlistAtom'

const Sidebar = () => {
    const {data:session,status}= useSession()
    const [playlist, setPlaylist] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const spotifyApi=useSpotify();

    console.log(playlistId);

    useEffect(()=>{
      if(spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists().then(data=>{
          setPlaylist(data.body.items);
        })
      }
    },[session,spotifyApi])
    
  return (
    <div className='border-r border-gray-500  text-xs md:text-sm none hidden md:inline-flex h-screen p-3 overflow-y-scroll scrollbar-hide'>
      <div className=" text-gray-500 space-y-2">
        <button className="flex items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlist.map(playlist=>(
          <p key={playlist.id} onClick={()=>setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
