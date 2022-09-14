import {FC, useEffect, useState} from "react"

interface Props {
  isGameOver: boolean,
  appleCount: number
  play: () => void
}

const InfoBanner: FC<Props> = ({isGameOver, play, appleCount}) => {

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)

  useEffect(() => {
    isGameOver && setIsInitialLoading(false)
  }, [isGameOver])

  return (
    <div className='info-bar'>
      <b>Apples: {appleCount}</b>
      <b>{!isGameOver && !isInitialLoading ? 'Game Over' : ''}</b>
      <button className='play-button' onClick={play}>Play</button>
    </div>
  )
}

export default InfoBanner
