import {FC, useEffect, useState} from "react"

interface Props {
  isPlaying: boolean,
  appleCount: number
  play: () => void
}

const InfoBanner: FC<Props> = ({isPlaying, play, appleCount}) => {

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)

  useEffect(() => {
    isPlaying && setIsInitialLoading(false)
  }, [isPlaying])

  return (
    <div className='info-bar'>
      <b>Apples: {appleCount}</b>
      <b>{!isPlaying && !isInitialLoading ? 'Dead' : ''}</b>
      <button className='play-button' onClick={play}>Play</button>
    </div>
  )
}

export default InfoBanner
