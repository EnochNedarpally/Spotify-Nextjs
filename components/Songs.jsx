import React from 'react'
import Song from '../components/Song'

const Songs = ({playlist}) => {
  return (
    <div>
        {playlist?.tracks.items.map((track,i)=>(
            <Song key={track.track.id} order={i} track={track} />
        )
        )}
    </div>
  )
}

export default Songs