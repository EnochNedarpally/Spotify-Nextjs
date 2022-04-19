import {atom} from 'recoil'

export const curresntSongID= atom({
    key:"curresntSongID",
    default:null,
})
export const isPlayingState= atom({
    key:"isPlayingState",
    default:false,
})