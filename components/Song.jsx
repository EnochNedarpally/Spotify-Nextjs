import React from 'react'
import { useRecoilState } from 'recoil'
import {millistoMinutesAndSeconds} from '../lib/time'
import {curresntSongID,isPlayingState} from '../atoms/songAtom'
import spotifyApi from '../lib/spotify'

const Song = ({order,track}) => {
    const [currentTrackId, setCurrentTrackId] = useRecoilState(curresntSongID)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const playSong=()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris:[track.track.uri]
        })
    }
  return (
    <div className='grid grid-cols-2 p-4 text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
        <div className='flex space-x-2 items-center w-50 '>
            <p>{order+1}</p>
            <img className='h-10 w-10 rounded-full' src={track?.track.album.images[0].url} alt="" />
            <div>
            <p className='w-36 md:w-64 text-sm break-normal text-white'>{track.track.name}</p>
            <p className='text-sm break-normal'>{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className='flex space-x-4  w-50  justify-between'>
            <p className='hidden md:inline md:w-64'>{track.track.album.name}</p>
            <p>{millistoMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song