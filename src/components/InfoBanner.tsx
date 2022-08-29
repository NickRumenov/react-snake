import {FC} from "react"

interface Props {
  isPlaying: boolean,
  appleCounter: number
}

const InfoBanner: FC<Props> = ({isPlaying, appleCounter}) => {

  return (
    <div className='info-bar'>
      <h3>Apples {appleCounter}</h3>
      <h1>{isPlaying ? '' : 'Dead'}</h1>
    </div>
  )
}

export default InfoBanner
