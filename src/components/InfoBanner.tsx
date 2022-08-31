import {FC} from "react"

interface Props {
  isPlaying: boolean,
  appleCounter: number
  restartGame: () => void
}

const InfoBanner: FC<Props> = ({isPlaying, appleCounter, restartGame}) => {

  return (
    <div className='info-bar'>
      <b>Apples: {appleCounter}</b>
      <b>{isPlaying ? '' : 'Dead'}</b>
      <button className='play-button' onClick={restartGame}>Restart</button>
    </div>
  )
}

export default InfoBanner
