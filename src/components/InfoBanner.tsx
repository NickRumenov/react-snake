import {FC, useEffect, useState} from "react"

interface Props {
  isPlaying: boolean,
  appleCounter: number
  play: () => void
}

const InfoBanner: FC<Props> = ({isPlaying, appleCounter, play}) => {

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)

  useEffect(() => {
    isPlaying && setIsInitialLoading(false)
  }, [isPlaying])

  return (
    <div className='info-bar'>
      <b>Apples: {appleCounter}</b>
      <b>{!isPlaying && !isInitialLoading ? 'Dead' : ''}</b>
      <button className='play-button' onClick={play}>Play</button>
    </div>
  )
}

export default InfoBanner
