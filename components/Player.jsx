import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { curresntSongID, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import {HeartIcon,VolumeUpIcon as VolumeDownIcon} from '@heroicons/react/outline'
import {FastForwardIcon,PauseIcon,PlayIcon,ReplyIcon,RewindIcon,VolumeUpIcon,SwitchHorizontalIcon} from '@heroicons/react/solid'



const Player = () => {
    const spotifyApi = useSpotify();
    const songInfo=useSongInfo();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(curresntSongID);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    const fetchCurrentSong=()=>{
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data=>{
                console.log("Now Playing -->",data?.body?.item)
                setCurrentIdTrack(data?.body?.item.id)
                spotifyApi.getMyCurrentPlaybackState().then(data=>{
                    setIsPlaying(data?.body?.is_playing)
                })
            })
        }
    }
    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentIdTrack){
            fetchCurrentSong();
            setVolume(50);
        }
    },[spotifyApi,currentIdTrack])
    const handlePlayPause=()=>{
        spotifyApi.getMyCurrentPlaybackState().then(data=>{
            if(data?.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false)
            }
            else {
                spotifyApi.play();
                setIsPlaying(true)
            }
        })
    }

  return (
    <div className='h-20 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 p-2'>
        <div className='flex space-x-2'>
            <img className='h-10 w-10 hidden md:inline' src={songInfo?.album.images[0].url} alt={songInfo?.name} />
            <div>
                <p className='text-base'>{songInfo?.name}</p>
                <p className='text-sm'>{songInfo?.artists[0].name}</p>
            </div>
        </div>
        <div className='flex justify-evenly items-center'>
                <SwitchHorizontalIcon className='button'/>
                <RewindIcon className='button'/>
                {isPlaying?(
                    <PauseIcon onClick={handlePlayPause} className='button h-10 w-10'/>
                ):(
                    <PlayIcon onClick={handlePlayPause} className='button h-10 w-10'/>
                )}
                <FastForwardIcon className='button'/>
                <ReplyIcon className='button'/>
        </div>
        <div className='flex justify-end items-center space-x-3'>
            <VolumeDownIcon onClick={()=>volume>0 && setVolume(volume - 10)} className='button'/>
            <input type="range" min={0} value={volume} onChange={(e)=>setVolume(Number(e.target.value))} max={100} />
            <VolumeUpIcon onClick={()=>volume<100 && setVolume(volume + 10)} className='button'/>
        </div>
    </div>
  )
}

export default Player