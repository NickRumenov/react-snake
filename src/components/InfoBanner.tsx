import {FC} from "react"

interface Props {
  isPlaying: boolean
}

const InfoBanner: FC<Props> = ({isPlaying}) => {

  return (
    <div className='info-bar'>
      <h1>{isPlaying ? '' : 'Dead'}</h1>
    </div>
  )
}

export default InfoBanner
