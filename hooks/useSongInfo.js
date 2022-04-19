import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import {curresntSongID} from '../atoms/songAtom'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
function useSongInfo(){
    const spotifyApi=useSpotify();
    const {data:session}=useSession();
    const [currentId, setCurrentId] = useRecoilState(curresntSongID)
    const [songDetails, setSongDetails] = useState(null)
    useEffect(()=>{
        const getSongInfo=async()=>{
            if(currentId){
                const trackInfo= await fetch(`https://api.spotify.com/v1/tracks/${currentId}`,{
                    headers:{
                        Authorization:`Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }).then(res=>res.json());
                setSongDetails(trackInfo);
            }
        }
        getSongInfo();
    },[currentId,spotifyApi]);
    return songDetails;
}
export default useSongInfo;  